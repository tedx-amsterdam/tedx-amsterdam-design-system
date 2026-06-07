Branded native select/dropdown. Underline rule turns red on focus or error. Custom chevron overlaid via SVG.

```jsx
<Select
  label="Country"
  options={[
    { value: "nl", label: "Netherlands" },
    { value: "de", label: "Germany" },
  ]}
  value={country}
  onChange={setCountry}
/>

<Select
  label="Role"
  options={roles}
  error="Please select a role."
/>

<Select label="Status" options={statuses} disabled />
```

`error` prop shows a red validation message below and turns the border red. Omit `label` for unlabelled selects (provide external label association via `id` + `htmlFor`).
