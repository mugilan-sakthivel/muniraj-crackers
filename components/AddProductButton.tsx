"use client"

import { useState } from "react"
import type { CatalogueProduct } from "@/data/catalogue.generated"
import { readCart, saveCart } from "@/lib/cart"

export function AddProductButton({ product }: { product: CatalogueProduct }) {
  const [added, setAdded] = useState(false)
  return <button onClick={() => { const cart = readCart(); const line = cart.find((item) => item.productId === product.id); if (line) line.quantity += 1; else cart.push({ productId: product.id, titleSnapshot: product.title, packContentSnapshot: product.packContent, pricePaiseSnapshot: product.pricePaise, quantity: 1 }); saveCart(cart); setAdded(true) }} className="mt-6 w-full rounded-xl bg-[#65162a] px-5 py-3 font-black text-white">{added ? "Added to enquiry cart" : "Add to enquiry"}</button>
}
