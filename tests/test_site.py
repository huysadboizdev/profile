"""Checks for static-hosting regressions; no third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import unittest

ROOT = Path(__file__).resolve().parents[1]


class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = []
        self.links = []
        self.assets = []
        self.headings = []
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])
        if tag in ("img", "script") and "src" in attrs:
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon", "preload"):
            self.assets.append(attrs["href"])
        if tag == "h1":
            self.headings.append(tag)


class StaticHostingTests(unittest.TestCase):
    def test_navigation_and_local_resources_resolve_under_repo_subpath(self):
        for path in [ROOT / "index.html", *sorted((ROOT / "projects").glob("*.html"))]:
            with self.subTest(page=path.name):
                doc = Document(path)
                self.assertEqual(len(doc.ids), len(set(doc.ids)), "Duplicate IDs")
                self.assertEqual(len(doc.headings), 1, "Each page needs one main heading")
                for target in doc.links + doc.assets:
                    url = urlsplit(target)
                    if url.scheme or url.netloc:
                        continue
                    self.assertFalse(url.path.startswith("/"), f"Root-relative URL breaks project hosting: {target}")
                    destination = (path.parent / unquote(url.path)).resolve() if url.path else path
                    self.assertTrue(destination.is_relative_to(ROOT), f"Link escapes website: {target}")
                    self.assertTrue(destination.is_file(), f"Missing resource: {target}")
                    if url.fragment and destination.suffix == ".html":
                        self.assertIn(unquote(url.fragment), Document(destination).ids, f"Broken anchor: {target}")

    def test_featured_case_studies_and_downloadable_cv_exist(self):
        doc = Document(ROOT / "index.html")
        for target in ["projects/bluexhome.html", "projects/love-pdf.html", "assets/Ha-Quang-Huy-Full-Stack-Developer-CV.pdf"]:
            self.assertIn(target, doc.links)
            self.assertTrue((ROOT / target).is_file(), target)
        self.assertTrue((ROOT / "googlefdc08d88884925ad.html").is_file())


if __name__ == "__main__":
    unittest.main()
