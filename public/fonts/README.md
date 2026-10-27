# Site typography

The editorial design pairs Newsreader (Latin display text) with Noto Serif SC
(Chinese headings), Satoshi (interface and body), and JetBrains Mono (code).
All fonts are hosted locally and use `font-display: swap`.

New font sources are the official Google Fonts repositories:

- [Newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader)
- [Noto Serif SC](https://github.com/google/fonts/tree/main/ofl/notoserifsc)
- [JetBrains Mono](https://github.com/google/fonts/tree/main/ofl/jetbrainsmono)

Their original OFL license files are included in this folder. The WOFF2 files
are subsets of those fonts. The Chinese display font is fixed at weight 500;
it contains GB2312 level-one Chinese characters, Chinese punctuation, and
additional Chinese characters used by the site at the time of generation.
Uncovered characters fall back to the configured system serif fonts. The
Latin fonts retain their variable axes, Latin characters, and common symbols.

Existing Satoshi font files are retained from the original theme.
