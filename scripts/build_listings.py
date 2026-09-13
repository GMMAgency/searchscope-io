#!/usr/bin/env python3
"""
Rebuild every list that names a post: the blog index, the category and author
pages, the sitemap and the RSS feed. Reads posts/*.md, so adding a post is a
matter of writing the markdown and running this.

Companion to build_post.py, which builds the post pages themselves. Read the
WHY THIS EXISTS note at the top of that file.

The card markup differs slightly per surface and that is deliberate, not drift:
the category grid staggers its entrance (--reveal-delay), the author grid and
the blog index do not, and only the blog index carries data-cats for its
client-side filter. Each renderer below matches the surface it writes to.

The blog index lists Field Notes only. Product Updates have their own page,
reached from the rail, and mixing them buries the essays.

USAGE
  python3 scripts/build_listings.py            # every list
  python3 scripts/build_listings.py --check    # print what would change
"""
import datetime as dt
import html
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_post import (ROOT, SITE, WORDS_PER_MINUTE, author_slug, pretty_date,
                        read_post, word_count)

UPDATES = "Product Updates"
RELATED = 3          # cards in a post page's "More posts" grid
REVEAL_STEP = 70     # ms between card entrances on the category page


def cat_slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def load_all():
    posts = []
    for name in sorted(os.listdir(os.path.join(ROOT, "posts"))):
        if not name.endswith(".md"):
            continue
        slug = name[:-3]
        meta, body = read_post(slug)
        words = word_count(body)
        posts.append({
            "slug": slug,
            "title": meta["title"],
            "description": meta["description"],
            "date": meta["pubDate"],
            "author": meta["author"],
            "category": meta["category"],
            "cat_slug": cat_slug(meta["category"]),
            "minutes": max(1, round(words / WORDS_PER_MINUTE)),
            "draft": str(meta.get("draft", "false")).lower() == "true",
        })
    live = [p for p in posts if not p["draft"]]
    return sorted(live, key=lambda p: p["date"], reverse=True)


def card(post, li):
    e = lambda s: html.escape(s, quote=True)
    return (
        '        %s\n'
        '          <a class="tagpill" href="/blog/category/%s/">%s</a>\n'
        '          <h2 class="mcard__t"><a href="/blog/%s/">%s</a></h2>\n'
        '          <p class="mcard__d">%s</p>\n'
        '          <p class="mcard__m">\n'
        '            <span>%s</span>\n'
        '            <span aria-hidden="true">&#183;</span><span>%d min read</span>\n'
        '            <span aria-hidden="true">&#183;</span>\n'
        '            <time datetime="%s">%s</time>\n'
        '          </p>\n'
        '        </li>'
    ) % (li, post["cat_slug"], e(post["category"]), post["slug"], e(post["title"]),
         e(post["description"]), e(post["author"]), post["minutes"],
         post["date"], pretty_date(post["date"]))


def reveal_li(i):
    return '<li class="mcard reveal" style="--reveal-delay:%dms">' % (60 + REVEAL_STEP * i)


def replace_grid(path, grid_html, grid="postgrid", closer="</ul>"):
    """Swap a grid's contents, keeping its own opening tag: the blog index
    carries a data-postgrid hook on it that its filter script looks for."""
    with open(path, encoding="utf-8") as fh:
        page = fh.read()
    pattern = r'<ul class="%s"[^>]*>.*?%s' % (grid, re.escape(closer))
    opener = re.search(r'<ul class="%s"[^>]*>' % grid, page)
    if not opener:
        raise SystemExit("no %s grid in %s" % (grid, path))
    tag = opener.group(0)
    new, n = re.subn(pattern, lambda m: tag + "\n" + grid_html + "\n      " + closer,
                     page, count=1, flags=re.S)
    if n != 1:
        raise SystemExit("no %s grid in %s" % (grid, path))
    return path, new


# ---------------------------------------------------------------- the surfaces

def blog_index(posts):
    field_notes = [p for p in posts if p["category"] != UPDATES]
    cards = [card(p, '<li class="mcard" data-cats="%s">' % p["cat_slug"])
             for p in field_notes]
    return [replace_grid(os.path.join(ROOT, "holding", "blog", "index.html"),
                         "\n".join(cards))]


def category_pages(posts):
    out = []
    seen = {}
    for p in posts:
        seen.setdefault(p["cat_slug"], []).append(p)
    for slug, group in seen.items():
        path = os.path.join(ROOT, "holding", "blog", "category", slug, "index.html")
        if not os.path.exists(path):
            continue
        cards = [card(p, reveal_li(i)) for i, p in enumerate(group)]
        out.append(replace_grid(path, "\n".join(cards)))
    return out


def author_pages(posts):
    out = []
    seen = {}
    for p in posts:
        seen.setdefault(author_slug(p["author"]), []).append(p)
    for name, group in seen.items():
        path = os.path.join(ROOT, "holding", "blog", "author", name, "index.html")
        if not os.path.exists(path):
            continue
        cards = [card(p, '<li class="mcard">') for p in group]
        path, page = replace_grid(path, "\n".join(cards))
        # The count is in the page's description twice as well, and it was
        # stale: the page said 13 posts while listing 14.
        page = re.sub(r"\b\d+ posts?\.", "%d post%s." % (len(group), "" if len(group) == 1 else "s"),
                      page)
        page, n = re.subn(r'(<h2 class="more__h"[^>]*>)\d+ posts?(</h2>)',
                          lambda m: "%s%d post%s%s" % (m.group(1), len(group),
                                                       "" if len(group) == 1 else "s",
                                                       m.group(2)),
                          page, count=1)
        if n != 1:
            raise SystemExit("no post count heading in %s" % path)
        out.append((path, page))
    return out


