"use client"

import Link from "next/link"
import { cartQuantity } from "@/lib/cart"
import { useCart } from "@/components/useCart"

export function SiteHeader() {
  const count = cartQuantity(useCart())
  return <header className="sticky top-0 z-40 border-b border-white/[.06] bg-[#090a1d]/80 backdrop-blur-xl">
    <div className="site-container flex min-h-[78px] items-center justify-between gap-4">
      <Link href="/" className="inline-flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-[#f4b942]/60 text-lg text-[#f4b942]">✦</span><span className="leading-tight"><span className="block text-base font-bold tracking-tight text-white sm:text-lg">Muniraj <b className="text-[#f4b942]">Crackers</b></span><span className="block text-[9px] tracking-[.12em] text-[#a7a8bd]">முனிராஜ் பட்டாசுகள்</span></span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-[13px] text-[#bbb9c9] md:flex"><Link className="hover:text-[#f4b942]" href="/catalogue">Products</Link><Link className="hover:text-[#f4b942]" href="/about">About us</Link><Link className="hover:text-[#f4b942]" href="/safety">Safety</Link><Link className="hover:text-[#f4b942]" href="/contact">Contact</Link></nav>
      <Link href="/catalogue" className="festival-button festival-button-gold shrink-0">My list <span className="ml-1.5 rounded-full bg-black/15 px-1.5 py-0.5" aria-label={`${count} packs selected`}>{count}</span></Link>
    </div>
  </header>
}
