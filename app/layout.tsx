import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
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
    default: "InferraOS — AI-native Operating System",
    template: "%s — InferraOS",
  },
  description:
    "InferraOS is a ground-up AI-native operating system. Open-source, Wayland-native, with an intelligent intent-routing core.",
  openGraph: {
    title: "InferraOS — AI-native Operating System",
    description:
      "A ground-up AI-native operating system. Open-source, Wayland-native, intelligent intent-routing core.",
    url: "https://inferra.live",
    siteName: "InferraOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InferraOS — AI-native OS",
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
      <head />
      <body className="min-h-screen overflow-x-hidden bg-dark-950">
        <Script id="scroll-reset" strategy="beforeInteractive">
          {`
            if (history.scrollRestoration) history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
          `}
        </Script>
        <JsonLd />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
