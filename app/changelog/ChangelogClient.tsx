"use client"

import { motion } from "framer-motion"

interface Change {
  type: "feature" | "fix" | "improvement"
  text: string
}

interface Release {
  version: string
  date: string
  title: string
  changes: Change[]
}

export default function ChangelogClient({ releases }: { releases: Release[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Changelog</h1>
        <p className="mt-2 text-zinc-400">Release history for Inferra OS.</p>
      </motion.div>

      <div className="relative mt-12">
        <div className="absolute left-4 top-0 h-full w-px bg-white/10" />

        {releases.map((release, i) => (
          <motion.div
            key={release.version}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="relative mb-12 pl-12 last:mb-0"
          >
            <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-deep-950" />

            <div className="mb-1 flex items-baseline gap-3">
              <h2 className="text-lg font-bold text-white">{release.version}</h2>
              <span className="text-xs text-zinc-600">{release.date}</span>
            </div>
            <p className="mb-4 text-sm text-zinc-500">{release.title}</p>

            <ul className="space-y-1.5">
              {release.changes.map((change, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      change.type === "feature"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : change.type === "fix"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {change.type}
                  </span>
                  <span className="text-zinc-400">{change.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
