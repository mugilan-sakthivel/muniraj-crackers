import Link from "next/link"

export function SiteFooter() {
  return <footer className="mt-16 bg-[#2e0d15] px-5 py-12 text-[#fff5e4]"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><p className="text-xl font-black">Muniraj Crackers</p><p className="mt-2 max-w-sm text-sm text-white/70">A catalogue and enquiry service. No online sale, payment, or order confirmation is made on this website.</p></div><div className="flex flex-wrap content-start gap-x-5 gap-y-2 text-sm"><Link href="/catalogue">Catalogue</Link><Link href="/safety">Safety</Link><Link href="/faq">FAQ</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div><p className="text-sm text-white/60">Seller confirmation, product eligibility and local restrictions apply.</p></div></footer>
}
