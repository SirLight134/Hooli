# Hooli Design System

> A premium multi-vendor marketplace — Stripe-inspired purity with soft, dimensional surfaces. Trustworthy, modern, and effortlessly cool.

## 1. Atmosphere & Identity

Hooli feels like a premium marketplace you trust instinctively. Clean white canvases with deep navy anchors, a signature violet accent that signals interactivity, and soft, layered surfaces that create depth without clutter. The vibe is confident but inviting — like walking into a beautifully curated boutique, not a chaotic bazaar.

**The signature:** Soft dimensional surfaces — cards and containers use nested double-bezel architecture (outer shell + inner core) with subtle tonal shifts and hairline borders, creating depth you feel more than see. The floating glass navigation pill anchors the experience.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --surface-primary | #FFFFFF | #0A0A0A | Main background |
| Surface/secondary | --surface-secondary | #F8F9FA | #121212 | Cards, panels |
| Surface/elevated | --surface-elevated | #FFFFFF | #1A1A1A | Modals, popovers |
| Surface/brand | --surface-brand | #0D1B2A | #0D1B2A | Footer, dark sections |
| Text/primary | --text-primary | #0D1B2A | #F0F0F0 | Headlines, body |
| Text/secondary | --text-secondary | #5A6B7D | #A0A0A0 | Captions, hints |
| Text/tertiary | --text-tertiary | #8E9BAA | #666666 | Disabled, muted |
| Text/inverse | --text-inverse | #FFFFFF | #FFFFFF | On dark backgrounds |
| Border/default | --border-default | #E5EDF5 | #2A2A2A | Dividers, outlines |
| Border/subtle | --border-subtle | #F0F4F8 | #1E1E1E | Soft separations |
| Accent/primary | --accent-primary | #7C3AED | #8B5CF6 | CTAs, links, focus |
| Accent/hover | --accent-hover | #6D28D9 | #A78BFA | Hover state |
| Accent/subtle | --accent-subtle | #EDE9FE | #1E1B4B | Subtle accent backgrounds |
| Status/success | --status-success | #10B981 | #34D399 | Confirmations |
| Status/warning | --status-warning | #F59E0B | #FBBF24 | Cautions |
| Status/error | --status-error | #EF4444 | #F87171 | Errors, destructive |
| Status/info | --status-info | #3B82F6 | #60A5FA | Informational |

### Shadow Colors

| Level | Value | Usage |
|-------|-------|-------|
| Subtle | `0 1px 2px rgba(59,53,80,0.06)` | Cards at rest |
| Default | `0 2px 8px rgba(59,53,80,0.08)` | Elevated cards, dropdowns |
| Prominent | `0 8px 32px rgba(59,53,80,0.12)` | Modals, popovers |
| Ambient | `0 0 0 1px rgba(59,53,80,0.04)` | Hairline glow |

### Rules
- Surface hierarchy creates depth through tonal shifts + shadows — never harsh borders.
- Accent (purple) is used ONLY for interactive elements. Never decorative.
- Never introduce a color not in this table. Extend the table first.

## 3. Typography

### Font Stack
- **Primary**: `Geist`, `Inter`, `system-ui`, `-apple-system`, `sans-serif`
- **Mono**: `JetBrains Mono`, `Fira Code`, `monospace`

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 56px / 3.5rem | 300 | 1.05 | -0.025em | Hero, page title |
| H1 | 40px / 2.5rem | 400 | 1.1 | -0.02em | Section headers |
| H2 | 30px / 1.875rem | 500 | 1.2 | -0.015em | Subsection headers |
| H3 | 22px / 1.375rem | 500 | 1.3 | -0.01em | Card titles |
| H4 | 18px / 1.125rem | 600 | 1.4 | 0 | Small card titles |
| Body/lg | 18px / 1.125rem | 400 | 1.6 | 0 | Lead paragraphs |
| Body | 16px / 1rem | 400 | 1.6 | 0 | Default text |
| Body/sm | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary info |
| Caption | 13px / 0.8125rem | 500 | 1.4 | 0.01em | Labels, metadata |
| Overline | 11px / 0.6875rem | 600 | 1.3 | 0.08em | Section labels, uppercase |

### Rules
- Max 2 font families. Mono only for code elements.
- Body text never below 14px.
- Headings that wrap to 4+ lines are too large — use `clamp()`.

## 4. Spacing & Layout

### Base Unit
All spacing derives from a base of **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Tight: icon-to-label |
| --space-2 | 8px | Compact: list items, inline groups |
| --space-3 | 12px | Default: form field padding |
| --space-4 | 16px | Standard: card padding |
| --space-5 | 20px | Comfortable: section inner spacing |
| --space-6 | 24px | Generous: card padding (default) |
| --space-8 | 32px | Separated: between card groups |
| --space-10 | 40px | Sections within a page |
| --space-12 | 48px | Major section breaks |
| --space-16 | 64px | Page-level vertical rhythm |
| --space-20 | 80px | Hero spacing |
| --space-24 | 96px | Maximum section separation |

### Grid
- Max content width: **1280px**
- Column system: **12-column, 24px gutter**
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px

