# VoltPro UI — Dev Notes

## Stack
- React 19 + Vite + ESLint
- **Tailwind CSS v4** (utility-first styling)
- Font Awesome (free icons — already installed)

---

## Create React App (Vite template)
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```
> Opens on `http://localhost:5173`

---

## Common Commands
| Command | What it does |
|---|---|
| `npm install` | Install all dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Tailwind CSS v4

**Already configured in this project.** For a new Vite + React project:

### 1. Install packages
```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Add the Vite plugin — `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3. Import Tailwind in your main CSS — `src/index.css`
```css
@import "tailwindcss";
```
That single line replaces the old `@tailwind base/components/utilities` directives.

### 4. Define custom design tokens with `@theme`
```css
@import "tailwindcss";

@theme {
  --font-family-sans: "Outfit", sans-serif;
  --color-brand-black:  #0A0F1E;
  --color-brand-accent: #22C55E;
}
```
Tokens defined in `@theme` automatically become Tailwind utility classes:
`bg-brand-black`, `text-brand-accent`, `font-sans`, etc.

### 5. Use utilities in JSX
```jsx
<button className="bg-brand-accent text-brand-black px-6 py-3 rounded font-bold hover:opacity-90">
  Click me
</button>
```

### 6. Arbitrary values
Use `[value]` syntax for one-off values not in the theme:
```jsx
<div className="w-[340px] text-[13px] tracking-[1.5px] shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
```

### 7. Responsive breakpoints
```jsx
<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4" />
```
Default breakpoints: `sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px.
Use `max-md:` prefix for max-width queries.

> Full docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## Font Awesome (Free)

**Already installed in this project.** For a new project:
```bash
npm install @fortawesome/fontawesome-svg-core \
            @fortawesome/free-solid-svg-icons \
            @fortawesome/free-regular-svg-icons \
            @fortawesome/free-brands-svg-icons \
            @fortawesome/react-fontawesome
```

**Usage:**
```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

<FontAwesomeIcon icon={faBolt} />
```

> Browse icons at [fontawesome.com/icons](https://fontawesome.com/icons) — filter by "Free"
