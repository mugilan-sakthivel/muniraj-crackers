import { createClient } from "@sanity/client"
import { NextResponse } from "next/server"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8bk97zyk"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const token = process.env.SANITY_API_WRITE_TOKEN

export async function POST(request: Request) {
  if (!token) return NextResponse.json({ recorded: false }, { status: 202 })
  try {
    const body = await request.json()
    if (!body || typeof body.name !== "string" || !/^\d{10}$/.test(body.mobile) || !Array.isArray(body.items)) return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 })
    const items = body.items.slice(0, 100).flatMap((item: unknown) => {
      if (!item || typeof item !== "object") return []
      const row = item as Record<string, unknown>
      const quantity = Number(row.quantity)
      const pricePaise = Number(row.pricePaise)
      const productId = String(row.productId ?? "").slice(0, 120)
      const title = String(row.title ?? "").slice(0, 200)
      if (!productId || !title || !Number.isInteger(quantity) || quantity < 1 || !Number.isInteger(pricePaise) || pricePaise < 0) return []
      return [{ _type: "enquiryItem", productId, title, pack: String(row.pack ?? "").slice(0, 160), quantity, pricePaise }]
    })
    if (!items.length) return NextResponse.json({ error: "A valid selected product is required." }, { status: 400 })
    const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-18", useCdn: false })
    await client.create({ _type: "enquiryIntent", name: body.name.slice(0, 100), mobile: body.mobile, notes: typeof body.notes === "string" ? body.notes.slice(0, 500) : "", totalPaise: Number.isInteger(body.totalPaise) ? body.totalPaise : 0, items, source: "whatsapp-click", createdAt: new Date().toISOString() })
    return NextResponse.json({ recorded: true })
  } catch { return NextResponse.json({ recorded: false }, { status: 202 }) }
}
