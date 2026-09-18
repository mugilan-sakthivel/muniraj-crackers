import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <><SiteHeader /><main className="mx-auto max-w-3xl px-5 py-14"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#9b6411]">{eyebrow}</p><h1 className="mt-2 text-4xl font-black text-[#43101c]">{title}</h1><div className="mt-8 space-y-5 rounded-3xl bg-white p-7 leading-7 text-stone-700 shadow-sm">{children}</div></main><SiteFooter /></>
}
