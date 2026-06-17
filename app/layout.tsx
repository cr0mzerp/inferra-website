import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import PageTransition from "@/components/PageTransition"
import JsonLd from "@/components/JsonLd"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Inferra — AI-native Operating System",
    template: "%s — Inferra",
  },
  description:
    "Inferra is a ground-up AI-native operating system. Open-source, Wayland-native, with an intelligent intent-routing core.",
  openGraph: {
    title: "Inferra — AI-native Operating System",
    description:
      "A ground-up AI-native operating system. Open-source, Wayland-native, intelligent intent-routing core.",
    url: "https://inferra.live",
    siteName: "Inferra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inferra — AI-native OS",
    description: "A ground-up AI-native operating system.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <JsonLd />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
