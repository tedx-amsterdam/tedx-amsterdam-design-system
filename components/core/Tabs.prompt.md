Tabbed content switcher, also used as a filter (the team page). The active tab is red, the others white at 50%, above a hairline. Left/Right arrow keys move between tabs.

```jsx
<Tabs
  tabs={[
    { label: "Overview", content: <p>Overview content here.</p> },
    { label: "Schedule", content: <p>Schedule details here.</p> },
    { label: "Speakers", content: <p>Speaker list here.</p> },
  ]}
/>

<Tabs
  defaultIndex={1}
  tabs={[
    { label: "Past events", content: <EventList type="past" /> },
    { label: "Upcoming", content: <EventList type="upcoming" /> },
  ]}
/>
```

`defaultIndex` sets the initially active tab. Tab labels are uppercased automatically.
