# Image licence register (internal)

**Internal document. Do not publish or link from the website.**
Last reviewed: 2026-10-09.

**Status (2026-10-09):** the owner has confirmed that image provenance is not
treated as a current implementation blocker. Images are kept as-is, and this
register is kept for internal records. Temporary and AI imagery must still
never be presented as completed SilverScape customer projects.

This register covers every image file the website ships. The single source of
truth for photo metadata is `src/content/mediaCatalog.ts`; keep this file in
sync whenever an image is added, replaced or removed.

## Categories

| Category | Meaning | Launch rule |
|----------|---------|-------------|
| **A** | Owned by SilverScape (own photos, or design work assigned to SilverScape) | OK once ownership is confirmed in writing |
| **B** | Licensed stock with a recorded licence (here: CC0 1.0 public-domain dedication) | OK as temporary illustration; never as SilverScape work |
| **C** | Licensed or generated **temporary** imagery (here: AI-generated during development) | Temporary only. Generator terms must be confirmed; replace before or soon after launch |
| **D** | Unknown source or rights | **DO NOT LAUNCH UNTIL LICENCE/RIGHTS ARE VERIFIED OR IMAGE IS REPLACED.** |

No image is currently in category D. No image on the site is presented as a
completed SilverScape project. Photo-bearing pages say so: the portfolio
carries a note, portfolio entries are labelled "Project type", and the Terms
(section 3, "Information on this website") state that photos are
illustrative and are not photos of SilverScape projects.

### Rules that apply to every row

- **Never** describe a B or C image as SilverScape's work, a customer's
  property, or a "before/after".
- **Never** add a customer name, city or project detail to a B or C image.
- For B (CC0): CC0 waives copyright only. It does not grant trademark,
  property or personality rights. None of these images show identifiable
  people, logos or addresses; re-check that before reusing one elsewhere.
- Save a screenshot or PDF of each B source page (showing the CC0 licence) in
  the business's records. Source pages can change.
- For C (AI-generated): these were generated with the image tool built into
  the Cursor coding assistant during development. **The generator's
  commercial-use terms were not recorded at the time.** Before launch, confirm
  those terms allow commercial use on a business website. Copyright in purely
  AI-generated images is unsettled in Canada, so SilverScape may not be able
  to stop others copying them. If the terms can't be confirmed, treat these
  images as category D and replace them.

## Brand assets

| Filename | Pages | Source | Owner | Licence | Commercial use | Attribution | isPlaceholder | replacementRequired | Cat. |
|----------|-------|--------|-------|---------|----------------|-------------|---------------|---------------------|------|
| `src/assets/logo.png` | Not displayed (brand original) | Supplied with the initial site (commit dccc1e8) | Presumed SilverScape: **owner to confirm** | Owned, or by designer assignment | Yes, if owned | None | No | No | A (pending confirmation) |
| `src/assets/brand-mark.png` | Header and footer logo on every page | Cropped from `logo.png` | Same as logo | Same as logo | Same as logo | None | No | No | A (pending) |
| `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-512.png` | Browser tab, home-screen icon, structured-data logo | Derived from `logo.png` | Same as logo | Same as logo | Same as logo | None | No | No | A (pending) |

**Owner action:** confirm in writing who designed the logo, and that
SilverScape owns it or holds a licence covering web, print and vehicle use. If
a designer made it, get a copyright assignment or written licence.

## Photographs

`Pages` reflects each image's `intendedUse` in the catalog. Each file ships in
2–3 responsive widths under `src/assets/media/<id>-<width>.jpg`; the
originals are in `media-src/<id>.jpg`.

