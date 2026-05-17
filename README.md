# smslo-personal-website

Shane Slosar's personal site. A blog built on [EmDash](https://github.com/emdash-cms/emdash) (Astro CMS), deployed on Cloudflare Workers with D1 and R2.

## What's Included

- Featured post hero on the homepage
- Post archive with reading time estimates
- Category and tag archives
- Full-text search
- RSS feed
- SEO metadata and JSON-LD
- Dark/light mode
- Forms plugin and webhook notifier

## Pages

| Page | Route |
|---|---|
| Homepage | `/` |
| All posts | `/posts` |
| Single post | `/posts/:slug` |
| Category archive | `/category/:slug` |
| Tag archive | `/tag/:slug` |
| Search | `/search` |
| Static pages | `/pages/:slug` |
| 404 | fallback |

## Infrastructure

- **Runtime:** Cloudflare Workers
- **Database:** D1
- **Storage:** R2
- **Framework:** Astro with `@astrojs/cloudflare`
- **Security headers:** Astro middleware (`src/middleware.ts`)
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`, `deploy.yml`) — typecheck + build on PRs, Wrangler deploy on push to `main`

## Local Development

**Requires [bun](https://bun.sh) ≥ 1.2.** A `preinstall` guard blocks `npm` and `yarn`.

```bash
bun install
bun run bootstrap   # first-time only: runs migrations + seeds DB
bun run dev         # starts dev server with migrations + type generation
```

The dev server runs at `http://localhost:4321`. The EmDash admin UI is at `http://localhost:4321/_emdash/admin`.

> `bun run dev` wraps `emdash dev`, which runs DB migrations and regenerates TypeScript types before starting Astro. Use it instead of `astro dev` directly.

## Deploying

```bash
bun run deploy
```

CI/CD: push to `main` triggers `.github/workflows/deploy.yml`, which runs `wrangler deploy` via `cloudflare/wrangler-action` using `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.

## See Also

- [EmDash documentation](https://github.com/emdash-cms/emdash/tree/main/docs)
