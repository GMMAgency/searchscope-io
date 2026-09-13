---
title: Page Experience
description: What's broken on your pages, what it still earns, and how to fix it. Technical health, index coverage and speed in one instrument, with Google's own answer next to ours.
pubDate: 2026-09-02
author: Ray
category: Product Updates
draft: false
---

What's broken on your pages, what it still earns, and how to fix it. Three questions that usually live in three tools, now in one instrument.

Nineteen checks run over the crawl: broken links, redirect chains, canonical loops, pages missing from the sitemap, hreflang that doesn't point back. Each finding carries the traffic the page still earns, so a broken link on a page nobody visits doesn't sit above one on a page earning thousands. The register also shows the checks that found nothing, ticked off. A clean check is worth seeing, and hiding it makes an empty list look like a list that never ran.

## Index coverage, from Google rather than from guesswork

We look for each page in Google Search first. If it appears there, it's indexed. If it doesn't, we ask Google about it directly.

You get an answer per page: indexed, crawled but not indexed, discovered but not crawled, or unknown to Google. Each one says what it means in plain words, because "Discovered, currently not crawled" is Google's phrasing rather than an explanation. Pages that stop appearing in search are re-checked overnight, so the answer stays current without anyone asking for it.

## Why the three belong together

Core Web Vitals and Lighthouse scores run over the same page list, with each failing check spelled out, on one page or a section or everything the crawl found. They live here rather than in a tool of their own because these three fail together far more often than they fail alone. A page that loads badly gets crawled less, a page that isn't crawled can't be indexed, and a page that isn't indexed earns nothing however good it is. That chain is obvious when you read them side by side and easy to miss across three separate tools.

Page Experience is live for everyone, under Instruments. There's more on the [platform](/platform/) page.
