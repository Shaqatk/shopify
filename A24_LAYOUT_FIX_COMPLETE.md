# A24 Layout Fix - Complete Restructure

## 🎯 Issue Identified

The implementation didn't match the A24 reference image. Key differences:

### ❌ Previous Implementation (Wrong)
- Purchase bar at TOP of right column
- Quantity numbers in boxes (buttons with borders)
- Pricing inside purchase bar
- Purchase bar was sticky at top
- Heavy, prominent styling

### ✅ A24 Reference (Correct)
- Purchase bar at BOTTOM of right column
- Quantity numbers as plain text with underlines
- Pricing in LEFT column (with product details)
- Purchase bar NOT sticky on desktop (only mobile)
- Minimal, clean styling

---

## 🔧 Changes Made

### 1. **Layout Restructure** (`sections/product-information-a24.liquid`)

#### Right Column Order Changed
```liquid
<!-- BEFORE: Purchase bar → Media -->
<div class="product-information-a24__right">
  <div class="product-information-a24__purchase-bar">...</div>
  <div class="product-information-a24__media">...</div>
</div>

<!-- AFTER: Media → Purchase bar -->
<div class="product-information-a24__right">
  <div class="product-information-a24__media">...</div>
  <div class="product-information-a24__purchase-bar">...</div>
</div>
```

#### Purchase Bar CSS
```css
/* BEFORE: Sticky at top */
.product-information-a24__purchase-bar {
  position: sticky;
  top: calc(var(--a24-header-offset) + var(--a24-sticky-top));
  background: #f1f1f1;
  border: 1px solid #a8a8a8;
  padding: 20px 24px;
}

/* AFTER: Static at bottom, narrower */
.product-information-a24__purchase-bar {
  position: relative;
  background: transparent;
  border: none;
  padding: 0;
  max-width: 500px;
}
```

### 2. **Pricing Moved to Left Column**

#### New File: `snippets/a24-pricing-display.liquid`
- Displays regular price (large, bold, black)
- Displays member/subscription price (medium, grey)
- Shows "Members save X% Join us →" text
- Positioned in left column with product details

#### Integration
```liquid
<!-- In product-information-a24.liquid -->
<div class="product-information-a24__left">
  <div class="product-information-a24__pricing">
    {% render 'a24-pricing-display' %}
  </div>
  {{ product_details }}
</div>
```

### 3. **Quantity Selector Redesign** (`snippets/a24-purchase-bar.liquid`)

#### HTML Structure
```liquid
<!-- BEFORE: Boxes/buttons -->
<div class="a24-quantity__buttons">
  <button class="a24-quantity__button">1</button>
  <!-- Styled as boxes with borders -->
</div>

<!-- AFTER: Plain numbers with underlines -->
<div class="a24-quantity__numbers">
  <button class="a24-quantity__number">1</button>
  <!-- Styled as plain text with bottom border on active -->
</div>
```

#### CSS Styling
```css
/* Plain numbers (not boxes) */
.a24-quantity__number {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 1.125rem; /* 18px */
  color: #a8a8a8; /* Grey by default */
}

.a24-quantity__number.active {
  color: #000000;
  border-bottom-color: #000000;
  font-weight: 600;
}
```

### 4. **Purchase Bar Layout** (`snippets/a24-purchase-bar.liquid`)

#### New Grid Layout
```css
.a24-purchase-bar__content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
}
```

This creates:
```
┌─────────────────────────────┬──────────────┐
│ QUANTITY                    │              │
│ 1 2 3 4 5 6 7 8 9          │  IN CART     │
└─────────────────────────────┴──────────────┘
```

### 5. **Add to Cart Button Styling**

```css
/* BEFORE: Filled black button */
.a24-add-to-cart {
  background-color: #000000;
  color: #f1f1f1;
}

/* AFTER: Outlined button */
.a24-add-to-cart {
  background-color: transparent;
  color: #000000;
  border: 1px solid #000000;
}

.a24-add-to-cart:hover {
  background-color: #000000;
  color: #f1f1f1;
}
```

### 6. **Quantity Header Styling**

