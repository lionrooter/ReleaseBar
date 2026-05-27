# Plan: Lionroot ReleaseBar Fork Configuration

**Status:** Approved
**Date:** 2026-05-27

## Tasks

- [x] Fork `steipete/ReleaseBar` to `lionrooter/ReleaseBar`.
- [x] Clone fork locally.
- [x] Configure `releasebar.config.json` for Lionroot/OpenClaw owners.
- [x] Change Worker service/account away from upstream production.
- [x] Add deployment notes for Wrangler auth/secrets.
- [x] Run `npm run check:static`.

## Verification

- `npm run check:static` passed on 2026-05-27 with 144 tests passing.
- Wrangler deploy is blocked locally until `wrangler login` or `CLOUDFLARE_API_TOKEN` is available.
