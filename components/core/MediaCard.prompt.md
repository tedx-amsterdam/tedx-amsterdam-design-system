Image-led blog / event card: photo with a category `Badge` in the corner, uppercase title, an excerpt at 50% white and a meta line with a red dot.

```jsx
<MediaCard
  image="/images/power-of-ideas.jpg"
  imageAlt=""
  category="News"
  title="The power of ideas: 5 talks that changed Amsterdam"
  description="The power of ideas: 5 talks that changed Amsterdam"
  date="24 Jun"
  href="/blog/power-of-ideas"
/>
```

Renders a real `<img>` that loads lazily; give `imageAlt` when the photo shows more than the title says. Falls back to the red→orange tile gradient when `image` is omitted. Set `ratio` (e.g. `"1 / 1"`) per grid.
