"use client"

import { useSyncExternalStore } from "react"
import { CART_KEY, readCart, type CartLine } from "@/lib/cart"

const emptyCart: CartLine[] = []
let lastRaw: string | null = null
let lastCart: CartLine[] = emptyCart

function snapshot() {
  if (typeof window === "undefined") return emptyCart
  const raw = window.localStorage.getItem(CART_KEY) ?? "[]"
  if (raw !== lastRaw) { lastRaw = raw; lastCart = readCart() }
  return lastCart
}

function subscribe(listener: () => void) {
  window.addEventListener("muniraj-cart-change", listener)
  window.addEventListener("storage", listener)
  return () => { window.removeEventListener("muniraj-cart-change", listener); window.removeEventListener("storage", listener) }
}

export function useCart() { return useSyncExternalStore(subscribe, snapshot, () => emptyCart) }
