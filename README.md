# Muniraj Crackers

A mobile-first Next.js catalogue and WhatsApp enquiry website. It creates an **enquiry estimate**, not an online sale or payment transaction. Customers browse the catalogue, choose quantities, review the estimate, and open a prefilled WhatsApp message for seller confirmation.

## Included

- 51 categories and 242 editable products, imported into Sanity.
- Catalogue search, product/category routes, a local enquiry cart, quantity controls and an INR total.
- A clearly marked itemized WhatsApp enquiry message with quantities and total.
- Safety, FAQ, contact, privacy, terms, sitemap and robots routes.
- A local archive of the 218 unique product assets observed in the supplied reference catalogue: `public/reference-images/`.

## CMS

[Open Muniraj Crackers Sanity Studio](https://muniraj-crackers-8bk97zyk.sanity.studio)

Sign in using the Sanity account that owns the project. Categories and Products include fields for images, pack contents, prices, availability and ordering.

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the confirmed business number in country-code format before publishing. It is deliberately blank in the repository, so enquiries cannot be sent to an unconfirmed recipient.

## Checks and deployment

```bash
pnpm catalogue:generate
pnpm lint
pnpm exec next build --webpack
```

`data/sanity-import.ndjson` is the reproducible catalogue import. The provisioned `production` dataset has all 293 documents (51 categories + 242 products). Deploy the web app to Vercel after configuring `.env.local`; redeploy Studio after schema changes with `pnpm sanity:deploy`.
