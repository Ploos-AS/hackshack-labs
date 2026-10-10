#!/usr/bin/env python3
"""Print safe source inspection commands. Never downloads or flashes firmware."""
import json
from pathlib import Path
from urllib.parse import urlparse

manifest = json.loads(Path(__file__).with_name("sources.json").read_text())
for source in manifest["sources"]:
    url = source["url"]
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.hostname != "github.com":
        raise ValueError("Only HTTPS GitHub sources are allowed")
    name = source["name"]
    if not name.replace("-", "").replace("_", "").isalnum():
        raise ValueError("Invalid source name")
    print(f"# {name}: read and verify LICENSE before reuse")
    print(f"git clone --no-checkout {url} {name}")
    print(f"git -C {name} rev-parse origin/{source['ref']}")
    print(f"# Record immutable commit in sources.json, then inspect in isolation")
    print()
print("No commands executed. No firmware downloaded or flashed.")
