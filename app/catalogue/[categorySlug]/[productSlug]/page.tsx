import { redirect } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params
  redirect(`/catalogue/${categorySlug}`)
}
