"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Cta() {
  return (
    <section className="relative border-t border-white/5 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-halloween-glow pointer-events-none" />
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #ff6b00 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #4B2A7A 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to try{" "}
            <span className="bg-gradient-to-r from-orange to-purple-deep bg-clip-text text-transparent">
              InferraOS
            </span>
            ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Download the latest ISO, run it in QEMU, or install it on bare metal.
            Open-source, free, and built for the future.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/download"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange to-purple-deep px-8 py-4 text-base font-semibold text-white transition-all overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-orange-light to-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2">
                  <motion.svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </motion.svg>
                  Download v0.1.0
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://github.com/cr0mzerp/inferra-website"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-orange/20 bg-orange/5 px-8 py-4 text-base font-medium text-zinc-300 transition-all hover:border-orange/40 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
