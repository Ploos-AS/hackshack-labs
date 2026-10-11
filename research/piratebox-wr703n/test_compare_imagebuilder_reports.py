import unittest
from compare_imagebuilder_reports import compare


def report(sha, entries):
    return {"sha256": sha, "members": 2, "declared_uncompressed_bytes": 12,
            "interesting_files": [{"path": k, "size": v} for k, v in entries.items()]}


class CompareTests(unittest.TestCase):
    def test_identical(self):
        out = compare(report("a", {"a": 1}), report("a", {"a": 1}))
        self.assertTrue(out["sha256_equal"])
        self.assertEqual(out["metadata_different_sizes"], [])

    def test_difference(self):
        out = compare(report("a", {"a": 1, "b": 2}), report("b", {"a": 3, "c": 4}))
        self.assertFalse(out["sha256_equal"])
        self.assertEqual(out["metadata_only_in_first"], ["b"])
        self.assertEqual(out["metadata_only_in_second"], ["c"])
        self.assertEqual(out["metadata_different_sizes"][0]["path"], "a")


if __name__ == "__main__":
    unittest.main()
