"use client"

import Link from "next/link"
import { cartQuantity } from "@/lib/cart"
import { useCart } from "@/components/useCart"

export function SiteHeader() {
  const count = cartQuantity(useCart())
  return <>
    <div className="bg-[#43101c] px-4 py-2 text-center text-xs font-medium text-white">Catalogue enquiries only — availability and final terms are confirmed by Muniraj Crackers.</div>
    <header className="sticky top-0 z-30 border-b border-[#eddab4] bg-[#fffdf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="leading-tight"><span className="block text-lg font-black tracking-tight text-[#65162a] sm:text-xl">Muniraj Crackers</span><span className="text-xs text-stone-600">Catalogue & WhatsApp enquiry</span></Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-semibold md:flex"><Link href="/catalogue">Catalogue</Link><Link href="/safety">Safety</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
        <Link href="/cart" className="rounded-full bg-[#65162a] px-4 py-2.5 text-sm font-bold text-white">Cart <span aria-label={`${count} items`}>({count})</span></Link>
      </div>
    </header>
  </>
}
