"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch("https://api.github.com/repos/cr0mzerp/inferra-website")
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count ?? null))
      .catch(() => setStars(null))
  }, [])

  return (
    <section className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.a
          href="https://github.com/cr0mzerp/inferra-website"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-zinc-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>
            Star on GitHub
            {stars !== null && (
              <span className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-xs tabular-nums text-zinc-300">
                {stars}
              </span>
            )}
          </span>
        </motion.a>
      </div>
    </section>
  )
}
