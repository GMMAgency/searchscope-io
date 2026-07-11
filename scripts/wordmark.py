"""
Outline a text string from a font to clean per-glyph SVG path data using
fontTools (reliable, unlike opentype.js toPathData which emits NaN on some
glyphs). Reads a .woff/.ttf directly. Emits JSON: {paths:[...], bbox:{...}}.

Usage: python3 scripts/wordmark.py <font> <text> <sizePx> <trackingEm>
Coordinates: size px, baseline at y=0, y-down (SVG), ascenders negative.
"""
import sys, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

font_path, text, size, track_em = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
font = TTFont(font_path)
upem = font["head"].unitsPerEm
scale = size / upem
track = track_em * size
cmap = font.getBestCmap()
gs = font.getGlyphSet()
hmtx = font["hmtx"]

pen_x = 0.0
paths = []
bx1 = by1 = 1e9
bx2 = by2 = -1e9
for ch in text:
    gname = cmap[ord(ch)]
    glyph = gs[gname]
    advance = hmtx[gname][0] * scale
    transform = (scale, 0, 0, -scale, pen_x, 0)  # scale + flip-y + translate-x

    sp = SVGPathPen(gs)
    glyph.draw(TransformPen(sp, transform))
    paths.append(sp.getCommands())

    bp = BoundsPen(gs)
    glyph.draw(TransformPen(bp, transform))
    if bp.bounds:
        x1, y1, x2, y2 = bp.bounds
        bx1, by1, bx2, by2 = min(bx1, x1), min(by1, y1), max(bx2, x2), max(by2, y2)

    pen_x += advance + track

print(json.dumps({"paths": paths, "bbox": {"x1": bx1, "y1": by1, "x2": bx2, "y2": by2}}))
