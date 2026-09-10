---
name: Nocturne & Gold Editorial
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#9ccee6'
  on-secondary: '#003546'
  secondary-container: '#174f64'
  on-secondary-container: '#8ebfd8'
  tertiary: '#f7bfd5'
  on-tertiary: '#492436'
  tertiary-container: '#daa4ba'
  on-tertiary-container: '#61394b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#bee9ff'
  secondary-fixed-dim: '#9ccee6'
  on-secondary-fixed: '#001f2a'
  on-secondary-fixed-variant: '#144c61'
  tertiary-fixed: '#ffd8e6'
  tertiary-fixed-dim: '#efb7cd'
  on-tertiary-fixed: '#311021'
  on-tertiary-fixed-variant: '#633a4c'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-hero:
    fontFamily: Newsreader
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Newsreader
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-tech:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.14em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  space-4xl: 6rem
  space-5xl: 9rem
  container-max: 1280px
  gutter-desktop: 2rem
  gutter-mobile: 1.25rem
---

## Brand & Style

This design system establishes a high-caliber personal brand for Tamanna Kumari Naik, capturing the intersection of rigorous computational logic and creative vision. The aesthetic avoids standard tech clichés—such as neon glow gradients, generic floating glass cards, and homogeneous template layouts—in favor of an editorial, high-contrast, atmospheric presentation akin to a luxury technical journal or an architectural monograph.

The audience encompasses forward-thinking engineering recruiters, design technologists, collaborators, and executive clients. The visual atmosphere should instill confidence, intellectual poise, and refined craftsmanship. By juxtaposing deep, nocturnal tonal layering with sharp typography and measured antique gold accents, the interface feels both academically grounded and digitally progressive.

## Colors

The palette operates exclusively in a disciplined dark mode, drawing depth from deep ink-blues rather than dead flat blacks.

- **Primary Accent (`#D4AF37`)**: Warm Antique Gold. Reserved strictly for high-value focal points: key project milestones, status callouts, primary action targets, and prominent pull-quotes. It should be applied deliberately and never used for massive background blocks.
- **Secondary (`#164E63` / `#133337`)**: Deep Marine Teal. Utilized for structural framing, secondary highlights, tags representing technical systems, and foundational tonal tinting.
- **Tertiary (`#7E5265` / `#3B243B`)**: Dusty Lilac and Deep Muted Plum. Encapsulates creative endeavors, human-AI synthesis, and artistic notes, balancing the cold logic of teal with organic warmth.
- **Neutrals**:
  - **Base Canvas (`#0B0F19`)**: Midnight Blue-Black providing deep spatial continuity.
  - **Surface Container (`#111726`)**: Elevated background tier for structural modules and feature sections.
  - **Surface Elevated (`#1A2234`)**: Top-level interactive cards and floating navigation bars.
  - **Text & Glyph Hierarchy**: High-contrast warm ivory (`#F3F4F6`) for primary typography, soft parchment silver (`#9CA3AF`) for meta descriptions and labels, and structured dividers (`#1F293D`).

## Typography

Typography acts as the primary differentiator of this design system. It establishes an intellectual tension between the literary elegance of **Newsreader** (used for major narrative assertions and introspective statements) and the technical precision of **Plus Jakarta Sans** and **JetBrains Mono**.

- Headings in **Newsreader** should leverage italicized styling for specific key concepts or verbs to infuse an editorial voice.
- **JetBrains Mono** is introduced for metadata tags, commit counters, system status badges, and architecture labels, firmly tethering the poetic aesthetic to computer science discipline.
- Text contrast must adhere strictly to WCAG AAA standards against the nocturnal background, using warm ivory instead of stark 100% white to prevent retinal fatigue over prolonged reading.

## Layout & Spacing

The layout is built upon an asymmetrical, rhythmically paced 12-column grid. Uniform 3-card grids are strictly prohibited; projects and technical demonstrations must feature varied hierarchical weight (e.g., an 8-column lead case study anchored alongside a 4-column analytical breakdown, followed by full-bleed code reviews or staggered 2-column comparative spreads).

