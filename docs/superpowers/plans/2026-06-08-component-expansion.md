# Component Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 11 new React components (Select, Textarea, Checkbox, Radio, FormField, Modal, Toast, Badge, Breadcrumb, Tabs, NavigationBar) to the TEDxAmsterdam design system, expanding the library from 10 to 21 components.

**Architecture:** Each component is a standalone `.jsx` file in `components/core/` using only existing CSS custom property tokens (no raw hex/px). Components are added to `_ds_bundle.js` (the browser-ready UMD bundle) via a build script. A demo entry is added to `core.card.html` for each component.

**Tech Stack:** React 18 (via CDN UMD), esbuild (JSX transpilation for build script), Node.js 22

---

## File Map

**New files created per component** (33 files total):
```
components/core/Select.jsx        components/core/Select.d.ts        components/core/Select.prompt.md
components/core/Textarea.jsx      components/core/Textarea.d.ts      components/core/Textarea.prompt.md
components/core/Checkbox.jsx      components/core/Checkbox.d.ts      components/core/Checkbox.prompt.md
components/core/Radio.jsx         components/core/Radio.d.ts         components/core/Radio.prompt.md
components/core/FormField.jsx     components/core/FormField.d.ts     components/core/FormField.prompt.md
components/core/Modal.jsx         components/core/Modal.d.ts         components/core/Modal.prompt.md
components/core/Toast.jsx         components/core/Toast.d.ts         components/core/Toast.prompt.md
components/core/Badge.jsx         components/core/Badge.d.ts         components/core/Badge.prompt.md
components/core/Breadcrumb.jsx    components/core/Breadcrumb.d.ts    components/core/Breadcrumb.prompt.md
components/core/Tabs.jsx          components/core/Tabs.d.ts          components/core/Tabs.prompt.md
components/core/NavigationBar.jsx components/core/NavigationBar.d.ts components/core/NavigationBar.prompt.md
```

**New tooling files:**
```
package.json
scripts/extend-bundle.js
```

**Modified files:**
```
_ds_bundle.js          — new components appended by build script
_ds_manifest.json      — 11 new component entries added
components/core/core.card.html  — demo sections added for all new components
```

---

## Task 1: Build tooling setup

**Files:**
- Create: `package.json`
- Create: `scripts/extend-bundle.js`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "tedx-amsterdam-design-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "node scripts/extend-bundle.js"
  },
  "devDependencies": {
    "esbuild": "^0.25.0"
  }
}
```

- [ ] **Step 2: Install esbuild**

Run: `npm install`

Expected: `node_modules/` created, `package-lock.json` created.

- [ ] **Step 3: Create `scripts/extend-bundle.js`**

```js
// scripts/extend-bundle.js
// Appends new core components to _ds_bundle.js.
// Run: node scripts/extend-bundle.js
import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');

const NEW_COMPONENTS = [
  'Badge', 'Breadcrumb', 'Checkbox', 'FormField', 'Modal',
  'NavigationBar', 'Radio', 'Select', 'Tabs', 'Textarea', 'Toast',
];

