"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
]

const sectionLinks = [
  { href: "/#architecture", label: "Architecture" },
  { href: "/#comparison", label: "Comparison" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)

    const [path, hash] = href.split("#")
    if (pathname !== path) {
      router.push(href)
      return
    }
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname === l.href ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {pathname === "/" && (
            <span className="flex items-center gap-4 border-l border-white/5 pl-4">
              {sectionLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={(e) => handleSectionClick(e, s.href)}
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  {s.label}
                </a>
              ))}
            </span>
          )}
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
                  className={`rounded px-3 py-2 text-sm transition-colors ${
                    pathname === l.href
                      ? "bg-white/5 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {pathname === "/" && (
                <>
                  <div className="my-1 border-t border-white/5" />
                  {sectionLinks.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      onClick={(e) => {
                        handleSectionClick(e, s.href)
                        setOpen(false)
                      }}
                      className="rounded px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
                    >
                      {s.label}
                    </a>
                  ))}
                </>
              )}
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
