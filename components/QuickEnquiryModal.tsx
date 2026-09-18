"use client"

import { FormEvent, useState } from "react"
import type { CartLine } from "@/lib/cart"
import { cartTotalPaise } from "@/lib/cart"
import { formatInr } from "@/lib/currency"

const whatsAppNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "")

export function QuickEnquiryModal({ lines, onClose }: { lines: CartLine[]; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", mobile: "", notes: "" })
  const [error, setError] = useState("")
  const total = cartTotalPaise(lines)

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!lines.length) return setError("Select at least one pack first.")
    if (!form.name.trim() || !/^\d{10}$/.test(form.mobile)) return setError("Enter your name and a valid 10-digit mobile number.")
    if (!whatsAppNumber) return setError("WhatsApp is not configured yet. Add NEXT_PUBLIC_WHATSAPP_NUMBER before publishing.")
    const selected = lines.map((line, index) => `${index + 1}. ${line.titleSnapshot} (${line.packContentSnapshot})\n   Qty: ${line.quantity} × ${formatInr(line.pricePaiseSnapshot)} = ${formatInr(line.quantity * line.pricePaiseSnapshot)}`).join("\n")
    const message = `*MUNIRAJ CRACKERS*\n*ENQUIRY ESTIMATE*\n\nCustomer: ${form.name.trim()}\nMobile: +91 ${form.mobile}${form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : ""}\n\n*Crackers ordered*\n${selected}\n\n*Estimated total: ${formatInr(total)}*\n\nPlease confirm availability and final amount.`
    await fetch("/api/enquiry-intents", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), mobile: form.mobile, notes: form.notes.trim(), totalPaise: total, items: lines.map((line) => ({ productId: line.productId, title: line.titleSnapshot, pack: line.packContentSnapshot, quantity: line.quantity, pricePaise: line.pricePaiseSnapshot })) }) }).catch(() => undefined)
    window.location.assign(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`)
  }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#030410]/80 p-4 backdrop-blur-sm" role="presentation" onMouseDown={onClose}><section className="max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto border border-[#f4b942]/35 bg-[#171631] p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="quick-enquiry-title" onMouseDown={(event) => event.stopPropagation()}><button onClick={onClose} className="float-right text-xl text-[#a7a8bd]" aria-label="Close enquiry">×</button><p className="festival-kicker">Quick enquiry</p><h2 id="quick-enquiry-title" className="festival-heading mt-3 text-4xl font-black text-white">Your celebration<br /><em>starts here.</em></h2><p className="mt-3 text-sm leading-6 text-[#a7a8bd]">Review your products and open WhatsApp. This is the only checkout step.</p><div className="mt-6 divide-y divide-white/10 border-y border-white/10">{lines.map((line) => <div key={line.productId} className="flex items-center justify-between gap-4 py-3 text-sm"><div><p className="font-bold text-white">{line.titleSnapshot}</p><p className="text-xs text-[#a7a8bd]">{line.packContentSnapshot} · Qty {line.quantity}</p></div><p className="font-black text-[#f4b942]">{formatInr(line.pricePaiseSnapshot * line.quantity)}</p></div>)}</div><div className="mt-4 flex items-center justify-between"><p className="text-sm text-[#a7a8bd]">Estimated total</p><p className="text-2xl font-black text-white">{formatInr(total)}</p></div>{error && <p role="alert" className="mt-4 border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}<form onSubmit={submit} className="mt-6 space-y-3"><label className="block text-xs font-bold uppercase tracking-wide text-[#c4c2d3]">Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full border border-white/15 bg-white/[.04] px-3 py-3 text-sm text-white outline-none focus:border-[#f4b942]" /></label><label className="block text-xs font-bold uppercase tracking-wide text-[#c4c2d3]">Mobile number<input required inputMode="numeric" maxLength={10} value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value.replace(/\D/g, "") })} placeholder="10-digit mobile number" className="mt-2 w-full border border-white/15 bg-white/[.04] px-3 py-3 text-sm text-white outline-none placeholder:text-[#77788d] focus:border-[#f4b942]" /></label><label className="block text-xs font-bold uppercase tracking-wide text-[#c4c2d3]">Notes <span className="normal-case text-[#77788d]">optional</span><textarea rows={2} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-2 w-full border border-white/15 bg-white/[.04] px-3 py-3 text-sm text-white outline-none focus:border-[#f4b942]" /></label><p className="text-xs leading-5 text-[#a7a8bd]">By opening WhatsApp, you allow Muniraj Crackers to record this enquiry intent for follow-up. Your message is not sent until you tap Send in WhatsApp.</p><button type="submit" className="festival-button festival-button-gold w-full">Open WhatsApp with my list →</button></form></section></div>
}