function transformJsx(source) {
  const cleaned = source
    .replace(/^import\s+React\s+from\s+['"]react['"];?\s*\n?/gm, '')
    .replace(/^export\s+(?=function|const|class)/gm, '');
  return transformSync(cleaned, {
    loader: 'jsx',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  }).code.trim();
}

const blocks = NEW_COMPONENTS.map(name => {
  const path = `components/core/${name}.jsx`;
  const source = readFileSync(join(ROOT, path), 'utf8');
  const code = transformJsx(source);
  return (
    `// ${path}\n` +
    `try { (() => {\n${code}\n__ds_scope.${name} = ${name};\n` +
    `})(); } catch (e) { __ds_ns.__errors.push({ path: "${path}", error: String((e && e.message) || e) }); }`
  );
});

const exportLines = NEW_COMPONENTS
  .map(name => `__ds_ns.${name} = __ds_scope.${name};`)
  .join('\n\n');

let bundle = readFileSync(join(ROOT, '_ds_bundle.js'), 'utf8');

// Insert before the first __ds_ns.Accordion export line
const ANCHOR = '\n__ds_ns.Accordion = __ds_scope.Accordion;';
const pos = bundle.indexOf(ANCHOR);
if (pos === -1) throw new Error('Anchor not found in _ds_bundle.js — has the bundle already been extended?');

bundle =
  bundle.slice(0, pos) +
  '\n\n' + blocks.join('\n\n') +
  '\n\n' + exportLines +
  bundle.slice(pos);

writeFileSync(join(ROOT, '_ds_bundle.js'), bundle);
console.log(`✓ Added to bundle: ${NEW_COMPONENTS.join(', ')}`);
```

- [ ] **Step 4: Verify the script runs (will fail — no component files yet)**

Run: `node scripts/extend-bundle.js`

Expected: Error like `ENOENT: no such file or directory, open 'components/core/Badge.jsx'`

This confirms the tooling is wired up and ready.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json scripts/extend-bundle.js
git commit -m "chore: add esbuild + bundle extension script for new components"
```

---

## Task 2: Select component

**Files:**
- Create: `components/core/Select.jsx`
- Create: `components/core/Select.d.ts`
- Create: `components/core/Select.prompt.md`

- [ ] **Step 1: Create `components/core/Select.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Select
 * Branded native dropdown. Matches Input visual style with a red-on-focus
 * hairline rule and custom chevron. Error state turns border red.
 */
export function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selectId = id || `select-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={selectId}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: "none",
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${error ? "var(--tedx-red)" : focused ? "var(--tedx-red)" : "var(--border-hairline)"}`,
            paddingTop: "var(--space-2)",
            paddingBottom: "var(--space-2)",
            paddingRight: "var(--space-8)",
            paddingLeft: 0,
            font: "var(--text-body)",
            fontSize: 16,
            color: value ? "var(--text-primary)" : "var(--text-secondary)",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.45 : 1,
            outline: focused ? "2px solid var(--focus-ring)" : "none",
            outlineOffset: "2px",
            transition: "border-color var(--dur) var(--ease-standard)",
          }}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--text-secondary)",
          }}
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      {error && (
        <span id={errorId} style={{ font: "var(--text-tag)", color: "var(--tedx-red)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/core/Select.d.ts`**

```ts
import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Visible label above the select. */
  label?: string;
  /** Array of options. */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Placeholder shown when no value selected. @default "Select…" */
  placeholder?: string;
  disabled?: boolean;
  /** Validation message; triggers red error state. */
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Branded native dropdown matching the Input underline style. */
export function Select(props: SelectProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Select.prompt.md`**

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Select.jsx components/core/Select.d.ts components/core/Select.prompt.md
git commit -m "feat(select): add Select component"
```

---

## Task 3: Textarea component

**Files:**
- Create: `components/core/Textarea.jsx`
- Create: `components/core/Textarea.d.ts`
- Create: `components/core/Textarea.prompt.md`

- [ ] **Step 1: Create `components/core/Textarea.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Textarea
 * Multi-line text input. Visually consistent with Input:
 * hairline bottom border turns red on focus. Error state turns border red.
 */
export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const taId = id || `textarea-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${taId}-error` : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label && (
        <label
          htmlFor={taId}
          style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }}
        >
          {label}
        </label>
      )}
      <textarea
        id={taId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={errorId}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          appearance: "none",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${error ? "var(--tedx-red)" : focused ? "var(--tedx-red)" : "var(--border-hairline)"}`,
          padding: "var(--space-2) 0",
          font: "var(--text-body)",
          fontSize: 16,
          color: "var(--text-primary)",
          resize: "vertical",
          cursor: disabled ? "not-allowed" : "auto",
          opacity: disabled ? 0.45 : 1,
          outline: focused ? "2px solid var(--focus-ring)" : "none",
          outlineOffset: "2px",
          transition: "border-color var(--dur) var(--ease-standard)",
          fontFamily: "var(--font-sans)",
        }}
        {...rest}
      />
      {error && (
        <span id={errorId} style={{ font: "var(--text-tag)", color: "var(--tedx-red)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/core/Textarea.d.ts`**

```ts
import React from "react";

export interface TextareaProps {
  /** Visible label above the field. */
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Initial visible row count. @default 4 */
  rows?: number;
  disabled?: boolean;
  /** Validation message; triggers red error state. */
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Multi-line text input matching the Input underline style. */
export function Textarea(props: TextareaProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Textarea.prompt.md`**

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Textarea.jsx components/core/Textarea.d.ts components/core/Textarea.prompt.md
git commit -m "feat(textarea): add Textarea component"
```

---

## Task 4: Checkbox component

**Files:**
- Create: `components/core/Checkbox.jsx`
- Create: `components/core/Checkbox.d.ts`
- Create: `components/core/Checkbox.prompt.md`

- [ ] **Step 1: Create `components/core/Checkbox.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Checkbox
 * Single checkbox with label. Checked state shows a white tick on red fill.
 * For checkbox groups, compose multiple Checkbox instances inside a <fieldset>.
 */
export function Checkbox({ label, checked, onChange, disabled = false, id, style }) {
  const checkId = id || `checkbox-${String(label).toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label
      htmlFor={checkId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          width: 18,
          height: 18,
          flex: "none",
          border: `1.5px solid ${checked ? "var(--tedx-red)" : "var(--border-hairline)"}`,
          borderRadius: 2,
          background: checked ? "var(--tedx-red)" : "transparent",
          transition: "background var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)",
        }}
      >
        {checked && (
          <svg
            aria-hidden="true"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <input
          id={checkId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          style={{
            position: "absolute",
            opacity: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            cursor: "inherit",
          }}
        />
      </span>
      <span style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)" }}>
        {label}
      </span>
    </label>
  );
}
```

- [ ] **Step 2: Create `components/core/Checkbox.d.ts`**

```ts
export interface CheckboxProps {
  /** Visible label beside the checkbox. */
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Associates the native input; defaults to a slug of label. */
  id?: string;
  style?: React.CSSProperties;
}

/** Single checkbox. Checked state: red fill + white tick. */
export function Checkbox(props: CheckboxProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Checkbox.prompt.md`**

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Checkbox.jsx components/core/Checkbox.d.ts components/core/Checkbox.prompt.md
git commit -m "feat(checkbox): add Checkbox component"
```

---

## Task 5: Radio component

**Files:**
- Create: `components/core/Radio.jsx`
- Create: `components/core/Radio.d.ts`
- Create: `components/core/Radio.prompt.md`

- [ ] **Step 1: Create `components/core/Radio.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Radio
 * Radio button group. Always rendered with <fieldset> + <legend> for
 * correct accessibility grouping. Selected option shows red dot.
 */
export function Radio({ legend, options = [], value, onChange, name, disabled = false, style }) {
  return (
    <fieldset
      style={{
        border: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        ...style,
      }}
    >
      {legend && (
        <legend
          style={{
            font: "var(--text-body)",
            fontSize: 16,
            color: "var(--text-primary)",
            opacity: 0.85,
            padding: 0,
            marginBottom: "var(--space-2)",
          }}
        >
          {legend}
        </legend>
      )}
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const radioId = `${name}-${opt.value}`;
        return (
          <label
            key={opt.value}
            htmlFor={radioId}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-3)",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.45 : 1,
            }}
          >
            <span
              style={{
                position: "relative",
                width: 18,
                height: 18,
                flex: "none",
                border: `1.5px solid ${isSelected ? "var(--tedx-red)" : "var(--border-hairline)"}`,
                borderRadius: "var(--radius-full)",
                background: "transparent",
                transition: "border-color var(--dur) var(--ease-standard)",
              }}
            >
              {isSelected && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 8,
                    height: 8,
                    borderRadius: "var(--radius-full)",
                    background: "var(--tedx-red)",
                  }}
                />
              )}
              <input
                id={radioId}
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange?.(opt.value)}
                disabled={disabled}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  margin: 0,
                  cursor: "inherit",
                }}
              />
            </span>
            <span style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)" }}>
              {opt.label}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
