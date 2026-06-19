"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const [path, hash] = href.split("#")
    if (pathname !== path) {
      router.push(href)
      return
    }
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-orange/20 bg-dark-950/90 backdrop-blur-xl"
          : "border-white/5 bg-dark-950/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange to-purple-deep text-xs font-bold text-white shadow-lg">
              I
            </span>
            <span className="bg-gradient-to-r from-orange to-orange-light bg-clip-text text-transparent">
              inferra
            </span>
          </Link>
        </motion.div>

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l, i) => (
            <motion.div
              key={l.href}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={l.href}
                className={`text-sm transition-colors ${
                  pathname === l.href ? "text-orange" : "text-zinc-400 hover:text-orange-light"
                }`}
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
          {pathname === "/" && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 border-l border-white/5 pl-4"
            >
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
            </motion.span>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/download"
              className="rounded-lg bg-gradient-to-r from-orange to-purple-deep px-4 py-2 text-sm font-medium text-white transition-all hover:from-orange-light hover:to-purple-light glow-orange"
            >
              Get InferraOS
            </Link>
          </motion.div>
        </div>

        <button
          className="sm:hidden text-zinc-400 hover:text-white transition-colors"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="flex flex-col gap-2 px-4 pb-4 pt-2">
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded px-3 py-2 text-sm transition-colors ${
                      pathname === l.href
                        ? "bg-orange/10 text-orange"
                        : "text-zinc-400 hover:bg-white/5 hover:text-orange-light"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              {pathname === "/" && (
                <>
                  <div className="my-1 border-t border-white/5" />
                  {sectionLinks.map((s) => (
                    <motion.div
                      key={s.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <a
                        href={s.href}
                        onClick={(e) => {
                          handleSectionClick(e, s.href)
                          setOpen(false)
                        }}
                        className="rounded px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
                      >
                        {s.label}
                      </a>
                    </motion.div>
                  ))}
                </>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/download"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg bg-gradient-to-r from-orange to-purple-deep px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Get InferraOS
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
