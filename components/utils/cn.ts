/** Joins class names, filtering falsy values. Replaces clsx/classnames — no extra dep. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
