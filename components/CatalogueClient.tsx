"use client"

import { useMemo, useState } from "react"
import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"
import { catalogueCollections, collectionForCategory, categoriesForCollection, productsForCollection } from "@/lib/catalogueCollections"
import { formatInr } from "@/lib/currency"
import { cartQuantity, cartTotalPaise } from "@/lib/cart"
import { useCart } from "@/components/useCart"
import { QuickEnquiryModal } from "@/components/QuickEnquiryModal"
import { DesktopRow, MobileRow, changeProductQuantity, type RowChange } from "@/components/CatalogueRows"

type Props = { categories: CatalogueCategory[]; products: CatalogueProduct[]; initialCategory?: string }

export function CatalogueClient({ categories, products, initialCategory = "all" }: Props) {
  const initialCollection = initialCategory === "all" ? "all" : collectionForCategory(initialCategory)?.id ?? "all"
  const [collectionId, setCollectionId] = useState(initialCollection)
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const cartLines = useCart()

  const visibleCategories = useMemo(() => collectionId === "all" ? categories : categoriesForCollection(categories, collectionId), [categories, collectionId])
  const productsByCategory = useMemo(() => {
    const collectionProducts = collectionId === "all" ? products : productsForCollection(products, collectionId)
    const search = query.trim().toLowerCase()
    const matches = collectionProducts.filter((product) => {
      const inCategory = category === "all" || product.categorySlug === category
      return inCategory && `${product.title} ${product.packContent} ${product.sku}`.toLowerCase().includes(search)
    })
    return visibleCategories.map((item) => ({ ...item, products: matches.filter((product) => product.categorySlug === item.slug) })).filter((item) => item.products.length)
  }, [category, collectionId, products, query, visibleCategories])

  function chooseCollection(id: string) {
    setCollectionId(id)
    setCategory("all")
    setQuery("")
  }

  function chooseFromMenu(value: string) {
    if (value.startsWith("collection:")) return chooseCollection(value.slice("collection:".length))
    const slug = value.slice("category:".length)
    setCategory(slug)
    setCollectionId(collectionForCategory(slug)?.id ?? "all")
    setQuery("")
  }

  function updateQuantity(product: CatalogueProduct, change: RowChange) {
    const message = changeProductQuantity(product, change)
    if (message) setNotice(message)
  }

  const quantityFor = (productId: string) => cartLines.find((line) => line.productId === productId)?.quantity ?? 0
  const selectedPacks = cartQuantity(cartLines)
  const selectedTotal = cartTotalPaise(cartLines)
  const activeCollection = catalogueCollections.find((item) => item.id === collectionId)
  const pickerValue = category === "all" ? `collection:${collectionId}` : `category:${category}`

  return <section className="mx-auto max-w-[1440px] bg-[#090a1d] px-4 py-4 text-[#f8f4ed] sm:px-6 sm:py-6">
    <div className="sticky top-[78px] z-30 -mx-4 border-y border-white/10 bg-[#0d0e26]/95 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="festival-kicker">Order sheet</p><h1 className="mt-1 text-xl font-black text-white">{activeCollection?.title ?? "All crackers"} <span className="text-sm font-bold text-[#f4b942]">{productsByCategory.reduce((total, group) => total + group.products.length, 0)}</span></h1></div><button onClick={() => setEnquiryOpen(true)} disabled={!selectedPacks} className="rounded-xl bg-[#f4b942] px-4 py-3 text-sm font-black text-[#17121b] disabled:cursor-not-allowed disabled:opacity-50">{selectedPacks ? `Review ${selectedPacks} · ${formatInr(selectedTotal)}` : "Select products"}</button></div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Shop by cracker type"><button onClick={() => chooseCollection("all")} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${collectionId === "all" ? "bg-[#f4b942] text-[#17121b]" : "border border-white/15 text-[#c4c2d3]"}`}>All</button>{catalogueCollections.map((item) => <button key={item.id} onClick={() => chooseCollection(item.id)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${collectionId === item.id ? "bg-[#f4b942] text-[#17121b]" : "border border-white/15 text-[#c4c2d3]"}`}>{item.title}</button>)}</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><label className="sr-only" htmlFor="category">Choose a category</label><select id="category" value={pickerValue} onChange={(event) => chooseFromMenu(event.target.value)} className="min-w-0 rounded-xl border border-white/15 bg-[#171532] px-3 py-3 text-sm font-bold text-white outline-none focus:border-[#f4b942]"><option value="collection:all">All crackers</option>{catalogueCollections.map((collection) => <optgroup key={collection.id} label={collection.title}><option value={`collection:${collection.id}`}>All {collection.title}</option>{categories.filter((item) => collection.categorySlugs.includes(item.slug)).map((item) => <option key={item.id} value={`category:${item.slug}`}>{item.title}</option>)}</optgroup>)}</select><label className="relative block"><span className="sr-only">Search crackers</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search crackers" className="w-full rounded-xl border border-white/15 bg-white/[.04] px-4 py-3 text-sm text-white outline-none placeholder:text-[#89899d] focus:border-[#f4b942]" /></label></div>
    </div>
    <p aria-live="polite" className="sr-only">{notice}</p>

    {activeCollection && category === "all" && <div className="mt-5 rounded-2xl border border-[#f4b942]/15 bg-[#f4b942]/[.045] px-4 py-3"><p className="font-bold text-white">{activeCollection.tamilTitle}</p><p className="mt-1 text-sm text-[#a7a8bd]">{activeCollection.description}</p></div>}
    <div className="mt-5 space-y-7">
      {productsByCategory.map((group) => <section key={group.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.055] shadow-sm">
        <div className="flex items-center justify-between gap-4 bg-[#171532] px-5 py-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#f4b942]">{activeCollection?.title ?? "Crackers"}</p><h2 className="mt-1 text-xl font-black text-white">{group.title}</h2></div><span className="rounded-full bg-white/[.06] px-3 py-1 text-sm font-bold text-[#f4b942]">{group.products.length} items</span></div>
        <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px] text-left"><thead className="border-b border-white/10 bg-[#0d0e26] text-xs uppercase tracking-wide text-[#a7a8bd]"><tr><th className="w-24 px-5 py-3">Image</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Pack</th><th className="px-4 py-3">MRP</th><th className="px-4 py-3">Offer</th><th className="px-4 py-3">Quantity</th><th className="px-5 py-3 text-right">Total</th></tr></thead><tbody>{group.products.map((product) => <DesktopRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />)}</tbody></table></div>
        <div className="divide-y divide-white/10 md:hidden">{group.products.map((product) => <MobileRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />)}</div>
      </section>)}
    </div>
    {!productsByCategory.length && <div className="mt-8 rounded-2xl bg-white/[.055] p-10 text-center shadow-sm"><h2 className="text-xl font-black text-white">No crackers found</h2><button onClick={() => { chooseCollection("all"); setQuery("") }} className="mt-4 font-bold text-[#f4b942] underline">View all crackers</button></div>}
    <div className="sticky bottom-3 z-30 mt-8 rounded-2xl bg-[#0d0e26] p-4 text-white shadow-2xl shadow-black/40"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-white/70">{selectedPacks} pack{selectedPacks === 1 ? "" : "s"} selected · Offer estimate</p><p className="text-2xl font-black">{formatInr(selectedTotal)}</p></div><button onClick={() => setEnquiryOpen(true)} disabled={!selectedPacks} className="rounded-xl bg-[#f4b942] px-5 py-3 text-center font-black text-[#17121b] disabled:cursor-not-allowed disabled:opacity-50">Continue to WhatsApp enquiry</button></div></div>
    {enquiryOpen && <QuickEnquiryModal lines={cartLines} onClose={() => setEnquiryOpen(false)} />}
  </section>
}
