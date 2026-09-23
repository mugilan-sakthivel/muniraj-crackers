import type { CatalogueCategory, CatalogueProduct } from "@/data/catalogue.generated"

export type CatalogueCollection = {
  id: string
  title: string
  tamilTitle: string
  description: string
  categorySlugs: string[]
}

// These are shopping collections, not safety ratings. Every firework must be
// handled by an adult in accordance with the safety guidance on the site.
export const catalogueCollections: CatalogueCollection[] = [
  {
    id: "light-and-sparklers",
    title: "Sparklers & lights",
    tamilTitle: "ஒளி பட்டாசுகள்",
    description: "Hand-held sparkle and gentle light effects.",
    categorySlugs: ["sparklers-kalis-brand", "special-sparklers", "twinkling-star", "colour-crackling-candle", "flash-and-crackling-candle"],
  },
  {
    id: "ground-effects",
    title: "Sangu chakkaram & ground effects",
    tamilTitle: "தரை வானவேடிக்கை",
    description: "Flower pots, chakkarams and fountains for ground displays.",
    categorySlugs: ["flower-pots", "flower-pot-special", "ground-chakkar-varieties", "colour-ground-chakkar", "ground-chakkars-special", "mega-crackling-fountain", "multi-function-fountain", "colour-crackling-fountain", "crackling-fountain", "deluxe-colour-fountain", "lovely-colour-and-crackling-fountain", "kids-fountain", "colour-fountain", "peacock-varieties"],
  },
  {
    id: "family-novelties",
    title: "Family novelties",
    tamilTitle: "குடும்ப கொண்டாட்டம்",
    description: "Novelty and visual packs for adult-supervised celebrations.",
    categorySlugs: ["fancy-novelties", "childrens-fancy-novelties", "digital-crackling", "kids-varieties"],
  },
  {
    id: "sound-crackers",
    title: "Sound crackers",
    tamilTitle: "ஒலி பட்டாசுகள்",
    description: "Sound-focused packs, grouped separately for easy choice.",
    categorySlugs: ["one-sound", "bomb-varieties", "bijili-varieties", "paper-bomb", "sound-varieties", "hifi-short", "hifi-full-crackers"],
  },
  {
    id: "sky-aerials",
    title: "Vaan vedikkai & aerials",
    tamilTitle: "வான வேடிக்கை",
    description: "Rockets, aerial fancies and skyward display packs.",
    categorySlugs: ["rocket", "whistling-varieties", "mini-aerial-fancy", "special-aerial-fancy", "2-inch-aerial-fancy", "ayyan-special-series", "special-pipe-series", "4-inch-aerial-fancy", "4-inch-special-colour-fancy", "4-inch-unique-varieties", "4-inch-double-ball", "seven-step-aerial-varieties", "mega-aerial-display-2-pcs", "5-inch-mega-display", "6-inch-mega-display", "repeating-shots", "multicolour-shot", "multicolour-shot-with-crackling"],
  },
  {
    id: "display-packs",
    title: "Big display & value packs",
    tamilTitle: "சிறப்பு காட்சி பேக்குகள்",
    description: "Set-outs and special display selections.",
    categorySlugs: ["fancy-setout-crackers", "mega-setout-crackers", "match-box"],
  },
]

export function collectionForCategory(categorySlug: string) {
  return catalogueCollections.find((collection) => collection.categorySlugs.includes(categorySlug))
}

export function categoriesForCollection(categories: CatalogueCategory[], collectionId: string) {
  const collection = catalogueCollections.find((item) => item.id === collectionId)
  if (!collection) return categories
  return categories.filter((category) => collection.categorySlugs.includes(category.slug))
}

export function productsForCollection(products: CatalogueProduct[], collectionId: string) {
  const collection = catalogueCollections.find((item) => item.id === collectionId)
  if (!collection) return products
  return products.filter((product) => collection.categorySlugs.includes(product.categorySlug))
}
