import Link from "next/link"
import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"

export function CategoryDirectory({ categories, products }: { categories: CatalogueCategory[]; products: CatalogueProduct[] }) {
  return <section className="site-container py-5 sm:py-8">
    <h1 className="sr-only">Cracker categories</h1>
    <div className="rounded-3xl border border-white/10 bg-[#11122b] p-3 shadow-xl shadow-black/20 sm:p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.categorySlug === category.slug)
          const imageProduct = categoryProducts.find((product) => product.image) ?? categoryProducts[0]
          return <Link key={category.id} href={`/catalogue/${category.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171532] transition hover:-translate-y-0.5 hover:border-[#f4b942]/50">
            <div className="grid aspect-[1.15] place-items-center bg-[#fffaf0] p-3">{imageProduct?.image ? <img src={imageProduct.image} alt={imageProduct.imageAlt || category.title} className="h-full w-full object-contain transition duration-200 group-hover:scale-105" /> : <span className="text-3xl text-[#f4b942]">✦</span>}</div>
            <div className="p-3"><h2 className="line-clamp-2 text-sm font-black leading-tight text-white">{category.title}</h2><p className="mt-2 text-xs font-bold text-[#f4b942]">{categoryProducts.length} products <span aria-hidden="true">→</span></p></div>
          </Link>
        })}
      </div>
      <div className="mt-5 text-center"><Link href="/catalogue?view=all" className="festival-button festival-button-gold">See all products →</Link></div>
    </div>
  </section>
}
