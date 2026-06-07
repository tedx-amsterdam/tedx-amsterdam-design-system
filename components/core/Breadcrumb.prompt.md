Navigation trail for hierarchical pages. Last item is the current page — pass it without `href`.

```jsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Speakers", href: "/speakers" },
    { label: "Ada Lovelace" }, // current page — no href
  ]}
/>
```

Typography matches `Tag`: uppercase, wide letter-spacing, 14px. Separator is `›`. Last item gets `aria-current="page"` automatically.
