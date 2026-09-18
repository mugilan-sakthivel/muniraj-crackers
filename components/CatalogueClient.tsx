"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"
import { formatInr } from "@/lib/currency"
import { readCart, saveCart } from "@/lib/cart"

type Props = { categories: CatalogueCategory[]; products: CatalogueProduct[]; initialCategory?: string }

export function CatalogueClient({ categories, products, initialCategory = "all" }: Props) {
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const filtered = useMemo(() => products.filter((product) => (category === "all" || product.categorySlug === category) && `${product.title} ${product.packContent} ${product.sku}`.toLowerCase().includes(query.toLowerCase())), [category, products, query])
  const add = (product: CatalogueProduct) => {
    const cart = readCart()
    const line = cart.find((item) => item.productId === product.id)
    if (line) line.quantity += 1
    else cart.push({ productId: product.id, titleSnapshot: product.title, packContentSnapshot: product.packContent, pricePaiseSnapshot: product.pricePaise, quantity: 1 })
    saveCart(cart)
    setNotice(`${product.title} added to your enquiry cart.`)
  }
  return <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#9b6411]">Seasonal catalogue</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#43101c] sm:text-5xl">Find your celebration favourites</h1><p className="mt-4 text-stone-600">Add pack quantities to prepare an enquiry estimate. Prices and availability are confirmed by the seller.</p></div>
    <div className="mt-8 rounded-2xl border border-[#ead9b8] bg-white p-4 shadow-sm"><label className="sr-only" htmlFor="catalogue-search">Search catalogue</label><input id="catalogue-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product, pack or SKU" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-base" /></div>
    <div aria-label="Categories" className="mt-5 flex gap-2 overflow-x-auto pb-2"><button onClick={() => setCategory("all")} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${category === "all" ? "bg-[#65162a] text-white" : "bg-white text-[#65162a] ring-1 ring-[#e7c98e]"}`}>All ({products.length})</button>{categories.map((item) => <button key={item.id} onClick={() => setCategory(item.slug)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${category === item.slug ? "bg-[#65162a] text-white" : "bg-white text-[#65162a] ring-1 ring-[#e7c98e]"}`}>{item.title}</button>)}</div>
    <p aria-live="polite" className="mt-5 min-h-6 text-sm font-medium text-[#65162a]">{notice || `${filtered.length} products shown`}</p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product) => <article key={product.id} className="overflow-hidden rounded-2xl border border-[#ead9b8] bg-white shadow-sm">{product.image ? <img src={product.image} alt={product.imageAlt || product.title} className="aspect-[4/3] w-full bg-[#fff2cf] object-contain" /> : <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#fff2cf] to-[#f5d79a] text-center text-4xl" aria-hidden="true">✦</div>}<div className="p-5"><p className="text-xs font-semibold tracking-wide text-stone-500">{product.sku}</p><h2 className="mt-1 min-h-12 text-lg font-black leading-tight text-[#43101c]">{product.title}</h2><p className="mt-2 text-sm text-stone-600">{product.packContent}</p><div className="mt-4 flex items-end justify-between gap-2"><div><p className="text-xl font-black text-[#65162a]">{formatInr(product.pricePaise)}</p>{product.listPricePaise > product.pricePaise && <p className="text-xs text-stone-500 line-through">{formatInr(product.listPricePaise)}</p>}</div><Link href={`/catalogue/${product.categorySlug}/${product.slug}`} className="text-sm font-bold text-[#65162a] underline">Details</Link></div><button onClick={() => add(product)} className="mt-5 w-full rounded-xl bg-[#65162a] px-4 py-3 font-bold text-white hover:bg-[#4c1020]">Add to enquiry</button></div></article>)}</div>
    {!filtered.length && <div className="mt-8 rounded-2xl bg-white p-10 text-center"><h2 className="text-xl font-bold">No matching products</h2><button onClick={() => { setCategory("all"); setQuery("") }} className="mt-3 font-bold text-[#65162a] underline">Clear search and filters</button></div>}
  </section>
}
