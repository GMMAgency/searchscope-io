#!/usr/bin/env python3
"""
Build a product-update post page under holding/blog/<slug>/index.html.

WHY THIS EXISTS. The live blog pages are hand-coded static HTML with no build
step (netlify.toml publishes `holding/` with an empty command). The scripts
that originally generated them (build-blog.py, add-og-tags.py, blog_mocks.py)
were never committed and no longer exist, so the only way to add a post was to
copy a 1,500 line sibling and hand-edit the ~118 lines that differ. This puts
that back, committed this time.

HOW IT WORKS. A sibling page is the template. Only the slots listed in SLOTS
vary between siblings, and each is matched by content anchor rather than line
number, so the template can move underneath it. Everything else, including the
whole inline CSS block, is copied through byte for byte.

INPUTS
  posts/<slug>.md             frontmatter + body
  scripts/scenes/<slug>.html  the hero picture, built from the .u-* primitives
                              already in the shared CSS (add no new CSS rules,
                              or the CSS block stops being identical across
                              pages and the next person has to diff 15 files)

USAGE
  python3 scripts/build_post.py <slug> [<slug> ...]
"""
import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE = os.path.join(ROOT, "holding", "blog", "worksheets", "index.html")
SITE = "https://searchscope.io"
WORDS_PER_MINUTE = 200

MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


# ---------------------------------------------------------------- frontmatter

def read_post(slug):
    path = os.path.join(ROOT, "posts", slug + ".md")
    with open(path, encoding="utf-8") as fh:
        raw = fh.read()
    if not raw.startswith("---"):
        raise SystemExit("%s has no frontmatter" % path)
    _, front, body = raw.split("---", 2)
    meta = {}
    for line in front.strip().split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            meta[key.strip()] = value.strip().strip("'\"")
    for required in ("title", "description", "pubDate", "author", "category"):
        if required not in meta:
            raise SystemExit("%s is missing %s" % (path, required))
    return meta, body.strip()


def pretty_date(iso):
    year, month, day = iso.split("-")
    return "%s %d, %s" % (MONTHS[int(month) - 1], int(day), year)


# ------------------------------------------------------------------- markdown

def slugify(text):
    text = re.sub(r"<[^>]+>", "", text).lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    return re.sub(r"[\s-]+", "-", text).strip("-")


def smarten(text):
    """Curly quotes, matching what the existing pages use."""
    text = re.sub(r'"([^"]*)"', lambda m: "&ldquo;" + m.group(1) + "&rdquo;", text)
    return text.replace("'", "&rsquo;")


