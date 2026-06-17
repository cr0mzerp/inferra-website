"use client"

import { motion } from "framer-motion"

const rows = [
  { feature: "AI-native NLP", inferra: true, ubuntu: false, arch: false, chromeos: true },
  { feature: "Wayland compositor", inferra: true, ubuntu: false, arch: false, chromeos: false },
  { feature: "Written in Rust", inferra: true, ubuntu: false, arch: false, chromeos: false },
  { feature: "Natural language in Turkish", inferra: true, ubuntu: false, arch: false, chromeos: false },
  { feature: "Boot time", inferra: "~5s", ubuntu: "~15s", arch: "~10s", chromeos: "~8s" },
  { feature: "Idle RAM", inferra: "~200 MB", ubuntu: "~600 MB", arch: "~300 MB", chromeos: "~500 MB" },
  { feature: "Open-source", inferra: true, ubuntu: true, arch: true, chromeos: false },
  { feature: "Package manager", inferra: "pacman + AI", ubuntu: "apt", arch: "pacman", chromeos: "Portage" },
]

const os = [
  { key: "inferra", label: "Inferra" },
  { key: "ubuntu", label: "Ubuntu" },
  { key: "arch", label: "Arch Linux" },
  { key: "chromeos", label: "ChromeOS" },
] as const

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-emerald-400">✓</span>
    ) : (
      <span className="text-zinc-700">—</span>
    )
  }
  return <span className="text-zinc-300">{value}</span>
}

export default function Comparison() {
  return (
    <section className="relative border-t border-white/5 py-24" id="comparison">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            How does Inferra compare?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
            Feature comparison with popular operating systems.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Feature
                </th>
                {os.map((o) => (
                  <th
                    key={o.key}
                    className={`pb-3 text-center text-xs font-medium uppercase tracking-wider ${
                      o.key === "inferra" ? "text-accent" : "text-zinc-600"
                    }`}
                  >
                    {o.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                    i % 2 === 0 ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="py-3 text-zinc-400">{row.feature}</td>
                  {os.map((o) => (
                    <td key={o.key} className="py-3 text-center">
                      <Cell value={row[o.key as keyof typeof row] as boolean | string} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
