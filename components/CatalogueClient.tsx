"use client"

import { useMemo, useState } from "react"
import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"
import { formatInr } from "@/lib/currency"
import { cartQuantity, cartTotalPaise } from "@/lib/cart"
import { useCart } from "@/components/useCart"
import { QuickEnquiryModal } from "@/components/QuickEnquiryModal"
import { DesktopRow, MobileRow, changeProductQuantity, type RowChange } from "@/components/CatalogueRows"

type Props = { categories: CatalogueCategory[]; products: CatalogueProduct[]; initialCategory?: string }

export function CatalogueClient({ categories, products, initialCategory = "all" }: Props) {
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const cartLines = useCart()

  const productsByCategory = useMemo(() => {
    const search = query.trim().toLowerCase()
    const matches = products.filter((product) => (category === "all" || product.categorySlug === category) && `${product.title} ${product.packContent} ${product.sku}`.toLowerCase().includes(search))
    return categories.map((item) => ({ ...item, products: matches.filter((product) => product.categorySlug === item.slug) })).filter((item) => item.products.length)
  }, [categories, category, products, query])

  function updateQuantity(product: CatalogueProduct, change: RowChange) {
    const message = changeProductQuantity(product, change)
    if (message) setNotice(message)
  }

  const quantityFor = (productId: string) => cartLines.find((line) => line.productId === productId)?.quantity ?? 0
  const selectedPacks = cartQuantity(cartLines)
  const selectedTotal = cartTotalPaise(cartLines)

  return <section className="mx-auto max-w-[1440px] bg-[#090a1d] px-4 py-4 text-[#f8f4ed] sm:px-6 sm:py-6">
    <h1 className="sr-only">{initialCategory === "all" ? "All crackers" : "Cracker category"}</h1>
    <div className="sticky top-[78px] z-30 -mx-4 border-y border-white/10 bg-[#0d0e26]/95 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center"><label className="sr-only" htmlFor="category">Browse category</label><select id="category" value={category} onChange={(event) => { setCategory(event.target.value); setQuery("") }} className="min-w-0 rounded-xl border border-white/15 bg-[#171532] px-3 py-3 text-sm font-bold text-white outline-none focus:border-[#f4b942]"><option value="all">All products · {products.length}</option>{categories.map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}</select><label className="relative block"><span className="sr-only">Search crackers</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search crackers" className="w-full rounded-xl border border-white/15 bg-white/[.04] px-4 py-3 text-sm text-white outline-none placeholder:text-[#89899d] focus:border-[#f4b942]" /></label><button onClick={() => setEnquiryOpen(true)} disabled={!selectedPacks} className="rounded-xl bg-[#f4b942] px-4 py-3 text-sm font-black text-[#17121b] disabled:cursor-not-allowed disabled:opacity-50">{selectedPacks ? `Review ${selectedPacks} · ${formatInr(selectedTotal)}` : "Select products"}</button></div>
    </div>
    <p aria-live="polite" className="sr-only">{notice}</p>
    <div className="mt-5 space-y-7">{productsByCategory.map((group) => <section key={group.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.055] shadow-sm"><div className="flex items-center justify-between gap-4 bg-[#171532] px-5 py-4"><h2 className="text-xl font-black text-white">{group.title}</h2><span className="rounded-full bg-white/[.06] px-3 py-1 text-sm font-bold text-[#f4b942]">{group.products.length} items</span></div><div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px] text-left"><thead className="border-b border-white/10 bg-[#0d0e26] text-xs uppercase tracking-wide text-[#a7a8bd]"><tr><th className="w-24 px-5 py-3">Image</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Pack</th><th className="px-4 py-3">MRP</th><th className="px-4 py-3">Offer</th><th className="px-4 py-3">Quantity</th><th className="px-5 py-3 text-right">Total</th></tr></thead><tbody>{group.products.map((product) => <DesktopRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />)}</tbody></table></div><div className="divide-y divide-white/10 md:hidden">{group.products.map((product) => <MobileRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />)}</div></section>)}</div>
    {!productsByCategory.length && <div className="mt-8 rounded-2xl bg-white/[.055] p-10 text-center shadow-sm"><h2 className="text-xl font-black text-white">No crackers found</h2><button onClick={() => { setCategory("all"); setQuery("") }} className="mt-4 font-bold text-[#f4b942] underline">View all crackers</button></div>}
    <div className="sticky bottom-3 z-30 mt-8 rounded-2xl bg-[#0d0e26] p-4 text-white shadow-2xl shadow-black/40"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-white/70">{selectedPacks} pack{selectedPacks === 1 ? "" : "s"} selected · Offer estimate</p><p className="text-2xl font-black">{formatInr(selectedTotal)}</p></div><button onClick={() => setEnquiryOpen(true)} disabled={!selectedPacks} className="rounded-xl bg-[#f4b942] px-5 py-3 text-center font-black text-[#17121b] disabled:cursor-not-allowed disabled:opacity-50">Continue to WhatsApp enquiry</button></div></div>
    {enquiryOpen && <QuickEnquiryModal lines={cartLines} onClose={() => setEnquiryOpen(false)} />}
  </section>
}
