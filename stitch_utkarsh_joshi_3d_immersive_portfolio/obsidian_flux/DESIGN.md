---
name: Obsidian Flux
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b90a0'
  outline-variant: '#414754'
  surface-tint: '#aec6ff'
  primary: '#aec6ff'
  on-primary: '#002e6b'
  primary-container: '#0070f3'
  on-primary-container: '#ffffff'
  inverse-primary: '#0059c5'
  secondary: '#dbb8ff'
  on-secondary: '#470083'
  secondary-container: '#6807ba'
  on-secondary-container: '#d0a6ff'
  tertiary: '#00ddd6'
  on-tertiary: '#003735'
  tertiary-container: '#008480'
  on-tertiary-container: '#fefffe'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec6ff'
  on-primary-fixed: '#001a43'
  on-primary-fixed-variant: '#004397'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dbb8ff'
  on-secondary-fixed: '#2b0052'
  on-secondary-fixed-variant: '#6600b7'
  tertiary-fixed: '#47faf3'
  tertiary-fixed-dim: '#00ddd6'
  on-tertiary-fixed: '#00201f'
  on-tertiary-fixed-variant: '#00504d'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-code:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  sidebar-width: 280px
  panel-padding: 16px
---

## Brand & Style

The design system is engineered for a high-performance 3D Web Experience Creator, targeting technical creatives and sophisticated developers. The brand personality is "Technical Elegance"—merging the precision of developer tools with the fluid beauty of high-end consumer electronics. 

The visual style is a hybrid of **Minimalism** and **Glassmorphism**. It leverages deep obsidian voids to create a sense of infinite space, punctuated by razor-sharp typography and translucent UI layers. The emotional response is one of absolute control, futuristic capability, and professional-grade reliability. Every interaction should feel instantaneous, with "weightless" interfaces that float above the 3D canvas.

## Colors

This design system utilizes a "Deep Space" palette. The foundation is a pure, high-contrast dark mode.

- **Primary (Electric Blue):** Used for primary actions, focus states, and active tool indicators.
- **Secondary (Vivid Purple):** Reserved for premium features, AI-assisted tools, and creative highlights.
- **Tertiary (Cyan):** Used for technical data visualization, success states, and code-related accents.
- **Neutral:** A range of obsidian grays. The base background is `#0a0a0a`. Surface layers use varying levels of transparency to build hierarchy without losing the dark aesthetic.

Accent colors should be used sparingly as "light sources" within the dark environment, often applied via subtle glows or 1px strokes rather than large fills.

## Typography

The typography strategy focuses on a "tight" technical feel. **Inter** is the workhorse for the majority of the UI, providing exceptional legibility at small sizes and a bold, authoritative presence in headings. **Geist** is introduced for labels and code-centric data to reinforce the developer-focused nature of the tool.

- **Headings:** Use tight negative letter-spacing (`-0.02em` to `-0.04em`) to create a compact, modern look similar to high-end editorial tech sites.
- **Mono:** Used for coordinate inputs, hex codes, and script editors.
- **Hierarchy:** High contrast in weight (SemiBold/Bold for headers vs Regular for body) is essential to navigate dense 3D property panels.

## Layout & Spacing

The layout utilizes a **Fixed Sidebar / Fluid Canvas** model. The central 3D viewport is fluid, while the tool panels (Assets, Hierarchy, Properties) are fixed-width to maintain consistent interaction targets.

- **Grid:** A 12-column grid is used for dashboard views, while editor views use a "Pane" system with 1px dividers.
- **Rhythm:** A strict 4px baseline grid ensures alignment across dense property inspectors.
- **Breakpoints:**
  - **Desktop (1280px+):** Full multi-pane editor layout.
  - **Tablet (768px - 1279px):** Collapsible sidebars, focused single-pane property editing.
  - **Mobile (<768px):** View-only or simplified "Remote Control" mode for 3D scenes.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Glassmorphism** and **Tonal Layering**.

- **Z-Index 0 (Canvas):** Pure `#0a0a0a` or the 3D scene itself.
- **Z-Index 10 (Panels):** Background `rgba(10, 10, 10, 0.8)` with a `20px` backdrop-blur and a `1px` border of `white/10`.
- **Z-Index 20 (Modals/Popovers):** Background `rgba(20, 20, 20, 0.9)`, `40px` backdrop-blur, and a subtle outer glow using the primary color at 5% opacity.
- **Borders:** Use 1px solid strokes for all containers. Avoid heavy drop shadows; instead, use "Inner Glows" (subtle top-aligned highlights) to suggest height.

## Shapes

The shape language is controlled and geometric.
- **Standard UI (Buttons, Inputs):** 0.5rem (8px) provides a professional, modern feel that isn't too "bubbly."
- **Containers/Cards:** 1rem (16px) for larger surface areas like modal windows or dashboard cards.
- **Active States:** When an item is selected in the 3D hierarchy, it uses a sharp 2px "Focus Ring" or a full-bleed accent background.

## Components

- **Buttons:** 
  - *Primary:* Solid Electric Blue with white text. On hover, add a subtle outer cyan glow. 
  - *Secondary:* Glass background (white/5%) with white/20% border.
- **Inputs:** Dark backgrounds (`#000`) with a 1px border. On focus, the border transitions to the primary color with a 2px soft outer glow.
- **Cards:** Used for asset libraries. Features a 1px border that brightens on hover. Use `overflow: hidden` to clip 3D previews.
- **Chips/Badges:** Small, uppercase labels with a subtle background tint of the status color (e.g., translucent green for "Live").
- **Glass Panels:** The core of the editor UI. Sidebars must use `backdrop-filter: blur(20px)` to allow the 3D scene colors to bleed through slightly, creating a sense of immersion.
- **Timeline/Node Editor:** Use "Ghost" lines (low-opacity silver) for connections with animated "pulses" of the primary color to show data flow.