- **Desktop (1024px+)**: 12 columns with dynamic column proportions. Generous vertical breathing room (`space-4xl` and `space-5xl`) between thematic domains to establish editorial cadence.
- **Tablet (768px - 1023px)**: 8 columns with 1.5rem gutters. Complex multi-column tables transition into split asymmetric rows.
- **Mobile (Up to 767px)**: Single-column linear narrative, maintaining tight horizontal margins (`gutter-mobile`) paired with deliberate vertical pauses (`space-2xl`) to keep typography prominent and digestible.

## Elevation & Depth

Spatial separation relies on disciplined **tonal layering** and **subtle hairline outlines** rather than fuzzy drop shadows or high-gloss glass effects.

1. **Layer 0 (Base Canvas)**: Background rendered in `#0B0F19`. No shadows.
2. **Layer 1 (Recessed/Anchored Panels)**: Surface color `#111726` bordered with 1px hairline stroke in `#1F293D`.
3. **Layer 2 (Interactive Modules)**: Elevated cards utilize a flat background of `#161F31` bounded by an ultra-refined border: `1px solid rgba(212, 175, 55, 0.15)`.
4. **Active Elevation (Focus/Hover)**: When an element is engaged, depth is communicated through a border transition to `#D4AF37` and an ambient, low-spread aura: `0 8px 24px -4px rgba(22, 78, 99, 0.25)`.
5. **No Blur Glass**: Solid, opaque, or lightly translucent matte layers are favored over diffuse frosted glass. Backdrop filters are avoided to preserve crisp typographic legibility.

## Shapes

The design system incorporates **Soft (`1`)** architectural geometry. Corners feature compact 4px (`rounded-sm`) to 8px (`rounded-md`) radii, avoiding exaggerated bubble-like rounding or completely brutalist razor edges. 

- Interactive buttons, project framing cards, and terminal blocks use exact 6px or 8px corners.
- Micro tags and status pills use subtle 4px geometry or full pills only when representing categorical system status chips.
- Visual elements emphasize structural lines, rectilinear alignment, and razor-sharp content divides over round ornamentation.

## Components

### Buttons
- **Primary Button**: Solid antique gold background (`#D4AF37`) with midnight blue-black text (`#0B0F19`), set in JetBrains Mono or Plus Jakarta Sans bold. Clean 6px border radius. Hover introduces a high-contrast brightness shift (`#E5B842`) without scale popping.
- **Secondary / Technical Action**: Transparent interior with a structured 1px border (`rgba(243, 244, 246, 0.2)`), warm ivory text, and an immediate subtle dark teal surface shift (`#164E63`) on hover.
- **Ghost / Text Button**: Text-only button with a Newsreader or JetBrains Mono italic accent and a deliberate animated underline expanding from left to right on hover.

### Badges & Chips
- **Tech Stack Chips**: Background in `#111726` with a hairline border (`#1F293D`), rendered in `label-tech` using JetBrains Mono. A leading 6px dot indicates the domain (e.g., teal for web infrastructure, plum for machine learning pipelines, gold for core highlights).
- **Status Indicator**: Compact, non-pill rectangular badge with a 2px radius, featuring a subtle pulsing dot signaling active development or research availability.

### Cards & Project Showcases
- **Asymmetric Feature Modules**: Structural blocks containing asymmetric split ratios (60/40 or 70/30). A deep `#111726` canvas bordered with a 1px tint of `#1F293D`. Never generic cards in identical groups of three; each card adapts its height and structure to its content.
- **Terminal/Insight Previews**: Code snippet panels featuring clean `#070A11` inset wells, high-contrast monospace code blocks, and subtle antique gold syntax highlights for outputs.

### Form Inputs & Text Fields
- **Fields**: High-contrast input frames in `#111726` background, 1px `#1F293D` border, and warm ivory input text.
- **Active State**: Seamless transition to a crisp 1px border in `#D4AF37`. Floating label transitions to `label-caps` in antique gold.

### Navigation & Footers
- **Header**: Minimalist bar pinned to top, non-blurred dark navy tone `#0B0F19` with a subtle bottom hairline border `#1F293D`. Clean typographic monogram paired with structured, right-aligned section indicators.
- **Colophon / Footer**: Monospaced editorial summary listing technical specs of the portfolio, active time zone, current research themes, and copyright details set in muted parchment silver.