Overlay dialog. Red top border, dark panel, × close button. Traps focus, locks scroll, closes on Escape or overlay click.

```jsx
const [open, setOpen] = React.useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm registration"
>
  <p>Are you sure you want to register for this event?</p>
  <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
    <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

Three sizes: `sm` (480px), `md` (640px, default), `lg` (800px). Use `hideCloseButton` if your content provides its own close action.

- Renders through a portal to `document.body`; safe inside overflow/stacking contexts.
- On close, focus returns to the element focused before opening (WAI-ARIA dialog pattern).
- `className` merges onto the dialog element.
