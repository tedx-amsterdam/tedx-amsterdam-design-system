Sticky top navigation bar. Desktop: logo left, nav links centre, CTA right. Mobile: collapses to hamburger.

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