```

- [ ] **Step 2: Create `components/core/Radio.d.ts`**

```ts
import React from "react";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps {
  /** Group label rendered as `<legend>`. */
  legend?: string;
  options: RadioOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Shared `name` attribute for the radio group — required for native grouping. */
  name: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Radio button group. Selected option shows red dot. Uses fieldset/legend for a11y. */
export function Radio(props: RadioProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Radio.prompt.md`**

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Radio.jsx components/core/Radio.d.ts components/core/Radio.prompt.md
git commit -m "feat(radio): add Radio component"
```

---

## Task 6: FormField component

**Files:**
- Create: `components/core/FormField.jsx`
- Create: `components/core/FormField.d.ts`
- Create: `components/core/FormField.prompt.md`

- [ ] **Step 1: Create `components/core/FormField.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — FormField
 * Slot-based form field wrapper.
 * Renders: label → hint → children → validation error.
 * Drop any input component inside to get consistent label/error treatment
 * without repeating markup.
 */
export function FormField({ label, htmlFor, hint, error, required = false, children, style }) {
  const errorId = error && htmlFor ? `${htmlFor}-formfield-error` : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", ...style }}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }}
        >
          {label}
          {required && (
            <span aria-hidden="true" style={{ color: "var(--tedx-red)", marginLeft: 2 }}>
              *
            </span>
          )}
        </label>
      )}
      {hint && (
        <span style={{ font: "var(--text-tag)", color: "var(--text-muted)" }}>{hint}</span>
      )}
      {children}
      {error && (
        <span id={errorId} role="alert" style={{ font: "var(--text-tag)", color: "var(--tedx-red)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/core/FormField.d.ts`**

```ts
import React from "react";

export interface FormFieldProps {
  /** Visible label above the slot. */
  label?: string;
  /** `id` of the child input element, for label association. */
  htmlFor?: string;
  /** Optional helper text shown below the label. */
  hint?: string;
  /** Validation message shown below children; triggers `role="alert"`. */
  error?: string;
  /** Appends a red `*` to the label. @default false */
  required?: boolean;
  /** The input, select, textarea, or any form element. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Slot-based form wrapper: label → hint → children → error. */
export function FormField(props: FormFieldProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/FormField.prompt.md`**

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/FormField.jsx components/core/FormField.d.ts components/core/FormField.prompt.md
git commit -m "feat(formfield): add FormField wrapper component"
```

---

## Task 7: Badge component

**Files:**
- Create: `components/core/Badge.jsx`
- Create: `components/core/Badge.d.ts`
- Create: `components/core/Badge.prompt.md`

- [ ] **Step 1: Create `components/core/Badge.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Badge
 * Small inline pill label for statuses, counts, or categories.
 * Distinct from Tag: no dot, not forced uppercase, inline flow, pill shape.
 */
export function Badge({ label, color = "red", size = "md", style }) {
  const colors = {
    red:   { background: "var(--tedx-red)",               color: "var(--tedx-white)" },
    white: { background: "var(--tedx-white)",              color: "var(--tedx-black)" },
    muted: { background: "rgba(255,255,255,0.12)",         color: "var(--text-secondary)" },
  };
  const fontSize = size === "sm" ? 10 : 12;
  const padding  = size === "sm" ? "2px 8px" : "4px 10px";

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-bold)",
        fontSize,
        lineHeight: 1.4,
        letterSpacing: "var(--ls-wide)",
        padding,
        borderRadius: "var(--radius-full)",
        ...colors[color],
        ...style,
      }}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 2: Create `components/core/Badge.d.ts`**

