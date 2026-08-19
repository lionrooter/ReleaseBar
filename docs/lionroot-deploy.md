# Lionroot ReleaseBar Deployment

This fork tracks upstream `steipete/ReleaseBar` while configuring the dashboard for Lionroot/OpenClaw owners.

## Current Lionroot changes

- `releasebar.config.json` watches `lionrooter`, `openclaw`, `lionroot-game-dev`, `fisher-family-code`, and `lionroot-studio`.
- `wrangler.toml` uses Worker service `lionroot-releasebar` and the OpenClaw Cloudflare account ID.
- Private repositories are still intentionally unsupported by upstream ReleaseBar. Command Post's ReleaseBar surface keeps private-repo/Ralph workflow signals as the Lionroot extension layer.

## GitHub Actions

Inherited `Deploy` and `Monitor` workflows are gated to `steipete/ReleaseBar` only. Push to `main` on this fork must not `wrangler deploy` or smoke `https://release.bar`. Do not add `CLOUDFLARE_API_TOKEN` to this repository to "enable" that workflow.

## Deploy

Manual Wrangler deploy is local-only and optional. Authenticate Wrangler first:

```sh
npx wrangler login
# or set CLOUDFLARE_API_TOKEN in CI/local env
```

Then create/update required Cloudflare bindings for this account if needed, set Worker secrets, and deploy:

```sh
npm run check:static
npm exec --yes --package wrangler -- wrangler deploy
```

Required upstream secrets when GitHub App login/quota is enabled:

- `GITHUB_APP_CLIENT_ID`
- `GITHUB_APP_CLIENT_SECRET`
- `GITHUB_APP_ID`
- `GITHUB_APP_PRIVATE_KEY`
- `AUTH_COOKIE_SECRET`

Optional:

- `OPENAI_API_KEY`
- `OPENAI_SUMMARY_MODEL`
