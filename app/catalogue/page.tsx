export const revalidate = 600
import { CatalogueClient } from "@/components/CatalogueClient"
import { CategoryDirectory } from "@/components/CategoryDirectory"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { getCatalogue } from "@/lib/catalogue"

export const metadata = { title: "Catalogue" }

export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams
  const { categories, products } = await getCatalogue()
  return <><SiteHeader /><main>{view === "all" ? <CatalogueClient categories={categories} products={products} /> : <CategoryDirectory categories={categories} products={products} />}</main><SiteFooter /></>
}
