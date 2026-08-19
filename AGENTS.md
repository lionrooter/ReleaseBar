Work style: terse.

## Lionroot fork

- Keep `releasebar.config.json` Lionroot owners/domain. Do not revert to upstream defaults.
- `.github/workflows/deploy.yml` and `monitor.yml` are gated to `steipete/ReleaseBar`. This fork must not wrangler-deploy or smoke https://release.bar.
- Worker service in this fork remains `lionroot-releasebar` (OpenClaw account). Do not point `wrangler.toml` at upstream `releasedeck-api` / steipete prod.

## Deploy

- This fork is not steipete prod. Worker service is `lionroot-releasebar` on the OpenClaw Cloudflare account (`wrangler.toml`). Do not retarget to `releasedeck-api` or enable `release.bar` deploys.
- Deploy and Monitor jobs in `.github/workflows/` are gated to `steipete/ReleaseBar` only. Push to `main` on this fork must not wrangler-deploy or smoke https://release.bar.
- Do not add `CLOUDFLARE_API_TOKEN` to this repository to "enable" the inherited deploy workflow.
- Optional local Wrangler: see `docs/lionroot-deploy.md`.
- Repo/product name: ReleaseBar. Config file: `releasebar.config.json` (keep Lionroot owners/domain).
- Local real-data dev: `npm run dev:worker:real` uses Wrangler `--remote` on port 8787 with real secrets and preview KV.
- Static CI/proof: `npm run check:static`.
