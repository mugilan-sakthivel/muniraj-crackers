import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://muniraj-crackers.vercel.app"),
  title: { default: "Muniraj Crackers | Catalogue & Enquiry", template: "%s | Muniraj Crackers" },
  description: "Browse the Muniraj Crackers catalogue and send a WhatsApp enquiry estimate. Availability and final terms require seller confirmation.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
