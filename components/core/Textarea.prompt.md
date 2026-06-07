Multi-line text input. Bottom border turns red on focus or error. Visually matches `Input`.

```jsx
<Textarea label="Message" value={msg} onChange={setMsg} rows={6} />

<Textarea
  label="Bio"
  value={bio}
  onChange={setBio}
  error="Bio must be at least 20 characters."
/>

<Textarea label="Notes" disabled />
```

`rows` sets initial height. The `error` prop shows a red validation message below the field.
