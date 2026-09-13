#!/usr/bin/env python3
"""
Render the social preview card for a post: holding/brand/og/og-blog-<slug>-1200x627.png

WHY THIS EXISTS. Same reason as build_post.py: add-og-tags.py, which made the
original cards, was never committed and is gone. The design here was measured
back off og-blog-worksheets-1200x627.png so a new card sits beside the
existing thirteen without looking like a different era.

Renders with headless Chrome because the card uses the site's own webfonts,
and because an HTML template is a thing anyone can open and adjust.

USAGE
  python3 scripts/build_og.py <slug> [<slug> ...]
  python3 scripts/build_og.py --keep-html <slug>    # leave the source to inspect
"""
import html
import os
import subprocess
import sys
import tempfile

from build_post import ROOT, read_post

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT_DIR = os.path.join(ROOT, "holding", "brand", "og")
FONTS = os.path.join(ROOT, "holding", "fonts")

# Measured off the existing cards.
GROUND = "#121113"
GRID = "#19181A"
GRID_MAJOR = "#1E1D1F"
BRACKET = "#5E5C5D"
INK = "#F4F1EC"
MUTED = "#A7A4A2"

# The existing cards hold one size and let a long title wrap to a second line,
# so a two-line card reads as the same card rather than a smaller one. Only a
# title long enough to need a third line steps down.
TITLE_SIZE = 72
WRAP_WIDTH = 640


def title_size(title):
    return TITLE_SIZE if len(title) <= 52 else 56


def no_orphan(escaped_title):
    """Tie a short last word to the one before it, so a wrapped title never
    drops a single three-letter word onto a line of its own."""
    words = escaped_title.split(" ")
    if len(words) > 2 and len(words[-1]) <= 4:
        words[-2:] = ["&nbsp;".join(words[-2:])]
    return " ".join(words)


TICK = (
    '<svg viewBox="0 0 40 40" aria-hidden="true">'
    '<path d="M2 12V2h10M28 2h10v10M38 28v10H28M12 38H2V28" '
    'fill="none" stroke="currentColor" stroke-width="3"/>'
    '<rect x="16" y="16" width="8" height="8" fill="currentColor"/></svg>'
)

PAGE = """<style>
  @font-face {{ font-family: Geist; src: url("{fonts}/geist-variable.woff2") format("woff2-variations");
    font-weight: 100 900; font-display: block; }}
  @font-face {{ font-family: GeistMono; src: url("{fonts}/geist-mono-400.woff2") format("woff2");
    font-weight: 400; font-display: block; }}
  @font-face {{ font-family: GeistMono; src: url("{fonts}/geist-mono-500.woff2") format("woff2");
    font-weight: 500; font-display: block; }}
  * {{ margin: 0; box-sizing: border-box; }}
  html, body {{ width: 1200px; height: 627px; }}
  body {{ background: {ground}; color: {ink}; overflow: hidden;
    font-family: Geist, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }}
  .card {{ position: relative; width: 1200px; height: 627px;
    background-image:
      linear-gradient(to right, {major} 1px, transparent 1px),
      linear-gradient(to bottom, {major} 1px, transparent 1px),
      linear-gradient(to right, {grid} 1px, transparent 1px),
      linear-gradient(to bottom, {grid} 1px, transparent 1px);
    background-size: 300px 300px, 300px 300px, 30px 30px, 30px 30px; }}
  .b {{ position: absolute; width: 56px; height: 56px; border: 1.5px solid {bracket}; }}
  .tl {{ top: 38px; left: 38px; border-right: 0; border-bottom: 0; }}
  .tr {{ top: 38px; right: 38px; border-left: 0; border-bottom: 0; }}
  .bl {{ bottom: 38px; left: 38px; border-right: 0; border-top: 0; }}
  .br {{ bottom: 38px; right: 38px; border-left: 0; border-top: 0; }}
  svg {{ width: 38px; height: 38px; display: block; }}
  .mark {{ position: absolute; left: 70px; top: 294px; color: {ink}; opacity: .82; }}
  .logo {{ position: absolute; right: 62px; top: 296px;
    display: flex; align-items: center; gap: 16px; }}
  .logo svg {{ width: 30px; height: 30px; }}
  .logo span {{ font-family: GeistMono, monospace; font-weight: 500;
    font-size: 30px; letter-spacing: -.01em; }}
  .text {{ position: absolute; left: 156px; top: 0; height: 627px; width: {wrap}px;
    display: flex; flex-direction: column; justify-content: center; }}
  h1 {{ font-weight: 600; font-size: {tsize}px; line-height: 1.06;
    letter-spacing: -.03em; }}
  .meta {{ margin-top: 26px; font-family: GeistMono, monospace; font-weight: 400;
    font-size: 21px; line-height: 1.42; color: {muted}; }}
</style>
<div class="card">
  <span class="b tl"></span><span class="b tr"></span>
  <span class="b bl"></span><span class="b br"></span>
  <span class="mark">{tick}</span>
  <div class="text">
    <h1>{title}</h1>
    <p class="meta">By {author}<br>{kind}</p>
  </div>
  <div class="logo">{tick}<span>searchscope</span></div>
</div>
"""


def build(slug, keep_html=False, name=None, out_name=None):
    """A post's card, or an author's card when `name` is given. The author
    card is the same frame with the name alone: no byline, no category."""
    if name:
        title, author, kind = name, "", ""
    else:
        meta, _ = read_post(slug)
        title = meta["title"]
        author = meta["author"]
        kind = "Product update" if meta["category"] == "Product Updates" else meta["category"]
    page = PAGE.format(
        fonts="file://" + FONTS, ground=GROUND, grid=GRID, major=GRID_MAJOR,
        bracket=BRACKET, ink=INK, muted=MUTED, tick=TICK,
        tsize=title_size(title), wrap=WRAP_WIDTH, title=no_orphan(html.escape(title)),
        author=html.escape(author), kind=html.escape(kind))
    if name:
        page = page.replace('<p class="meta">By <br></p>', "")

    out = os.path.join(OUT_DIR, "og-blog-%s-1200x627.png" % (out_name or slug))
    tmp = os.path.join(tempfile.gettempdir(), "og-%s.html" % slug)
    with open(tmp, "w", encoding="utf-8") as fh:
        fh.write(page)

    subprocess.run([
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
        "--allow-file-access-from-files", "--force-device-scale-factor=1",
        "--window-size=1200,627", "--screenshot=" + out, "file://" + tmp,
    ], check=True, capture_output=True)

    if not keep_html:
        os.remove(tmp)
    else:
        print("source: %s" % tmp)
    return out


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    keep = "--keep-html" in sys.argv
    if not args:
        raise SystemExit(__doc__)
    for slug in args:
        if slug.startswith("author:"):
            who = slug.split(":", 1)[1]
            from build_post import author_slug
            print("wrote %s" % os.path.relpath(
                build(None, keep, name=who, out_name="author-" + author_slug(who)), ROOT))
        else:
            print("wrote %s" % os.path.relpath(build(slug, keep), ROOT))
