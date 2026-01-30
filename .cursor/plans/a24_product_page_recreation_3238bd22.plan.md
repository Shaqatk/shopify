---
name: A24 Product Page Recreation
overview: Recreate the A24 Shop product page layout with exact styling, grid system, typography, and interactive behaviors in your Shopify theme.
todos:
  - id: phase-1
    content: "Phase 1: Foundation - Grid system CSS variables, typography, NB International font setup"
    status: pending
  - id: phase-2
    content: "Phase 2: Product Hero - Full viewport hero with eyebrow, title, prices, hero image"
    status: pending
  - id: phase-3
    content: "Phase 3: Product Grid - 2-column layout with sticky info column and description blocks"
    status: pending
  - id: phase-4
    content: "Phase 4: Product Bar - Sticky CTA with quantity selector, state-pinned behavior, Add to Cart"
    status: pending
  - id: phase-5
    content: "Phase 5: Media Gallery - Stacked images with proper spacing and responsive srcset"
    status: pending
  - id: phase-6
    content: "Phase 6: Polish - Responsive refinements, animations, mobile bottom bar, edge cases"
    status: pending
isProject: false
---

# A24 Product Page Recreation Plan

---

## Implementation Approach: Modify Existing Theme

**Recommendation:** Modify the existing theme rather than starting fresh.

**Rationale:**

- Your theme already supports template variants (`product.a24.json`) which isolates A24 styling
- Foundation files exist (`a24-design-system.liquid`, `a24-purchase-bar.liquid`, `product-information-a24.liquid`)
- Scoping all styles with `.product-information-a24` class prevents conflicts
- No need to rebuild header, footer, cart, collections - only the PDP changes
- Starting fresh would be 5-10x more work for the same result

**Strategy:**

- Treat the A24 product page as a self-contained "mini-app" within your theme
- All CSS scoped to `.product-information-a24` to override theme defaults only when active
- JavaScript isolated to A24 product pages only
- Use CSS custom properties to match A24's design tokens exactly

---

## Implementation Phases

### Phase 1: Foundation (Grid System & Typography)

**Goal:** Establish the CSS foundation that everything else builds on

**Tasks:**

- Set up A24 CSS variables (`--space`, `--col-gutter`, `--col-width`, etc.)
- Create the `.a24-grid` flex-based grid helper classes
- Add NB International Web font (or configure closest fallback: Inter, Helvetica Neue)
- Define typography scale (eyebrow, h1, price, body, CTA sizes)
- Set up color palette variables

**Files:**

- `snippets/a24-design-system.liquid` (major update)

**Deliverable:** CSS foundation ready, can test by adding sample text

---

### Phase 2: Product Hero Section

**Goal:** Build the full-viewport hero with product info and main image

**Tasks:**

- Create hero grid structure (2-column, flex, align-bottom)
- Build eyebrow component ("Back in Stock" label)
- Style H1 product title (large, tight tracking)
- Create `.hero-prices` with main price and member price
- Add hero image container (1:1 aspect ratio, object-fit: contain)
- Implement mobile description (shown only on mobile)

**Files:**

- New: `snippets/a24-product-hero.liquid`
- Update: `sections/product-information-a24.liquid`

**Deliverable:** Hero section matches A24 visually

---

### Phase 3: Product Grid & Info Column

**Goal:** Create the main content area with sticky left column

**Tasks:**

- Build 2-column product grid (1/4 + 3/4 split)
- Create sticky info column with `position: sticky`
- Add Description block with eyebrow header
- Add More Info block with eyebrow header
- Add "You might also like" upsell block
- Style eyebrow components (11px, uppercase, border-top)

**Files:**

- Update: `sections/product-information-a24.liquid`
- New: `snippets/a24-eyebrow.liquid`

**Deliverable:** Left column displays and sticks correctly on scroll

---

### Phase 4: Product Bar (Sticky CTA)

**Goal:** Build the sticky purchase bar with two-state behavior

**Tasks:**

- Create product bar structure with quantity + CTA columns
- Build quantity selector (numbers 1-9, horizontal)
- Style default state (light background, outlined button)
- Style pinned state (dark button, hidden quantity on tablet)
- Add Intersection Observer for `.state-pinned` class toggle
- Wire up quantity selection to form input
- Implement "Add to Cart" → "In Cart" state change

**Files:**

