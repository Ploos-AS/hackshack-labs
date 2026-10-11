"""Offline end-to-end tests for run_imagebuilder_research.py."""
import io
import json
import tarfile
import tempfile
import unittest
from pathlib import Path

from run_imagebuilder_research import NAMES, run


def make_tar(path, members):
    with tarfile.open(path, "w:bz2") as archive:
        for name, data in members:
            entry = tarfile.TarInfo(name)
            entry.size = len(data)
            archive.addfile(entry, io.BytesIO(data))


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.archives = self.root / "archives"
        self.reports = self.root / "reports"
        self.archives.mkdir()
        self.reports.mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def test_end_to_end_with_small_fixtures(self):
        make_tar(self.archives / NAMES[0], [("builder/repositories.conf", b"standard\n")])
        make_tar(self.archives / NAMES[1], [("builder/repositories.conf", b"alternative\n")])
        outputs = run(self.archives, self.reports)
        self.assertEqual(len(outputs), 5)
        self.assertTrue(all((self.reports / name).is_file() for name in outputs))
        first = json.loads((self.reports / "standard-metadata.json").read_text())
        self.assertEqual(first["metadata"][0]["text"], "standard\n")
        comparison = json.loads((self.reports / "comparison.json").read_text())
        self.assertFalse(comparison["sha256_equal"])

    def test_missing_archive_writes_nothing(self):
        make_tar(self.archives / NAMES[0], [("builder/Makefile", b"ok")])
        with self.assertRaises(ValueError):
            run(self.archives, self.reports)
        self.assertEqual(list(self.reports.iterdir()), [])

    def test_unsafe_archive_writes_nothing(self):
        make_tar(self.archives / NAMES[0], [("../escape", b"unsafe")])
        make_tar(self.archives / NAMES[1], [("builder/Makefile", b"ok")])
        with self.assertRaises(ValueError):
            run(self.archives, self.reports)
        self.assertEqual(list(self.reports.iterdir()), [])

    def test_refuses_existing_report(self):
        (self.reports / "comparison.json").write_text("existing")
        with self.assertRaises(ValueError):
            run(self.archives, self.reports)
        self.assertEqual((self.reports / "comparison.json").read_text(), "existing")


if __name__ == "__main__":
    unittest.main()
