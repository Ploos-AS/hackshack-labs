#!/usr/bin/env python3
"""Print reproducible source checkout commands. Never executes commands."""
import json
import re
from pathlib import Path
from urllib.parse import urlparse

manifest = json.loads(Path(__file__).with_name("sources.json").read_text())
for source in manifest["sources"]:
    url = source["url"]
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.hostname != "github.com":
        raise ValueError("Only HTTPS GitHub sources are allowed")
    name = source["name"]
    if not re.fullmatch(r"[A-Za-z0-9_-]+", name):
        raise ValueError("Invalid source name")
    commit = source.get("commit")
    if not commit or not re.fullmatch(r"[0-9a-f]{40}", commit):
        raise ValueError(f"{name}: missing immutable 40-character commit hash")
    print(f"# {name}: review its license before redistributing any code")
    print(f"git clone --no-checkout {url} {name}")
    print(f"git -C {name} checkout --detach {commit}")
    print(f"git -C {name} rev-parse HEAD  # expected: {commit}")
    print()
print("Commands printed only. No downloads or firmware operations performed.")