- Update: `snippets/a24-purchase-bar.liquid`
- New: `snippets/a24-selector.liquid`
- New: `assets/a24-product.js`

**Deliverable:** Bar sticks, button changes on scroll, quantity selectable

---

### Phase 5: Media Gallery & Recommendations

**Goal:** Complete the right column with stacked images and recommendations

**Tasks:**

- Build stacked media gallery (40px gap between images)
- Add responsive srcset for images (666w, 1150w, 1800w, 2400w)
- Create product recommendations section (4-column grid)
- Style recommendation product cards
- Add eyebrow "More recommended products"

**Files:**

- Update: `sections/product-information-a24.liquid`
- Update: `templates/product.a24.json` (recommendations section)

**Deliverable:** All images display, recommendations appear below

---

### Phase 6: Polish & Responsive

**Goal:** Refine for all screen sizes and add finishing touches

**Tasks:**

- Mobile: Move product bar to bottom sticky
- Mobile: Reverse column order (media first)
- Mobile: Show hero description, hide grid description
- Tablet: Hide quantity selector, adjust column widths
- Add transition animations (bar border, button color)
- Test sold out state, variant selection, edge cases
- Test with different product types (with/without variants)
- Performance optimization (lazy loading images)

**Files:**

- All files - responsive CSS additions
- `assets/a24-product.js` - polish interactions

**Deliverable:** Production-ready A24 product page

---

## Page Structure Overview

The A24 product page consists of two main sections stacked vertically:

```
Product Hero Grid (full viewport height)
├── Left: Title, Price, Member Price, Description (mobile)
└── Right: Main Hero Image (1:1 ratio)

Product Grid (main content)
├── Left: Sticky Info Column (1/4 width)
│   ├── Description
│   ├── More Info
│   └── Upsell Block
└── Right: Media Column (3/4 width)
    ├── Product Bar (sticky)
    │   ├── Quantity Selector
    │   └── Add to Cart / In Cart button
    └── Product Media Gallery (stacked images)

Product Recommendations (4-column grid)
```

---

## 1. CSS Variables and Grid System

The A24 layout is built on a **4-column grid system** with these key variables:

```css
:root {
  --space: 0.625rem;                    /* 10px base unit */
  --col-gutter: 3vw;                    /* Column gutters */
  --col-gutter-outer-left: var(--col-gutter);
  --col-gutter-outer-right: var(--col-gutter);
  --win-width: calc(100vw - var(--scrollbar-width));
  --col-width: calc((var(--win-width) - (2 * var(--col-gutter))) / 4);
  --product-bar-vert-offset: calc(var(--space) * 3);
  --product-bar-inner-height: var(--cta-height);
}
```

**Grid Helper Class:**

```css
.grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: calc(var(--col-gutter-outer-left) + var(--col-gutter));
  padding-right: var(--col-gutter-outer-right);
}
```

---

## 2. Product Hero Section

**Layout:** Full viewport height, 2-column flex layout

**Key Measurements:**

- Min height: `max(100vh - var(--product-bar-outer-height), 37.5rem)`
- Left column: 2/4 (50%) on desktop
- Right column: 2/4 (50%) with hero image
- Padding bottom: `calc(var(--space) * 4)` (40px)

**Elements:**

- `.eyebrow--product`: "Back in Stock" label (11px, uppercase, 0.04em tracking)
- `h1`: Product title (large, tight tracking -0.055em)
- `.hero-prices`: Price container (monospace font, 2rem)
  - `.final-price`: Main price ($22)
  - `.member-price`: AAA24 member price with logo and upsell

---

## 3. Product Grid Section

**Layout:** 2-column, left sticky + right scrolling

**Column Widths:**

- Left (`.product__grid__col--info`): `calc(1 * var(--col-width))` (1/4)
- Right (`.product__grid__col--media`): `calc(3 * var(--col-width))` (3/4)

**Left Column (Sticky):**

- Position: `sticky; top: 0`
- Contains: Description, More Info, Upsell blocks
- Each with `.eyebrow` header

**Right Column:**

- Contains Product Bar + Media Gallery

---

## 4. Product Bar (Sticky CTA)

**Key Behavior:** Sticky at top when scrolling, has two states

**Default State:**

