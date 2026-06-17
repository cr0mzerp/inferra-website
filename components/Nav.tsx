"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Docs" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-deep-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-cyan-neon text-xs font-bold text-white shadow-lg">
            I
          </span>
          inferra
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/download"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent-light glow"
          >
            Get Inferra
          </Link>
        </div>

        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              : <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="flex flex-col gap-2 px-4 pb-4 pt-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/download"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white"
              >
                Get Inferra
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
