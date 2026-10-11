#!/usr/bin/env python3
"""Offline regression tests for inspect_imagebuilder_archive.py.

Run: python3 -m unittest -v test_archive_inspector.py
No downloads, extraction, privileged operations, or real router access.
"""
import io
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from inspect_imagebuilder_archive import inspect


def make_archive(path, entries):
    with tarfile.open(path, "w:bz2") as tar:
        for name, kind, data in entries:
            info = tarfile.TarInfo(name)
            if kind == "file":
                info.size = len(data)
                tar.addfile(info, io.BytesIO(data))
            elif kind == "symlink":
                info.type = tarfile.SYMTYPE
                info.linkname = data
                tar.addfile(info)


class InspectorTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.path = Path(self.tmp.name) / "fixture.tar.bz2"

    def tearDown(self):
        self.tmp.cleanup()

    def test_clean_archive(self):
        make_archive(self.path, [
            ("builder/Makefile", "file", b"all:\n\t@true\n"),
            ("builder/repositories.conf", "file", b""),
        ])
        result = inspect(self.path)
        self.assertTrue(result["safe_to_consider_extraction"])
        self.assertEqual(len(result["interesting_files"]), 2)
        self.assertEqual(len(result["sha256"]), 64)

    def test_parent_traversal(self):
        make_archive(self.path, [("../escape", "file", b"bad")])
        self.assertFalse(inspect(self.path)["safe_to_consider_extraction"])

    def test_absolute_path(self):
        make_archive(self.path, [("/etc/passwd", "file", b"bad")])
        self.assertFalse(inspect(self.path)["safe_to_consider_extraction"])

    def test_symlink(self):
        make_archive(self.path, [("builder/link", "symlink", "../../etc/passwd")])
        self.assertFalse(inspect(self.path)["safe_to_consider_extraction"])

    def test_backslash(self):
        make_archive(self.path, [("builder\\..\\escape", "file", b"bad")])
        self.assertFalse(inspect(self.path)["safe_to_consider_extraction"])

    def test_oversized_member(self):
        make_archive(self.path, [("builder/Makefile", "file", b"abc")])
        with patch("inspect_imagebuilder_archive.MAX_MEMBER", 2):
            self.assertFalse(inspect(self.path)["safe_to_consider_extraction"])


if __name__ == "__main__":
    unittest.main()
