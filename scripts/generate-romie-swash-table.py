#!/usr/bin/env python3
"""Write the Romie swash-capital table into public/download-page.html.

The download page greets the client as "Hi Keith!" in Romie italic, with the
first letter of the name drawn as Romie's decorative (swash) capital.

Those capitals live in the italic face's "ss01" stylistic set, but the set is
contextual: Romie only swaps a capital when it is followed by a letter, and it
picks a different swash for some pairs so the flourish does not run into a tall
next letter (K before "a" is not K before "e"; E before "l" stays plain). A page
cannot apply ss01 to one letter and still give it that context, and applying it
to the whole name would swash other letters too. Every swash glyph has its own
private-use code point, so the page inserts that code point directly, chosen
from this table: capital -> {"d": default code point, "x": {next letter: code
point}}, where 0 means "keep the plain capital". Capitals Romie has no swash
for (C, O, S, U) are left out. ROMIE_SWASH_REACH gives, per swash code point,
how far its flourish reaches left of the letter (in em, from the glyph's
outline), so the page can leave exactly that much room after "Hi".

The table is read from the font itself with HarfBuzz, so re-run this after
replacing public/fonts/romie-italic.woff2:

    python3 scripts/generate-romie-swash-table.py          # rewrite the page
    python3 scripts/generate-romie-swash-table.py --check  # exit 1 if stale

Needs: pip install fonttools brotli uharfbuzz
"""
import io
import json
import re
import string
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / 'public' / 'fonts' / 'romie-italic.woff2'
PAGE = ROOT / 'public' / 'download-page.html'
START, END = '/* ROMIE_SWASH:start (scripts/generate-romie-swash-table.py) */', '/* ROMIE_SWASH:end */'
# What can follow the first letter of a first name.
NEXT = string.ascii_lowercase


def build_table():
    tt = TTFont(str(FONT))
    tt.flavor = None
    raw = io.BytesIO()
    tt.save(raw)
    order = tt.getGlyphOrder()
    code_of = {}
    for cp, name in tt.getBestCmap().items():
        code_of.setdefault(name, cp)
    font = hb.Font(hb.Face(hb.Blob(raw.getvalue())))
    upem = tt['head'].unitsPerEm
    glyf = tt['glyf'] if 'glyf' in tt else None
    cff = tt['CFF '].cff.topDictIndex[0].CharStrings if 'CFF ' in tt else None
    glyph_name = {cp: name for name, cp in code_of.items()}

    def reach(cp):
        name = glyph_name[cp]
        if glyf is not None:
            g = glyf[name]
            xmin = getattr(g, 'xMin', 0) if g.numberOfContours else 0
        else:
            bounds = cff[name].calcBounds(cff)
            xmin = bounds[0] if bounds else 0
        return round(max(0, -xmin) / upem, 3)

    def first_glyph(text, features):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(font, buf, features)
        return order[buf.glyph_infos[0].codepoint]

    table = {}
    for cap in string.ascii_uppercase:
        plain = first_glyph(cap, {})
        picks = {}
        for nxt in NEXT:
            glyph = first_glyph(cap + nxt, {'ss01': True})
            picks[nxt] = 0 if glyph == plain else code_of.get(glyph, 0)
        if not any(picks.values()):
            continue
        counts = {}
        for cp in picks.values():
            counts[cp] = counts.get(cp, 0) + 1
        default = max(counts, key=lambda cp: (counts[cp], cp))
        table[cap] = {'d': default, 'x': {n: cp for n, cp in picks.items() if cp != default}}
    codes = sorted({cp for e in table.values() for cp in [e['d'], *e['x'].values()] if cp})
    return table, {str(cp): reach(cp) for cp in codes if reach(cp) > 0}


def render(tables):
    table, reach = tables
    return (START + '\n    var ROMIE_SWASH = ' + json.dumps(table, separators=(',', ':')) + ';' +
            '\n    var ROMIE_SWASH_REACH = ' + json.dumps(reach, separators=(',', ':')) + ';\n    ' + END)


def main():
    page = PAGE.read_text(encoding='utf-8')
    pattern = re.compile(re.escape(START) + r'.*?' + re.escape(END), re.S)
    if not pattern.search(page):
        sys.exit(f'Markers not found in {PAGE}')
    updated = pattern.sub(lambda _: render(build_table()), page)
    if '--check' in sys.argv:
        if updated != page:
            sys.exit('download-page.html swash table is out of date: run this script')
        print('Swash table is up to date.')
        return
    PAGE.write_text(updated, encoding='utf-8')
    print(f'Wrote the swash table into {PAGE.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
