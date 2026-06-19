"use client"

import { useEffect } from "react"

export default function ScrollRestore() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual"
      window.scrollTo(0, 0)
    }
  }, [])

  return null
}
