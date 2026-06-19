"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = 16
    const increment = to / (duration / step)

    const timer = setInterval(() => {
      start += increment
      if (start >= to) {
        setVal(to)
        clearInterval(timer)
      } else {
        setVal(Math.floor(start))
      }
    }, step)

    return () => clearInterval(timer)
  }, [inView, to])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center relative group"
    >
      <motion.div
        className="text-4xl font-bold text-white sm:text-5xl tabular-nums"
        whileHover={{ scale: 1.1, color: "#ff8c00" }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {val.toLocaleString()}
        <motion.span
          className="text-orange"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {suffix}
        </motion.span>
      </motion.div>
      <div className="mt-1 text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
        {label}
      </div>
    </motion.div>
  )
}

const stats = [
  { to: 5, suffix: "s", label: "Boot time" },
  { to: 200, suffix: "MB", label: "Idle RAM" },
  { to: 100, suffix: "%", label: "Written in Rust" },
  { to: 1, suffix: "M", label: "Lines of code" },
]

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  })

  const borderGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(255,107,0,0)", "rgba(255,107,0,0.15)", "rgba(255,107,0,0)"]
  )

  return (
    <section ref={sectionRef} className="relative border-t border-white/5 py-20">
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: borderGlow }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Counter to={s.to} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
