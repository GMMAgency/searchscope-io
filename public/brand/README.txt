Searchscope — brand / logo assets
===================================

The wordmark is outlined from Geist Mono 500, so these render identically
everywhere with no font installed.

LOCKUP (mark + wordmark)
  searchscope-logo.svg          recolorable (uses currentColor; defaults to ink #1B1A17).
                                In the app set CSS `color` on it to recolor.
  searchscope-logo.png          ink #1B1A17, transparent, 320px tall — for LIGHT backgrounds.
  searchscope-logo-on-dark.svg  off-white #F4F1EC — for DARK backgrounds (login page).
  searchscope-logo-on-dark.png  off-white, transparent, 320px tall.

MARK ONLY (viewfinder, square — favicons, avatars, collapsed nav)
  searchscope-mark.svg / .png            ink (light backgrounds)
  searchscope-mark-on-dark.svg / .png    off-white (dark backgrounds)

APP ICON (mark on a dark rounded tile — PWA / favicon / app launcher)
  searchscope-appicon.svg
  searchscope-appicon-512.png

Tip: prefer the .svg files (infinitely scalable). Use searchscope-logo.svg and
control the colour with CSS `color`; use the -on-dark files where you can't.
