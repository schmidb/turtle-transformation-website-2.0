# Infrastructure runbook

How `turtletrafo.com` is hosted and where each piece lives. No credentials are stored here.
Last verified: 13 November 2026.

## Overview

| Name | Serves | Where |
|---|---|---|
| `turtletrafo.com` | This repo (the live site) | GitHub Pages |
| `www.turtletrafo.com` | 301 to `turtletrafo.com` | GitHub Pages (CNAME to `schmidb.github.io`) |
| `turtletrafo.de`, `www.turtletrafo.de` | 301 to `https://turtletrafo.com` (path and query kept) | AWS CloudFront function |
| `old.turtletrafo.com` | Legacy GoHighLevel (GHL) site, `noindex` | GHL |
| Email (`info@turtletrafo.com`) | Google Workspace | Google |

DNS for both domains is in **AWS Route53** (one public hosted zone each):

| Zone | Hosted zone ID |
|---|---|
| `turtletrafo.com` | `Z08133291I3QQ9OM3ZE74` |
| `turtletrafo.de` | `Z02141123VFTV3HITQVQP` |

## GitHub Pages

- Source: this repo, workflow `.github/workflows/deploy.yml`, triggered by pushes to `main`.
- Settings, Pages: custom domain `turtletrafo.com`, **Enforce HTTPS** on. `public/CNAME` also contains `turtletrafo.com`.
- Repo variable `USE_CUSTOM_DOMAIN` must be `true` (Settings, Secrets and variables, Actions, Variables). If it is missing the site is built for the github.io sub-path and the live site loses its CSS and images.
- Domain verification: if GitHub asks for a TXT challenge record, add it to the `.com` zone.

## `turtletrafo.com` DNS (zone Z08133291I3QQ9OM3ZE74)

| Name | Type | Value | Purpose |
|---|---|---|---|
| `turtletrafo.com` | A | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` | GitHub Pages |
| `turtletrafo.com` | AAAA | `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153` | GitHub Pages |
| `www` | CNAME | `schmidb.github.io` | GitHub Pages |
| `old` | CNAME | `sites.ludicrous.cloud` | Legacy GHL site |
| `turtletrafo.com` | MX | Google Workspace (`ASPMX.L.GOOGLE.COM` and ALT1 to ALT4) | Email |
| `turtletrafo.com` | TXT | SPF `v=spf1 include:_spf.google.com ~all` plus site verifications | Email, verification |
| `google._domainkey` | TXT | Google Workspace DKIM key (2048-bit, split in two quoted strings) | Email signing |
| `_dmarc` | TXT | `v=DMARC1; p=reject; pct=100` | Email policy |
| `mail`, `_dmarc.mail`, `krs._domainkey.mail`, `email.mail` | MX, TXT, CNAME | Mailgun / GHL sending subdomain | Legacy GHL email |
| `academy`, `office`, `ppa`, `fullpotential` | CNAME | GHL hosts (`clientportal`, `brand`, `sites.ludicrous.cloud`) | Other GHL sites |
| `aimediastudio` | CNAME | `ghs.googlehosted.com` | Google site |

Do not touch the MX, SPF, DKIM, DMARC and `mail.*` records unless you are changing email.

## `turtletrafo.de` redirect

The `.de` domain only redirects to `https://turtletrafo.com`.

- CloudFront distribution `EO7GEY9D85MV2` (`dcl5hmesymjgj.cloudfront.net`), aliases `turtletrafo.de` and `www.turtletrafo.de`, price class 100, HTTP to HTTPS redirect.
- A CloudFront Function `turtletrafo-de-redirect` (viewer-request) returns `301` to `https://turtletrafo.com` plus the original path and query string. There is no real origin; the origin is a placeholder.
- ACM certificate in **us-east-1** covering `turtletrafo.de` and `www.turtletrafo.de`. It renews automatically as long as its two validation CNAMEs (names starting with `_`, ending in `.acm-validations.aws`) **stay in the `.de` zone. Do not delete them.**
- Route53 `.de` zone: apex and `www` are A and AAAA **alias** records to the CloudFront distribution (alias hosted zone ID `Z2FDTNDATAQYW2`).
- Other `.de` records stay: Google MX, SPF and verification TXT, `google._domainkey` DKIM, `_dmarc`, `podcast` CNAME (`pbcdn2.podbean.com`), `superold` (legacy GitHub Pages A records) and the `_github-pages-challenge-schmidb` TXT.

Cost is close to zero at current traffic.

## Rollback

Both rollbacks restore the old GHL front end. Use Route53 `change-resource-record-sets` with a change batch.

- **`.com` back to GHL:** UPSERT `turtletrafo.com` A to `162.159.140.166`, DELETE the 4 AAAA records, UPSERT `www` CNAME to `sites.ludicrous.cloud`. Also turn off the `noindex` header code in GHL and re-add the `turtletrafo.com` domain there.
- **`.de` back to GHL:** DELETE the apex and `www` alias A and AAAA records, CREATE `turtletrafo.de` A `162.159.140.166` and `www` CNAME `sites.ludicrous.cloud`.

Take a JSON backup before any bulk change:

```bash
aws route53 list-resource-record-sets --hosted-zone-id <ZONE_ID> > backup.json
```

## Other services

- **GHL (`old.turtletrafo.com`):** `<meta name="robots" content="noindex, nofollow">` is set in the site's Header tracking code. Do not block it in robots.txt, or Google can't see the tag.
- **Google Workspace:** DKIM for `turtletrafo.com` was generated in Admin console, Apps, Google Workspace, Gmail, Authenticate email.
- **Google Search Console:** `turtletrafo.com` sitemap `https://turtletrafo.com/sitemap-index.xml` is submitted.
- **Google Analytics 4:** measurement ID `G-21YC88FWVZ`. Loads only after cookie consent, and only on `turtletrafo.com` (see `src/components/Analytics.astro`).

## Known quirks

- Right after enabling Enforce HTTPS, a few paths (for example `http://turtletrafo.com/about/`) kept returning 200 over plain HTTP, probably because of cached responses at GitHub's edge. Untick and re-tick Enforce HTTPS if it persists.
- A full DNS or certificate change can leave a short HTTPS warning while GitHub issues the certificate (minutes up to an hour).
