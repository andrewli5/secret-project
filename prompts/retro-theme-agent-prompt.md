# Retro theme for the dashboard: implementation brief

You're working in `secret-project`, a personal dashboard SPA (React 19, TypeScript, Vite 7, Mantine 8.3, Yarn 4 with the node-modules linker). Your job is to add a second visual theme, **retro**: a hard-edged, bevelled, late-90s desktop look defined by the design spec in the appendix. The whole UI must switch between today's look and the retro look by changing **one config value**. Ship with retro active. When today's look is selected, it must render exactly as it does now.

Work autonomously through to a verified result. Don't commit, push, or open a PR unless the user asks. Don't edit this prompt file (`prompts/retro-theme-agent-prompt.md`).

---

## 1. What exists today (verified against the repo)

**Target device.** Samsung Galaxy Tab A9+: touch only, no mouse.

- **Screen:** 1280×800 CSS px in landscape at a device pixel ratio of 1.5 (1920×1200 physical). The browser viewport is that full size only when the dashboard runs fullscreen; in regular Chrome, the browser's own bars take some height.
- **Type scaling:** `index.html` sets `html { font-size: clamp(11px, 1.25vw, 20px) }`. So 1rem = 16px at 1280px wide, rem sizes scale with width above 880px, and below 880px the root is fixed at 11px.
- **Usage:** a glanceable single-screen display, read from across a room, with no scrolling.

**Files that matter**

- `src/main.tsx`: renders `<App />`.
- `src/App.tsx`: imports `@mantine/core/styles.css` and Geist (weights 300–600), then renders `<MantineProvider theme={theme} defaultColorScheme="dark">` containing `DaylightBackground` and a full-height flex container around the router. That container has `overflow: hidden`, and so does the `Box` in `src/pages/Home.page.tsx`.
- `src/theme.ts`: exports `GEIST_FONT`, `NEUMORPHIC_RAISED` and `NEUMORPHIC_RAISED_SUBTLE` (soft-shadow `CSSProperties` that are spread into inline styles), plus the Mantine theme (Geist font; global `Text` styles force `textTransform: 'lowercase'`). `.storybook/preview.tsx` imports `theme` too. There are no stories, so don't make Storybook theme-aware, but keep it compiling.
- `src/components/DaylightBackground.tsx`, `src/daylightBackground.ts`, `src/styles/daylight.css`: a time-of-day gradient sky, twinkling stars, and a breathing glow. Tested in `src/daylightBackground.test.ts`.
- `src/components/Dashboard/Dashboard.tsx`: a Mantine `Grid` with two `span={6}` columns. The left column holds `Clock` and `Weather`; the right holds `TrainTimes` and `ChineseOfTheDay`. There are no breakpoints.
- `src/components/WidgetCard.tsx`: the shared card, a Mantine `Card` (which has `overflow: hidden`). It has `radius="lg"`, the neumorphic shadow as an inline style, and an optional title bar inside a `Card.Section` filled with `titleBg` (`title`, `titleBg`, `c`, `icon`, `rightIcon`). Only `TrainTimes` passes a title today. `Weather` (lines 62, 83) and `TrainTimes` (line 360) also pass their own `Card.Section`s as children. `Card.Section` needs a Mantine `Card` ancestor and pulls itself outward with negative margins equal to the card padding.
- `src/components/Figure.tsx`: a big numeric figure with a dimmed unit, using `tabular-nums`. It sets `fontFamily: GEIST_FONT` **inline** (lines 21, 32).
- `Clock` has a date line (2.5rem), the time as **H:MM** (10rem figure with AM/PM), and a week strip of seven `DayCell`s. Today's cell is a filled circle (`borderRadius: '50%'`, Clock.tsx:28). The component re-renders every second, but the digits change once a minute.
- `Weather` has these parts:
  - condition text (3rem); the longest is code 99, "Severe thunderstorm with hail", in `src/assets/weather/weatherText.ts`
  - the temperature (12rem, unit `°f`)
  - feels/high/low rows using violet/red/blue light-variant `Badge`s with `ff="system-ui"` (line 141), inside a translucent `Paper` with `radius="lg"` and `backdropFilter: blur(14px)`
  - a 400px weather icon at 10% opacity drifting behind everything (`weather.css`, a 40s animation)
  - `Skeleton`s while loading
  - red error text (`c="red"`, no `role`) on failure

  `WeatherForecast` is commented out and unused; leave it alone, including its `bdrs` and `ff`.
- `TrainTimes` has these parts:
  - **Title bar:** the stop name on the MBTA route color (Commuter Rail purple `#80276C`, white text) with the MBTA icon. While the static data is loading, or if it fails, there is no stop name and so no title bar.
  - **Per direction:** a route badge in the route color plus the destination (`truncate`), then 1–3 `TrainTimeSlot`s (`Paper`, `radius="lg"`). A slot shows one of three things:
    - a live countdown such as "28m 23s", updating every second, with a green light "live" `Badge` and a pulsing Mantine `Indicator`
    - a scheduled clock time with a blue light "scheduled" badge
    - "no trains"

    The badges and "no trains" use `ff="system-ui"` (lines 119, 129, 140, 227).
  - **Loading and errors:** `Skeleton` slots with `radius="lg"` while loading (line 261), and error text with `role="alert"`.
  - **`ServiceAlertIcon`, the app's only interactive control:** an `UnstyledButton` (`aria-label="Service alert"`, `aria-expanded`, icon `c="yellow.3"`, 24px) that toggles a controlled Mantine `Tooltip` on tap. The tooltip closes on an outside click (`useClickOutside`) and on Escape, and opens on hover for mouse pointers only.
