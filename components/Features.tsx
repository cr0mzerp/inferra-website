"use client"

import { motion, type Easing } from "framer-motion"
import { Cpu, Command, Waypoints, Blocks, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Aura Compositor",
    desc: "KMS/DRM fullscreen compositor with Wayland server built-in. Vulkan + GL rendering, wgpu-powered UI, and real-time keyboard focus routing.",
  },
  {
    icon: Command,
    title: "NLP Intent Routing",
    desc: "Natural language processing core that routes user intent to the right microservice — not just a chatbot wrapper, but the OS itself understanding you.",
  },
  {
    icon: Waypoints,
    title: "Event-Driven Service Bus",
    desc: "Modular microservice architecture connected via an event bus. Services register, communicate, and orchestrate — all in Rust.",
  },
  {
    icon: Blocks,
    title: "Wayland Native",
    desc: "No X11 compatibility layer. Native Wayland protocol implementation using wayland-server-rs. GTK, Qt, and SDL applications supported out of the box.",
  },
  {
    icon: Shield,
    title: "Security-First Design",
    desc: "SELinux policies out of the box. Process isolation, capability-based permissions, and verified boot chain.",
  },
  {
    icon: Zap,
    title: "Minimal & Fast",
    desc: "Boots in under 5 seconds on modern hardware. ~200 MB idle RAM. Built with Rust and zero unnecessary overhead.",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export default function Features() {
  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Built for the age of intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Every component designed from scratch. No legacy — just the future.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-xl border border-white/5 bg-deep-800/50 p-6 transition-all hover:border-accent/30 hover:bg-deep-800"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <f.icon size={20} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
