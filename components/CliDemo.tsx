"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type Line = { text: string; isCmd?: boolean; isOutput?: boolean }

const demo: Line[] = [
  { text: "inferra@live ~ $ samantha --help", isCmd: true },
  { text: "Usage: samantha [command]", isOutput: true },
  { text: "", isOutput: true },
  { text: "  file      Read, write, list, delete files", isOutput: true },
  { text: "  process   Run, kill, list processes", isOutput: true },
  { text: "  package   Install, remove, search packages", isOutput: true },
  { text: "  hardware  Temperature, disk, memory", isOutput: true },
  { text: "  network   Ping, wifi scan, status", isOutput: true },
  { text: "  schedule  Timers, reminders, alarms", isOutput: true },
  { text: "", isOutput: true },
  { text: "inferra@live ~ $ samantha dosya oku /etc/inferra/config.toml", isCmd: true },
  { text: '[config]', isOutput: true },
  { text: 'openrouter_api_key = "sk-..."', isOutput: true },
  { text: 'openrouter_base_url = "https://openrouter.ai"', isOutput: true },
  { text: 'theme = "dark"', isOutput: true },
  { text: '', isOutput: true },
  { text: "inferra@live ~ $ samantha '5 dakikalik zamanlayici kur'", isCmd: true },
  { text: "✓ Timer created: 5 minutes from now", isOutput: true },
  { text: '', isOutput: true },
  { text: "inferra@live ~ $ samantha sistem durumu", isCmd: true },
  { text: "CPU: 2.1 GHz | RAM: 187 MB / 8 GB | Disk: 4.2 GB / 64 GB", isOutput: true },
  { text: "Uptime: 3h 12m | Services: 14 running", isOutput: true },
]

export default function CliDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (visibleCount >= demo.length) return
    const delay = demo[visibleCount].isCmd ? 600 : 40
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay)
    return () => clearTimeout(timer)
  }, [visibleCount])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visibleCount])

  const handleReset = () => setVisibleCount(0)

  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Natural language terminal
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
            Speak to your OS. Every command works in Turkish or English.
          </p>

          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-deep-900/80 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-xs text-zinc-600">samantha — terminal</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
              >
                ↻ replay
              </button>
            </div>
            <div className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
              {demo.slice(0, visibleCount).map((line, i) => (
                <div
                  key={i}
                  className={
                    line.isCmd
                      ? "text-emerald-400"
                      : line.isOutput
                        ? "text-zinc-400"
                        : "text-zinc-500"
                  }
                >
                  {line.text || "\u00A0"}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