- `ChineseOfTheDay`: large CJK characters (sized with container queries), a "chinese of the day" label, pinyin, English, and an example sentence. Pinyin sets `fontFamily: GEIST_FONT` inline (lines 84, 96). The characters use a CJK font stack; keep that stack, because IBM Plex has no CJK glyphs. Entries rotate daily from `src/data/chineseWords.ts`; the longest English line is "It's raining today, remember to bring an umbrella."
- `src/components/LastUpdatedTime.tsx` is unused; leave it alone.

**Baseline at 1280×800.** This was measured with today's theme, live data, at one moment. All four cards are 592px wide. The left column spans y≈79–692 and the right column y≈79–721, so the content uses about 640px of the 800px height and is vertically centered.

**Tooling**

- `yarn typecheck`
- `yarn lint`: ESLint with the mantine and jsx-a11y configs, plus Stylelint `standard-scss`, which requires short hex such as `#fff`
- `yarn test`: Vitest with Testing Library on jsdom
- `yarn build`
- `yarn format`: Biome with 2 spaces, single quotes, and a 100-column line width

CI runs `yarn install --immutable`, so add dependencies with `yarn add` so they land in `yarn.lock`.

A preview config exists at `.claude/launch.json` (name `dashboard`, port 5173). The app is served at `http://localhost:5173/secret-project/` because of the Vite `base`. Data comes from `https://api-v3.mbta.com` and `https://api.weather.gov`.

**Tests that pin UI behavior** live in `src/components/TrainTimes/TrainTimes.test.ts`. They query:

- `getByText('live')`, `getAllByText('scheduled')`, and `getByText('no trains')`
- countdown digits such as `'02'` as an element's own text, with the unit in a child element
- `getByRole('button', { name: 'Service alert' })`
- the tooltip text, which must be absent from the DOM while closed and visible after a tap. That test renders inside `MantineProvider` with `env: 'test'`, which turns off transitions and portals.

So keep those strings as their own text nodes and keep Mantine `Tooltip`, which unmounts when closed. Keep the button's accessible name too. CSS `text-transform` is fine; changing those strings in the DOM is not.

The local `CLAUDE.md` says this is a touch-only device: never rely on hover alone, and anything shown on hover must also open on tap.

---

## 2. The theme switch

1. **One typed value selects the theme.** Create `src/uiTheme.ts` exporting:

   ```ts
   export type UiTheme = 'neumorphic' | 'retro';
   export const UI_THEME: UiTheme = 'retro';
   ```

   Changing that line to `'neumorphic'` must restore today's UI exactly. No other edit may be needed: no CSS import to comment out, no environment variable, no second flag. Don't add a runtime toggle, URL parameter, or settings UI.

2. **`neumorphic` is today's look, pixel for pixel.** That means:
   - the same Mantine theme object and `defaultColorScheme="dark"`
   - Geist and the lowercase `Text` transform
   - `DaylightBackground`, the neumorphic shadows, and the drift, breathe, and twinkle animations
   - the same DOM structure and the same computed styles

   You may move code to make room for the switch, but don't restyle or "improve" this theme. That includes enlarging its 24px alert button and adding reduced-motion handling. A purely non-visual accessibility fix in shared code is acceptable if you list it in your report.

3. **Keep theme branching to a few places.** Here is the expected shape; adjust it if the code argues otherwise:
   - **A per-theme definition** (`Record<UiTheme, …>`) selected in `App.tsx`. It holds the Mantine theme, the provider's color-scheme props, any `cssVariablesResolver`, and the background component.
   - **A `UiThemeContext` and `useUiTheme()` hook whose default value is `UI_THEME`.** Components and tests that render without the provider then keep working.
   - **A `data-ui-theme` attribute on `<html>`, set synchronously in `main.tsx` before `createRoot().render`.** Don't set it in an effect, because that causes a flash of the wrong theme. Scope every retro-only CSS rule under it, so retro CSS can't leak into neumorphic even though both stylesheets are always imported. Mantine declares its variables on `:root[data-mantine-color-scheme='…']`, which is (0,2,0), and a bare `[data-ui-theme='retro']` selector at (0,1,0) loses to it. Use `:root[data-ui-theme='retro']` loaded after Mantine's CSS, or set Mantine variables only through the retro `cssVariablesResolver`. Don't set the same variable both ways.
   - **Branch inline styles in TSX, not CSS.** No stylesheet can override inline styles without `!important`: the `NEUMORPHIC_*` spreads, `bg=`, `ff=`, `style={{ fontFamily: GEIST_FONT }}`, `backdropFilter`. So under retro the primitive must not pass them at all. Don't use `!important`. Radius props are different: they only set `--*-radius` variables, so `radius={0}` or a scoped rule works.
   - **Structural differences live in shared primitives.** These are the window title bars, the background, the live ticker, the weather icon's placement, the alert button and tooltip skin, the skeletons, the today marker, and the fonts on `Figure` and pinyin. Put them in `WidgetCard` and a few small sibling components, so the widgets keep their data logic and stay mostly theme-agnostic. Don't put theme checks in hooks, clients, or data code.
   - **`Card.Section` children.** In retro, either keep WidgetCard's root a Mantine `Card`, render the window's well inside it, and neutralize `--card-padding` so sections don't bleed over the bevels; or replace those `Card.Section`s with a small theme-aware body primitive that renders exactly today's `Card.Section` under neumorphic.
   - **Make a third theme a compile error until it's complete.** Use `Record<UiTheme, …>` maps or exhaustive `switch` statements with a `never` check.

