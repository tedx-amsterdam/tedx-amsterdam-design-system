Radio button group. Selected option shows a red dot. Always uses `<fieldset>` + `<legend>` for correct accessibility.

```jsx
<Radio
  legend="Preferred contact method"
  name="contact"
  options={[
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "none", label: "No preference" },
  ]}
  value={contact}
  onChange={setContact}
/>

<Radio
  legend="Session type"
  name="session"
  options={sessions}
  value={session}
  onChange={setSession}
  disabled
/>
```

`name` is required — it groups the radio buttons natively and is used to build each option's `id`.
