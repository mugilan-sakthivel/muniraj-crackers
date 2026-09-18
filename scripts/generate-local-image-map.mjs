import fs from "node:fs"
import path from "node:path"

const projectRoot = path.resolve(import.meta.dirname, "..")
const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, "public/reference-images/manifest.json"), "utf8"))

// The source catalogue supplies these product packshots. Store a local mapping so
// the live shop is not dependent on a third-party host or Sanity media upload.
const productAssets = manifest.assets.filter((asset) => asset.name.endsWith(".webp") && asset.name !== "logo_07_08_2026_11_09_47.webp")
const urls = productAssets.map((asset) => `/reference-images/${path.basename(asset.path)}`)

const output = `/* Generated from public/reference-images/manifest.json. */\nexport const localProductImageUrls = ${JSON.stringify(urls, null, 2)} as const\n`
fs.writeFileSync(path.join(projectRoot, "data/local-product-images.generated.ts"), output)
