"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    label: "Boot Screen",
    desc: "UEFI systemd-boot with Samantha kernel",
    content: (
      <div className="flex h-full items-center justify-center bg-dark-950">
        <div className="text-center">
          <motion.div
            className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange to-purple-deep text-2xl font-bold text-white"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            S
          </motion.div>
          <div className="text-lg font-semibold text-white">InferraOS v0.1.0</div>
          <div className="mt-1 text-sm text-zinc-500">Loading kernel...</div>
          <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange to-purple-deep"
              animate={{ x: ["-100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1 text-left text-xs text-zinc-600">
            <div>Kernel: 6.8.1-samantha</div>
            <div>RAM: 187 MB used</div>
            <div>Services: 14/14</div>
            <div>Uptime: 0:00:12</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Aura Compositor",
    desc: "KMS/DRM desktop with Wayland support",
    content: (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-xs text-center">
          <div className="mb-4 rounded-xl border border-orange/10 bg-orange/5 p-4 text-left text-xs text-zinc-400">
            <div className="mb-2 flex items-center gap-2 text-zinc-300">
              <motion.span
                className="h-2 w-2 rounded-full bg-orange"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              System
            </div>
            <div>CPU: 2.1 GHz ████████░░ 82%</div>
            <div>RAM: 187 MB ██░░░░░░░░ 22%</div>
            <div>Disk: 4.2 GB █░░░░░░░░░ 7%</div>
          </div>
          <div className="text-xs text-zinc-600">Wayland compositor • 1280x800 • 60 fps</div>
        </div>
      </div>
    ),
  },
  {
    label: "WebUI Dashboard",
    desc: "Browser-based system management",
    content: (
      <div className="flex h-full items-center justify-center bg-dark-950">
        <div className="w-72 rounded-lg border border-orange/10 bg-dark-800 p-4 text-left text-xs">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold text-white">InferraOS Dashboard</span>
            <span className="text-zinc-600">port 8080</span>
          </div>
          <div className="space-y-2">
            {["Hardware", "Processes", "Packages", "Network", "Schedule"].map((s, i) => (
              <motion.div
                key={s}
                className="flex items-center justify-between rounded bg-white/5 px-3 py-2 text-zinc-400"
                whileHover={{ x: 5, backgroundColor: "rgba(255,107,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>{s}</span>
                <motion.span
                  className="text-emerald-400"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  ● online
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "NLP Chat",
    desc: "Natural language interface",
    content: (
      <div className="flex h-full items-center justify-center bg-dark-950">
        <div className="w-72 rounded-xl border border-purple-deep/20 bg-purple-deep/5 p-3 text-xs">
          <motion.div
            className="mb-2 rounded-lg bg-orange/20 px-3 py-2 text-zinc-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            5 dakikalık zamanlayıcı kur
          </motion.div>
          <motion.div
            className="rounded-lg bg-white/5 px-3 py-2 text-zinc-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ✓ Timer created: 5 minutes from now
          </motion.div>
          <div className="mt-2 flex items-center gap-2 border-t border-white/5 pt-2">
            <span className="text-zinc-600">Type a message...</span>
            <motion.span
              className="ml-auto text-orange text-2xl leading-none"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    ),
  },
]

const slideVariants = {
  enter: {
    x: 300,
    opacity: 0,
    scale: 0.95,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
}

export default function Screenshots() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            See it in{" "}
            <span className="bg-gradient-to-r from-orange to-purple-deep bg-clip-text text-transparent">
              action
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
            Screenshots from a live InferraOS session in QEMU.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-orange/10 bg-dark-900 group">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full w-full"
              >
                {slides[current].content}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => {
                const next = (current - 1 + slides.length) % slides.length
                setCurrent(next)
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange/50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => {
                const next = (current + 1) % slides.length
                setCurrent(next)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange/50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <motion.button
                  key={s.label}
                  onClick={() => setCurrent(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    i === current
                      ? "bg-gradient-to-r from-orange to-purple-deep text-white"
                      : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-zinc-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.label}
                </motion.button>
              ))}
            </div>
            <div className="text-xs text-zinc-600">
              {current + 1} / {slides.length}
            </div>
          </div>
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-zinc-600"
          >
            {slides[current].desc}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
