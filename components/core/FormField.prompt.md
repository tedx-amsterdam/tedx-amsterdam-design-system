Wrapper that adds label, hint, and validation error around any form input. Use it to avoid repeating label/error markup.

```jsx
{/* Wrapping a native input */}
<FormField label="Full name" htmlFor="name" required error="Name is required.">
  <input id="name" type="text" style={{ /* your styles */ }} />
</FormField>

{/* Wrapping the Input component */}
<FormField label="Email" htmlFor="email" hint="We'll never share your address.">
  <Input id="email" type="email" value={email} onChange={setEmail} />
</FormField>

{/* Wrapping Select */}
<FormField label="Country" htmlFor="country" required>
  <Select id="country" options={countries} value={country} onChange={setCountry} />
</FormField>
```

`htmlFor` must match the `id` of the child input for correct label association. The `error` prop also triggers a live `role="alert"` region.
