"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    label: "Boot Screen",
    desc: "UEFI systemd-boot with Inferra kernel",
    content: (
      <div className="flex h-full items-center justify-center bg-deep-950">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-cyan-neon text-2xl font-bold text-white">
            I
          </div>
          <div className="text-lg font-semibold text-white">Inferra v0.1.0</div>
          <div className="mt-1 text-sm text-zinc-500">Loading kernel...</div>
          <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-accent to-cyan-neon" />
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
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-deep-900 to-deep-800">
        <div className="max-w-xs text-center">
          <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left text-xs text-zinc-400">
            <div className="mb-2 flex items-center gap-2 text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
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
      <div className="flex h-full items-center justify-center bg-deep-950">
        <div className="w-72 rounded-lg border border-white/10 bg-deep-800 p-4 text-left text-xs">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold text-white">Inferra Dashboard</span>
            <span className="text-zinc-600">port 8080</span>
          </div>
          <div className="space-y-2">
            {["Hardware", "Processes", "Packages", "Network", "Schedule"].map((s) => (
              <div
                key={s}
                className="flex items-center justify-between rounded bg-white/5 px-3 py-2 text-zinc-400"
              >
                <span>{s}</span>
                <span className="text-zinc-600">● online</span>
              </div>
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
      <div className="flex h-full items-center justify-center bg-deep-950">
        <div className="w-72 rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
          <div className="mb-2 rounded-lg bg-accent/20 px-3 py-2 text-zinc-200">
            5 dakikalık zamanlayıcı kur
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-zinc-400">
            ✓ Timer created: 5 minutes from now
          </div>
          <div className="mt-2 flex items-center gap-2 border-t border-white/5 pt-2">
            <span className="text-zinc-600">Type a message...</span>
            <span className="ml-auto text-accent text-2xl leading-none">→</span>
          </div>
        </div>
      </div>
    ),
  },
]

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
            See it in action
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
            Screenshots from a live Inferra session in QEMU.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-deep-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                {slides[current].content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setCurrent(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    i === current
                      ? "bg-accent text-white"
                      : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-zinc-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-zinc-600">
              {current + 1} / {slides.length}
            </div>
          </div>
          <p className="mt-2 text-xs text-zinc-600">{slides[current].desc}</p>
        </div>
      </div>
    </section>
  )
}
