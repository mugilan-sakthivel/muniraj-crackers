"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"
import { formatInr } from "@/lib/currency"
import { cartQuantity, cartTotalPaise, readCart, saveCart } from "@/lib/cart"
import { useCart } from "@/components/useCart"

type Props = { categories: CatalogueCategory[]; products: CatalogueProduct[]; initialCategory?: string }

export function CatalogueClient({ categories, products, initialCategory = "all" }: Props) {
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const cartLines = useCart()

  const productsByCategory = useMemo(() => {
    const matches = products.filter((product) => {
      const inCategory = category === "all" || product.categorySlug === category
      return inCategory && `${product.title} ${product.packContent} ${product.sku}`.toLowerCase().includes(query.trim().toLowerCase())
    })
    return categories.map((item) => ({ ...item, products: matches.filter((product) => product.categorySlug === item.slug) })).filter((item) => item.products.length)
  }, [categories, category, products, query])

  const updateQuantity = (product: CatalogueProduct, change: 1 | -1) => {
    const cart = readCart()
    const current = cart.find((item) => item.productId === product.id)
    if (change === -1 && !current) return
    if (current) {
      current.quantity += change
      saveCart(current.quantity <= 0 ? cart.filter((item) => item.productId !== product.id) : cart)
    } else {
      cart.push({ productId: product.id, titleSnapshot: product.title, packContentSnapshot: product.packContent, pricePaiseSnapshot: product.pricePaise, quantity: 1 })
      saveCart(cart)
    }
    setNotice(change === 1 ? `${product.title} added to your order.` : `${product.title} quantity updated.`)
  }

  const quantityFor = (productId: string) => cartLines.find((line) => line.productId === productId)?.quantity ?? 0
  const selectedPacks = cartQuantity(cartLines)
  const selectedTotal = cartTotalPaise(cartLines)

  return <section className="mx-auto max-w-[1440px] bg-[#090a1d] px-4 py-6 text-[#f8f4ed] sm:px-6 sm:py-10">
    <div className="rounded-[2rem] bg-[#1d163e] px-5 py-9 text-white shadow-xl shadow-black/30 sm:px-10">
      <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.22em] text-[#f4c95d]">Muniraj Crackers catalogue</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Choose every pack in one simple order sheet.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">The shown offer price is used for your enquiry estimate. Add or remove any pack directly here — there is no need to open a product page.</p></div>
        <Link href="/cart" className="shrink-0 rounded-2xl bg-[#efb637] px-5 py-4 text-center font-black text-[#40101c] transition hover:bg-[#ffd66c]">Review order · {selectedPacks} pack{selectedPacks === 1 ? "" : "s"}</Link>
      </div>
    </div>

    <div className="sticky top-0 z-20 -mx-4 mt-4 border-y border-white/10 bg-[#0d0e26]/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:pb-0" aria-label="Filter the catalogue by category">
          <button onClick={() => setCategory("all")} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${category === "all" ? "bg-[#f4b942] text-[#17121b]" : "border border-white/15 bg-white/[.04] text-[#c4c2d3]"}`}>All items ({products.length})</button>
          {categories.map((item) => <button key={item.id} onClick={() => setCategory(item.slug)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${category === item.slug ? "bg-[#f4b942] text-[#17121b]" : "border border-white/15 bg-white/[.04] text-[#c4c2d3]"}`}>{item.title}</button>)}
        </div>
        <label className="relative block"><span className="sr-only">Search crackers</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a cracker or pack" className="w-full rounded-xl border border-white/15 bg-white/[.04] px-4 py-3 text-sm text-white outline-none ring-[#f4b942] placeholder:text-[#89899d] focus:ring-2 lg:w-72" /></label>
      </div>
    </div>

    <div className="mt-4 grid gap-3 sm:grid-cols-3" aria-live="polite">
      <Stat label="Products shown" value={productsByCategory.reduce((total, group) => total + group.products.length, 0)} />
      <Stat label="Packs selected" value={selectedPacks} />
      <Stat label="Offer estimate" value={formatInr(selectedTotal)} dark />
    </div>
    <p aria-live="polite" className="mt-4 min-h-5 text-sm font-medium text-[#f4b942]">{notice}</p>

    <div className="mt-3 space-y-7">
      {productsByCategory.map((group) => <section key={group.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.055] shadow-sm">
        <div className="flex items-center justify-between gap-4 bg-[#171532] px-5 py-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#f4b942]">Category {group.sortOrder}</p><h2 className="mt-1 text-xl font-black text-white">{group.title}</h2></div><span className="rounded-full bg-white/[.06] px-3 py-1 text-sm font-bold text-[#f4b942]">{group.products.length} items</span></div>
        <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px] text-left"><thead className="border-b border-white/10 bg-[#0d0e26] text-xs uppercase tracking-wide text-[#a7a8bd]"><tr><th className="w-24 px-5 py-3">Image</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Pack</th><th className="px-4 py-3">MRP</th><th className="px-4 py-3">Offer</th><th className="px-4 py-3">Quantity</th><th className="px-5 py-3 text-right">Total</th></tr></thead><tbody>{group.products.map((product) => <DesktopRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />)}</tbody></table></div>
        <div className="divide-y divide-white/10 md:hidden">{group.products.map((product) => <MobileRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />)}</div>
      </section>)}
    </div>

    {!productsByCategory.length && <div className="mt-8 rounded-2xl bg-white/[.055] p-10 text-center shadow-sm"><h2 className="text-xl font-black text-white">No crackers found</h2><button onClick={() => { setCategory("all"); setQuery("") }} className="mt-4 font-bold text-[#f4b942] underline">Clear search and filters</button></div>}
    <div className="sticky bottom-3 z-30 mt-8 rounded-2xl bg-[#0d0e26] p-4 text-white shadow-2xl shadow-black/40"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-white/70">{selectedPacks} pack{selectedPacks === 1 ? "" : "s"} selected · Offer estimate</p><p className="text-2xl font-black">{formatInr(selectedTotal)}</p></div><Link href="/cart" className="rounded-xl bg-[#f4b942] px-5 py-3 text-center font-black text-[#17121b]">Review and send enquiry</Link></div></div>
  </section>
}

function Stat({ label, value, dark = false }: { label: string; value: string | number; dark?: boolean }) {
  return <div className={`rounded-2xl border px-4 py-3 ${dark ? "border-[#f4b942]/30 bg-[#1d163e] text-white" : "border-white/10 bg-white/[.055] text-white"}`}><p className={`text-xs font-bold uppercase tracking-wide ${dark ? "text-white/65" : "text-[#a7a8bd]"}`}>{label}</p><p className="mt-1 text-lg font-black">{value}</p></div>
}

function DesktopRow({ product, quantity, onChange }: RowProps) {
  return <tr className="border-b border-white/10 last:border-0"><td className="px-5 py-3"><ProductImage product={product} className="h-16 w-16" /></td><td className="px-4 py-3"><p className="font-black text-white">{product.title}</p><p className="mt-1 text-xs text-[#a7a8bd]">{product.sku}</p></td><td className="px-4 py-3 text-sm text-[#c4c2d3]">{product.packContent}</td><td className="px-4 py-3 text-sm text-[#a7a8bd] line-through">{formatInr(product.listPricePaise)}</td><td className="px-4 py-3 font-black text-[#f4b942]">{formatInr(product.pricePaise)}</td><td className="px-4 py-3"><QuantityControl product={product} quantity={quantity} onChange={onChange} /></td><td className="px-5 py-3 text-right font-black text-white">{quantity ? formatInr(product.pricePaise * quantity) : "—"}</td></tr>
}

function MobileRow({ product, quantity, onChange }: RowProps) {
  return <article className="p-4"><div className="flex gap-3"><ProductImage product={product} className="h-20 w-20 shrink-0" /><div className="min-w-0 flex-1"><h3 className="font-black leading-tight text-white">{product.title}</h3><p className="mt-1 text-xs text-[#c4c2d3]">{product.packContent}</p><p className="mt-2 text-xs text-[#a7a8bd]">MRP <span className="line-through">{formatInr(product.listPricePaise)}</span></p><p className="font-black text-[#f4b942]">Offer {formatInr(product.pricePaise)}</p></div></div><div className="mt-4 flex items-center justify-between gap-3"><QuantityControl product={product} quantity={quantity} onChange={onChange} /><p className="text-right text-sm font-black text-white">{quantity ? formatInr(product.pricePaise * quantity) : ""}</p></div></article>
}

function ProductImage({ product, className }: { product: CatalogueProduct; className: string }) {
  return product.image ? <img src={product.image} alt={product.imageAlt || product.title} className={`${className} rounded-xl border border-[#f0dfbd] bg-[#fffaf0] object-contain`} /> : <div className={`${className} flex items-center justify-center rounded-xl bg-[#fff1ca] text-2xl`} aria-hidden="true">✦</div>
}

type RowProps = { product: CatalogueProduct; quantity: number; onChange: (product: CatalogueProduct, change: 1 | -1) => void }

function QuantityControl({ product, quantity, onChange }: RowProps) {
  return <div className="inline-flex items-center rounded-xl border border-[#f4b942]/55 bg-[#090a1d] shadow-sm" aria-label={`${product.title} quantity`}><button onClick={() => onChange(product, -1)} disabled={!quantity} aria-label={`Remove one ${product.title}`} className="min-h-11 min-w-11 px-3 text-xl font-black text-[#f4b942] disabled:cursor-not-allowed disabled:opacity-30">−</button><span className="min-w-8 text-center text-base font-black text-white">{quantity}</span><button onClick={() => onChange(product, 1)} aria-label={`Add one ${product.title}`} className="min-h-11 min-w-11 px-3 text-xl font-black text-[#f4b942]">+</button></div>
}
