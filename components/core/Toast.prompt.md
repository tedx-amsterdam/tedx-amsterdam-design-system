Bottom-right notification that slides in and auto-dismisses. Caller controls when to show it via state.

```jsx
const [toast, setToast] = React.useState(null);

<Button onClick={() => setToast({ message: "Registration confirmed!", type: "success" })}>
  Register
</Button>

{toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onDismiss={() => setToast(null)}
  />
)}
```

Types: `info` (white border), `success` (white border), `error` (red border, assertive alert), `warning` (red border, assertive alert). Default `duration` is 4000ms; use `duration={0}` for persistent toasts. `onDismiss` is called after the exit animation completes — use it to set your state to null.
