import { CatalogueClient } from "@/components/CatalogueClient"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { getCatalogue } from "@/lib/catalogue"

export const metadata = { title: "Catalogue" }

export default async function CataloguePage() {
  const { categories, products } = await getCatalogue()
  return <><SiteHeader /><main><CatalogueClient categories={categories} products={products} /></main><SiteFooter /></>
}
