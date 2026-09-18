"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { useCart } from "@/components/useCart"
import { cartTotalPaise } from "@/lib/cart"
import { formatInr } from "@/lib/currency"

const whatsAppNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "")

export default function EnquiryPage() {
  const lines = useCart()
  const [fulfilment, setFulfilment] = useState<"Pickup" | "Delivery">("Pickup")
  const [form, setForm] = useState({ name: "", mobile: "", address: "", date: "", notes: "" })
  const [acknowledged, setAcknowledged] = useState(false)
  const [error, setError] = useState("")
  const total = cartTotalPaise(lines)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!lines.length) return setError("Your enquiry cart is empty.")
    if (!form.name.trim() || !/^\d{10}$/.test(form.mobile)) return setError("Enter your name and a valid 10-digit mobile number.")
    if (fulfilment === "Delivery" && !form.address.trim()) return setError("Enter your delivery address.")
    if (!acknowledged) return setError("Please acknowledge that this is an enquiry estimate, not a confirmed order.")
    if (!whatsAppNumber) return setError("WhatsApp is not configured yet. Add NEXT_PUBLIC_WHATSAPP_NUMBER before publishing the website.")
    const reference = `MC-${form.mobile.slice(-4)}-${lines.length}`
    const selected = lines.map((line, index) => `${index + 1}. ${line.titleSnapshot} (${line.packContentSnapshot})\n   Qty: ${line.quantity} × ${formatInr(line.pricePaiseSnapshot)} = ${formatInr(line.quantity * line.pricePaiseSnapshot)}`).join("\n")
    const message = `*MUNIRAJ CRACKERS*\n*ENQUIRY ESTIMATE — NOT A CONFIRMED ORDER*\n\nReference: ${reference}\nCustomer: ${form.name.trim()}\nMobile: +91 ${form.mobile}\nFulfilment: ${fulfilment}${fulfilment === "Delivery" ? `\nAddress: ${form.address.trim()}` : ""}${form.date ? `\nPreferred date: ${form.date}` : ""}${form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : ""}\n\n*Selected crackers*\n${selected}\n\nMerchandise estimate: ${formatInr(total)}\nDelivery estimate: To be confirmed\n*Estimated total: ${formatInr(total)}*\n\nPlease confirm availability, eligibility, delivery, and final amount.\nThis is an enquiry estimate only and is subject to seller confirmation and applicable law.`
    window.location.assign(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`)
  }
  return <><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#9b6411]">Final step</p><h1 className="mt-2 text-3xl font-black text-[#43101c] sm:text-5xl">Prepare your WhatsApp enquiry</h1><p className="mt-4 text-stone-600">The message includes each selected cracker, pack, quantity, unit estimate and total. Review it in WhatsApp before you send.</p>{!lines.length ? <div className="mt-8 rounded-2xl bg-white p-8"><p>Your enquiry cart is empty.</p><Link href="/catalogue" className="mt-4 inline-block font-bold text-[#65162a] underline">Browse catalogue</Link></div> : <form onSubmit={submit} className="mt-8 rounded-3xl border border-[#ead9b8] bg-white p-6 shadow-sm sm:p-8"><div className="rounded-2xl bg-[#fff4d9] p-4"><p className="text-sm font-bold">Estimate total: {formatInr(total)}</p><p className="mt-1 text-xs text-stone-700">{lines.length} products. Delivery and final amount are confirmed by the seller.</p></div>{error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800">{error}</p>}<div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold">Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3 font-normal" /></label><label className="block text-sm font-bold">Mobile number<input required inputMode="numeric" maxLength={10} value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value.replace(/\D/g, "") })} placeholder="10-digit number" className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3 font-normal" /></label></div><fieldset className="mt-6"><legend className="text-sm font-bold">Preferred fulfilment</legend><div className="mt-2 flex gap-3"><label className="rounded-xl border border-stone-300 px-4 py-3"><input type="radio" checked={fulfilment === "Pickup"} onChange={() => setFulfilment("Pickup")} /> <span className="ml-2">Pickup</span></label><label className="rounded-xl border border-stone-300 px-4 py-3"><input type="radio" checked={fulfilment === "Delivery"} onChange={() => setFulfilment("Delivery")} /> <span className="ml-2">Delivery</span></label></div></fieldset>{fulfilment === "Delivery" && <label className="mt-6 block text-sm font-bold">Delivery address<textarea required rows={3} value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3 font-normal" /></label>}<div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold">Preferred date (optional)<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3 font-normal" /></label><label className="block text-sm font-bold">Notes (optional)<input maxLength={240} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3 font-normal" /></label></div><label className="mt-6 flex gap-3 rounded-xl bg-stone-50 p-4 text-sm"><input required checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1" type="checkbox" /><span>I understand this is an enquiry estimate, not a confirmed online order. I have read the safety and legal information.</span></label><button type="submit" className="mt-7 w-full rounded-xl bg-[#65162a] px-5 py-4 font-black text-white">Open WhatsApp enquiry</button><p className="mt-3 text-center text-xs text-stone-500">The enquiry is not received until you review and tap Send in WhatsApp.</p></form>}</main><SiteFooter /></>
}
