"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.8 1"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ scale, opacity }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative rounded-xl border border-white/5 bg-halloween-card p-6 transition-all hover:border-orange/30"
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.08) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange"
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <feature.icon size={20} />
      </motion.div>
      <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-orange-light transition-colors">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400">{feature.desc}</p>
    </motion.div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="relative border-t border-white/5 py-24">
      <div className="absolute inset-0 bg-halloween-glow pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Built for the age of{" "}
            <span className="bg-gradient-to-r from-orange to-purple-deep bg-clip-text text-transparent">
              intelligence
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Every component designed from scratch. No legacy — just the future.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
