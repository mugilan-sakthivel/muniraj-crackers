import { createClient } from "@sanity/client"
import { catalogueCategories, catalogueProducts, type CatalogueCategory, type CatalogueProduct } from "@/data/catalogue.generated"
import { localProductImageUrls } from "@/data/local-product-images.generated"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8bk97zyk"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const client = createClient({ projectId, dataset, apiVersion: "2026-09-18", useCdn: true })

type SanityProduct = Omit<CatalogueProduct, "image" | "listPricePaise" | "pricePaise"> & {
  image?: string | null
  listPriceRupees?: number
  priceRupees?: number
}

function rupeesToPaise(amount: number | undefined) {
  return Math.round((amount ?? 0) * 100)
}

function addLocalImages(products: CatalogueProduct[]): CatalogueProduct[] {
  return products.map((product, index) => ({
    ...product,
    image: product.image ?? localProductImageUrls[index % localProductImageUrls.length] ?? null,
  }))
}

function formatSanityProducts(products: SanityProduct[]): CatalogueProduct[] {
  return products.map((product, index) => ({
    ...product,
    image: product.image ?? localProductImageUrls[index % localProductImageUrls.length] ?? null,
    listPricePaise: rupeesToPaise(product.listPriceRupees),
    pricePaise: rupeesToPaise(product.priceRupees),
  }))
}

export async function getCatalogue() {
  try {
    const [categories, products] = await Promise.all([
      client.fetch<CatalogueCategory[]>(`*[_type == "category" && enabled != false] | order(sortOrder asc) {"id": _id, title, "slug": slug.current, sortOrder}`),
      client.fetch<SanityProduct[]>(`*[_type == "product" && isAvailableForEnquiry != false] | order(sortOrder asc) {"id": _id, sku, title, "slug": slug.current, "categorySlug": category->slug.current, packContent, "listPriceRupees": coalesce(listPriceRupees, listPricePaise / 100), "priceRupees": coalesce(priceRupees, pricePaise / 100), isAvailableForEnquiry, "image": primaryImage.asset->url, imageAlt, sortOrder}`),
    ])
    if (categories.length && products.length) return { categories, products: formatSanityProducts(products) }
  } catch { /* local fallback keeps the catalogue usable before content is published */ }
  return { categories: catalogueCategories, products: addLocalImages(catalogueProducts) }
}
