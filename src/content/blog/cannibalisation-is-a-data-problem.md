---
title: Cannibalisation is a data problem
description: Most cannibalisation advice is just vibes (merge the pages that feel similar). But it's visible in the data, page by page, query by query. Here's how to actually find it.
pubDate: 2026-06-04
author: Ray
tags: ['Search data']
draft: false
---

Keyword cannibalisation gets talked about like a content-strategy opinion: these two pages *feel* similar, so maybe merge them. That's how you end up consolidating pages that were fine and missing the ones quietly bleeding you.

Cannibalisation isn't a vibe. It's a measurable pattern in your Search Console data. If you read it properly, it tells you exactly which pages are competing, and which to keep.

## The signal

True cannibalisation has a fingerprint: **two or more URLs ranking for the same query, with the impressions split and the click-through depressed on all of them.** Neither page wins cleanly because Google keeps swapping which one it shows, and the rotation costs you positions.

The tell isn't "these pages are about the same topic." It's:

- the same query showing impressions against multiple URLs,
- positions that wobble as Google alternates between them, and
- a combined CTR lower than a single consolidated page would earn.

## Reading it from your search data

You can see this in the Search Console performance export if you pull query **and** page together. Group by query, then look for queries mapping to more than one URL with meaningful impressions on each:

```
query: "seo audit checklist"
  /blog/seo-audit-checklist      pos 8.4   impr 5,200   clicks 110
  /guides/seo-audit              pos 11.2  impr 3,900   clicks 41

→ two URLs, one intent, positions wobbling, CTR split
```

That's a cannibalisation candidate you can act on, not because the titles look alike, but because the data shows two pages dividing one intent.

## Why it's hard by hand

The reason cannibalisation stays unfixed isn't that it's mysterious. It's that finding it across a real site means pivoting a large query×page export, spotting the split-intent patterns, ruling out the false positives (a brand term legitimately showing your homepage and a product page is fine), and then ranking the fixes by what actually costs you clicks.

Do that for one query and it's a five-minute job. Do it for ten thousand queries every week and it's nobody's job, so it doesn't happen.

This is squarely co-pilot work. Software is excellent at finding the split-intent fingerprint across the whole dataset and scoring each instance by recoverable clicks. The strategist then makes the call that needs judgement: consolidate, differentiate, or leave it alone.

## The fix is a decision, not a merge

Once you've found a real instance, you have three options, and the right one depends on intent:

- **Consolidate** when both pages chase the same intent: redirect the weaker into the stronger and merge the useful content.
- **Differentiate** when the intent is subtly different: re-target each page so they stop overlapping.
- **Leave it** when both URLs legitimately deserve to rank (brand queries, for example).

Cannibalisation is a data problem with a decision at the end. Find it in the data, then decide with your head, not by eyeballing which pages *feel* like duplicates.

See it in the product: [how Searchscope catches cannibalisation](/workspaces), scored, with the consolidation drafted.
