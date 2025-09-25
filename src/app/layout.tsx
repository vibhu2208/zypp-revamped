import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zypp - Sustainable Last-Mile Delivery Solutions",
  description: "Leading the future of eco-friendly logistics with electric vehicles and smart delivery solutions.",
  keywords: ["electric delivery", "sustainable logistics", "last-mile delivery", "eco-friendly"],
  authors: [{ name: "Zypp Electric" }],
  openGraph: {
    title: "Zypp - Sustainable Last-Mile Delivery Solutions",
    description: "Leading the future of eco-friendly logistics with electric vehicles and smart delivery solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zypp - Sustainable Last-Mile Delivery Solutions",
    description: "Leading the future of eco-friendly logistics with electric vehicles and smart delivery solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
