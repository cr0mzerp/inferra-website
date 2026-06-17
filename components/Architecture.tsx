"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const layers = [
  {
    name: "User Space",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/30",
    accent: "text-violet-400",
    items: [
      { label: "Terminal", desc: "CLI with NLP intent routing in Turkish/English" },
      { label: "WebUI", desc: "Browser-based dashboard on port 8080" },
      { label: "Apps", desc: "Wayland-native applications" },
    ],
  },
  {
    name: "Core Services",
    color: "from-accent/20 to-accent/5",
    border: "border-accent/30",
    accent: "text-accent",
    items: [
      { label: "Samantha Intent", desc: "NLP router — parses natural language and dispatches to services" },
      { label: "Service Manager", desc: "systemd unit lifecycle with health checks" },
      { label: "Package Manager", desc: "pacman-based with AI-assisted installs" },
    ],
  },
  {
    name: "Aura Compositor",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/30",
    accent: "text-cyan-400",
    items: [
      { label: "Wayland Compositor", desc: "Full wl_seat, wl_output v4, wl_data_device_manager support" },
      { label: "KMS/DRM", desc: "Direct kernel mode-setting, llvmpipe Vulkan render" },
      { label: "Input Pipeline", desc: "EVDEV event loop with shift/ctrl tracking, EV_SYN passthrough" },
    ],
  },
  {
    name: "Kernel",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
    items: [
      { label: "Linux 6.8", desc: "Custom kernel build with Wayland and KVM modules" },
      { label: "Drivers", desc: "virtio, e1000, bochs-drm for QEMU compatibility" },
    ],
  },
]

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <section className="relative border-t border-white/5 py-24" id="architecture">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Architecture
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
            Click a layer to expand details.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/20 via-accent to-emerald-500/20 max-md:hidden" />

          {layers.map((layer, i) => (
            <div key={layer.name} className="relative z-10 mb-6 last:mb-0">
              <button
                onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                className={`group relative flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                  activeLayer === i
                    ? `${layer.border} ${layer.color}`
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <div className={`hidden h-3 w-3 rounded-full md:block ${layer.accent}`} />
                <div className="flex-1">
                  <span className={`text-sm font-semibold ${layer.accent}`}>{layer.name}</span>
                </div>
                <svg
                  className={`h-4 w-4 text-zinc-600 transition-transform ${
                    activeLayer === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {activeLayer === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 p-4 sm:grid-cols-3">
                      {layer.items.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                        >
                          <div className="text-sm font-medium text-zinc-200">{item.label}</div>
                          <div className="mt-1 text-xs text-zinc-500">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
