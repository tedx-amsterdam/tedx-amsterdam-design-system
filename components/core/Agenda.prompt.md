Event schedule as an ordered list: red start time with an optional end time below it, uppercase title, optional speakers line and description, and an optional red label on the right.

```jsx
<Agenda items={[
  { time: '14:00', title: 'Doors open' },
  { time: '15:00', endTime: '16:30', title: 'Talks start', speakers: 'Amira Haddad, Jonas de Vries', label: 'No entry after start' },
  { time: '18:30', title: 'Afterparty', description: 'Drinks with the speakers' },
]} />
```

Leave `endTime` out for open-ended items such as an afterparty. Titles are h3 by default; set `headingLevel` to fit the page outline. A `time` in `HH:MM` also becomes the `datetime` of its `<time>`.

Pass `date="2026-11-12"` (the event day) to mark the running item "Now" and dim earlier ones; this adds the small client `AgendaClock`, so `Agenda` itself stays a server component.
