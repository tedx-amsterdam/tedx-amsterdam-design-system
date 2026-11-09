Event schedule as an ordered list: red time, uppercase title, optional description and an optional red label on the right.

```jsx
<Agenda items={[
  { time: '14:00', title: 'Doors open' },
  { time: '15:00', title: 'Talks start', label: 'No entry after start' },
  { time: '18:30', title: 'Afterparty', description: 'Drinks with the speakers' },
]} />
```

Titles are h3 by default; set `headingLevel` to fit the page outline. A `time` in `HH:MM` also becomes the `datetime` of its `<time>`.
