"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
})

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ThreeBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-900/0 via-deep-900/30 to-deep-950 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            v0.1.0 — Pre-release
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            AI-native{" "}
            <span className="bg-gradient-to-r from-accent to-cyan-neon bg-clip-text text-transparent">
              Operating System
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            Built from the ground up for the age of intelligence. Wayland-native compositor,
            intent-driven NLP core, and a modular service architecture — open-source and
            ready for the future.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-light glow"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download ISO
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-zinc-300 transition-all hover:border-white/20 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Read the Docs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
