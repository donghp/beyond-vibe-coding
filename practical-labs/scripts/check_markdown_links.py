#!/usr/bin/env python3
"""Lightweight Markdown/link checks for BVC Practical Labs.

This script checks local relative links and image references in Markdown files.
It does not verify external URLs, runtime behavior, screenshot authenticity,
or whether a lesson's claims are technically correct.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[2]
LAB_ROOT = ROOT / "practical-labs"
MD_LINK = re.compile(r"!?
\[[^\]]*\]\(([^)]+)\)")
HTML_SRC = re.compile(r"""(?:src|href)=["']([^"']+)["']""", re.IGNORECASE)


def is_external(target: str) -> bool:
    parsed = urlparse(target)
    return bool(parsed.scheme or target.startswith(("#", "mailto:", "data:")))


def target_exists(source: Path, target: str) -> bool:
    target = target.strip().split()[0].strip("<>")
    if is_external(target):
        return True
    path_part = unquote(target.split("#", 1)[0].split("?", 1)[0])
    if not path_part:
        return True
    candidate = (source.parent / path_part).resolve()
    try:
        candidate.relative_to(LAB_ROOT.resolve())
    except ValueError:
        return False
    return candidate.exists()


def main() -> int:
    errors: list[str] = []
    checked = 0
    for source in sorted(LAB_ROOT.rglob("*.md")):
        text = source.read_text(encoding="utf-8")
        targets = MD_LINK.findall(text) + HTML_SRC.findall(text)
        for target in targets:
            checked += 1
            if not target_exists(source, target):
                rel = source.relative_to(ROOT)
                errors.append(f"{rel}: unresolved local link or asset: {target}")
    print(f"Checked {checked} Markdown/HTML references across {len(list(LAB_ROOT.rglob('*.md')))} Markdown files.")
    if errors:
        print("\n".join(errors))
        return 1
    print("No unresolved local relative references found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
