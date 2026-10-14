Primary call-to-action button in TED red; use for "Notify me", "Sign up", "Join waiting list".

```jsx
<Button variant="primary" arrow>Notify me</Button>
<Button variant="secondary">Sign up</Button>
<Button variant="ghost" size="sm">View All Events</Button>
```

Variants: `primary` (red), `secondary` (white, for forms on red), `ghost` (outline). Labels are uppercase. Heights from the grid: `sm` 66px (mobile), `md` 74px (default), `lg` 80px (forms and CTA blocks); the width comes from the layout, so give the button the columns it should span. Set `arrow` for a trailing →, `href` to render an anchor.
- `className` merges onto the root element.
- `disabled` sets `aria-disabled="true"`, blocks clicks, and removes `href` on the link variant. Hover/press styling is pure CSS (`:hover`/`:active`).