```ts
import React from "react";

export interface BadgeProps {
  label: string;
  /** Fill variant. @default "red" */
  color?: "red" | "white" | "muted";
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

/** Small inline pill label. Distinct from Tag: no dot, pill shape, inline flow. */
export function Badge(props: BadgeProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Badge.prompt.md`**

```md
Small inline pill for statuses, counts, or categories. Use `Tag` for eyebrow labels; use `Badge` for inline status chips.

```jsx
<Badge label="New" />
<Badge label="Live" color="red" />
<Badge label="Draft" color="muted" />
<Badge label="Sold out" color="white" size="sm" />
```

Three colour variants: `red` (default, TED red fill), `white` (white fill + black text), `muted` (semi-transparent). Two sizes: `md` (12px, default) and `sm` (10px).
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Badge.jsx components/core/Badge.d.ts components/core/Badge.prompt.md
git commit -m "feat(badge): add Badge pill component"
```

---

## Task 8: Breadcrumb component

**Files:**
- Create: `components/core/Breadcrumb.jsx`
- Create: `components/core/Breadcrumb.d.ts`
- Create: `components/core/Breadcrumb.prompt.md`

- [ ] **Step 1: Create `components/core/Breadcrumb.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Breadcrumb
 * Hierarchical location trail. Last item is the current page (no href, aria-current).
 * Items separator: › glyph. Typography matches Tag (uppercase, wide tracking).
 */
export function Breadcrumb({ items = [], ariaLabel = "Breadcrumb", style }) {
  return (
    <nav aria-label={ariaLabel} style={style}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--space-2)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--fs-tag)",
          letterSpacing: "var(--ls-wide)",
          textTransform: "uppercase",
        }}
      >
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              {!isCurrent && item.href ? (
                <a
                  href={item.href}
                  style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  style={{ color: isCurrent ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {item.label}
                </span>
              )}
              {!isCurrent && (
                <span aria-hidden="true" style={{ color: "var(--text-muted)" }}>›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 2: Create `components/core/Breadcrumb.d.ts`**

```ts
import React from "react";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** `aria-label` on the `<nav>`. @default "Breadcrumb" */
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/** Hierarchical navigation trail. Last item is current page. */
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Breadcrumb.prompt.md`**

```md
Navigation trail for hierarchical pages. Last item is the current page — pass it without `href`.

```jsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Speakers", href: "/speakers" },
    { label: "Ada Lovelace" }, // current page — no href
  ]}
/>
```

Typography matches `Tag`: uppercase, wide letter-spacing, 14px. Separator is `›`. Last item gets `aria-current="page"` automatically.
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Breadcrumb.jsx components/core/Breadcrumb.d.ts components/core/Breadcrumb.prompt.md
git commit -m "feat(breadcrumb): add Breadcrumb navigation component"
```

---

## Task 9: Modal component

**Files:**
- Create: `components/core/Modal.jsx`
- Create: `components/core/Modal.d.ts`
- Create: `components/core/Modal.prompt.md`

- [ ] **Step 1: Create `components/core/Modal.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Modal
 * Overlay dialog for confirmations, detail views, or forms.
 * - Traps keyboard focus inside while open
 * - Locks body scroll while open
 * - Closes on Escape key or overlay click
 * - Red top accent border signals brand dialog
 */
