# A24 Design System Applied to Shopify Theme

## Overview
The A24 design system has been fully integrated into the `product.a24` template, matching the visual aesthetic of shop.a24films.com.

---

## 🎨 Colors

### Applied A24 Color Palette:
- **Background**: `#f1f1f1` (Light grey)
- **Text**: `#000000` (Black)
- **Text Hover**: `#787878` (Medium grey)
- **Dividers/Borders**: `#a8a8a8` (Light grey)

### Where Applied:
- ✅ Section background
- ✅ Purchase bar background
- ✅ All text elements
- ✅ Borders and dividers
- ✅ Button states

---

## 📝 Typography

### Font Families:
- **Primary**: `NB International Web` (with fallbacks: Helvetica Neue, Helvetica, Arial, sans-serif)
- **Monospace**: `NB International Mono Web` (with fallbacks: Courier New, Courier, Monaco, monospace)

### Type Scale:
| Element | Size | Weight | Letter Spacing | Line Height |
|---------|------|--------|----------------|-------------|
| H1 (Product Title) | 2.625rem (42px) | 700 | -0.0375em | 1 |
| H4 (Price) | 1.125rem (18px) | 700 | -0.01em | 1 |
| Body (Description) | 1rem (16px) | 400 | -0.01em | 1.19 |
| Small (Variants) | 0.875rem (14px) | 400 | 0.02em | 1 |
| Tiny (Eyebrow) | 0.6875rem (11px) | 600 | 0.04em | 1 |

### Typography Features:
- ✅ Tight letter-spacing for minimal aesthetic
- ✅ Antialiased font rendering
- ✅ Optimized text rendering
- ✅ Responsive scaling (87.5% mobile → 130% extra large)

---

## 📏 Spacing System

### Base Unit:
- `--a24-space: 0.625rem` (10px)

### Spacing Scale:
- `--a24-space-2`: 20px
- `--a24-space-3`: 30px
- `--a24-space-4`: 40px
- `--a24-space-6`: 60px
- `--a24-space-8`: 80px

### Applied Spacing:
- **Container padding**: 40px (desktop), 60px (large screens)
- **Column gap**: 64px (desktop), 80px (large screens)
- **Media stack gap**: 12px between images
- **Element margins**: Based on A24 spacing scale

---

## 🖱️ Interactive Elements

### Buttons:
- **Style**: Square corners (border-radius: 0)
- **Font**: Uppercase, 0.875rem, letter-spacing: 0.02em
- **Colors**: Black background, light grey text
- **Hover**: Medium grey (#787878)
- **Padding**: 20px horizontal, 30px vertical

### Scrollbars:
- **Width**: 9px (thin)
- **Track**: Light grey (#f1f1f1)
- **Thumb**: Medium grey (#a8a8a8) with 2px border
- **Hover**: Darker grey (#8f8f8f)

---

## 📱 Responsive Breakpoints

### Type Scaling:
| Breakpoint | Font Size | Description |
|------------|-----------|-------------|
| < 666px | 87.5% | Mobile |
| 667px - 1150px | 87.5% | Tablet |
| 1150px - 1549px | 100% | Desktop (default) |
| 1550px - 1999px | 110% | Large Desktop |
| 2000px+ | 130% | Extra Large |

### Layout Adjustments:
- **Mobile** (< 750px): Single column, fixed bottom purchase bar
- **Tablet** (750-1023px): 320px left column, 48px gap
- **Desktop** (1024-1549px): 380px left column, 64px gap
- **Large** (1550px+): 420px left column, 80px gap

---

## 🎯 Key Design Decisions

### 1. **Minimal Aesthetic**
- Sharp corners (no border-radius)
- Subtle shadows
- Clean dividers with low opacity
- Monochromatic color scheme

### 2. **Typography Hierarchy**
- Tight letter-spacing throughout
- Bold weights for headings and prices
- Regular weight for body text
- Uppercase for labels and buttons

### 3. **Spacing Philosophy**
- Generous whitespace between sections
- Tight spacing within groups
- Consistent use of spacing scale
- Full-width feel with proper padding

### 4. **Interaction Design**
- Smooth transitions (0.2s ease)
- Clear hover states
- Accessible focus states
- Custom scrollbar styling

---

## 📂 Files Modified

1. **`snippets/a24-design-system.liquid`** (NEW)
   - Complete A24 design system variables
   - Typography styles
   - Color palette
   - Spacing system
   - Button styles
   - Scrollbar styling

2. **`sections/product-information-a24.liquid`**
   - Imports A24 design system
   - Layout structure
   - Responsive behavior
   - Component styling

3. **`templates/product.a24.json`**
   - Template configuration
   - Block settings
   - Media gallery settings (stacked, no carousel)

---

## ✅ What's Complete

- ✅ A24 color palette applied
- ✅ A24 typography system implemented
- ✅ A24 spacing system integrated
- ✅ Responsive type scaling
- ✅ Custom scrollbar styling
- ✅ Button styling
- ✅ Selection styling
- ✅ Full-width layout
- ✅ Vertical media stack (no carousel)
- ✅ Sticky positioning

---

## 🚀 Next Steps (Phase 3)

Build the purchase bar with:
- Subscription selector (one-time vs subscribe)
- Cadence dropdown (bi-weekly/monthly)
- Quantity selector (1-9 buttons)
- Add to cart button
- Subscriber pricing display

---

## 🔧 Usage

To apply this template to a product:
1. Go to Shopify Admin → Products
2. Select a product
3. In Theme Templates section, choose "product.a24"
4. Save

The product will now use the A24 design system!
