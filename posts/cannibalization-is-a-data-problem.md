---
title: Cannibalization is a data problem
description: Most cannibalization advice comes down to which pages feel similar. The real thing has a fingerprint in your search data: one query, several URLs, impressions split and click-through down on all of them.
pubDate: 2026-06-04
author: Ray
aliases: ['cannibalisation-is-a-data-problem']
category: Search Data
draft: false
---

Keyword cannibalization gets discussed like a content-strategy opinion. These two pages feel similar, so perhaps merge them. That's how you end up consolidating pages that were fine and missing the ones quietly costing you.

It's visible in your search data, page by page and query by query, as long as you pull the right two dimensions together.

## What it actually looks like

Real cannibalization has a fingerprint. Two or more URLs ranking for the same query, impressions split between them, and click-through depressed on all of them. Neither page wins cleanly because Google keeps swapping which one it shows, and the rotation costs you positions.

Pages being about the same topic isn't the tell. The tell is one query showing impressions against several URLs, positions that wobble as Google alternates between them, and a combined click-through lower than a single consolidated page would earn.

You can see it in a Search Console export if you pull query and page together, group by query, then look for queries mapping to more than one URL with meaningful impressions on each.

```
query: "seo audit checklist"
  /blog/seo-audit-checklist      pos 8.4   impr 5,200   clicks 110
  /guides/seo-audit              pos 11.2  impr 3,900   clicks 41
```

Two URLs, one intent, positions wobbling, click-through split between them. That's a candidate you can act on, not because the titles look alike but because the data shows two pages dividing one intent.

## Why it stays unfixed

Not because it's mysterious. Because finding it across a real site means pivoting a large query-by-page export, spotting the split-intent pattern, ruling out the false positives (a brand term legitimately showing your homepage and a product page is fine), then ranking what's left by what it actually costs you.

For one query that's five minutes. For ten thousand queries every week it's nobody's job, so it doesn't happen. Software is good at finding the fingerprint across a whole dataset and scoring each instance by recoverable clicks. The call at the end still needs a person.

## The fix depends on intent

Consolidate when both pages chase the same intent, redirecting the weaker into the stronger and merging whatever's worth keeping. Differentiate when the intent is subtly different, re-targeting each page so they stop overlapping. Or leave it alone, which is the right answer more often than people expect, particularly on brand queries where two of your own URLs genuinely deserve to be there.

Find it in the data, then decide with your head rather than by eyeballing which pages look like duplicates. [Searchscope catches cannibalization](/platform/analyzers/cannibalization/) automatically, scored by recoverable clicks, with the consolidation drafted.
