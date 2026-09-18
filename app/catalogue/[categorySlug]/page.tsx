import { notFound } from "next/navigation"
import { CatalogueClient } from "@/components/CatalogueClient"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { getCatalogue } from "@/lib/catalogue"

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params
  const { categories, products } = await getCatalogue()
  if (!categories.some((category) => category.slug === categorySlug)) notFound()
  return <><SiteHeader /><main><CatalogueClient categories={categories} products={products} initialCategory={categorySlug} /></main><SiteFooter /></>
}
