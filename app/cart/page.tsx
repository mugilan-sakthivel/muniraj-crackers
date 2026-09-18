"use client"

import Link from "next/link"
import { useState } from "react"
import { QuickEnquiryModal } from "@/components/QuickEnquiryModal"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { useCart } from "@/components/useCart"
import { cartQuantity, cartTotalPaise, saveCart } from "@/lib/cart"
import { formatInr } from "@/lib/currency"

export default function CartPage() {
  const lines = useCart()
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const update = (productId: string, change: number) => saveCart(lines.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + change } : line).filter((line) => line.quantity > 0))
  return <><SiteHeader /><main className="site-container py-14"><p className="festival-kicker">Your selection</p><h1 className="festival-heading mt-4 text-5xl font-black text-white">Your <em>celebration list.</em></h1><p className="mt-5 max-w-2xl text-[#a7a8bd]">Change quantities or go straight to your WhatsApp enquiry. No additional checkout is required.</p>{!lines.length ? <section className="festival-card mt-9 p-10 text-center"><p className="text-4xl text-[#f4b942]">✦</p><h2 className="mt-4 text-xl font-black text-white">Your list is empty</h2><Link href="/catalogue" className="festival-button festival-button-gold mt-6">Browse products</Link></section> : <><section className="festival-card mt-9 divide-y divide-white/10">{lines.map((line) => <article key={line.productId} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-black text-white">{line.titleSnapshot}</h2><p className="mt-1 text-sm text-[#a7a8bd]">{line.packContentSnapshot} · {formatInr(line.pricePaiseSnapshot)} each</p></div><div className="flex items-center gap-3"><button aria-label={`Decrease ${line.titleSnapshot} quantity`} onClick={() => update(line.productId, -1)} className="h-10 w-10 border border-[#f4b942]/50 text-xl font-black text-[#f4b942]">−</button><span className="min-w-6 text-center font-black text-white">{line.quantity}</span><button aria-label={`Increase ${line.titleSnapshot} quantity`} onClick={() => update(line.productId, 1)} className="h-10 w-10 border border-[#f4b942]/50 text-xl font-black text-[#f4b942]">+</button><p className="ml-3 min-w-18 text-right font-black text-[#f4b942]">{formatInr(line.pricePaiseSnapshot * line.quantity)}</p></div></article>)}</section><section className="mt-6 flex flex-col gap-4 border border-[#f4b942]/30 bg-[#1d163e] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-[#a7a8bd]">{cartQuantity(lines)} packs selected</p><p className="text-3xl font-black text-white">{formatInr(cartTotalPaise(lines))}</p></div><button onClick={() => setEnquiryOpen(true)} className="festival-button festival-button-gold">Continue to WhatsApp enquiry →</button></section></>}{enquiryOpen && <QuickEnquiryModal lines={lines} onClose={() => setEnquiryOpen(false)} />}</main><SiteFooter /></>
}
