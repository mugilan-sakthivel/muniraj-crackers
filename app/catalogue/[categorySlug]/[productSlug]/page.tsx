import Link from "next/link"
import { notFound } from "next/navigation"
import { AddProductButton } from "@/components/AddProductButton"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { formatInr } from "@/lib/currency"
import { getCatalogue } from "@/lib/catalogue"

export default async function ProductPage({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }) {
  const { categorySlug, productSlug } = await params
  const { products } = await getCatalogue()
  const product = products.find((item) => item.categorySlug === categorySlug && item.slug === productSlug)
  if (!product) notFound()
  return <><SiteHeader /><main className="mx-auto max-w-5xl px-5 py-10"><Link href={`/catalogue/${categorySlug}`} className="text-sm font-bold text-[#65162a] underline">← Back to category</Link><article className="mt-6 grid overflow-hidden rounded-3xl border border-[#ead9b8] bg-white shadow-sm md:grid-cols-2">{product.image ? <img src={product.image} alt={product.imageAlt || product.title} className="min-h-72 h-full w-full bg-[#fff2cf] object-contain" /> : <div className="flex min-h-72 items-center justify-center bg-gradient-to-br from-[#fff2cf] to-[#f5d79a] text-7xl" aria-hidden="true">✦</div>}<div className="p-7"><p className="text-sm font-bold text-[#9b6411]">{product.sku}</p><h1 className="mt-2 text-3xl font-black text-[#43101c]">{product.title}</h1><p className="mt-4 text-stone-600">Pack: {product.packContent}</p><p className="mt-6 text-3xl font-black text-[#65162a]">{formatInr(product.pricePaise)}</p>{product.listPricePaise > product.pricePaise && <p className="mt-1 text-sm text-stone-500 line-through">List price {formatInr(product.listPricePaise)}</p>}<p className="mt-5 text-sm leading-6 text-stone-600">Estimated price only. Availability, permitted-product eligibility, delivery and final total require seller confirmation.</p><AddProductButton product={product} /></div></article></main><SiteFooter /></>
}