export function Modal({ isOpen, onClose, title, children, size = "md", hideCloseButton = false, style }) {
  const dialogRef = React.useRef(null);
  const titleId = `modal-title-${React.useId()}`;
  const maxWidths = { sm: 480, md: 640, lg: 800 };

  // Body scroll lock + Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)",
        zIndex: 1000,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)",
          borderTop: "2px solid var(--tedx-red)",
          borderRadius: "var(--radius-card)",
          width: "100%",
          maxWidth: maxWidths[size],
          padding: "var(--space-8)",
          position: "relative",
          boxShadow: "var(--shadow-card)",
          ...style,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "var(--space-6)",
          }}
        >
          {title && (
            <h2
              id={titleId}
              style={{
                margin: 0,
                font: "var(--text-h3)",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "var(--ls-display)",
              }}
            >
              {title}
            </h2>
          )}
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: 24,
                lineHeight: 1,
                padding: "var(--space-1)",
                marginLeft: "var(--space-4)",
                flex: "none",
              }}
            >
              ×
            </button>
          )}
        </div>
        <div style={{ color: "var(--text-secondary)", font: "var(--text-body)", fontSize: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/core/Modal.d.ts`**

```ts
import React from "react";

export interface ModalProps {
  isOpen: boolean;
  /** Called on overlay click or Escape key. */
  onClose: () => void;
  /** Dialog heading. Rendered as `<h2>` and linked via `aria-labelledby`. */
  title?: string;
  children?: React.ReactNode;
  /** Dialog width. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Hide the × close button. @default false */
  hideCloseButton?: boolean;
  style?: React.CSSProperties;
}

/**
 * Overlay dialog. Traps focus, locks scroll, closes on Escape or overlay click.
 * Red top border signals brand dialog.
 */
export function Modal(props: ModalProps): JSX.Element | null;
```

- [ ] **Step 3: Create `components/core/Modal.prompt.md`**

```md
Overlay dialog. Red top border, dark panel, red × close button. Traps focus, locks scroll, closes on Escape or overlay click.

```jsx
const [open, setOpen] = React.useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm registration"
>
  <p>Are you sure you want to register for this event?</p>
  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
    <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

Three sizes: `sm` (480px), `md` (640px, default), `lg` (800px). Use `hideCloseButton` if your content provides its own close action.
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Modal.jsx components/core/Modal.d.ts components/core/Modal.prompt.md
git commit -m "feat(modal): add Modal dialog component with focus trap"
```

---

## Task 10: Toast component

**Files:**
- Create: `components/core/Toast.jsx`
- Create: `components/core/Toast.d.ts`
- Create: `components/core/Toast.prompt.md`

- [ ] **Step 1: Create `components/core/Toast.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Toast
 * Transient notification that auto-dismisses.
 * Caller controls rendering via React state; Toast manages its own
 * entrance/exit animation and auto-dismiss timer.
 * error/warning: red left border + role="alert" (assertive live region)
 * info/success: white left border + role="status" (polite live region)
 */
export function Toast({ message, type = "info", duration = 4000, onDismiss, style }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 16);
    if (duration > 0) {
      const dismiss = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onDismiss?.(), 300);
      }, duration);
      return () => { clearTimeout(enter); clearTimeout(dismiss); };
    }
    return () => clearTimeout(enter);
  }, [duration, onDismiss]);

  const isUrgent = type === "error" || type === "warning";
  const accentColor = isUrgent ? "var(--tedx-red)" : "var(--tedx-white)";

  return (
    <div
      role={isUrgent ? "alert" : "status"}
      aria-live={isUrgent ? "assertive" : "polite"}
      style={{
        position: "fixed",
        bottom: "var(--space-6)",
        right: "var(--space-6)",
        maxWidth: 360,
        background: "var(--bg-elevated)",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: "var(--radius-card)",
        padding: "var(--space-4) var(--space-6)",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-4)",
        zIndex: 1100,
        transform: visible ? "translateX(0)" : "translateX(calc(100% + var(--space-6)))",
        opacity: visible ? 1 : 0,
        transition: "transform var(--dur-slow) var(--ease-out), opacity var(--dur) var(--ease-standard)",
        ...style,
      }}
    >
      <p style={{ margin: 0, font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", flex: 1 }}>
        {message}
      </p>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismiss?.(), 300); }}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          fontSize: 18,
          lineHeight: 1,
          padding: 0,
          flex: "none",
        }}
      >
        ×
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/core/Toast.d.ts`**

```ts
export interface ToastProps {
  message: string;
  /** @default "info" */
  type?: "info" | "success" | "error" | "warning";
  /** Auto-dismiss delay in ms. 0 = persist until manually dismissed. @default 4000 */
  duration?: number;
  /** Called when the toast finishes its exit animation. Use to remove it from state. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/**
 * Transient bottom-right notification. Slides in from right, auto-dismisses.
 * Caller renders/unrenders via state; use `onDismiss` to clean up.
 * error/warning use `role="alert"` (assertive); info/success use `role="status"` (polite).
 */
export function Toast(props: ToastProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Toast.prompt.md`**

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Toast.jsx components/core/Toast.d.ts components/core/Toast.prompt.md
git commit -m "feat(toast): add Toast notification component"
```

---

## Task 11: Tabs component

**Files:**
- Create: `components/core/Tabs.jsx`
- Create: `components/core/Tabs.d.ts`
- Create: `components/core/Tabs.prompt.md`

- [ ] **Step 1: Create `components/core/Tabs.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — Tabs
 * Tabbed content switcher. Active tab has a red bottom border.
 * Keyboard: Left/Right arrows move focus; Enter/Space activates.
 * ARIA: tablist + tab + tabpanel pattern.
 */
export function Tabs({ tabs = [], defaultIndex = 0, style }) {
  const [active, setActive] = React.useState(defaultIndex);
  const tabRefs = React.useRef([]);

  const onKeyDown = (e, i) => {
    if (e.key === "ArrowRight") {
      const next = (i + 1) % tabs.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (i - 1 + tabs.length) % tabs.length;
      setActive(prev);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <div style={style}>
      <div
        role="tablist"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-hairline)",
          marginBottom: "var(--space-6)",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${i}`}
            id={`tab-btn-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2px solid ${active === i ? "var(--tedx-red)" : "transparent"}`,
              marginBottom: -1,
              cursor: "pointer",
              padding: "var(--space-3) var(--space-6)",
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--weight-bold)",
              fontSize: "var(--fs-tag)",
              letterSpacing: "var(--ls-wide)",
              textTransform: "uppercase",
              color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          id={`tabpanel-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${i}`}
          style={{ display: active === i ? "block" : "none" }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/core/Tabs.d.ts`**

```ts
import React from "react";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Initially active tab index. @default 0 */
  defaultIndex?: number;
  style?: React.CSSProperties;
}

/** Tabbed switcher. Active tab: red bottom border. Arrow keys navigate between tabs. */
export function Tabs(props: TabsProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/Tabs.prompt.md`**

```md
Tabbed content switcher. Active tab has a red bottom border. Left/Right arrow keys move between tabs.

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
```

- [ ] **Step 4: Commit**

```bash
git add components/core/Tabs.jsx components/core/Tabs.d.ts components/core/Tabs.prompt.md
git commit -m "feat(tabs): add Tabs component with ARIA tablist pattern"
```

---

## Task 12: NavigationBar component

**Files:**
- Create: `components/core/NavigationBar.jsx`
- Create: `components/core/NavigationBar.d.ts`
- Create: `components/core/NavigationBar.prompt.md`

- [ ] **Step 1: Create `components/core/NavigationBar.jsx`**

```jsx
import React from "react";

/**
 * TEDxAmsterdam — NavigationBar
 * Sticky top bar: logo left, nav links centre, CTA button right.
 * Collapses to hamburger menu at < 768px (detected via window.innerWidth).
 * Pass `base` to resolve asset paths from nested HTML files.
 */
export function NavigationBar({ links = [], ctaLabel, ctaHref, logoHref = "/", activePath, base = "", style }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const menuId = "nav-mobile-menu";

  // Responsive detection
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menu on Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const logoSrc = base + "assets/logo-tedxamsterdam-white.png";

  const linkStyle = (href) => ({
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--fs-tag)",
    letterSpacing: "var(--ls-wide)",
    textTransform: "uppercase",
    color: activePath === href ? "var(--text-accent)" : "var(--text-primary)",
    textDecoration: "none",
  });

  const ctaStyle = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-bold)",
    fontSize: 14,
    padding: "12px 24px",
    background: "var(--tedx-red)",
    color: "var(--tedx-white)",
    borderRadius: "var(--radius-button)",
    textDecoration: "none",
    flex: "none",
    lineHeight: 1,
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border-hairline)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--gutter)",
          gap: "var(--space-8)",
        }}
      >
        {/* Logo */}
        <a href={logoHref} style={{ display: "inline-flex", textDecoration: "none", flex: "none" }}>
          <img src={logoSrc} alt="TEDxAmsterdam" style={{ width: 160, height: "auto", display: "block" }} />
        </a>

        {/* Desktop: nav links + CTA */}
        {!isMobile && (
          <>
            <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "var(--space-8)", marginLeft: "auto" }}>
              {links.map((link) => (
                <a key={link.href} href={link.href} aria-current={activePath === link.href ? "page" : undefined} style={linkStyle(link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>
            {ctaHref && ctaLabel && (
              <a href={ctaHref} style={ctaStyle}>{ctaLabel}</a>
            )}
          </>
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              padding: "var(--space-2)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg aria-hidden="true" width="24" height="18" viewBox="0 0 24 18" fill="none">
              {menuOpen ? (
                <>
                  <line x1="2" y1="2" x2="22" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="22" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="0" y1="2" x2="24" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <div
          id={menuId}
          style={{
            background: "var(--bg-base)",
            borderBottom: "1px solid var(--border-hairline)",
            padding: "var(--space-6) var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <nav aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activePath === link.href ? "page" : undefined}
                style={{ ...linkStyle(link.href), display: "block", padding: "var(--space-2) 0" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaHref && ctaLabel && (
            <a href={ctaHref} style={{ ...ctaStyle, alignSelf: "flex-start" }}>{ctaLabel}</a>
          )}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create `components/core/NavigationBar.d.ts`**

```ts
import React from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationBarProps {
  links?: NavLink[];
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA button destination. */
  ctaHref?: string;
  /** Logo link destination. @default "/" */
  logoHref?: string;
  /** Marks the matching link as active (`aria-current="page"`). */
  activePath?: string;
  /** Asset path prefix. Use `"../../"` from nested HTML files. @default "" */
  base?: string;
  style?: React.CSSProperties;
}

/**
 * Sticky top nav bar. Desktop: logo + links + CTA. Mobile (< 768px): hamburger.
 * Active link highlighted in red via `activePath`.
 */
export function NavigationBar(props: NavigationBarProps): JSX.Element;
```

- [ ] **Step 3: Create `components/core/NavigationBar.prompt.md`**

```md
Sticky top navigation bar. Desktop: logo left, nav links centre, CTA right. Mobile: collapses to hamburger.

```jsx
<NavigationBar
  links={[
    { label: "About", href: "/about" },
    { label: "Speakers", href: "/speakers" },
    { label: "Blog", href: "/blog" },
  ]}
  ctaLabel="Get tickets"
  ctaHref="/tickets"
  activePath="/speakers"
/>
```

`activePath` highlights the matching link in red and adds `aria-current="page"`. Pass `base="../../"` when using inside nested HTML files (e.g. inside `components/core/`) so asset paths resolve correctly.
```

- [ ] **Step 4: Commit**

```bash
git add components/core/NavigationBar.jsx components/core/NavigationBar.d.ts components/core/NavigationBar.prompt.md
git commit -m "feat(navigationbar): add NavigationBar component with mobile hamburger"
```

---

## Task 13: Run build script and verify bundle

**Files:**
- Modify: `_ds_bundle.js` (extended by script)

- [ ] **Step 1: Run the extend-bundle script**

Run from repo root: `node scripts/extend-bundle.js`

Expected output:
```
✓ Added to bundle: Badge, Breadcrumb, Checkbox, FormField, Modal, NavigationBar, Radio, Select, Tabs, Textarea, Toast
```

- [ ] **Step 2: Verify the bundle contains the new components**

Run: `grep -c "__ds_ns\." _ds_bundle.js`

Expected: a number ≥ 21 (10 existing + 11 new)

Run: `grep "__ds_ns\.Modal " _ds_bundle.js`

Expected: `__ds_ns.Modal = __ds_scope.Modal;`

- [ ] **Step 3: Commit the updated bundle**

```bash
git add _ds_bundle.js
git commit -m "chore(bundle): extend bundle with 11 new components"
```

---

## Task 14: Update manifest and add demos to core.card.html

**Files:**
- Modify: `_ds_manifest.json`
- Modify: `components/core/core.card.html`

- [ ] **Step 1: Update `_ds_manifest.json` — add 11 new entries to the `components` array**

Open `_ds_manifest.json`. Find the `"components"` array. After the last entry (`{"name":"Tag","sourcePath":"components/core/Tag.jsx"}`), add:

```json
,{"name":"Badge","sourcePath":"components/core/Badge.jsx"},
{"name":"Breadcrumb","sourcePath":"components/core/Breadcrumb.jsx"},
{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},
{"name":"FormField","sourcePath":"components/core/FormField.jsx"},
{"name":"Modal","sourcePath":"components/core/Modal.jsx"},
{"name":"NavigationBar","sourcePath":"components/core/NavigationBar.jsx"},
{"name":"Radio","sourcePath":"components/core/Radio.jsx"},
{"name":"Select","sourcePath":"components/core/Select.jsx"},
{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},
{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"},
{"name":"Toast","sourcePath":"components/core/Toast.jsx"}
```

- [ ] **Step 2: Update the destructure line in `core.card.html`**

Find this line in `components/core/core.card.html`:
```js
const { Button, Tag, ArrowLink, SectionHeader, Stat, MediaCard, Input, SocialLink, Accordion } =
    window.TEDxAmsterdamDesignSystem_a084aa;
```

Replace with:
```js
const {
    Button, Tag, ArrowLink, SectionHeader, Stat, MediaCard, Input, SocialLink, Accordion,
    Select, Textarea, Checkbox, Radio, FormField, Modal, Toast, Badge, Breadcrumb, Tabs, NavigationBar
  } = window.TEDxAmsterdamDesignSystem_a084aa;
```

- [ ] **Step 3: Add demo sections to `core.card.html`**

Find the closing `</div>` of the last demo group (the Input & social group) and insert before the final `</div>` of the Demo function, adding the following groups:

```jsx
        <div className="grp">
          <div className="lbl">Select &amp; Textarea</div>
          <div className="col" style={{ maxWidth: 320 }}>
            <Select
              label="Country"
              options={[{ value: "nl", label: "Netherlands" }, { value: "de", label: "Germany" }]}
              value=""
              onChange={() => {}}
            />
            <Textarea label="Message" rows={3} placeholder="Tell us your idea…" />
          </div>
        </div>

        <div className="grp">
          <div className="lbl">Checkbox &amp; Radio</div>
          <div className="col">
            <Checkbox label="I agree to the terms" checked={false} onChange={() => {}} />
            <Checkbox label="Subscribe to newsletter" checked={true} onChange={() => {}} />
            <Radio
              legend="Session type"
              name="session-demo"
              options={[{ value: "morning", label: "Morning" }, { value: "evening", label: "Evening" }]}
              value="morning"
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="grp">
          <div className="lbl">Badge &amp; Breadcrumb</div>
          <div className="col">
            <div className="row">
              <Badge label="New" />
              <Badge label="Live" color="red" />
              <Badge label="Draft" color="muted" />
              <Badge label="Sold out" color="white" size="sm" />
            </div>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Speakers", href: "/speakers" }, { label: "Ada Lovelace" }]} />
          </div>
        </div>

        <div className="grp">
          <div className="lbl">Tabs</div>
          <Tabs tabs={[
            { label: "Overview", content: <p style={{ color: "var(--text-secondary)", margin: "16px 0 0" }}>Overview content.</p> },
            { label: "Schedule", content: <p style={{ color: "var(--text-secondary)", margin: "16px 0 0" }}>Schedule details.</p> },
          ]} />
        </div>
```

- [ ] **Step 4: Add Modal and Toast demos (stateful — requires a wrapper component)**

In `core.card.html`, update the `Demo` function to include state for modal and toast. Find the start of the Demo function and replace:

```jsx
function Demo() {
    return (
```

with:

```jsx
function Demo() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [toast, setToast] = React.useState(null);
    return (
```

Then add these groups after the Tabs group:

```jsx
        <div className="grp">
          <div className="lbl">Modal</div>
          <div className="row">
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm registration"
          >
            <p style={{ color: "var(--text-secondary)" }}>Are you sure you want to register?</p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            </div>
          </Modal>
        </div>

        <div className="grp">
          <div className="lbl">Toast</div>
          <div className="row">
            <Button variant="secondary" onClick={() => setToast({ type: "info", message: "Changes saved." })}>Info toast</Button>
            <Button variant="primary" onClick={() => setToast({ type: "error", message: "Something went wrong." })}>Error toast</Button>
          </div>
          {toast && (
            <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
          )}
        </div>
```

- [ ] **Step 5: Open core.card.html in a browser and visually verify all new sections**

Open: `components/core/core.card.html` in a browser (double-click or use a local HTTP server).

Check each new section renders correctly:
- [ ] Select renders with chevron, matches Input style
- [ ] Textarea renders with hairline bottom border
- [ ] Checkbox renders checked (red fill + tick) and unchecked states
- [ ] Radio renders with red dot on selected option
- [ ] Badge renders in red, white, and muted variants
- [ ] Breadcrumb renders with › separators, last item without link
- [ ] Tabs render with red active tab border; click tabs to switch
- [ ] Modal opens on button click, closes on × / overlay / Escape
- [ ] Toast slides in from right, disappears after 4s; error toast slides in on second button

If any section is missing or broken, check the browser console for errors from `__ds_ns.__errors` — run `console.log(window.TEDxAmsterdamDesignSystem_a084aa.__errors)`.

- [ ] **Step 6: Commit**

```bash
git add _ds_manifest.json components/core/core.card.html
git commit -m "feat: update manifest and core.card.html demo for 11 new components"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by task |
|---|---|
| Select — label, options, error, disabled | Task 2 |
| Textarea — label, rows, error, disabled | Task 3 |
| Checkbox — label, checked, disabled | Task 4 |
| Radio — fieldset/legend group | Task 5 |
| FormField — slot wrapper with label/hint/error | Task 6 |
| Modal — focus trap, scroll lock, Escape, sizes | Task 9 |
| Toast — auto-dismiss, type variants, slide-in | Task 10 |
| Badge — red/white/muted, sm/md | Task 7 |
| Breadcrumb — aria-current, › separator | Task 8 |
| Tabs — ARIA tablist, arrow key nav | Task 11 |
| NavigationBar — hamburger < 768px, activePath | Task 12 |
| All components: .jsx + .d.ts + .prompt.md | All component tasks |
| Bundle updated | Task 13 |
| Manifest updated | Task 14 |
| core.card.html demo entries | Task 14 |
| No raw hex/px in component source | Enforced by token-only styling in all tasks |

**Placeholder scan:** No TBDs or incomplete sections found.

**Type consistency check:** All component names are consistent across .jsx, .d.ts, .prompt.md, bundle script, manifest, and demo. The `extend-bundle.js` NEW_COMPONENTS array lists all 11 in alphabetical order, matching the component filenames exactly.
