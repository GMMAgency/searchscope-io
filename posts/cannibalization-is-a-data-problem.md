---
title: Cannibalization is a data problem
description: Cannibalization isn't something you should diagnose because two pages look similar. The useful signal is in query-by-page search data, where multiple URLs are competing for the same intent.
pubDate: 2026-06-04
author: Ray Olaibi
aliases: ['cannibalisation-is-a-data-problem']
category: Search Data
draft: false
---

Cannibalization gets overdiagnosed.

Two pages cover a similar topic, someone decides they're competing, and the recommendation is to merge them. Sometimes that's right. Sometimes the pages serve different intents and were doing perfectly well until someone "fixed" them.

The better place to start is the search data.

## Look for the query-to-page pattern

The pattern we care about is one query getting meaningful impressions across more than one URL, with Google switching between them over time. If positions wobble and neither page owns the query cleanly, you have something worth investigating.

That is different from simply finding two pages that mention the same subject.

Pull query and page together in Google Search Console and the problem becomes much easier to see:

```
query: "seo audit checklist"
  /blog/seo-audit-checklist      pos 8.4   impr 5,200   clicks 110
  /guides/seo-audit              pos 11.2  impr 3,900   clicks 41
```

That doesn't prove cannibalization on its own, but it's a good candidate. One query is splitting impressions across two URLs, and the next job is to work out whether those pages are genuinely competing for the same intent.

## The hard part is doing it at scale

For one query, this is easy. Across thousands of queries, every week, it becomes a data problem.

You need to find the repeated query-to-page pattern, remove the obvious false positives and then prioritize what's left. Brand queries are a good example of why judgment still matters. Seeing a homepage and product page together might be exactly what you want.

Software is useful for finding the pattern across the full dataset. It can surface the cases, estimate the recoverable opportunity and save someone from living in pivot tables. The decision at the end still belongs to a person.

The scoring matters as well. Ten weak overlaps with almost no impressions should not sit above one query where two valuable pages keep trading places. If the tool can't tell you which cases are likely to matter, it has only automated the export.

## Fix the intent, not the spreadsheet

If two pages genuinely chase the same intent, consolidate them and redirect the weaker URL where appropriate. If they serve different intents, make that difference clearer. If Google is showing two useful pages for good reason, leave them alone.

That's the part that often gets missed. Cannibalization detection should narrow the investigation, not make the decision for you.

[Searchscope catches cannibalization](/platform/analyzers/cannibalization/) from query-by-page data, scores the opportunity and drafts the consolidation work where it makes sense.