def more_posts(posts):
    """Every post page's own 'More posts' grid: the newest siblings in its
    category. Rebuilt everywhere, because these cards carry other posts'
    titles, descriptions and read times, and a copy edit anywhere leaves them
    stale on every other page."""
    out = []
    by_slug = {p["slug"]: p for p in posts}
    for slug in by_slug:
        me = by_slug[slug]
        siblings = [p for p in posts
                    if p["category"] == me["category"] and p["slug"] != slug][:RELATED]
        cards = [card(p, reveal_li(i)) for i, p in enumerate(siblings)]
        path = os.path.join(ROOT, "holding", "blog", slug, "index.html")
        out.append(replace_grid(path, "".join(cards).lstrip(), grid="moregrid"))
    return out


def sitemap(posts):
    path = os.path.join(ROOT, "holding", "sitemap.xml")
    with open(path, encoding="utf-8") as fh:
        xml = fh.read()
    today = dt.date.today().isoformat()
    # A page whose file differs from the last commit changed today, so its
    # lastmod should say so rather than keeping the date of the previous build.
    changed = set(subprocess.run(
        ["git", "diff", "--name-only", "HEAD", "--", "holding/blog"],
        cwd=ROOT, capture_output=True, text=True).stdout.split())
    for p in posts:
        if "holding/blog/%s/index.html" % p["slug"] in changed:
            xml = re.sub(
                r"(<loc>%s/blog/%s/</loc>\s*<lastmod>)[^<]*" % (re.escape(SITE), re.escape(p["slug"])),
                lambda m: m.group(1) + today, xml, count=1)
    # A post that has been withdrawn should leave the sitemap with it.
    live = {"%s/blog/%s/" % (SITE, p["slug"]) for p in posts}
    for loc in re.findall(r"<loc>(%s/blog/[^/<]+/)</loc>" % re.escape(SITE), xml):
        if loc not in live:
            xml = re.sub(r"  <url>\s*<loc>%s</loc>\s*<lastmod>[^<]*</lastmod>\s*</url>\n"
                         % re.escape(loc), "", xml, count=1)

    added = []
    for p in sorted(posts, key=lambda p: p["slug"]):
        loc = "%s/blog/%s/" % (SITE, p["slug"])
        if loc in xml:
            continue
        entry = "  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n  </url>\n" % (loc, today)
        # Keep the file's alphabetical run of blog URLs intact.
        after = [q for q in sorted(posts, key=lambda q: q["slug"])
                 if q["slug"] > p["slug"] and "%s/blog/%s/" % (SITE, q["slug"]) in xml]
        anchor = "  <url>\n    <loc>%s/blog/%s/</loc>" % (SITE, after[0]["slug"])
        xml = xml.replace(anchor, entry + anchor, 1)
        added.append(p["slug"])
    return [(path, xml)], added


def rss(posts):
    path = os.path.join(ROOT, "holding", "blog", "rss.xml")
    with open(path, encoding="utf-8") as fh:
        xml = fh.read()
    e = lambda s: html.escape(s, quote=True)
    items = []
    for p in posts:
        when = dt.datetime.strptime(p["date"], "%Y-%m-%d").replace(hour=9)
        items.append(
            "<item>\n"
            "      <title>%s</title>\n"
            "      <link>%s/blog/%s/</link>\n"
            '      <guid isPermaLink="true">%s/blog/%s/</guid>\n'
            "      <description>%s</description>\n"
            "      <pubDate>%s</pubDate>\n"
            "      <author>noreply@searchscope.io (%s)</author>\n"
            "      <category>%s</category>\n"
            "    </item>" % (
                e(p["title"]), SITE, p["slug"], SITE, p["slug"], e(p["description"]),
                when.strftime("%a, %d %b %Y %H:%M:%S +0000"), e(p["author"]),
                e(p["category"])))
    body = "\n    ".join(items)
    xml, n = re.subn(r"<item>.*</item>", lambda m: body, xml, count=1, flags=re.S)
    if n != 1:
        raise SystemExit("no items in the feed")
    xml = re.sub(r"<lastBuildDate>[^<]*</lastBuildDate>",
                 "<lastBuildDate>%s</lastBuildDate>"
                 % dt.datetime.now(dt.timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000"),
                 xml, count=1)
    return [(path, xml)]


def main():
    check = "--check" in sys.argv
    posts = load_all()
    new = [p["slug"] for p in posts
           if not os.path.exists(os.path.join(ROOT, "holding", "blog", p["slug"],
                                              "index.html"))]
    if new:
        raise SystemExit("build these post pages first: %s" % ", ".join(new))

    writes = []
    writes += blog_index(posts)
    writes += category_pages(posts)
    writes += author_pages(posts)
    writes += more_posts(posts)
    sm, added = sitemap(posts)
    writes += sm
    writes += rss(posts)

    for path, content in writes:
        rel = os.path.relpath(path, ROOT)
        with open(path, encoding="utf-8") as fh:
            before = fh.read()
        if before == content:
            print("unchanged  %s" % rel)
            continue
        if check:
            print("would edit %s" % rel)
        else:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(content)
            print("wrote      %s" % rel)


if __name__ == "__main__":
    main()