- Background: `var(--color-bg)` (#f1f1f1)
- Shows quantity selector (numbers 1-9)
- "Add to Cart" button (outlined/light)

**Pinned State (`.state-pinned`):**

- Background becomes transparent on desktop
- Button becomes dark (black bg, white text)
- Quantity selector fades out on smaller screens
- Bottom border animates in

**CSS Structure:**

```css
.product__bar {
  position: sticky;
  top: -1px;
  z-index: 4;
  background: var(--color-bg);
  margin-bottom: var(--product-bar-bot-margin);
  padding-top: var(--product-bar-vert-offset);
}

.product__bar.state-pinned .cta {
  background-color: var(--color-text);
  color: var(--color-bg);
}
```

**Quantity Selector:**

- Horizontal row of numbers 1-9
- Active state: black text
- Inactive state: #a8a8a8 grey
- Font: 1.6875rem (27px), tight tracking

---

## 5. Product Media Gallery

**Layout:** Vertical stack with spacing

```css
.product__media {
  margin-right: var(--col-gutter);
}

.product__media .media:not(:first-child) {
  margin-top: calc(var(--space) * 4); /* 40px gap */
}
```

**Images:** 3:2 aspect ratio, responsive srcset

---

## 6. Typography System

| Element | Font | Size | Tracking | Weight |

|---------|------|------|----------|--------|

| Eyebrow/Labels | NB International | 0.6875rem (11px) | 0.04em | 600 |

| H1 Title | NB International | 5.25rem (84px) | -0.055em | 700 |

| Price | NB International Mono | 2rem | -0.1em | 400 |

| CTA Buttons | NB International | 1.6875rem (27px) | -0.025em | 400 |

| Body | NB International | 1rem | -0.01em | 400 |

---

## 7. Color Palette

- Background: `#f1f1f1`
- Text: `#000000`
- Grey text: `#787878`
- Light grey/inactive: `#a8a8a8`
- Member price color: `#83887c`
- Divider/border: `#000000` (1px)

---

## 8. Responsive Breakpoints

- Desktop: `min-width: 1151px` - Full 4-column layout
- Tablet: `667px - 1150px` - 3-column, quantity selector hidden
- Mobile: `max-width: 666px` - Single column, bottom sticky bar

**Mobile-specific:**

- Product bar sticks to bottom instead of top
- Column order reverses (media first, info second)
- Hero description shows in hero section (hidden on desktop)

---

## 9. Interactive Behaviors

1. **Scroll Detection:** Add `.state-pinned` class to `.product__bar` using Intersection Observer
2. **Quantity Selection:** Click to select, update form hidden input
3. **Add to Cart:** Changes text to "In Cart" after adding, button goes dark
4. **Variant Images:** Hero image swaps on variant selection

---

## Files to Modify/Create

**Existing Files to Update:**

1. [`sections/product-information-a24.liquid`](sections/product-information-a24.liquid) - Main section file (major restructure)
2. [`snippets/a24-design-system.liquid`](snippets/a24-design-system.liquid) - CSS variables and typography
3. [`snippets/a24-purchase-bar.liquid`](snippets/a24-purchase-bar.liquid) - Product bar component
4. [`templates/product.a24.json`](templates/product.a24.json) - Template configuration

**New Files to Create:**

5. `snippets/a24-product-hero.liquid` - Hero section component
6. `snippets/a24-eyebrow.liquid` - Reusable eyebrow/label component
7. `snippets/a24-selector.liquid` - Quantity/option selector component
8. `assets/a24-product.js` - JavaScript for interactions

---

## Summary

| Phase | Focus | Key Deliverable |

|-------|-------|-----------------|

| 1 | Foundation | CSS grid system + typography ready |

| 2 | Hero | Full-viewport hero section |

| 3 | Grid | Sticky info column working |

| 4 | Bar | Sticky CTA with state changes |

| 5 | Media | Image gallery + recommendations |

| 6 | Polish | Responsive + production-ready |

**Estimated Complexity:** Medium-High (significant CSS work, moderate JS)

**Risk Areas:**

- Sticky positioning conflicts with existing theme CSS
- Mobile bottom bar z-index issues
- Cart integration with existing theme cart drawer

**Testing Checklist:**

- [ ] Desktop 1440px+ layout
- [ ] Tablet 667-1150px layout  
- [ ] Mobile <666px layout
- [ ] Scroll sticky behavior
- [ ] Add to cart functionality
- [ ] Variant selection (if product has variants)
- [ ] Sold out state
- [ ] Multiple images display
- [ ] Recommendations load