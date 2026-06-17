"use client"

import { motion } from "framer-motion"

const layers = [
  { label: "Kernel", sub: "Custom Linux 6.8.1 with AI scheduler patches", color: "from-violet-500 to-violet-700" },
  { label: "Aura Compositor", sub: "KMS/DRM + Wayland server + wgpu renderer", color: "from-indigo-500 to-indigo-700" },
  { label: "Intent Routing", sub: "NLP core → entity extraction → LLM routing", color: "from-blue-500 to-blue-700" },
  { label: "Microservices", sub: "File, Process, Network, Hardware, Package, Schedule…", color: "from-cyan-500 to-cyan-700" },
  { label: "User Interface", sub: "Aura overlay UI + WebUI (port 8080)", color: "from-teal-500 to-teal-700" },
]

const connections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
]

export default function Architecture() {
  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Architecture</h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Clean layered design from kernel to UI. Each layer is replaceable.
          </p>
        </motion.div>

        <div className="relative">
          <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
            {connections.map((c) => {
              const y1 = c.from * 88 + 44
              const y2 = c.to * 88 + 44
              return (
                <line
                  key={`${c.from}-${c.to}`}
                  x1="50%"
                  y1={y1}
                  x2="50%"
                  y2={y2}
                  stroke="url(#archGrad)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              )
            })}
            <defs>
              <linearGradient id="archGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-6">
            {layers.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full max-w-lg"
              >
                <div className={`rounded-xl bg-gradient-to-r ${l.color} p-0.5`}>
                  <div className="rounded-[10px] bg-deep-900 px-6 py-4">
                    <div className="text-sm font-semibold text-white">{l.label}</div>
                    <div className="mt-0.5 text-xs text-white/60">{l.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
