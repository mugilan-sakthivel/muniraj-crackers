import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const source = resolve(process.cwd(), '../cracjers.md')
const destination = resolve(process.cwd(), 'data/catalogue.generated.ts')
const sanityDestination = resolve(process.cwd(), 'data/sanity-import.ndjson')
const raw = await readFile(source, 'utf8')
const lines = raw
  .split(/\r?\n/)
  .map((line) => line.trim().replace(/\s+/g, ' '))
  .filter(Boolean)

const categoryHeading = /^([0-9]+)\.(?:\s|[A-Z])/i
const pack = /^(1Box|1Pkt|1pc|1Tin)/i
const money = /^\d+(?:\.\d+)?$/

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const cleanCategory = (value) =>
  value
    .replace(/^\d+\.\s*/, '')
    .replace(/\s*\(90% Discount\)\s*$/i, '')
    .replace(/^KIDS\b/, 'Kids')
    .replace(/Hifi/gi, 'HiFi')
    .replace(/Unqiue/gi, 'Unique')
    .trim()

const categories = []
const products = []
let currentCategory = null
let productIndex = 0

for (let index = 1; index < lines.length; index += 1) {
  const line = lines[index]
  if (categoryHeading.test(line)) {
    const title = cleanCategory(line)
    currentCategory = { id: `category-${categories.length + 1}`, title, slug: slugify(title), sortOrder: categories.length + 1 }
    categories.push(currentCategory)
    continue
  }

  const priceLine = lines[index + 2] ?? ''
  const priceMatch = priceLine.match(/^(1(?:Box|Pkt|pc|Tin).*?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)$/i)
  if (!currentCategory || lines[index + 1] !== line || !pack.test(priceLine) || !priceMatch) continue

  const [title] = lines.slice(index, index + 1)
  const [, packContent, listPrice, estimatePrice] = priceMatch
  if (!money.test(listPrice) || !money.test(estimatePrice)) continue

  productIndex += 1
  const slugBase = slugify(title)
  const duplicateCount = products.filter((product) => product.slug === slugBase || product.slug.startsWith(`${slugBase}-`)).length
  const slug = duplicateCount ? `${slugBase}-${duplicateCount + 1}` : slugBase
  products.push({
    id: `product-${productIndex}`,
    sku: `MC-${String(productIndex).padStart(3, '0')}`,
    title,
    slug,
    categorySlug: currentCategory.slug,
    packContent,
    listPricePaise: Math.round(Number(listPrice) * 100),
    pricePaise: Math.round(Number(estimatePrice) * 100),
    isAvailableForEnquiry: true,
    image: null,
    imageAlt: title,
    sortOrder: productIndex,
  })
  index += 2
}

if (categories.length !== 51 || products.length !== 242) {
  throw new Error(`Unexpected import result: ${categories.length} categories, ${products.length} products`)
}

const output = `/* This file is generated from ../cracjers.md. Do not edit by hand. */\n\nexport type CatalogueCategory = ${JSON.stringify(categories[0], null, 2).replace(/\{[\s\S]*/, `{
  id: string
  title: string
  slug: string
  sortOrder: number
}`)}\n\nexport type CatalogueProduct = {
  id: string
  sku: string
  title: string
  slug: string
  categorySlug: string
  packContent: string
  listPricePaise: number
  pricePaise: number
  isAvailableForEnquiry: boolean
  image: string | null
  imageAlt: string
  sortOrder: number
}\n\nexport const catalogueCategories: CatalogueCategory[] = ${JSON.stringify(categories, null, 2)}\n\nexport const catalogueProducts: CatalogueProduct[] = ${JSON.stringify(products, null, 2)}\n`

await mkdir(resolve(process.cwd(), 'data'), { recursive: true })
await writeFile(destination, output)

const sanityDocuments = [
  ...categories.map((item) => ({
    _id: `category-${item.slug}`,
    _type: 'category',
    title: item.title,
    slug: { _type: 'slug', current: item.slug },
    sortOrder: item.sortOrder,
    enabled: true,
  })),
  ...products.map((item) => ({
    _id: `product-${item.sku.toLowerCase()}`,
    _type: 'product',
    title: item.title,
    slug: { _type: 'slug', current: item.slug },
    sku: item.sku,
    category: { _type: 'reference', _ref: `category-${item.categorySlug}` },
    packContent: item.packContent,
    listPricePaise: item.listPricePaise,
    pricePaise: item.pricePaise,
    isAvailableForEnquiry: true,
    isFeatured: item.sortOrder <= 8,
    imageAlt: item.imageAlt,
    sortOrder: item.sortOrder,
  })),
]

await writeFile(sanityDestination, `${sanityDocuments.map((document) => JSON.stringify(document)).join('\n')}\n`)
console.log(`Generated ${products.length} products in ${categories.length} categories and ${sanityDocuments.length} Sanity documents.`)