def inline(text):
    """Escape, then apply links, bold and italic. Order matters: escaping
    first means a literal < in copy survives, and the markup we add after is
    the only markup that reaches the page."""
    text = html.escape(text, quote=False)
    text = smarten(text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    return text


def render(body):
    """Markdown to the prose HTML these pages use. Returns (html, headings)."""
    out, headings, bullets = [], [], []

    def flush():
        if bullets:
            out.append("<ul>")
            out.extend("<li>%s</li>" % b for b in bullets)
            out.append("</ul>")
            bullets.clear()

    for block in re.split(r"\n\s*\n", body):
        block = block.strip()
        if not block:
            continue
        if block.startswith("## "):
            flush()
            heading = block[3:].strip()
            anchor = slugify(heading)
            headings.append((anchor, inline(heading)))
            out.append('<h2 id="%s">%s</h2>' % (anchor, inline(heading)))
        elif block.startswith(("- ", "* ")):
            for line in block.split("\n"):
                bullets.append(inline(line.strip()[2:]))
        else:
            flush()
            out.append("<p>%s</p>" % inline(" ".join(block.split("\n"))))
    flush()
    return "\n".join(out), headings


def word_count(body):
    """Whitespace-split the markdown body, which is what the original
    generator did. Verified against the wordCount in all eight existing
    product-update pages, so a rebuild never silently reprices a read time."""
    return len(body.split())


# ----------------------------------------------------------------- the slots

def build(slug):
    meta, body = read_post(slug)
    prose, headings = render(body)
    words = word_count(body)

    scene_path = os.path.join(ROOT, "scripts", "scenes", slug + ".html")
    with open(scene_path, encoding="utf-8") as fh:
        scene = fh.read().rstrip("\n")
    if not scene.lstrip().startswith('<div class="uscene"'):
        raise SystemExit("%s must start with the .uscene div" % scene_path)
    if 'aria-label="' not in scene.split(">", 1)[0] + ">":
        raise SystemExit("%s needs an aria-label: it is the picture's alt text" % scene_path)

    minutes = max(1, round(words / WORDS_PER_MINUTE))
    url = "%s/blog/%s/" % (SITE, slug)
    title = meta["title"]
    desc = meta["description"]
    esc_title = html.escape(title, quote=True)
    esc_desc = html.escape(desc, quote=True)
    date = meta["pubDate"]

    toc = "".join('<li><a href="#%s">%s</a></li>' % h for h in headings)
    toc_ul_m = '<ul class="toc">%s</ul>' % toc
    toc_ul_r = '<ul class="toc" data-toc data-count="%d">%s</ul>' % (len(headings), toc)

    ld = (
        '{"@context":"https://schema.org","@type":"BlogPosting",'
        '"headline":"%s","description":"%s","datePublished":"%s","dateModified":"%s",'
        '"author":{"@type":"Person","name":"%s","url":"%s/blog/author/%s/"},'
        '"publisher":{"@type":"Organization","name":"Searchscope","url":"%s/"},'
        '"keywords":"%s","articleSection":"%s","wordCount":%d,"timeRequired":"PT%dM",'
        '"inLanguage":"en","mainEntityOfPage":{"@type":"WebPage","@id":"%s"},"url":"%s"}'
    ) % (esc_title, esc_desc, date, date, meta["author"], SITE,
         meta["author"].lower(), SITE, meta["category"], meta["category"],
         words, minutes, url, url)

    share_title = title.replace(" ", "%20").replace("&", "%26")
    share = (
        '<div class="share">'
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url={url}" target="_blank" rel="noopener" aria-label="Share on LinkedIn" title="Share on LinkedIn">{li}</a>'
        '<a href="https://twitter.com/intent/tweet?url={url}&text={st}" target="_blank" rel="noopener" aria-label="Share on X" title="Share on X">{x}</a>'
        '<a href="https://www.facebook.com/sharer/sharer.php?u={url}" target="_blank" rel="noopener" aria-label="Share on Facebook" title="Share on Facebook">{fb}</a>'
        '<a href="mailto:?subject={st}&body={url}" aria-label="Share by email" title="Share by email">{em}</a>'
        "</div>"
    )

    with open(TEMPLATE, encoding="utf-8") as fh:
        page = fh.read()

    # The share block's four SVGs are template furniture; lift them rather than
    # restate them, so a brand icon change only has to happen in one place.
    share_src = re.search(r'<div class="share">.*?</div>', page, re.S).group(0)
    svgs = re.findall(r"<svg .*?</svg>", share_src, re.S)
    share = share.format(url=url, st=share_title,
                         li=svgs[0], x=svgs[1], fb=svgs[2], em=svgs[3])

    slots = [
        (r"page_name:'[^']*'", "page_name:'%s'" % slug),
        (r"<title>[^<]*</title>", "<title>%s · Searchscope</title>" % esc_title),
        (r'<meta name="description" content="[^"]*">',
         '<meta name="description" content="%s">' % esc_desc),
        (r'<meta property="og:title" content="[^"]*">',
         '<meta property="og:title" content="%s · Searchscope">' % esc_title),
        (r'<meta property="og:description" content="[^"]*">',
         '<meta property="og:description" content="%s">' % esc_desc),
        (r'<meta property="og:url" content="[^"]*">',
         '<meta property="og:url" content="%s">' % url),
        (r'<meta property="og:image" content="[^"]*">',
         '<meta property="og:image" content="%s/brand/og/og-blog-%s-1200x627.png">' % (SITE, slug)),
        (r'<meta property="og:image:alt" content="[^"]*">',
         '<meta property="og:image:alt" content="%s">' % esc_title),
        (r'<link rel="canonical" href="[^"]*">',
         '<link rel="canonical" href="%s">' % url),
        (r'<script type="application/ld\+json">\{"@context"[^<]*?"BlogPosting".*?</script>',
         '<script type="application/ld+json">%s</script>' % ld),
        (r'(<h1 class="post__title reveal"[^>]*>)[^<]*(</h1>)', esc_title),
        (r'<span>\d+ min read</span>', "<span>%d min read</span>" % minutes),
        (r'(<time datetime=")[^"]*("[^>]*>)[^<]*(</time>)', None),
        (r'(<p class="posthead__sub reveal"[^>]*>).*?(</p>)', esc_desc),
        (r'<div class="uscene" role="img".*?\n          </div>', scene),
        (r'(<summary>.*?</summary>\s*)<ul class="toc">.*?</ul>', toc_ul_m),
        (r'<ul class="toc" data-toc data-count="\d+">.*?</ul>', toc_ul_r),
        (r'(<div class="prose">).*?(\n\s*</div>)',
         "\n" + prose),
        (r'<div class="share">.*?</div>', share),
    ]

    def fill(match, body):
        """Rebuild the match from its own delimiters, so nothing in the copy
        is ever read back as a replacement escape."""
        groups = [g for g in match.groups() if g is not None]
        if not groups:
            return body
        if len(groups) == 1:
            return groups[0] + body
        return groups[0] + body + "".join(groups[1:])

    for pattern, body in slots:
        if body is None:  # the date is built from two parts
            page, n = re.subn(
                pattern,
                lambda m: m.group(1) + date + m.group(2) + pretty_date(date) + m.group(3),
                page, count=1, flags=re.S)
        else:
            page, n = re.subn(pattern, lambda m, b=body: fill(m, b),
                              page, count=1, flags=re.S)
        if n != 1:
            raise SystemExit("slot matched %d times, wanted 1: %s" % (n, pattern[:70]))

    out_dir = os.path.join(ROOT, "holding", "blog", slug)
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as fh:
        fh.write(page)

    return {"slug": slug, "title": title, "description": desc, "date": date,
            "author": meta["author"], "category": meta["category"],
            "words": words, "minutes": minutes}


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    for s in sys.argv[1:]:
        info = build(s)
        print("built holding/blog/%(slug)s/index.html  %(words)d words, %(minutes)d min" % info)