4. **Fonts.** Import both themes' fonts statically. A browser downloads an `@font-face` file only when that face is used, so the inactive theme's fonts cost only CSS bytes. Don't add lazy-loading machinery. With `UI_THEME = 'neumorphic'`, no Retro font file may be requested.

5. **Tests.** Both theme values must pass `yarn typecheck && yarn lint && yarn test && yarn build`.
   - Run the existing `TrainTimes` tests under both themes, for example with `describe.each` over a wrapper that sets the context. Keep `env: 'test'` where the existing test uses it.
   - Under both themes, add tests for the alert: an outside `mouseDown` closes an open tooltip, Escape closes it, `pointerEnter` with `pointerType: 'mouse'` opens it, and `pointerType: 'touch'` doesn't.
   - Add a test that the context default equals `UI_THEME`.
   - Leave `UI_THEME = 'retro'` when you're done.

---

## 3. Retro theme: applying the spec to this dashboard

The design spec in the appendix is authoritative for the retro look: its tokens, identity, surfaces, type families, motion, and design limits. Its layout section, however, describes a long marketing page with a launch window, guestbook, comparison rows, and footer. This is a single-screen dashboard with four widgets. **Map the spec's visual language onto those four widgets. Don't add sections, sample data, fake quotes, prices, or decorative app names.** Where this section conflicts with the spec's illustrative details, this section wins. The spec itself says the project's stack and content take precedence.

The user asked for a "pixelated, retro, Windows XP style" feel. The spec describes the classic grey-bevel look, which is closer to Windows 95/2000 or XP's "Windows Classic" theme than to XP's blue Luna theme. Follow the spec: no Luna blue gradients and no rounded title bars. Treat "pixelated" as crisp 1–2px bevels, square corners, a fine tiled desktop pattern, hard offsets, and stepped motion. It does **not** mean a pixel font for reading text, which the spec forbids.

### 3.1 Tokens, CSS, and Mantine overrides

- **Tokens.** Define the spec's `--dp-*` tokens with the spec's values in a retro stylesheet such as `src/styles/retro.css`, scoped as described in §2. Write colors in the short hex form stylelint requires (`#000`, `#fff`, `#60f`, `#ff0`, `#00f`); they are the same colors. Don't disable `color-hex-length`.
- **Units.** Keep the rem-based scaling. Apply type sizes in rem at the 16px base (`16px → 1rem`, `15px → 0.9375rem`, `12px → 0.75rem`). Keep borders, bevels, offsets, and pane insets in whole `px` so edges stay crisp.
- **Type size floor.** The spec's 16/15/12px type tokens are for *new* chrome: title-bar captions and `Retro Mono` labels. Use the 12px label size only for incidental metadata that isn't needed at a glance. Never set existing text below its current size.
- **Mantine retro theme.** Set `defaultRadius: 0`, use the retro font families, and drop the global lowercase transform. Override `--mantine-color-dimmed`: Mantine's light `dimmed` (`#868e96`) is 3.3:1 on white and 2.2:1 on the window grey.
- **Color scheme.** Retro is a light theme. Give it both `forceColorScheme="light"` and `defaultColorScheme="light"`. Mantine applies `forceColorScheme` only after first paint, and the first frame uses `defaultColorScheme` or a stored value. Keep neumorphic's provider props exactly as they are.
- **Zero rounded corners.** These explicit radii override `defaultRadius`:
  - `radius="lg"` on `WidgetCard` (WidgetCard.tsx:30), `TrainTimeSlot` (TrainTimes.tsx:111), the weather `Paper` (Weather.tsx:128), and the TrainTimes `Skeleton`s (TrainTimes.tsx:261)
  - `borderRadius: '50%'` on `DayCell` (Clock.tsx:28)
  - Badge, whose CSS defaults to a 1000px radius, so give it radius 0 explicitly

  `Tooltip` and the Weather `Skeleton`s follow `defaultRadius`. Ignore the unused `WeatherForecast`.
