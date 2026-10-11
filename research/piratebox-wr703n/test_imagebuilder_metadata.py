"""Offline tests for read_imagebuilder_metadata.py.

Run from this directory:
    python3 -m unittest -v test_imagebuilder_metadata.py
"""
import io
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from read_imagebuilder_metadata import read_metadata


def archive(path, entries):
    with tarfile.open(path, "w:bz2") as output:
        for name, value in entries:
            info = tarfile.TarInfo(name)
            if isinstance(value, tuple):
                info.type = tarfile.SYMTYPE
                info.linkname = value[1]
                output.addfile(info)
            else:
                info.size = len(value)
                output.addfile(info, io.BytesIO(value))


class MetadataTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.path = Path(self.tmp.name) / "fixture.tar.bz2"

    def tearDown(self):
        self.tmp.cleanup()

    def test_reads_selected_text_without_extracting(self):
        archive(self.path, [
            ("builder/repositories.conf", b"src/gz test https://example.invalid\n"),
            ("builder/random.txt", b"ignore me"),
        ])
        result = read_metadata(self.path)
        self.assertEqual(len(result["metadata"]), 1)
        self.assertIn("src/gz test", result["metadata"][0]["text"])
        self.assertEqual(list(Path(self.tmp.name).iterdir()), [self.path])

    def test_rejects_archive_with_symlink(self):
        archive(self.path, [("builder/link", ("symlink", "../../escape"))])
        with self.assertRaises(ValueError):
            read_metadata(self.path)

    def test_rejects_path_traversal(self):
        archive(self.path, [("../escape", b"unsafe")])
        with self.assertRaises(ValueError):
            read_metadata(self.path)

    def test_skips_non_utf8(self):
        archive(self.path, [("builder/repositories.conf", b"\xff\xfe")])
        result = read_metadata(self.path)
        self.assertEqual(result["metadata"][0]["skipped"], "non-UTF8 content")

    def test_skips_large_text(self):
        archive(self.path, [("builder/repositories.conf", b"abcdef")])
        with patch("read_imagebuilder_metadata.MAX_TEXT_BYTES", 4):
            result = read_metadata(self.path)
        self.assertEqual(result["metadata"][0]["skipped"], "exceeds text size limit")


if __name__ == "__main__":
    unittest.main()
