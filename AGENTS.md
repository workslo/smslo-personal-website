This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
bun run dev           # Start dev server (runs migrations, seeds, generates types)
bunx emdash types     # Regenerate TypeScript types from schema
bunx emdash seed seed/seed.json --validate  # Validate seed file
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

`bun` is required (enforced via `packageManager: bun@1.2.0` and a preinstall guard in `package.json`). `npm install` / `yarn install` will refuse to run.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/worker.ts`          | Cloudflare Worker entrypoint                                                       |
| `src/middleware.ts`      | Security response headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). Skips `/_emdash/` admin routes. |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |
| `.github/workflows/`     | `ci.yml` (typecheck + build on PRs) and `deploy.yml` (Wrangler deploy on push to main) |

## Skills

Agent skills are in `.agents/skills/`. `.claude/skills` is a symlink → `.agents/skills` so both Claude Code and other agent runners pick them up from the same source. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- Always call `Astro.cache.set(cacheHint)` on pages that query content.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).
