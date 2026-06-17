"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
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
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white sm:text-5xl tabular-nums">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  )
}

const stats = [
  { to: 5, suffix: "s", label: "Boot time" },
  { to: 200, suffix: "MB", label: "Idle RAM" },
  { to: 100, suffix: "%", label: "Written in Rust" },
  { to: 1, suffix: "M", label: "Lines of code" },
]

export default function Stats() {
  return (
    <section className="relative border-t border-white/5 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <Counter key={s.label} to={s.to} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
