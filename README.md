# VoltPro Project Journal

VoltPro is a B2B electrical engineering platform. This repository currently contains a React/Vite UI in `volt-pro-ui/` and a Spring Boot backend in `voltstore/`.

## Milestones

| Milestone | What Was Built | Concepts Practiced |
|---|---|---|
| Project setup | React 19 + Vite UI, Tailwind CSS v4, Font Awesome, Spring Boot API | Vite structure, Tailwind theme tokens, API/client separation |
| Landing page | Header, hero, stats bar, trusted-by section | Component composition, responsive utility classes, reusable design tokens |
| Engineer directory | `/engineers` route loads engineers from `/api/v1/engineers` | React Router, Axios API client, Spring controller/service/repository flow |
| Search and sort | Reusable `SearchBox` and `Dropdown`; filter by name/role/location; sort by name/rating/location | Controlled components, event handlers, derived lists with `useMemo` |
| Engineer cards | Engineer photo, role, location, and decimal rating display | Card layout, Font Awesome icons, accessible image alt text |
| Decimal ratings | Backend supports `DECIMAL(2,1)` ratings; UI fills stars by decimal percentage | Dynamic inline style for runtime width, decimal formatting with `toFixed(1)` |
| Pagination | Engineers are shown 6 per page with previous/next and page buttons | Client-side pagination, page clamping, resetting page on search/sort |
| Sample data | 29 engineers seeded in H2 using `data.sql` | SQL seed data, schema updates, DTO/entity field mapping |

## UI Concepts Learned

- `useState` stores local UI state like search text, selected sort option, current page, loading, and error.
- `useEffect` is used for one-time API loading when a page first renders.
- `useMemo` is useful for derived data like filtered, sorted, and paginated engineer lists.
- Controlled inputs keep form values in React state and notify the parent through handlers.
- Reusable components like `SearchBox` and `Dropdown` reduce repeated JSX and keep behavior consistent.
- Sorting should copy arrays before calling `.sort()` so React state is not mutated directly.
- Pagination should run after filtering and sorting so every page respects the active controls.
- Decimal star ratings can be shown by overlaying a filled star on an empty star and changing the filled width.
- Tailwind utilities should handle component styling; inline styles are only used for dynamic runtime values.

## Current Feature Summary

- Users can browse engineer cards with photo, name, role, location, and rating.
- Users can search engineers by name, role, or location.
- Users can sort engineers by name, rating, or location.
- Users can move through engineer results with pagination.
- Backend engineer data includes `photoUrl` and decimal `rating`.

## Useful Commands

| Area | Command |
|---|---|
| UI dev server | `cd volt-pro-ui && npm run dev` |
| UI lint/build | `cd volt-pro-ui && npm run lint && npm run build` |
| Backend tests | `cd voltstore && /opt/homebrew/bin/mvn clean test` |

## Development Note

When a new UI feature or React concept is added, update this README with a short milestone or learning bullet so the project doubles as a learning journal.
