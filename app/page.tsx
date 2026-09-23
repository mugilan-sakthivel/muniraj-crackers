import Link from "next/link"
export const revalidate = 600
import { HeroEnquiryCard } from "@/components/HeroEnquiryCard"
import { HomeProductCollection } from "@/components/HomeProductCollection"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { getCatalogue } from "@/lib/catalogue"

export default async function Home() {
  const { categories, products } = await getCatalogue()

  return <><SiteHeader /><main>
    <section className="site-container grid min-h-[560px] items-center gap-10 py-14 lg:grid-cols-[1fr_.8fr] lg:py-10">
      <div><p className="festival-kicker flex items-center gap-3 before:h-px before:w-7 before:bg-[#f4b942] after:h-px after:w-7 after:bg-[#f4b942]">Muniraj Crackers</p><h1 className="festival-heading mt-6 text-6xl font-black tracking-[-.075em] text-white sm:text-7xl lg:text-8xl">Celebrate <em>bigger.</em><br />Save more.</h1><p className="mt-5 text-sm text-[#dfb75c]">உங்கள் கொண்டாட்டத்திற்கு சிறப்பான பட்டாசுகள் — சிறந்த விலையில்!</p><p className="mt-5 max-w-xl text-base leading-7 text-[#a7a8bd]">Choose the packs you want, check the offer total and send one clean enquiry on WhatsApp.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#popular-products" className="festival-button festival-button-gold">Start selecting <span className="ml-2">→</span></Link><Link href="/catalogue" className="festival-button festival-button-ghost">All products</Link></div></div>
      <HeroEnquiryCard />
    </section>
    <div id="popular-products"><HomeProductCollection categories={categories} products={products} /></div>
  </main><SiteFooter /></>
}