### Rules
- Tokenize design intent — spacing steps, content width, gutters.
- Keep browser mechanics raw: `auto`, `%`, `min-content`, `clamp()`, intrinsic sizing.
- Asymmetric spacing is intentional, not accidental.

## 5. Components

### Floating Glass Navigation

- **Structure**: A fixed-position pill at the top of the viewport, centered, with backdrop blur and a subtle outer ring
- **Variants**: Default (light), elevated (scrolled state with shadow)
- **Spacing**: `--space-4` inner padding, `--space-6` between nav items
- **States**: Nav links have underline-on-hover animation, active page marked with accent dot
- **Accessibility**: Full keyboard navigation, focus-visible ring
- **Motion**: Background opacity transition on scroll (solid → glass). Mobile: hamburger morphs to X with staggered link reveal.

### Product Card

- **Structure**: Double-bezel architecture (outer shell `p-1.5` + inner core). Image top, content bottom.
- **Variants**: Default, featured (slightly larger, prominent shadow)
- **Spacing**: `--space-4` inner padding
- **States**: Hover lifts with shadow + subtle translateY(-2px); image overlay on hover
- **Accessibility**: Alt text on images, focus-visible on entire card link
- **Motion**: Card lifts on hover with 200ms ease-out; image scale(1.05) on hover

### Order Card

- **Structure**: Compact horizontal card with status badge, summary info, date
- **Variants**: Default, expandable (future)
- **States**: Hover lifts subtly
- **Accessibility**: Status colors include text for color-blind users

### Primary Button

- **Structure**: Inline-flex with pill rounding (`rounded-full`), generous padding
- **Variants**: Primary (filled purple), Secondary (outlined), Ghost (no border)
- **States**: default → hover (darken) → active (scale 0.98) → focus (ring) → disabled (opacity 50)
- **Motion**: 150ms ease-out on hover, 100ms ease-in on active

### Form Input

- **Structure**: Clean bordered input with label above, rounded-lg
- **States**: default → focus (purple ring) → error (red border + message) → disabled
- **Accessibility**: Labels associated, error messages with aria-describedby

### Status Badge

- **Structure**: Inline pill with colored background + text
- **Variants**: One per status (PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- **Spacing**: `--space-1` vertical, `--space-2` horizontal

### Cart Item Row

- **Structure**: Horizontal flex row with image thumbnail, product info, quantity controls, price
- **States**: —
- **Motion**: Quantity change animates briefly

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 100-150ms | ease-out | Button press, toggle |
| Standard | 200-300ms | cubic-bezier(0.16,1,0.3,1) | Card hover, panel open |
| Emphasis | 400-600ms | cubic-bezier(0.32,0.72,0,1) | Hero entry, page transition |
| Scroll-driven | tied to scroll | linear | Reveal animations |

### Rules
- Only animate `transform` and `opacity`. Never animate layout properties.
- Every interactive element has hover + active + focus states.
- Scroll-triggered animations use `IntersectionObserver`, not scroll listeners.
- Respect `prefers-reduced-motion` — disable non-essential animation.

### Signature Motion
- **Fluid Island Nav**: On scroll, navbar transitions from transparent to glass with backdrop blur
- **Card Lift**: Product cards scale(1.02) + shadow deepen on hover, 200ms custom bezier
- **Button Press**: Active state scale(0.98) with micro bounce
- **Staggered Reveal**: Cards and sections fade-up with `translate-y-8 opacity-0` → `translate-y-0 opacity-100`, staggered per row

## 7. Depth & Surface

### Strategy: Mixed (borders + shadows + tonal-shift)

Surfaces are separated by a combination of:
1. **Tonal shift** between surface-primary and surface-secondary (primary backgrounds)
2. **Hairline borders** (`1px` border-default/subtle) for card outlines
3. **Multi-layer shadows** for elevation with the purple-tinted palette

### Elevation

| Level | Shadow | Usage |
|-------|--------|-------|
| 0 | None | Page background |
| 1 | `0 1px 2px rgba(59,53,80,0.06)` | Cards at rest |
| 2 | `0 2px 8px rgba(59,53,80,0.08)` | Elevated cards |
| 3 | `0 8px 32px rgba(59,53,80,0.12)` | Modals, dropdowns |

## 8. Accessibility Constraints & Accepted Debt

### Constraints
- WCAG target: **2.2 AA** — contrast floor 4.5:1 body / 3:1 large text
- Visible focus ring on every interactive element (`outline: 2px solid accent-primary`)
- Full keyboard reachability for all navigation and interactive elements
- `prefers-reduced-motion` respected — disables all non-essential animation
- Status colors supplemented with text labels (not color-only)

### Accepted Debt
| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| Color contrast on tertiary text | Every page | Text-tertiary (#8E9BAA) fails 4.5:1 on white — used only for disabled/muted states | Fix when upgrading to WCAG AAA |
| Skip-to-content link | Layout | Not implemented in current redesign | Add in accessibility pass |
| Reduced motion for scroll reveals | Home, Products | Scroll-triggered animations not yet gated | Add prefers-reduced-motion query in follow-up |
