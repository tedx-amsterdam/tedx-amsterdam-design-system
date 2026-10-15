Sets one or more words of a heading in the accent red, the way the designs mix white and red in titles.

```jsx
<SectionHeader eyebrow="Speakers" title={<>Our <Accent>speakers</Accent></>} />
<h1>How to become <Accent>a partner</Accent></h1>
<h2>Snapshots from <Accent color="white">our past events</Accent></h2> {/* on the red band, heading in black */}
```

`color`: red (default) | white, for the red band. Only inside headings, and only for words; it adds no meaning for screen readers.
