# PRD: Lionroot ReleaseBar Fork Configuration

**Status:** Approved
**Date:** 2026-05-27

## Goal

Configure the `lionrooter/ReleaseBar` fork so it tracks Lionroot/OpenClaw public release freshness while preserving upstream ReleaseBar compatibility.

## Requirements

- Configure dashboard owners for Lionroot/OpenClaw/family/studio GitHub accounts.
- Avoid deploying to Peter Steinberger's Cloudflare account or worker service.
- Document Lionroot deployment prerequisites and private-repo caveat.
- Keep upstream ReleaseBar source intact except config/deploy documentation.

## Acceptance Criteria

- `releasebar.config.json` points at Lionroot-related owners.
- `wrangler.toml` uses a Lionroot/OpenClaw-safe worker name/account.
- Deployment notes exist.
- Static upstream check passes.
