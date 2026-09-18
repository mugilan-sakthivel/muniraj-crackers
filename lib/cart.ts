export const CART_KEY = "muniraj-crackers-cart-v1"

export type CartLine = {
  productId: string
  titleSnapshot: string
  packContentSnapshot: string
  pricePaiseSnapshot: number
  quantity: number
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return []
  try {
    const value = JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]")
    return Array.isArray(value) ? value.filter((line): line is CartLine => line && typeof line.productId === "string" && Number.isInteger(line.quantity) && line.quantity > 0) : []
  } catch { return [] }
}

export function saveCart(lines: CartLine[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines))
  window.dispatchEvent(new Event("muniraj-cart-change"))
}

export function cartQuantity(lines: CartLine[]) { return lines.reduce((total, line) => total + line.quantity, 0) }
export function cartTotalPaise(lines: CartLine[]) { return lines.reduce((total, line) => total + line.pricePaiseSnapshot * line.quantity, 0) }