- **Hard-coded fonts.** These also override the theme:
  - `Figure.tsx` (lines 21, 32) and the pinyin in `ChineseOfTheDay.tsx` (lines 84, 96) set `fontFamily: GEIST_FONT` inline.
  - The badges and "no trains" use `ff="system-ui"`: TrainTimes.tsx lines 119, 129, 140, 227 and Weather.tsx line 141.

  Route these through the theme so retro uses the Retro aliases and neumorphic keeps Geist and `system-ui` exactly.

### 3.2 Fonts

- **Packages.** Add `@fontsource/host-grotesk`, `@fontsource/ibm-plex-sans`, and `@fontsource/ibm-plex-mono` with `yarn add`; all three are on npm at 5.3.0. Load only the weights you use.
- **Alias names.** Bind the fonts to the spec's alias names so the tokens work verbatim. Write your own `@font-face` rules with `font-family: 'Retro Display'`, `'Retro Interface'`, and `'Retro Mono'`, each with `src: url('@fontsource/<pkg>/files/<file>.woff2')`. Vite 7 resolves bare package paths inside CSS `url()` and emits hashed assets; this was tested with this repo's Vite. Take the file names from `node_modules/@fontsource/<pkg>/files/`. Include the latin and latin-ext subsets with their `unicode-range`s, because pinyin needs latin-ext (ā, ǐ, ǚ…).
- **Keep the existing CJK stack** for Chinese characters.
- **Ticking numerals.** Only the live countdown changes every second; the clock's digits change once a minute.
  - First load the face: `await document.fonts.load('800 160px "Retro Display"', '0123456789')` must return a non-empty array. Otherwise you'd be measuring the fallback font.
  - Then measure in a span that copies the countdown figure's computed font and `tabular-nums`. Compare the widths of "0000" through "9999".
  - If the widths differ, set only the countdown figures in IBM Plex Sans with `tabular-nums`.
  - Never set the 10rem clock in Plex Mono: "12:59 PM" would be about 574px, wider than the Clock window's content box.

### 3.3 Windows, surfaces, and color

Each widget becomes a window:

- **Frame:** a `--dp-color-window` grey frame with a `--dp-border-frame` raised bevel (white top-left, `--dp-color-bevel-dark` or black bottom-right).
- **Offset:** a hard black offset with zero blur, such as `4px 4px 0 #000`. Leave room for it so the `overflow: hidden` wrappers don't clip it.
- **Title bar:** navy (`--dp-color-titlebar`) with white text naming the real content group.
- **Reading areas:** white inset wells with the bevel reversed.

Use square corners everywhere. Windows get no soft shadows, `backdrop-filter`, translucency, or gradients.

**Title bars, every window, every state.** In retro, all four title bars are navy, render in the loading, error, and loaded states, and have the same fixed height of at least 48px. The bar's height must not depend on whether a service alert is present (alerts poll every 10s) or whether the stop name has arrived; render an empty caption until it does. Window titles are new strings in retro only; neumorphic renders exactly what it renders today. Move existing labels into title bars rather than repeating them.

Here is a suggested mapping. Adapt it once you see it rendered, and report what you changed.

| Widget | Title bar | Body |
|---|---|---|
| Clock | Either "Clock" with the body date kept, or the date moved into the title bar (legible from across the room) with the body date line and its divider dropped. The second option frees about 60px of height. | **The spec's yellow "launch window."** A `--dp-color-highlight` field holds the time in the display face, heavy weight, at its current 10rem size. The week strip is a row of small square cells, with today as a purple (`--dp-color-accent`) pressed cell with white text. That's the spec's "comparison selection uses a purple pressed key." The other cells stay flat so the strip doesn't look like a tappable picker. |
| Weather | "Weather" | **The spec's "monitor-like facts panel."** Temperature and condition go in a white inset well. Feels, high, and low become compact rows with `Retro Mono` labels, as black text; if you keep a color cue, put it on a swatch with at least 3:1 contrast rather than on the text. The weather icon sits small in an inset picture window with reserved dimensions. The condition text is right beside it, so give it `alt=""` rather than "weather icon"; that's a non-visual change, so list it. For retro, drop the 400px drifting backdrop icon and the blurred panel. Render the `°f` unit uppercase with CSS. |
| Train times | The stop name plus the MBTA icon (`alt=""`), on navy like the others. In retro, WidgetCard ignores `titleBg` and `c`. | **Direction rows in white wells.** The MBTA route color stays on the per-direction route badges, where it identifies the real line. Slots become inset wells. "live" gets the ticker from §3.5, and "scheduled" gets a flat label. The service alert button sits in the title bar as a raised key (§3.6). |
| Chinese of the day | The existing "chinese of the day" text, uppercased with CSS, moved from the body into the bar, so it isn't shown twice | **A readme-style white reading well.** The characters stay large. |

