#!/usr/bin/env python3
"""
Take all the blog copy out to one file for editing, and put it back.

WHY. The copy lives in fourteen files with frontmatter wrapped round it, which
is a poor shape to hand to a writer or an editing agent. This flattens it into
one document, and reads that document back into the right files afterwards.

Only three things travel: the title, the description and the body. Everything
else in the frontmatter (slug, date, author, category, tags, aliases) stays
where it is, because changing a slug moves a live URL and changing a date
reorders the blog.

The structure is carried in HTML comments rather than headings, so a body can
keep its own `##` headings without confusing the parser. Keep the comment
markers exactly as they are and the file reads back cleanly.

USAGE
  python3 scripts/blog_copy.py export [path]   # default: blog-copy.md here
  python3 scripts/blog_copy.py import <path>   # writes posts/*.md
  python3 scripts/blog_copy.py import <path> --dry-run
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, "posts")
DEFAULT = os.path.join(ROOT, "blog-copy.md")

BRIEF = """# Searchscope blog copy

Every word on the blog, in one file. Fourteen posts.

Rewrite the **title**, **description** and **body** of any post. Leave the
comment markers (`<!-- body -->` and the rest) exactly where they are: they are
how this file gets read back into the site.

## What must not change

- **The links.** Every `[text](/path/)` points at a real page. Change the words
  inside the brackets if you like, never the path.
- **The titles**, unless you mean it. A title sets the page URL, the social
  card and the listing entry. Changing one means redrawing a card and leaving
  an old URL behind.
- Dates, authors, categories. They aren't in this file for that reason.

## Hard rules, enforced on merge

- **No em dashes.** Anywhere. Commas, colons, semicolons or brackets instead.
  A build check fails the merge if one appears.
- **No pricing, trial, checkout or buy language.** Searchscope is not something
  you can buy online. There is no price and no checkout, so nothing may imply
  one. A second build check enforces this.
- **British English**, though the app itself is US English, so product terms
  keep their spelling ("analyzers", "Cannibalization" as the name of the
  analyzer).
- **"Searchscope", one word.** Say "search data" rather than "GSC". Naming
  Google Search Console outright is fine in a technical passage.

## Who is reading

SEO practitioners and in-house search leads. They know what canonical, crawl
budget, search intent and click-through rate mean. Don't define them, and
don't explain what Google is.

## What the posts are

Product Updates announce something that has actually shipped. They run 130 to
160 words and they are read by people deciding whether to go and look at it.
The four longer pieces (Search Systems, Search Data, AI Search, Agency) are
arguments, 400 to 450 words, and they are read by people deciding whether this
team knows anything.

Every figure in these posts is an illustration, not a measurement. Don't add
statistics, client results or case studies; there are none to cite.

## What was already tried

A previous pass removed the obvious tells and it still reads as machine-made,
which is why you have this file. The things already taken out, so you don't
spend the effort again: a heading every two paragraphs, the "X isn't Y, it's Z"
construction, forced groups of three, bold-lead bullet lists, arrow notation,
"Here's the catch", rhetorical questions used as section openers, and closing
lines that reach for inspiration. Paragraph and sentence lengths were varied
deliberately.

What that pass did not fix is the voice. The posts still sound like a product
explaining itself carefully rather than a person who has done this work
telling you what they found. That is the thing to change.

---
"""


def read(slug):
    with open(os.path.join(POSTS, slug + ".md"), encoding="utf-8") as fh:
        raw = fh.read()
    _, front, body = raw.split("---", 2)
    meta = {}
    for line in front.strip().split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip().strip("'\"")
    return meta, front, body.strip()


def slugs():
    return sorted(f[:-3] for f in os.listdir(POSTS) if f.endswith(".md"))


MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


def export(path):
    order = sorted(slugs(), key=lambda s: read(s)[0]["pubDate"], reverse=True)
    out = [BRIEF]
    for n, slug in enumerate(order, 1):
        meta, _, body = read(slug)
        y, m, d = meta["pubDate"].split("-")
        out.append(
            "<!-- post:%s -->\n\n"
            "# %d. %s\n\n"
            "`/blog/%s/` · %s · %s %d, %s · %d words\n\n"
            "<!-- title -->\n\n%s\n\n"
            "<!-- description -->\n\n%s\n\n"
            "<!-- body -->\n\n%s\n\n"
            "<!-- end -->\n\n---\n"
            % (slug, n, meta["title"], slug, meta["category"],
               MONTHS[int(m) - 1], int(d), y, len(body.split()),
               meta["title"], meta["description"], body))
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    return len(order)


BLOCK = re.compile(
    r"<!--\s*post:([a-z0-9-]+)\s*-->.*?"
    r"<!--\s*title\s*-->\s*(.*?)\s*"
    r"<!--\s*description\s*-->\s*(.*?)\s*"
    r"<!--\s*body\s*-->\s*(.*?)\s*"
    r"<!--\s*end\s*-->", re.S)


def set_field(front, key, value):
    """Replace one frontmatter line, keeping the rest byte for byte."""
    pattern = re.compile(r"^%s:.*$" % re.escape(key), re.M)
    if not pattern.search(front):
        raise SystemExit("no %s in the frontmatter" % key)
    # Quote only what would actually break the reader. An internal colon is
    # fine and the existing files are full of them; a value that STARTS with a
    # quote or a bracket is not, because the frontmatter reader strips those.
    if re.match(r"^['\"\[]", value) or value.endswith(":"):
        value = "'%s'" % value.replace("'", "''")
    return pattern.sub(lambda m: "%s: %s" % (key, value), front, count=1)


def import_(path, dry_run=False):
    with open(path, encoding="utf-8") as fh:
        doc = fh.read()
    blocks = BLOCK.findall(doc)
    if not blocks:
        raise SystemExit("no posts found: are the <!-- post:slug --> markers intact?")

    known = set(slugs())
    seen, changed = set(), []
    for slug, title, desc, body in blocks:
        if slug not in known:
            raise SystemExit("unknown post '%s'. Slugs are fixed; they are live URLs." % slug)
        if slug in seen:
            raise SystemExit("'%s' appears twice" % slug)
        seen.add(slug)
        if "—" in title + desc + body:
            raise SystemExit("'%s' has an em dash in it, which fails the build" % slug)

        meta, front, old_body = read(slug)
        front = set_field(front, "title", title.strip())
        front = set_field(front, "description", desc.strip())
        new = "---%s---\n\n%s\n" % (front, body.strip())
        path_out = os.path.join(POSTS, slug + ".md")
        with open(path_out, encoding="utf-8") as fh:
            if fh.read() == new:
                continue
        changed.append(slug)
        if not dry_run:
            with open(path_out, "w", encoding="utf-8") as fh:
                fh.write(new)

    missing = known - seen
    if missing:
        print("note: left alone, not in the file: %s" % ", ".join(sorted(missing)))
    return changed


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    mode = args[0] if args else ""
    if mode == "export":
        target = args[1] if len(args) > 1 else DEFAULT
        print("wrote %d posts to %s" % (export(target), target))
    elif mode == "import":
        if len(args) < 2:
            raise SystemExit("import needs the path to the edited file")
        dry = "--dry-run" in sys.argv
        done = import_(args[1], dry)
        verb = "would rewrite" if dry else "rewrote"
        print("%s %d posts%s" % (verb, len(done), (": " + ", ".join(done)) if done else ""))
        if done and not dry:
            print("now run: python3 scripts/build_post.py %s" % " ".join(done))
            print("then:    python3 scripts/build_listings.py")
    else:
        raise SystemExit(__doc__)
