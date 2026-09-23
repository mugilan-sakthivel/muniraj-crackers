"use client"

import Link from "next/link"
import { useCart } from "@/components/useCart"
import { formatInr } from "@/lib/currency"
import { cartQuantity, cartTotalPaise } from "@/lib/cart"

const STEPS = [
  ["1", "Select packs", "Use the − / + controls in the list below."],
  ["2", "Review your list", "See every pack and the offer total in one place."],
  ["3", "Send on WhatsApp", "One prefilled message, confirmed by the seller."],
]

export function HeroEnquiryCard() {
  const cartLines = useCart()
  const selectedPacks = cartQuantity(cartLines)
  const selectedTotal = cartTotalPaise(cartLines)

  return (
    <div className="festival-card relative overflow-hidden p-7 sm:p-8">
      <p className="festival-kicker">Your enquiry</p>
      <p className="mt-4 text-sm text-[#a7a8bd]">
        {selectedPacks} pack{selectedPacks === 1 ? "" : "s"} selected
      </p>
      <p className="mt-1 text-5xl font-black tracking-tight text-white">{formatInr(selectedTotal)}</p>
      <p className="mt-2 text-xs text-[#a7a8bd]">Offer estimate · final amount confirmed on WhatsApp</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="#popular-products" className="festival-button festival-button-gold">
          {selectedPacks ? "Review & send →" : "Start selecting →"}
        </Link>
        <Link href="/cart" className="festival-button festival-button-ghost">
          Your list
        </Link>
      </div>
      <div className="mt-7 space-y-1 border-t border-white/10 pt-2">
        {STEPS.map(([number, title, detail]) => (
          <div key={number} className="flex gap-4 border-b border-white/10 py-3 last:border-0">
            <span className="text-xl font-black text-[#f4b942]">{number}</span>
            <div>
              <h3 className="text-sm font-bold text-white">{title}</h3>
              <p className="mt-0.5 text-xs text-[#a7a8bd]">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
