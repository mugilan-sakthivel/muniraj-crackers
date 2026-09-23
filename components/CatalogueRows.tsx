"use client"

import type { CatalogueProduct } from "@/data/catalogue.generated"
import { formatInr } from "@/lib/currency"
import { readCart, saveCart } from "@/lib/cart"

export type RowChange = 1 | -1

export type RowProps = {
  product: CatalogueProduct
  quantity: number
  onChange: (product: CatalogueProduct, change: RowChange) => void
}

/** Shared cart mutation. Returns the notice to announce, or null when nothing changed. */
export function changeProductQuantity(product: CatalogueProduct, change: RowChange): string | null {
  const cart = readCart()
  const current = cart.find((item) => item.productId === product.id)
  if (change === -1 && !current) return null
  if (current) {
    current.quantity += change
    saveCart(current.quantity <= 0 ? cart.filter((item) => item.productId !== product.id) : cart)
  } else {
    cart.push({
      productId: product.id,
      titleSnapshot: product.title,
      packContentSnapshot: product.packContent,
      pricePaiseSnapshot: product.pricePaise,
      quantity: 1,
    })
    saveCart(cart)
  }
  return change === 1 ? `${product.title} added to your order.` : `${product.title} quantity updated.`
}

export function ProductImage({ product, className }: { product: CatalogueProduct; className: string }) {
  return product.image ? (
    <img
      src={product.image}
      alt={product.imageAlt || product.title}
      className={`${className} rounded-xl border border-[#f0dfbd] bg-[#fffaf0] object-contain`}
    />
  ) : (
    <div className={`${className} flex items-center justify-center rounded-xl bg-[#fff1ca] text-2xl`} aria-hidden="true">
      ✦
    </div>
  )
}

export function QuantityControl({ product, quantity, onChange }: RowProps) {
  return (
    <div
      className="inline-flex items-center rounded-xl border border-[#f4b942]/55 bg-[#090a1d] shadow-sm"
      aria-label={`${product.title} quantity`}
    >
      <button
        onClick={() => onChange(product, -1)}
        disabled={!quantity}
        aria-label={`Remove one ${product.title}`}
        className="min-h-11 min-w-11 px-3 text-xl font-black text-[#f4b942] disabled:cursor-not-allowed disabled:opacity-30"
      >
        −
      </button>
      <span className="min-w-8 text-center text-base font-black text-white">{quantity}</span>
      <button
        onClick={() => onChange(product, 1)}
        aria-label={`Add one ${product.title}`}
        className="min-h-11 min-w-11 px-3 text-xl font-black text-[#f4b942]"
      >
        +
      </button>
    </div>
  )
}

export function DesktopRow({ product, quantity, onChange }: RowProps) {
  return (
    <tr className="border-b border-white/10 last:border-0">
      <td className="px-5 py-3">
        <ProductImage product={product} className="h-16 w-16" />
      </td>
      <td className="px-4 py-3">
        <p className="font-black text-white">{product.title}</p>
        <p className="mt-1 text-xs text-[#a7a8bd]">{product.sku}</p>
      </td>
      <td className="px-4 py-3 text-sm text-[#c4c2d3]">{product.packContent}</td>
      <td className="px-4 py-3 text-sm text-[#a7a8bd] line-through">{formatInr(product.listPricePaise)}</td>
      <td className="px-4 py-3 font-black text-[#f4b942]">{formatInr(product.pricePaise)}</td>
      <td className="px-4 py-3">
        <QuantityControl product={product} quantity={quantity} onChange={onChange} />
      </td>
      <td className="px-5 py-3 text-right font-black text-white">
        {quantity ? formatInr(product.pricePaise * quantity) : "—"}
      </td>
    </tr>
  )
}

export function MobileRow({ product, quantity, onChange }: RowProps) {
  return (
    <article className="p-4">
      <div className="flex gap-3">
        <ProductImage product={product} className="h-20 w-20 shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="font-black leading-tight text-white">{product.title}</h3>
          <p className="mt-1 text-xs text-[#c4c2d3]">{product.packContent}</p>
          <p className="mt-2 text-xs text-[#a7a8bd]">
            MRP <span className="line-through">{formatInr(product.listPricePaise)}</span>
          </p>
          <p className="font-black text-[#f4b942]">Offer {formatInr(product.pricePaise)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <QuantityControl product={product} quantity={quantity} onChange={onChange} />
        <p className="text-right text-sm font-black text-white">
          {quantity ? formatInr(product.pricePaise * quantity) : ""}
        </p>
      </div>
    </article>
  )
}
