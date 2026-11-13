# Compliance and privacy

- **Analytics:** Google Analytics 4 (`G-21YC88FWVZ`) loads only after the visitor accepts the cookie banner (`src/components/Analytics.astro`). Consent Mode defaults to denied. It only sends data on the production hostname. No Google request may occur before consent.
- **YouTube:** testimonial videos are click-to-load via `youtube-nocookie.com` (`YouTubeTestimonial.astro`). No iframe, thumbnail or YouTube request on page load. This consent is separate from analytics consent.
- Any new third-party script, embed, form or tracker needs: a consent flow, a privacy policy update (`src/pages/privacy.astro`), and owner approval.
- **Removed on purpose:** the company VAT ID and phone number are not shown anywhere on the public site, including structured data and `llms.txt`. Do not re-add them.
- **Newsletter:** the old site had a GoHighLevel newsletter signup ("From the Inside to the Outside"). It is not on the new site. If restored, it needs a separate unticked consent checkbox, double opt-in, an unsubscribe link and a privacy policy update naming the provider.
- Contact details shown publicly: `info@turtletrafo.com` and the postal address (Drom Upper, Glenbeigh, Co. Kerry, V93 F6X0, Ireland). Imprint obligations depend on applicable law, so check with the owner before removing legal-notice content.
- Never commit secrets, credentials or client material. Never publish the Rachel O'Sullivan recording or other confidential coaching content.
