"""Refresh CSS/JS URL versions after editing assets, before publishing."""
from hashlib import sha256
from pathlib import Path
import re
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]


def version_reference(match, page):
    attribute, target = match.groups()
    url = urlsplit(target)
    if url.scheme or url.netloc or not url.path.endswith((".css", ".js")):
        return match.group()
    asset = (page.parent / unquote(url.path)).resolve()
    version = sha256(asset.read_bytes().replace(b"\r\n", b"\n")).hexdigest()[:12]
    return f'{attribute}="{url.path}?v={version}"'


for page in [ROOT / "index.html", *sorted((ROOT / "projects").glob("*.html"))]:
    original = page.read_text(encoding="utf-8")
    updated = re.sub(r'(href|src)="([^"]+)"', lambda match: version_reference(match, page), original)
    if updated != original:
        page.write_text(updated, encoding="utf-8")
