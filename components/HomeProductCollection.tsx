"use client"

import { useMemo, useState } from "react"
import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"
import { QuickEnquiryModal } from "@/components/QuickEnquiryModal"
import { useCart } from "@/components/useCart"
import { formatInr } from "@/lib/currency"
import { cartQuantity, cartTotalPaise } from "@/lib/cart"
import { DesktopRow, MobileRow, changeProductQuantity, type RowChange } from "@/components/CatalogueRows"
import { catalogueCollections, categoriesForCollection, productsForCollection } from "@/lib/catalogueCollections"

const PAGE_SIZE = 8
const MORE_SIZE = 80

export function HomeProductCollection({
  categories,
  products,
}: {
  categories: CatalogueCategory[]
  products: CatalogueProduct[]
}) {
  const [category, setCategory] = useState("all")
  const [collectionId, setCollectionId] = useState("all")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [notice, setNotice] = useState("")
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const cartLines = useCart()

  const filtered = useMemo(() => {
    const inCollection = collectionId === "all" ? products : productsForCollection(products, collectionId)
    return category === "all" ? inCollection : inCollection.filter((product) => product.categorySlug === category)
  }, [category, collectionId, products])
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function chooseCategory(slug: string) {
    setCategory(slug)
    setVisibleCount(PAGE_SIZE)
  }

  function chooseCollection(id: string) {
    setCollectionId(id)
    setCategory("all")
    setVisibleCount(PAGE_SIZE)
  }

  function updateQuantity(product: CatalogueProduct, change: RowChange) {
    const message = changeProductQuantity(product, change)
    if (message) setNotice(message)
  }

  const quantityFor = (productId: string) => cartLines.find((line) => line.productId === productId)?.quantity ?? 0
  const selectedPacks = cartQuantity(cartLines)
  const selectedTotal = cartTotalPaise(cartLines)

  return (
    <section className="site-container py-16 sm:py-24">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="festival-kicker">Order straight away</p>
          <h2 className="festival-heading mt-3 text-4xl font-black text-white sm:text-5xl">
            Shop by <em>cracker type.</em>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#a7a8bd]">Pick a collection, add any pack, then move to another collection without losing your list.</p>
      </div>
      <div className="mt-7 flex gap-2 overflow-x-auto pb-1" aria-label="Shop by cracker type"><button onClick={() => chooseCollection("all")} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${collectionId === "all" ? "bg-[#f4b942] text-[#17121b]" : "border border-white/15 text-[#c4c2d3]"}`}>All</button>{catalogueCollections.map((item) => <button key={item.id} onClick={() => chooseCollection(item.id)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${collectionId === item.id ? "bg-[#f4b942] text-[#17121b]" : "border border-white/15 text-[#c4c2d3]"}`}>{item.title}</button>)}</div>
      <label className="mt-3 block sm:max-w-md"><span className="sr-only">Choose a product category</span><select value={category} onChange={(event) => chooseCategory(event.target.value)} className="w-full rounded-xl border border-white/15 bg-[#171532] px-3 py-3 text-sm font-bold text-white outline-none focus:border-[#f4b942]"><option value="all">All categories in this collection</option>{(collectionId === "all" ? categories : categoriesForCollection(categories, collectionId)).map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}</select></label>
      <p aria-live="polite" className="sr-only">
        {notice}
      </p>

      {selectedPacks > 0 && (
        <div className="sticky top-[78px] z-30 -mx-4 mt-6 border-y border-[#f4b942]/25 bg-[#0d0e26]/95 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-black text-white">
                <span className="mr-2 text-[#f4b942]">✓</span>
                {selectedPacks} pack{selectedPacks === 1 ? "" : "s"} noted · {formatInr(selectedTotal)}
              </p>
              {notice && (
                <p aria-hidden="true" className="mt-0.5 truncate text-xs text-[#a7a8bd]">
                  {notice}
                </p>
              )}
            </div>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="rounded-xl bg-[#f4b942] px-4 py-2.5 text-sm font-black text-[#17121b]"
            >
              Review →
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[.055] shadow-sm">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-white/10 bg-[#0d0e26] text-xs uppercase tracking-wide text-[#a7a8bd]">
              <tr>
                <th className="w-24 px-5 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Pack</th>
                <th className="px-4 py-3">MRP</th>
                <th className="px-4 py-3">Offer</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-5 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((product) => (
                <DesktopRow
                  key={product.id}
                  product={product}
                  quantity={quantityFor(product.id)}
                  onChange={updateQuantity}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="divide-y divide-white/10 md:hidden">
          {visible.map((product) => (
            <MobileRow key={product.id} product={product} quantity={quantityFor(product.id)} onChange={updateQuantity} />
          ))}
        </div>
        {!visible.length && (
          <div className="p-10 text-center">
            <h3 className="text-xl font-black text-white">No crackers found</h3>
            <button onClick={() => chooseCategory("all")} className="mt-4 font-bold text-[#f4b942] underline">
              Back to all categories
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        {hasMore ? (
          <button
            onClick={() => setVisibleCount((count) => count + MORE_SIZE)}
            className="festival-button festival-button-ghost"
          >
            See more products · {visible.length} of {filtered.length} ↓
          </button>
        ) : (
          filtered.length > PAGE_SIZE && (
            <button onClick={() => setVisibleCount(PAGE_SIZE)} className="festival-button festival-button-ghost">
              Show less ↑
            </button>
          )
        )}
      </div>

      {selectedPacks > 0 && (
        <div className="sticky bottom-3 z-30 mt-8 rounded-2xl border border-[#f4b942]/25 bg-[#0d0e26]/95 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-white/70">
                {selectedPacks} pack{selectedPacks === 1 ? "" : "s"} noted · Offer estimate
              </p>
              <p className="text-2xl font-black">{formatInr(selectedTotal)}</p>
            </div>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="rounded-xl bg-[#f4b942] px-5 py-3 text-center font-black text-[#17121b]"
            >
              Review & order on WhatsApp →
            </button>
          </div>
        </div>
      )}
      {enquiryOpen && <QuickEnquiryModal lines={cartLines} onClose={() => setEnquiryOpen(false)} />}
    </section>
  )
}