- **Desktop background.** For retro only, replace the daylight sky with a fine tiled grey desktop pattern in pure CSS. Use a checker with **2px cells** (a 4×4px tile) built from gradients or an inline SVG data URI. 1px cells land on 1.5 device pixels at DPR 1.5 and blur into a grey smear. Your preview probably runs at DPR 2, where that problem doesn't show, so reason it from the numbers. You can follow the fixed-background-component pattern of `DaylightBackground`. Optionally add one flat teal (`--dp-color-desktop`) region behind a group of windows. Keep it static: no gradient sky, stars, or breathing glow in retro.
- **Emphasis colors.** Yellow, pink, purple, and teal are local accents on flat fields. Use each one deliberately rather than painting every window a different color.
- **Contrast.** Treat 4.5:1 as the floor for **all** text, including large text: the rem root shrinks to 11px in portrait, so text that counts as "large" at 1280 isn't large there. Icons, the ticker arrow, and focus indicators need at least 3:1 against what's next to them. Precomputed ratios for the tokens (✗ = below 4.5):

| text ↓ / bg → | window `#d4d4d4` | white | yellow `#ff0` | teal `#008080` | pink `#ff00b8` | navy `#000080` | purple `#60f` | MBTA `#80276c` |
|---|---|---|---|---|---|---|---|---|
| black | 14.2 | 21.0 | 19.6 | **4.4 ✗** | 5.9 | 1.3 ✗ | 3.0 ✗ | 2.4 ✗ |
| white | 1.5 ✗ | n/a | 1.1 ✗ | 4.8 | **3.5 ✗** | 16.0 | 7.0 | 8.7 |
| bevel `#808080` | 2.7 ✗ | 3.9 ✗ | 3.7 ✗ | 1.2 ✗ | 1.1 ✗ | 4.1 ✗ | 1.8 ✗ | 2.2 ✗ |
| link `#00f` | 5.8 | 8.6 | 8.0 | 1.8 ✗ | 2.4 ✗ | 1.9 ✗ | 1.2 ✗ | 1.0 ✗ |

  In short: use white text on teal, purple, navy, and MBTA purple; black text on pink, yellow, grey, and white. Never use `#808080` for text. Define a secondary-text ("dimmed") color, such as `#404040` or darker on grey or white, and check it against every background it lands on.

  The table covers only the tokens. Some Mantine palette colors survive from today's code, and under the light scheme they fail. Replace them in retro:
  - **Error text** (`c="red"`, which becomes `#fa5252`): 3.3:1 on white and 2.2:1 on grey. Use ink, or a dark red such as `#a00000` (8.4:1 on white, 5.7:1 on grey).
  - **Light-variant badges** (green "live", blue "scheduled", red/blue/violet feels, high, and low): roughly 2.2–4.4:1. Use black on white, grey, or yellow, or white on navy or purple.
  - **The alert glyph** (`yellow.3`, `#ffe066`): about 1.1:1 on a grey key. Make it black (14.2:1).

  Re-check any other Mantine color you leave on screen.

### 3.4 Layout and sizing

- **Primary target: 1280×800 with no vertical or horizontal scroll, and nothing clipped or truncated.**
  - **Budget the height.** Three new title bars plus bevels and insets cost roughly 100–150px. Take that space from padding, gaps, the outer margin, and duplicated labels (see the mapping). Don't take it from the glanceable type: the clock, temperature, countdowns, CJK characters, and destinations.
  - **Height worst cases:** weather code 99 ("Severe thunderstorm with hail" at 3rem wraps), the longest Chinese entry, a service alert present, three slots in each direction, and the loading and error layouts.
  - **Check 1280×720 as well.** Prefer space savings that make it fit too. At 720, nothing may clip or overlap; report any vertical overflow in px.