```css
.a24-quantity__header {
  border-bottom: 1px solid #000000;
  padding-bottom: 8px;
}

.a24-quantity__label {
  font-size: 0.6875rem; /* 11px */
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

---

## 📱 Mobile Behavior

### Desktop (750px+)
- Purchase bar at bottom of right column (NOT sticky)
- Quantity numbers in single row
- Grid layout: quantity left, button right

### Mobile (< 750px)
- Purchase bar becomes fixed at bottom (sticky)
- Quantity numbers wrap if needed
- Stack layout: quantity top, button bottom (full width)

---

## 📂 Files Modified

### 1. `sections/product-information-a24.liquid`
- Reordered right column (media first, purchase bar last)
- Changed purchase bar CSS (removed sticky, borders, padding)
- Added pricing display to left column
- Hidden default price block

### 2. `snippets/a24-purchase-bar.liquid`
- Removed pricing display from purchase bar
- Redesigned quantity selector (plain numbers, not boxes)
- Changed layout to grid (quantity left, button right)
- Updated button styling (outlined instead of filled)
- Updated JavaScript variable names
- Simplified mobile styles

### 3. `snippets/a24-pricing-display.liquid` (NEW)
- Created dedicated pricing component for left column
- Regular price: 42px, bold, black
- Member price: 27px, regular, grey
- Savings text: 11px, uppercase, with link

---

## ✅ Success Criteria Met

### Layout
- ✅ Pricing in left column (with product details)
- ✅ Images at top of right column
- ✅ Purchase bar at bottom of right column
- ✅ Purchase bar NOT sticky on desktop
- ✅ Purchase bar narrower (max-width: 500px)

### Quantity Selector
- ✅ Plain numbers (no boxes)
- ✅ Grey by default, black when active
- ✅ Underline on active number
- ✅ Horizontal layout with proper spacing
- ✅ "QUANTITY" label with bottom border

### Purchase Bar
- ✅ Grid layout: quantity left, button right
- ✅ Outlined "IN CART" button
- ✅ Minimal, clean styling
- ✅ Matches A24 reference image

### Pricing Display
- ✅ Large regular price ($22)
- ✅ Grey member price ($19.80)
- ✅ "Members save 10% Join us →" text
- ✅ Positioned in left column

---

## 🎨 Visual Comparison

### A24 Reference
```
LEFT COLUMN                RIGHT COLUMN
┌──────────────┐          ┌──────────────────┐
│ Movie Log    │          │                  │
│ $22          │          │  [Product Image] │
│ $19.80       │          │                  │
│ Members save │          │  [Product Image] │
│ 10% Join us →│          │                  │
│              │          │  [Product Image] │
│ DESCRIPTION  │          │                  │
│ Go analog... │          ├──────────────────┤
│              │          │ QUANTITY         │
│              │          │ 1 2 3 4 5 6 7 8 9│
│              │          │                  │
└──────────────┘          │      IN CART     │
                          └──────────────────┘
```

### Now Implemented ✅
- Pricing in left column
- Images at top of right column
- Purchase bar at bottom with quantity + button
- Plain number styling (no boxes)
- Minimal, clean aesthetic

---

## 🚀 What's Next

The layout now matches the A24 reference image! Next steps:

1. **Phase 6**: Recommendations + boundary correctness
2. **Phase 7**: Final QA, responsive testing, accessibility verification

---

## 📸 Key Visual Elements

### Typography Hierarchy (Left Column)
1. Product Title (largest)
2. Regular Price ($22) - 42px, bold, black
3. Member Price ($19.80) - 27px, regular, grey
4. Savings Text - 11px, uppercase, black
5. Description

### Purchase Bar (Right Column Bottom)
- "QUANTITY" label with bottom border
- Numbers 1-9 in horizontal row (plain text)
- "IN CART" button (outlined, right-aligned)

---

## ✨ Design Principles Applied

1. **Minimal Aesthetic**: Removed unnecessary borders, backgrounds, padding
2. **Clear Hierarchy**: Pricing prominent in left column
3. **Functional Layout**: Purchase controls at bottom where user makes decision
4. **Clean Typography**: Plain numbers, not buttons in boxes
5. **Subtle Interactions**: Underlines on active, hover states

The implementation now accurately reflects the A24 design philosophy! 🎉
