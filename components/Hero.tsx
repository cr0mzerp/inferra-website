"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
})

function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [])
  return mouse
}

function FloatingOrbs() {
  const mouse = useMousePosition()
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,107,0,0.3) 0%, transparent 70%)",
          x: useSpring(useTransform(() => mouse.x * -30), { stiffness: 50, damping: 20 }),
          y: useSpring(useTransform(() => mouse.y * -30), { stiffness: 50, damping: 20 }),
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(75,42,122,0.3) 0%, transparent 70%)",
          x: useSpring(useTransform(() => mouse.x * 30), { stiffness: 50, damping: 20 }),
          y: useSpring(useTransform(() => mouse.y * 30), { stiffness: 50, damping: 20 }),
        }}
      />
    </div>
  )
}

function FloatingParticles({ count = 20 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 2 === 0 ? "#ff6b00" : "#4B2A7A",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  }

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: i * 0.03, duration: 0.5, ease: "easeOut" as const },
    }),
  }

  const titleText = "AI-native Operating System"
  const titleLetters = titleText.split("")

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-halloween"
    >
      <ThreeBackground />
      <FloatingOrbs />
      <FloatingParticles count={25} />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-dark-900/0 via-dark-900/20 to-dark-950 pointer-events-none"
        style={{ opacity }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        style={{ y, opacity, scale }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={childVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-1.5 text-xs text-orange-light"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-orange"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            v0.1.0 — Pre-release
          </motion.div>

          <motion.h1
            className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
            variants={childVariants}
          >
            <span className="bg-gradient-to-r from-orange via-orange-light to-purple-deep bg-clip-text text-transparent">
              InferraOS
            </span>
          </motion.h1>

          <motion.div variants={childVariants} className="mt-4 overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {titleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ color: letter === "O" || letter === "S" ? "#ff8c00" : undefined }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            variants={childVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
          >
            Built from the ground up for the age of intelligence. Wayland-native compositor,
            intent-driven NLP core, and a modular service architecture — open-source and
            ready for the future.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
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
                  Download ISO
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 rounded-xl border border-orange/20 bg-orange/5 px-8 py-4 text-base font-medium text-zinc-300 transition-all hover:border-orange/40 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Read the Docs
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
