---
name: Ethereal Essence
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#4f4448'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#817478'
  outline-variant: '#d2c3c7'
  surface-tint: '#795465'
  primary: '#795465'
  on-primary: '#ffffff'
  primary-container: '#f8c8dc'
  on-primary-container: '#765162'
  inverse-primary: '#e9bacd'
  secondary: '#006e20'
  on-secondary: '#ffffff'
  secondary-container: '#90f691'
  on-secondary-container: '#007322'
  tertiary: '#1c648e'
  on-tertiary: '#ffffff'
  tertiary-container: '#aedaff'
  on-tertiary-container: '#18618b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#e9bacd'
  on-primary-fixed: '#2e1221'
  on-primary-fixed-variant: '#5f3c4d'
  secondary-fixed: '#93f993'
  secondary-fixed-dim: '#77dc7a'
  on-secondary-fixed: '#002105'
  on-secondary-fixed-variant: '#005316'
  tertiary-fixed: '#cae6ff'
  tertiary-fixed-dim: '#90cdfd'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b70'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The brand personality is healing, introspective, and profoundly serene. It aims to transform a traditional personality assessment into a meditative journey of self-discovery. The target audience values aesthetic presentation, emotional intelligence, and shareable, high-end digital experiences.

The design style is a sophisticated blend of **Glassmorphism** and **Minimalism**, heavily influenced by the ephemeral qualities of light and nature. The UI should evoke the feeling of looking through a frosted window at an aurora or a garden at dawn. Expect soft, translucent layers, organic movement, and a "light-leaking" aesthetic that feels airy and premium. Every interaction should feel intentional and calming, avoiding sharp transitions in favor of gentle fades and blurs.

## Colors

The palette is rooted in "Nature’s Transitions." The base is a soft, off-white `neutral` that prevents the interface from feeling clinical. 

- **Primary (Love):** A soft, warm pink resembling cherry blossoms. Use for high-emotion touchpoints.
- **Secondary (Tempo):** A sage green representing steady growth and natural rhythm.
- **Tertiary (Boundary):** A cool, sea-salt teal that feels protective and calm.
- **Influence:** A glowing gold/soft amber representing radiance and impact.

Backgrounds should rarely be flat. Use expansive, low-contrast gradients (e.g., Lavender #E0C3FC to Soft Peach #FBD9E4) to create a sense of depth and luminosity. For dark-mode sections (like "Night Sky" themes), transition to a deep navy base with aurora green (#98FF98) highlights.

## Typography

This design system utilizes a high-contrast typographic pairing to balance "Authority" with "Approachability." 

- **Playfair Display** (Serif) is used for titles, quotes, and dimension headers. It provides a literary, high-end editorial feel that makes the personality results feel like a curated biography.
- **Plus Jakarta Sans** (Sans-Serif) handles all functional text and body copy. Its soft, rounded terminals maintain the "friendly/welcoming" narrative while ensuring maximum legibility during the test-taking process.

Use `label-caps` for dimension identifiers (e.g., "LOVE DIMENSION") to create a structured, professional hierarchy amidst the soft aesthetic.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** with generous white space (negative space) to promote a sense of "air." 

- **Desktop:** A 12-column grid with wide margins. Content cards should ideally span the central 6-8 columns to maintain focus.
- **Mobile:** A single-column flow with 20px side margins. 
- **Rhythm:** Use a consistent 8px base unit. Vertical spacing between question blocks should be substantial (`section-gap`) to allow the user to breathe between thoughts. 

Components should use "Inner Padding" (minimum 24px) to ensure text never feels cramped against the glassmorphic card edges.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Tonal Layering** rather than traditional shadows.

1.  **The Canvas:** The bottom-most layer is a soft, animated gradient mesh (aurora/sea-salt colors).
2.  **The Cards:** Semi-transparent white (`rgba(255, 255, 255, 0.6)`) with a high `backdrop-filter: blur(20px)`. This creates the "frosted glass" effect.
3.  **The Stroke:** Cards must have a 1px solid border with very low opacity (`rgba(255, 255, 255, 0.4)` on top, `rgba(255, 255, 255, 0.1)` on bottom) to simulate a light source from above.
4.  **Shadows:** When used, shadows must be "Ambient"—extremely diffused, using a hint of the primary color (e.g., a soft pink glow) rather than grey or black.

## Shapes

The shape language is "Organic Geometric." While cards and containers use a standard `rounded-lg` (16px) or `rounded-xl` (24px) corner radius to maintain professionalism, interactive elements like "Next" buttons or "Dimension Chips" may lean toward pill-shaped (32px+) to feel softer to the touch.

Avoid sharp 90-degree angles entirely. Even progress bars and input focus states should maintain a minimum of 8px radius to keep the visual flow gentle and continuous.

## Components

- **Selection Cards (Questions):** Large, glassmorphic surfaces. Upon selection, the card border should glow with the color of the associated dimension (e.g., Sage Green for Tempo).
- **Buttons:** Primary buttons use a subtle gradient fill. Hover states should increase the "glow" (shadow spread) rather than darkening the color.
- **Progress Bar:** A thin, elegant line at the top of the screen. The fill should be a gradient (e.g., Blue to Pink) to represent the journey through the different index dimensions.
- **Shareable Result Card:** A specific component designed for 3:4 aspect ratio (Xiaohongshu style). It features a large "Atmosphere Image" (nature-based), a central serif title of the user's "Type," and a summarized grid of the 4 dimensions using the defined color tokens.
- **Chips/Tags:** Small, pill-shaped markers with 10% opacity backgrounds of their respective dimension colors, paired with high-contrast text.
- **Input Fields:** Minimalist lines or very lightly tinted glass boxes. The focus state is a soft "bloom" of light rather than a thick border.