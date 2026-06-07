Single checkbox with label. Checked = red fill + white tick. For groups, wrap multiple `Checkbox` in a `<fieldset>` + `<legend>`.

```jsx
<Checkbox label="I agree to the terms" checked={agreed} onChange={setAgreed} />

<Checkbox label="Subscribe to newsletter" checked={sub} onChange={setSub} disabled />

{/* Group */}
<fieldset style={{ border: "none", padding: 0 }}>
  <legend style={{ color: "var(--text-primary)", marginBottom: 12 }}>Interests</legend>
  <Checkbox label="Technology" checked={tech} onChange={setTech} />
  <Checkbox label="Design" checked={design} onChange={setDesign} />
</fieldset>
```
