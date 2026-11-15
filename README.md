# claude-comp-lib

React + TypeScript component library styled with SCSS design tokens, showcased in Storybook.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Storybook at http://localhost:6006 |
| `npm run build` | Type-check, then build the library to `dist/` (ESM + CJS + `.d.ts` + `styles.css`) |
| `npm run build-storybook` | Static Storybook in `storybook-static/` |

## Components

`Badge` · `Button` · `Card` · `Chip` · `Input` · `TextArea` · `Select` · `Checkbox` · `RadioGroup` / `Radio` · `Switch` · `FormField` / `Label` · `PageLayout`

- `FormField` wires label, hint and error to the control inside it (`id`, `aria-describedby`, `aria-invalid`, `required`, `disabled`) through context.
- `PageLayout` has a `header` slot, a body (`children`), an optional `footer`, a `maxWidth`, an optional sticky header, and a skip link.
- Every control uses `forwardRef` and passes through its native HTML attributes.

## Design tokens

`src/tokens/theme.json` is the source of truth. `npm run tokens` turns it into Sass maps (it also runs before `dev`, `storybook` and `build`; `npm run tokens:check` fails if the generated file is stale).

```
src/tokens/
  theme.json             Source tokens: colors, radius, border width, type, opacity
  _generated-theme.scss  GENERATED from theme.json. Don't edit by hand
  _primitives.scss       Scales theme.json doesn't cover: space, shadow, motion, z-index, sizes
  _semantic.scss         Colors derived from theme values (focus halos)
  _tokens.scss           Flattens everything into emit-ready maps + the list of valid names
  _functions.scss        token('name') → var(--ds-name), and fails the build on unknown names
  _mixins.scss           focus-ring, control-surface, text(), transition(), breakpoint-up()…
scripts/build-tokens.mjs theme.json → _generated-theme.scss
src/styles/
  _theme.scss            Emits CSS custom properties on :root
```

theme.json paths are flattened to kebab-case: `colors.surface.primary.hover` → `token('color-surface-primary-hover')`, `borderRadius.md` → `token('radius-md')`. Font sizes and line heights become rem.

Tier 3 lives in each component's SCSS as private custom properties (`--_bg`, `--_height`). Variants and sizes only override those properties.

The theme fonts (DM Sans, Roboto, Chivo Mono) aren't bundled. Load them in the host app.

## Consuming

```tsx
import 'claude-comp-lib/styles.css';
import { Button, FormField, Input } from 'claude-comp-lib';
```

```scss
@use 'claude-comp-lib/tokens' as *;
.card { padding: token('space-6'); background: token('color-surface-default'); }
```
