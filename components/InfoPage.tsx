import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <><SiteHeader /><main className="site-container py-16"><p className="festival-kicker">{eyebrow}</p><h1 className="festival-heading mt-4 text-5xl font-black text-white">{title}</h1><div className="festival-card mt-9 space-y-5 p-7 leading-7 text-[#c4c2d3] [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-white">{children}</div></main><SiteFooter /></>
}
