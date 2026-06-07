FAQ-style disclosure list with uppercase questions and a +/− toggle; the open row turns red.

```jsx
<Accordion items={[
  { q: "Who are our pioneers?", a: "Pioneers move an idea into a prototype of a real-world solution." },
  { q: "The criteria", a: "A concrete, actionable idea and a commitment of 3–8 hours a week." },
]} />
```

`defaultOpen` sets the initially open index (`-1` = all closed).
