The locked-up TEDxAmsterdam wordmark (red TEDx + Amsterdam).

```jsx
<Logo tone="light-on-dark" base="../../" />   {/* white wordmark on black */}
<Logo tone="dark-on-light" width={200} />     {/* black wordmark on white */}
```

`tone` picks the white-PNG (dark surfaces) or SVG (light surfaces) asset. `base` resolves the asset path from the page's depth.
