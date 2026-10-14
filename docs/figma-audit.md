# Figma audit

How this design system compares with busy.studio's Figma designs, the design it was built from: the foundations, every component, and patterns in the designs that have no component yet. Use it as the checklist when changing a token or a component, and update its row in the same pull request.

**Direction**: Figma is the reference until the design system matches it (stage A under "Design system" in the website's [roadmap](https://github.com/tedx-amsterdam/tedx-amsterdam-website/blob/main/docs/roadmap.md#design-system)). After that this repository is the source of truth and Figma the original reference: new components and layouts are designed here and shown in Storybook (decision 27 in the website's [decisions](https://github.com/tedx-amsterdam/tedx-amsterdam-website/blob/main/docs/decisions.md)).

**Checked**: October 2026, version 1.3.1; foundations updated for the next release, against the latest round of designs on the Figma page `review` (labelled "review", June 2025). Every page was looked at in Figma itself; text, color, size and spacing values come from a `.fig` export of the file, counting only layers that are visible (each home section hides copies of other sections' layers, which otherwise skew the numbers). The components were compared with their Storybook stories. How the website's pages compare is in its [design audit](https://github.com/tedx-amsterdam/tedx-amsterdam-website/blob/main/docs/design-audit.md).

**Scope**: styles and structure, not content. The designs carry the 2025 edition's theme and copy ("Amsterdam Reimagined", its dates and the condensed type in the mobile hero); those change every edition and are left out.

**Status**: ✅ matches, ⚠️ differs, ❌ missing, — not in the designs.

## Figma frames

Desktop frames are 1400 wide; only home has a mobile design (375 wide). Open a frame with `https://www.figma.com/design/ZziwjkbIiAxIio7Pxuu8dA/TEDxAmsterdam--website?node-id=<id>`.

| Page | Frame | Node id |
| --- | --- | --- |
| Home | `hero-desktop` | `6258-3449` |
| Home, mobile | `hero-mobile` | `6258-7028` |
| Speakers | `speakers-desktop` | `6258-7234` |
| Speaker detail | `speaker-desktop` (two variants) | `6258-6682`, `6258-6821` |
| Team | `team-desktop` and `content` | `6258-4886`, `6258-5247` |
| Partners | `partners-desktop` | `6258-5606` |
| Gallery | `gallery-desktop` | `6258-5806` |
| Blog | `blog-desktop` (two variants) | `6258-5266`, `6258-5439` |
| Impact Program | `impact program-desktop` | `6258-6033` |
| Impact teaser | `Frame 163` | `6258-6987` |

There is no design for an events overview, About Us or Event Program in the latest round. The `.fig` export is kept by the website's maintainer and stays out of git: it is 441 MB and holds images whose rights are not cleared.

## Foundations

| Area | Figma | Design system | Status |
| --- | --- | --- | --- |
| Colors | Red `#EB0028`, black, white; text in white at 100, 70, 60, 50 and 40%; warm tone `#FF7919` | Red, black, white, white at 70, 60, 50 and 40% (`--tedx-white-*`); the warm tones `--tedx-orange-amber` (`#FF7919`) and `--tedx-orange-glow`. `--tedx-orange` (`#F36C21`) is the brand book value and unused in the designs | ✅ |
| Content column | 1080px column: 12 columns, 20px gutters, 160px side margins at 1400px; header and footer in the same column | `--content-max` (1080px), `--gutter-wide` (160px), `--grid-columns` (12), `--grid-gap` (20px); `NavigationBar` sits in the column | ✅ |
| Mobile grid | 6 columns, 15px gutters and margins | `--grid-columns-m` (6), `--grid-gap-m` and `--gutter-m` (15px) | ✅ |
| Display headline (home hero) | Bold 115px, line height 0.9, −3% | `--text-display`: 115px, line height 0.9 (`--lh-display`) | ✅ |
| Page title | Bold 80px, line height 1.1, no tracking, uppercase | `--text-h1`: 80px, line height 1.1; no tracking (`--ls-normal`) | ✅ |
| Section heading | Bold 48px, line height 1.1, −3%, uppercase, often with words in red | `--text-h2`: 48px, line height 1.1, with `--ls-display`; `Accent` sets words in red | ✅ |
| h3 and h4 | Bold 32px (1.2, −3%) and Bold 20px (1.2), uppercase | `--text-h3`, `--text-h4` | ✅ |
| Body | Regular 20px: 1.3 in long text, 1.2 in intros next to titles | `--text-body` (1.3) for long text, `--text-intro` (1.2) for intros | ✅ |
| Small text | Regular 16px (1.2) for meta, Regular 14px for navigation and card excerpts, Regular 12px for fine print, Light 12 and 16px for names on photos | `--text-meta` (16px), `--text-small` (14px), `--text-caption` (12px), `--weight-light` | ✅ (Arimo has no light weight, so it shows 400 where Helvetica is missing) |
| Tags and links | Bold 14px uppercase, line height 1 | `--text-tag` (line height 1.2) | ✅ |
| Mobile type | Title 55px (0.9), headings 30px, stat numbers 60px, names Bold 16px | `--fs-h1-m` (55px) with `--lh-display`, `--fs-h2-m` (30px), `--fs-stat-m` (60px), `--fs-h4-m` (16px), `--fs-tag-m` (12px) | ✅ |
| Glows | Red and orange shapes with a 100 to 200px blur, including 220px bars along both edges of every page and a red to black footer | Gradient tokens (`--glow-edge`, `--glow-corner`, `--glow-radial`) that approximate them | ⚠️ |
| Radius | 10px on buttons; everything else square | `--radius-button` 10px; `--radius-card` 12px | ✅ (`--radius-card` is only used by `Modal` and `Toast`) |
| Lines | 1px white at 40% between rows, 1px white on inputs | `--border-hairline` | ✅ |

## Design system components

| Component | Where in Figma | What differs | Status |
| --- | --- | --- | --- |
| `NavigationBar` | Every page | Links in Regular 14px, sentence case, 32px apart, the active one red; logo 225px wide; logo and links in the 1080px column; no border below. The optional CTA stays, in uppercase. Mobile, which Figma only shows for home, follows decision 28 in the website: a 52px bar with the CTA visible and a "Menu" button, every control with a 44px tap area | ✅ |
| `Logo` | Header, footer (full column width) | Same artwork and colors | ✅ |
| `Button` | Hero, event info, CTA blocks, forms | Figma: fixed size from the grid, 74 to 80px high (66px on mobile), label Bold 14px uppercase; red (primary) and white (forms). Component: the same heights as `sm`, `md` and `lg`, uppercase labels, 12 × 30px padding; the width comes from the layout | ✅ |
| `ArrowLink` | "Check out our past speakers", "Watch the talk", "View all", "Join us", "Learn more" | Uppercase Bold 14px with the long arrow (a 22px line and a filled head) | ✅ |
| `Tag` | Eyebrows above headings ("Speakers", "About", "Topic") | White eyebrow, Bold 14px uppercase | ✅ |
| `Tag` with `dot` | Meta lines: a red dot before a name, date or venue | Red dot, then the text in Regular 16px, sentence case, white or `muted` | ✅ |
| `Badge` | Labels on photos: "Event", "Soon", "News", "Podcast", "Sign-ups closed" | Square black label, white Bold 14px uppercase, 10px padding | ✅ |
| `SectionHeader` | Above most sections | White eyebrow, 48px uppercase heading with `Accent` for red words, white text 32px below it, uppercase arrow link 24px below that | ✅ |
| `Stat` | Home ("2009", "20K") | Bold 80px without tracking, white label in the columns 3:2 of a five-column block. A line between stats in a list is left to the page | ✅ |
| `MediaCard` | Upcoming events (home), blog | Photo as a lazy `<img>` with `imageAlt`, `Badge` in the corner, title as h4 uppercase, excerpt Regular 14px at 40%, date as a `Tag` meta line | ✅ |
| `Tabs` | Team filter (All, Exec, Communications, …) | Bold 14px uppercase, 40px apart, active one red, the others white at 50%, above a hairline | ✅ |
| `Input` | Newsletter and partner forms | Underlined field with a small "Email" label | ✅ |
| `Checkbox` | Consent line under each form | Small square box with small text | ✅ |
| `SocialLink` | Footer, speaker detail | Icon and label | ✅ (no Facebook icon) |
| `Accent` | Red words in headings ("Our **speakers**", "How to become **a partner**") | Wraps words in the accent color | ✅ |
| `Accordion`, `Breadcrumb`, `Modal`, `Toast`, `Select`, `Radio`, `RadioGroup`, `CheckboxGroup`, `Textarea`, `FormField` | Not in the latest designs | Designed by the design system itself | — keep |

## Patterns in Figma without a component

Patterns that appear on two or more pages belong in this design system (decision 23 in the website's decisions); one-page patterns stay in the website until a second page needs them.

| Pattern | Pages | Notes | Belongs in |
| --- | --- | --- | --- |
| Page hero: title (last word red) with an "About …" text and optional arrow link beside it | Speakers, team, partners, gallery, blog, impact | Copied in the website's `/speakers` and `/events` today (`PageHero` in stage B) | Design system |
| Speaker card: photo on red (upcoming) or grayscale (past), talk title, red dot with name, role at 40%, optional "Watch the talk" link | Home, speakers | The website's `SpeakerCard` leads with the name instead of the talk title | Design system |
| Person card: photo, name Bold uppercase, role or description; team photos are grayscale with a LinkedIn link on hover | Team, impact (pioneers) | | Design system |
| CTA band: red full-width section with a heading, text and the email form | Home (newsletter), partners, impact | The footer has the same form on black | Design system |
| Detail rows: label and value separated by lines | Home (event date, time, place), impact (criteria), timetable | Values Bold 32px red, labels Regular 20px | Design system |
| Carousel arrows (← →) under a row of cards | Home (speakers, upcoming events), gallery | | Design system |
| Footer: menu, social links, newsletter form, logo at full column width, legal line, red to black glow | Every page | The website's `SiteFooter` has the legal line and socials | Website (one footer) |
| Logo wall: partner logos in white on black | Partners | | Website until a second use |
| Gallery albums: title, "View all", a row of photos | Gallery, home (snapshots, on red) | | Website until a second use |
| Timetable | Home | Rows with time, session (red), description and speaker portraits | Website |
| Video embed ("Watch the talk") | Speaker detail | YouTube | Website |
| List with red bullets | Impact | | Website |
| Edge glow background | Every page | See Foundations | Design system (layout) |
