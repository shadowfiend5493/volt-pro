# VoltPro UI — Dev Notes

## Stack
- React 19 + Vite + ESLint
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
