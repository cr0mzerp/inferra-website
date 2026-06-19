"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const layers = [
  {
    name: "User Space",
    color: "from-orange/20 to-orange/5",
    border: "border-orange/30",
    accent: "text-orange-light",
    gradient: "from-orange to-orange-light",
    items: [
      { label: "Terminal", desc: "CLI with NLP intent routing in Turkish/English" },
      { label: "WebUI", desc: "Browser-based dashboard on port 8080" },
      { label: "Apps", desc: "Wayland-native applications" },
    ],
  },
  {
    name: "Core Services",
    color: "from-purple-deep/20 to-purple-deep/5",
    border: "border-purple-deep/30",
    accent: "text-purple-light",
    gradient: "from-purple-deep to-purple-light",
    items: [
      { label: "Inferra Intent", desc: "NLP router — parses natural language and dispatches to services" },
      { label: "Service Manager", desc: "systemd unit lifecycle with health checks" },
      { label: "Package Manager", desc: "pacman-based with AI-assisted installs" },
    ],
  },
  {
    name: "Aura Compositor",
    color: "from-orange/15 to-purple-deep/10",
    border: "border-orange/20",
    accent: "text-orange",
    gradient: "from-orange to-purple-deep",
    items: [
      { label: "Wayland Compositor", desc: "Full wl_seat, wl_output v4, wl_data_device_manager support" },
      { label: "KMS/DRM", desc: "Direct kernel mode-setting, llvmpipe Vulkan render" },
      { label: "Input Pipeline", desc: "EVDEV event loop with shift/ctrl tracking, EV_SYN passthrough" },
    ],
  },
  {
    name: "Kernel",
    color: "from-dark-700/30 to-dark-700/10",
    border: "border-dark-700/30",
    accent: "text-zinc-400",
    gradient: "from-zinc-500 to-zinc-600",
    items: [
      { label: "Linux 6.8", desc: "Custom kernel build with Wayland and KVM modules" },
      { label: "Drivers", desc: "virtio, e1000, bochs-drm for QEMU compatibility" },
    ],
  },
]

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" as const },
  }),
}

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
          <motion.div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 max-md:hidden"
            style={{
              background: "linear-gradient(to bottom, rgba(255,107,0,0.3), rgba(75,42,122,0.3), rgba(255,255,255,0.1))",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              className="relative z-10 mb-6 last:mb-0"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <motion.button
                onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                className={`group relative flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                  activeLayer === i
                    ? `${layer.border} ${layer.color}`
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <motion.div
                  className={`hidden h-3 w-3 rounded-full md:block`}
                  style={{ background: `linear-gradient(135deg, ${layer.gradient.replace("from-", "").replace("to-", "").split(" ")[0]}, ${layer.gradient.split(" ")[1]})` }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <div className="flex-1">
                  <span className={`text-sm font-semibold ${layer.accent}`}>{layer.name}</span>
                </div>
                <motion.svg
                  className="h-4 w-4 text-zinc-600"
                  animate={{ rotate: activeLayer === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {activeLayer === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="grid gap-3 p-4 sm:grid-cols-3"
                      initial="hidden"
                      animate="visible"
                    >
                      {layer.items.map((item, j) => (
                        <motion.div
                          key={item.label}
                          custom={j}
                          variants={itemVariants}
                          className="rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-orange/20 transition-colors"
                        >
                          <div className="text-sm font-medium text-zinc-200">{item.label}</div>
                          <div className="mt-1 text-xs text-zinc-500">{item.desc}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
