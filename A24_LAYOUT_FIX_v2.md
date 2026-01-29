# A24 Layout Fix v2 - Final Corrections

## Issues Fixed

### 1. Quantity Numbers Were Showing as Black Boxes
**Problem:** The quantity numbers (1-9) were displaying as black boxes with white text instead of plain text.

**Solution:** Added `!important` rules to override theme styles and ensure:
- `background: none !important;`
- `border: none !important;`
- Active number is just **bold black text** (not a black box)
- Grey color (#a8a8a8) for inactive numbers

### 2. Left Column Content Was at Top (Should Be at Bottom)
**Problem:** Product title and pricing were at the top of the left column instead of positioned lower like A24.

**Solution:** 
- Added spacer div that expands to push content down
- Used `justify-content: flex-end` on the left column
- Content now aligns toward the bottom of the column

### 3. IN CART Button Was Too Small
**Problem:** The Add to Cart button was smaller than the A24 reference.

**Solution:**
- Increased padding: `24px 56px`
- Set minimum width: `180px`
- Larger letter-spacing for prominence

### 4. Pricing Row Layout
**Problem:** Prices were stacked vertically instead of in a row.

**Solution:** Updated to horizontal row layout:
```
$22  $19.80  Members save 10% Join us →
```

### 5. Quantity Section Borders
**Problem:** Border was only above the quantity label.

**Solution:** Added bottom border below the numbers row to match A24:
```
─────────────────────────
QUANTITY

1 2 3 4 5 6 7 8 9
─────────────────────────
```

---

## CSS Changes Summary

### Quantity Numbers (a24-purchase-bar.liquid)
```css
.a24-quantity__number {
  background: none !important;
  background-color: transparent !important;
  border: none !important;
  font-size: 1.5rem !important; /* 24px */
  color: #a8a8a8 !important; /* Grey */
}

.a24-quantity__number.active {
  color: #000000 !important;
  font-weight: 700 !important;
  background: none !important; /* NO black box */
}
```

### Quantity Section Borders
```css
.a24-quantity__header {
  border-top: 1px solid #000000 !important;
  padding-top: 12px !important;
}

.a24-quantity__numbers {
  border-bottom: 1px solid #000000 !important;
  padding-bottom: 16px !important;
}
```

### Left Column Positioning
```css
.product-information-a24__left {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Push to bottom */
}

.product-information-a24__spacer {
  flex: 1 1 auto; /* Takes available space */
  min-height: 100px;
}
```

### Add to Cart Button
```css
.a24-add-to-cart {
  padding: 24px 56px !important;
  min-width: 180px !important;
  font-size: 0.8125rem !important;
  letter-spacing: 0.1em !important;
}
```

### Pricing Row
```css
.a24-pricing-display__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px;
}
```

---

## Visual Comparison

### A24 Reference Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                              ┌───────────────────────┐  │
│                              │                       │  │
│                              │                       │  │
│                              │    Product Image      │  │
│                              │                       │  │
│                              │                       │  │
│  BACK IN STOCK               │                       │  │
│  Movie Log                   └───────────────────────┘  │
│  $22 $19.80 Members save 10% ─────────────────────────  │
│  ─────────────────────────── QUANTITY                   │
│  DESCRIPTION                 1 2 3 4 5 6 7 8 9          │
│  Go analog with the Movie... ───────────────────────    │
│                                        ┌─────────────┐  │
│                                        │  IN CART    │  │
│                                        └─────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key Visual Elements
- **Left Column:** Product info positioned at bottom
- **Quantity Numbers:** Plain text (1 2 3 4 5 6 7 8 9), not boxes
- **Active Number:** Bold black, NOT white on black background
- **Borders:** Line above "QUANTITY", line below numbers
- **IN CART Button:** Large, outlined, positioned to the right

---

## Files Modified

1. **`sections/product-information-a24.liquid`**
   - Added spacer for bottom positioning
   - Updated left column flex styling
   - Added content wrapper

2. **`snippets/a24-purchase-bar.liquid`**
   - Removed all box styling from quantity numbers
   - Added `!important` overrides for background/border
   - Updated button sizing
   - Fixed border positioning (top and bottom)

3. **`snippets/a24-pricing-display.liquid`**
   - Changed to horizontal row layout
   - Adjusted font sizes to match A24

---

## Testing Checklist

- [ ] Quantity numbers display as plain text (no black boxes)
- [ ] Active quantity is bold black (not white on black)
- [ ] Left column content is positioned toward bottom
- [ ] IN CART button is large and outlined
- [ ] Pricing displays in a row: $XX $XX.XX Members save...
- [ ] Borders appear above QUANTITY and below numbers
- [ ] Mobile layout works correctly
