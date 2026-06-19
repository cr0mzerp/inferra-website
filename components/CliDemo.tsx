"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type Line = { text: string; isCmd?: boolean; isOutput?: boolean }

const demo: Line[] = [
  { text: "inferra@os ~ $ inferra --help", isCmd: true },
  { text: "Usage: inferra [command]", isOutput: true },
  { text: "", isOutput: true },
  { text: "  file      Read, write, list, delete files", isOutput: true },
  { text: "  process   Run, kill, list processes", isOutput: true },
  { text: "  package   Install, remove, search packages", isOutput: true },
  { text: "  hardware  Temperature, disk, memory", isOutput: true },
  { text: "  network   Ping, wifi scan, status", isOutput: true },
  { text: "  schedule  Timers, reminders, alarms", isOutput: true },
  { text: "", isOutput: true },
  { text: "inferra@os ~ $ inferra dosya oku /etc/inferra/config.toml", isCmd: true },
  { text: '[config]', isOutput: true },
  { text: 'openrouter_api_key = "sk-..."', isOutput: true },
  { text: 'openrouter_base_url = "https://openrouter.ai"', isOutput: true },
  { text: 'theme = "dark"', isOutput: true },
  { text: '', isOutput: true },
  { text: "inferra@os ~ $ inferra '5 dakikalik zamanlayici kur'", isCmd: true },
  { text: "✓ Timer created: 5 minutes from now", isOutput: true },
  { text: '', isOutput: true },
  { text: "inferra@os ~ $ inferra sistem durumu", isCmd: true },
  { text: "CPU: 2.1 GHz | RAM: 187 MB / 8 GB | Disk: 4.2 GB / 64 GB", isOutput: true },
  { text: "Uptime: 3h 12m | Services: 14 running", isOutput: true },
]

export default function CliDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (visibleCount >= demo.length) return
    const line = demo[visibleCount]
    if (line.isCmd) {
      setIsTyping(true)
      setTypedText("")
      let charIndex = 0
      const typeTimer = setInterval(() => {
        if (charIndex < line.text.length) {
          setTypedText(line.text.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeTimer)
          setIsTyping(false)
          setTimeout(() => setVisibleCount((c) => c + 1), 400)
        }
      }, 25)
      return () => clearInterval(typeTimer)
    } else {
      const delay = 30
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay)
      return () => clearTimeout(timer)
    }
  }, [visibleCount])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visibleCount])

  const handleReset = () => {
    setVisibleCount(0)
    setIsTyping(false)
    setTypedText("")
  }

  return (
    <section className="relative border-t border-white/5 py-24">
      <div className="absolute inset-0 bg-halloween-glow pointer-events-none opacity-50" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Natural language{" "}
            <span className="bg-gradient-to-r from-orange to-purple-deep bg-clip-text text-transparent">
              terminal
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
            Speak to your OS. Every command works in Turkish or English.
          </p>

          <motion.div
            className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-orange/10 bg-dark-900/80 backdrop-blur"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 bg-gradient-to-r from-orange/5 to-purple-deep/5">
              <div className="flex items-center gap-2">
                <motion.span
                  className="h-3 w-3 rounded-full bg-red-500/60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span
                  className="h-3 w-3 rounded-full bg-yellow-500/60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.span
                  className="h-3 w-3 rounded-full bg-emerald-500/60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
                <span className="ml-2 text-xs text-zinc-600">inferra — terminal</span>
              </div>
              <motion.button
                onClick={handleReset}
                className="text-xs text-zinc-600 transition-colors hover:text-orange"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ↻ replay
              </motion.button>
            </div>
            <div className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
              {demo.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.isCmd
                      ? "text-orange-light"
                      : line.isOutput
                        ? "text-zinc-400"
                        : "text-zinc-500"
                  }
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-orange-light">
                  {typedText}
                  <motion.span
                    className="inline-block w-2 h-4 bg-orange ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