| Filename (id) | Pages | Source | Owner | Licence | Commercial use | Attribution | isPlaceholder | replacementRequired | Cat. |
|---------------|-------|--------|-------|---------|----------------|-------------|---------------|---------------------|------|
| `backyard-deck-patio` | Homepage hero; default social share image | AI-generated (development) | Unclear (see C rules) | Generator terms (unrecorded) | **Unverified** | None | Yes | Yes, P1 | C |
| `brick-patio-dining` | Homepage division card: Outdoor | rawpixel 5920752 | Public domain | CC0 1.0 | Yes | Not required (recorded: rawpixel) | Yes | Yes, P1 | B |
| `bathroom-glass-shower` | Homepage division card: Interior | rawpixel 5919752 | Public domain | CC0 1.0 | Yes | Not required (rawpixel) | Yes | Yes, P1 | B |
| `sod-pallets-driveway` | Homepage division card: Sod | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P1 | C |
| `sod-roll-closeup` | Homepage sod section | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P1 | C |
| `sod-farm-field` | Sod ordering hero; sod share image | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P1 | C |
| `front-yard-walkway` | Outdoor Services hub hero | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `main-floor-oak` | Interior Renovations hub hero | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `front-yard-garden-beds` | Service: Landscaping | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `backyard-firepit-pergola` | Service: Yard Transformations; homepage card | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `yard-regrading-swale` | Service: Grading & Drainage | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `raised-composite-deck` | Service: Decks; homepage card | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `horizontal-privacy-fence` | Service: Fences | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `herringbone-driveway` | Service: Interlocking; homepage card | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `patio-dining-lounge` | Service: Patios & Outdoor Living | StockSnap F1AFB213E7, Jay Mantri | Public domain | CC0 1.0 | Yes | Not required (Jay Mantri) | Yes | Yes, P2 | B |
| `striped-lawn` | Service: Lawn Maintenance | rawpixel 6023660 | Public domain | CC0 1.0 | Yes | Not required (rawpixel) | Yes | Yes, P2 | B |
| `covered-porch` | Service: Custom Exterior | StockSnap CLD6T4J9VZ, Joshua Ness | Public domain | CC0 1.0 | Yes | Not required (Joshua Ness) | Yes | Yes, P2 | B |
| `sod-laying` | Service: Sod Installation | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `living-room-oak-floor` | Service: Flooring; homepage card | rawpixel 5926843 | Public domain | CC0 1.0 | Yes | Not required (rawpixel) | Yes | Yes, P2 | B |
| `vinyl-plank-install` | Service: Vinyl & Laminate | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `marble-tile-shower` | Service: Tile; homepage card | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `bathroom-floating-vanity` | Service: Bathrooms; homepage card | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `curbless-shower-tub` | Service: Showers & Tubs | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `white-oak-vanity` | Service: Vanities & Fixtures | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P2 | C |
| `side-yard-walkway` | Portfolio: Landscaping concept | StockSnap 4B5743BFCF, Jay Mantri | Public domain | CC0 1.0 | Yes | Not required (Jay Mantri) | Yes | Yes, P3 | B |
| `sod-new-lawn` | Portfolio: Sod concept | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P3 | C |
| `cedar-deck-steps` | Portfolio: Decks concept | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P3 | C |
| `cedar-fence-gate` | Portfolio: Fences concept | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P3 | C |
| `slab-patio-seating` | Portfolio: Interlocking concept | StockSnap ZIU3AC46X4, Matt Bango | Public domain | CC0 1.0 | Yes | Not required (Matt Bango) | Yes | Yes, P3 | B |
| `spa-bathroom-tub` | Portfolio: Bathrooms concept | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P3 | C |
| `hardwood-empty-room` | Portfolio: Flooring concept | rawpixel 5903577 | Public domain | CC0 1.0 | Yes | Not required (rawpixel) | Yes | Yes, P3 | B |
| `sage-tile-shower` | Portfolio: Tile concept | AI-generated | Unclear | Unrecorded | **Unverified** | None | Yes | Yes, P3 | C |

**Totals:** 34 photos. 9 are category B (CC0) and 23 are category C
(AI-generated). Plus 2 brand files and 3 icons in category A, pending the
owner's confirmation. **All 34 photos are placeholders and need replacing.**
Priority P1 means before launch, P2 within the first weeks, and P3 as real case
studies are published. Size requirements are in `docs/LAUNCH_CHECKLIST.md`
section 3.

### CC0 source pages

- rawpixel: <https://www.rawpixel.com/image/5920752>, <https://www.rawpixel.com/image/5919752>,
  <https://www.rawpixel.com/image/6023660>, <https://www.rawpixel.com/image/5926843>,
  <https://www.rawpixel.com/image/5903577>
- StockSnap: <https://stocksnap.io/photo/patio-backyard-F1AFB213E7>,
  <https://stocksnap.io/photo/walkway-stones-4B5743BFCF>,
  <https://stocksnap.io/photo/house-home-CLD6T4J9VZ>,
  <https://stocksnap.io/photo/patio-furniture-ZIU3AC46X4>

Files under `.media-work/` are working copies from the image search and are
not shipped. Candidate images there that aren't listed above are **not used**
on the site.

## When a real SilverScape photo replaces a row

1. Confirm who took it. If it wasn't the owner or an employee, get written
   permission or an assignment from the photographer.
2. If the photo shows a customer's property, get the customer's written
   permission to publish it. Don't show house numbers, licence plates, faces
   or anything that identifies the address without that permission.
3. Update the catalog entry (`isPlaceholder: false`, `source: "silverscape"`)
   and change this row to category A.
