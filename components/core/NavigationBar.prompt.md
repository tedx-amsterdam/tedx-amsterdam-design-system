Sticky top navigation bar in the content column. Desktop: logo left, links and the CTA right. Mobile (below 768px): a 52px bar with the logo, the CTA (it stays visible, never only in the menu) and a "Menu" button that opens the links. Every control has a tap area of at least 44px.

```jsx
<NavigationBar
  links={[
    { label: "About", href: "/about" },
    { label: "Speakers", href: "/speakers" },
    { label: "Blog", href: "/blog" },
  ]}
  ctaLabel="Get tickets"
  ctaHref="/tickets"
  activePath="/speakers"
/>
```

`activePath` highlights the matching link in red and adds `aria-current="page"`. Pass `base="../../"` when using inside nested HTML files (e.g. inside `components/core/`) so asset paths resolve correctly.