- **Width.** You may give windows small horizontal offsets or unequal spans (for example 7/5) for the spec's offset composition, but nothing may overlap, clip, or ellipsize. Worst-case width content:
  - the clock at "12:59 PM" in the retro display face
  - a three-digit temperature ("100 °F") beside the feels/high/low rows
  - three live slots with three-digit minutes, like "128m 05s" (minutes aren't capped at 59)
  - scheduled times like "12:59 PM"
  - the route label "Framingham/Worcester Line" and the destination "South Station"
  - the service alert key visible
  - a long Chinese word and sentence

  Three three-digit countdowns already overflow in today's theme. Fitting them takes priority, so in retro only you may reduce the three-slot countdown size, the slots' horizontal padding, and the gap between minutes and seconds. Keep the one- and two-slot sizes and the clock and temperature sizes. Don't use spans that make either column narrower than its hero figure needs.
- **Narrow widths.** In retro, use two columns only at Mantine `md` (62em = 992px) and up, e.g. `span={{ base: 12, md: 6 }}`. The portrait tablet (800×1280) then stacks into one column. Media-query `em`s ignore the html font size, so `sm` (768px) would keep the portrait tablet in two cramped columns.
  - **Above 880px**, rem scales with width, so a layout that fits at 1280 fits proportionally, apart from fixed-px bevels and insets.
  - **Below 880px**, rem is fixed at 11px. There, and only there, the hero figures (clock, temperature, countdowns, CJK) may scale with their window, e.g. `font-size: min(10rem, 24cqi)` inside an inline-size container, and train slots may wrap.
  - **Stacked layouts may scroll vertically,** but must never overflow horizontally at 360px and up.

  Neumorphic keeps `span={6}` at every width.
- **Display treatment.** Apply the spec's "opening" style (uppercase, tightly tracked, close-set) to title bars and hero figures only. Don't shrink the clock to the spec's 62–94px range at ≥992px; on this dashboard the existing large sizes *are* the content.

### 3.5 Motion and states

- **Live ticker.** For retro only, replace the pulsing `Indicator` on "live" with the spec's ticker: a small arrow in its own `aria-hidden` element that shifts in two small steps per `--dp-motion-ticker-cycle` (1s), using `steps()` timing.
  - **Drawing the arrow:** use a CSS triangle or a tiny inline SVG. The ▶, ►, and → glyphs aren't in the Fontsource latin or latin-ext subsets and would fall back to whatever font the device has. If you must use text, use › or ».
  - **The text:** "live" stays still and remains its own text node.
  - **Reduced motion:** under `prefers-reduced-motion: reduce`, the ticker doesn't animate.
- **Skeletons.** Retro skeletons are flat, static inset wells with the same reserved dimensions. Mantine's `Skeleton` pulses an opacity overlay by default, so pass `animate={false}` or render a plain inset-well `Box` of the same size, and check that its `::before` and `::after` overlays don't cover the well styling.
- **Errors.** Keep the existing message text and TrainTimes' `role="alert"`, shown inside the window as an inset well in the error colors from §3.3. Don't make it a modal or a fake system dialog. Weather's error has no role today; adding `role="alert"` is a non-visual fix that applies to both themes, so list it.
- **No other decorative animation in retro.**

### 3.6 Touch, controls, and accessibility

- **Alert button as a raised key.** At rest the bevel is raised. On `:active`, and while `aria-expanded="true"`, the bevel reverses and the key shifts by 1px.
  - **Glyph:** black.
  - **Hit area:** at least 48×48 CSS px, inside the fixed-height title bar from §3.3. The visible key can be smaller (36–40px) with padding around it, but the hit area must not reach past the bar's edges, because the Card clips there.
  - **Focus:** use `:focus-visible`, not `:focus`, so a tap doesn't leave a ring. Draw a 1px dotted `#000` rectangle inset inside the grey key, plus a 2px solid `#fff` outline offset 2px outside it (16:1 on navy). The selector must be more specific than Mantine's `.mantine-focus-auto:focus-visible`.
  - **Keep the behavior:** tap toggle, close on outside click, close on Escape, mouse-only hover, the accessible name, and `aria-expanded`.
- **Tooltip.** Keep Mantine `Tooltip` in controlled mode. Restyle it via `classNames` or `styles` as a square retro tooltip: highlight or window background, a 1px black border, black text, a hard offset, and no rounded arrow. It must be readable (computed font size at least 16px) and stay inside the viewport on the tablet.
- **Hover.** Put every retro `:hover` rule, such as the spec's blue link hover, inside `@media (hover: hover)`. Nothing may depend on hover.
- **No fake window controls.** Don't render minimize, maximize, or close buttons, or any other furniture that looks tappable but does nothing; on a touchscreen it invites taps. A title-bar icon is fine. Mark decorative icons `aria-hidden` or `alt=""`.
- **Crisp at DPR 1.5.** Use whole-px widths and zero-blur shadows, and draw 1px bevel lines with `border` rather than 1px box-shadows where you can.

---

## 4. Don't

- **Data:** don't change data clients, polling intervals, routes, stop/route IDs, or the data shown.
- **Strings:** don't change existing user-facing strings in the DOM; CSS `text-transform` is fine. Retro-only window titles and moving an existing label into a title bar are allowed (§3.3).
- **Dependencies:** don't add any beyond the three font packages, including testing or browser tooling such as Playwright.
- **Deletions:** don't delete `LastUpdatedTime`, the commented-out `WeatherForecast`, or the daylight code, which neumorphic still uses.
- **Spec "Design limits":** no distressed textures, sepia, rounded cards, soft shadows, blur, or simulated OS behavior.
- **Shortcuts:** no `!important`, and no disabled lint rules.

---

## 5. How to work and verify

Before every measurement, assert that `innerWidth` and `innerHeight` match the viewport you intended. Preview panes can report 0×0 until they're resized, and an emulated size can be cleared between turns. Save scratch files such as snapshots, scripts, and screenshots outside the repo, in a temp or scratch directory.

1. **Baseline first.**
   - Run `yarn typecheck`, `yarn lint`, and `yarn test`, and note anything that already fails.
   - Start the preview and set the viewport to 1280×800.
   - Freeze motion with `document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0; })`.
   - Save a JSON snapshot. For every element in `body *` (Mantine portals included), record:
     - the tag, class, and rounded rect
     - the computed `font-family`, `font-size`, `font-weight`, `text-transform`, `letter-spacing`, `color`, `background-color`, `box-shadow`, `border-radius`, `border`, `padding`, `animation-name`, and `backdrop-filter`

     Also record the `<html>` attributes and the `:root` values of `--mantine-color-dimmed`, `--mantine-radius-default`, and `--mantine-font-family`.
   - Take a screenshot. This is your neumorphic reference.
2. **Refactor for the switch with no visual change.** Add the theme plumbing with only `neumorphic` wired up. Take the snapshot again and diff it with a script. Every difference must be explained either by data (slot count, text length, clock digits) or by the new `data-ui-theme` attribute; anything else is a regression. Tests must pass.
3. **Build the retro theme** through the shared primitives.
4. **Verify retro in the browser.**
   - **Viewports:** 1280×800 (primary), 1280×720, 800×1280, and widths of 1050, 760, 480, and 360px.
   - **No page scroll:** `document.documentElement.scrollWidth <= innerWidth` everywhere, and `scrollHeight <= innerHeight` at 1280×800. Report the remaining vertical slack in px.
   - **No clipping:** the page-level check can't see clipping. The app root, the Home box, and every Card have `overflow: hidden`, badges ellipsize, and the destination is `truncate`d. With the worst-case content from §3.4 forced, require an empty result from:

     ```js
     [...document.querySelectorAll('body *')].filter(e => {
       const s = getComputedStyle(e);
       return (s.overflowX !== 'visible' || s.overflowY !== 'visible' || s.textOverflow === 'ellipsis')
         && (e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1)
         && e.getBoundingClientRect().width > 0;
     })
     ```

     Also check that every slot's figure rect lies inside its slot's rect, and that window rects stay within the viewport without intersecting each other.
   - **States:** force the worst cases from §3.4 (both height and width) with temporary code changes. Do the same for loading and error, live, scheduled, "no trains", and an open alert. Revert every hack afterwards and confirm with `git diff`.
   - **Style sweeps:** run these over `body *` in the loaded, skeleton, error, and alert-open states. The tooltip renders in a portal outside `#root`.
     - computed `border-radius` is `0px` everywhere, `::before` and `::after` included
     - the distinct computed `font-family` values are only the three Retro aliases and the CJK stack
     - no `box-shadow` has a non-zero blur
     - `backdrop-filter` is `none`
     - the only running `animation-name` is the ticker's
   - **Fonts:** don't use `document.fonts.check()`; it returns true for families that don't exist.
     - After `await document.fonts.ready`, and before forcing any loads, run `[...document.fonts].filter(f => f.family.replace(/["']/g, '').startsWith('Retro ')).map(f => [f.family, f.weight, f.status])`. Each alias and weight you rely on must show a `loaded` face.
     - The `.woff2` requests must return 200.
     - The clock, temperature, a countdown, the pinyin, a title bar, and a badge must compute to the Retro families.
     - After `yarn build`, `grep -o 'url([^)]*woff2)' dist/assets/*.css` must show `/secret-project/assets/…` URLs.
   - **Numerals:** sample a live countdown's seconds-figure width once a second for 10 seconds. It must not change.
   - **Interaction:** with the alert open, the button's rect is at least 48×48. The tooltip's computed font size is at least 16px, and its rect lies within the viewport. Tab to the button and check the focus treatment.
   - **Reduced motion:** emulate `prefers-reduced-motion: reduce` and confirm the ticker stops.
5. **Flip `UI_THEME` to `'neumorphic'`.**
   - Repeat the step 1 snapshot and diff it against the baseline.
   - Confirm that no Retro font file is requested.
   - Flip back to `'retro'`.
6. **Run the checks.** Run `yarn format`, then `yarn typecheck && yarn lint && yarn test && yarn build` with each theme value.

**Tooling fallbacks.** Use one of these when your browser tool can't do something directly, and name it in your report:

- **Blocking or throttling hosts:** temporarily make a fetcher return `new Promise(() => {})` for loading, or throw for errors, then revert.
- **Pressing Tab:** find the focus rule in the CSSOM (a `selectorText` containing `:focus-visible` for the alert button). For a screenshot, temporarily apply the same styles through a class.
- **Emulating reduced motion:** confirm that a `CSSMediaRule` for `prefers-reduced-motion: reduce` sets `animation: none` on the ticker, or use headless Chrome with `--force-prefers-reduced-motion`.
- **Screenshot files or DPR 1.5:** use headless Chrome if it's installed, e.g. `--headless=new --window-size=1280,800 --force-device-scale-factor=1.5 --screenshot=<path outside the repo>`.
- **DPR and hover:** record `devicePixelRatio` and `matchMedia('(hover: hover)').matches`. If they aren't 1.5 and `false`, say that DPR and hover behavior weren't verified as on the device.

If you have no browser tooling at all, say so plainly and list what you couldn't verify rather than implying it was checked.

---

## 6. Report back

- How to switch themes: the exact file and line.
- Files added or changed, one line each.
- Your final widget-to-window mapping, plus any deviations from this brief or the spec and the reason for each. Include any non-visual fixes in shared code.
- What you verified (viewports, states, both themes, checks), which fallbacks you used, and what you couldn't verify.
- The 1280×800 and 1280×720 vertical slack for retro.
- Screenshot paths for retro and neumorphic at 1280×800, or a statement that you couldn't produce files.

---

## Appendix: retro design spec (authoritative for the retro theme's look)

<retro_design_spec>
<task>
Apply this visual style to the user's existing project. Inspect and preserve its stack, copy, routes, and behavior. Follow existing component and styling conventions. Treat framework, library, and page examples in these design instructions as illustrations; they do not require a stack change or new sections. Scope changes to the user's requested work.

Keep controls keyboard accessible, focus visible, and text legible. Preserve reading order, responsive behavior, and reduced-motion preferences. Verify actual states at the rendered width. The user's stack and content take precedence over illustrative implementation details.
</task>

<design-system>
# Retro

## Identity

Use an overcrowded desktop of offset windows, hard bevels, grey frames, white reading wells, and bright yellow, navy, pink, and teal fields. The familiar window furniture gives the page structure. Large contemporary sans headings keep the main message readable within it.

## Layout

Arrange the wide page on a twelve-column grid with windows that begin and end on different columns. Open with a broad yellow launch window beside a compact monitor-like facts panel. A bright pink strip can span beneath them.

Continue with overlapping readme-like text, a capability window with its own side panel, and a teal field of smaller editorial windows. A setup sequence can use numbered steps and a segmented progress motif. Benefits can occupy yellow; genuine quotations can appear as guestbook entries inside a pink patterned region. Optional comparisons use horizontal rows within a shared window. Close with a smaller dialog above a broad footer with folder-like link headings.

Keep the reading order clear through the offset composition. The brief decides which windows and content types exist; decorative application names, sample interface values, prices, and quotes are optional.

## Typography

Use Host Grotesk for heavy display headings, bound to "Retro Display". Use IBM Plex Sans for reading and interface labels, bound to "Retro Interface", and IBM Plex Mono for compact metadata, bound to "Retro Mono". The opening is uppercase, tightly tracked, and close-set, scaling from 62px to 94px on wider layouts. Keep paragraphs at a comfortable reading size. Do not turn all text into a tiny pixel font.

## Color and surfaces

Grey forms the window frame. Use white for inset reading areas, black for ink, navy for title bars, and teal for selected desktop regions. Yellow, purple, and pink carry strong local emphasis. Links can use a saturated blue hover state.

A fine tiled grey desktop can show between the windows. Use square corners, hard black offsets, and white top-left bevels opposed by dark bottom-right edges. Inset wells reverse the edge treatment. Keep large color fields flat and avoid soft shadows or blurred overlays.

## Components

Buttons resemble raised keys with clear labels and squared bevels. Pressing moves the key slightly and reverses its depth. Preserve a visible keyboard focus treatment.

Window title bars can name real content groups. Any close, minimize, folder, or navigation symbol presented as a control must have a real action and accessible label; otherwise make the ornament clearly decorative. Optional comparison selections use a purple pressed key, with a featured marker kept separate. Disclosures retain recognizable open/close behavior inside their window.

## Images

Use natural-color photographs in small inset picture windows. Keep crops direct and subjects recognizable. If genuine author or customer portraits exist, use compact square avatars beside their attribution and reuse each person's image consistently. Portraits and guestbook entries are not required. Reserve dimensions and supply meaningful alternative text.

## Motion

Controls use immediate pressed feedback. A decorative ticker arrow can shift in two small steps at a slow repeating cadence; keep the text beside it still. Disable that repetition for reduced motion. Do not simulate loading, error dialogs, or system alerts unless they describe a real state.

## Responsive behavior

At 1050px, tighten side panels and move comparison details beneath their main row. At 760px, stack the opening, readme, and major windows while retaining small horizontal offsets. Editorial windows can become image-and-text rows; steps and guestbook entries stack. At 480px, stack editorial contents, features, and benefits, and reduce decorative offsets. Facts and footer groups can remain in two columns. Keep bevels crisp and labels comfortably tappable.

## Design limits

Avoid distressed vintage textures, sepia filters, rounded modern cards, and fake operating-system behavior. Preserve the desktop's compact density without forcing tiny type, overlapping essential content, or horizontal page overflow.

## Authoritative tokens

| CSS variable | Value |
| --- | --- |
| --dp-color-window | #d4d4d4 |
| --dp-color-ink | #000000 |
| --dp-color-bevel-dark | #808080 |
| --dp-color-bevel-light | #ffffff |
| --dp-color-accent | #6600ff |
| --dp-color-highlight | #ffff00 |
| --dp-color-link-hover | #0000ff |
| --dp-color-desktop | #008080 |
| --dp-color-emphasis | #ff00b8 |
| --dp-color-titlebar | #000080 |
| --dp-typography-interface | "Retro Interface", sans-serif |
| --dp-typography-display | "Retro Display", sans-serif |
| --dp-typography-mono | "Retro Mono", monospace |
| --dp-typography-body | 16px |
| --dp-typography-supporting | 15px |
| --dp-typography-label | 12px |
| --dp-typography-body-leading | 1.4 |
| --dp-spacing-pane-inset | 5px |
| --dp-spacing-item-gap | 10px |
| --dp-radius-control | 0 |
| --dp-border-frame | 2px |
| --dp-border-rule | 1px |
| --dp-motion-ticker-cycle | 1s |
</design-system>
</retro_design_spec>
