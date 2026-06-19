import type { Metadata } from "next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ChangelogClient from "./ChangelogClient"

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release history for Inferra OS.",
}

const releases = [
  {
    version: "v0.1.0",
    date: "June 2026",
    title: "Initial alpha release",
    changes: [
      { type: "feature" as const, text: "Aura Wayland compositor with KMS/DRM backend" },
          { type: "feature" as const, text: "Inferra intent routing service (NLP)" },
          { type: "feature" as const, text: "WebUI dashboard on port 8080" },
          { type: "feature" as const, text: "Input pipeline with keyboard/mouse support" },
          { type: "feature" as const, text: "systemd-boot UEFI boot" },
          { type: "feature" as const, text: "QEMU compatibility (virtio, e1000, bochs-drm)" },
          { type: "feature" as const, text: "Inferra website (inferra.live)" },
          { type: "fix" as const, text: "wl_seat capabilities and key event handling" },
          { type: "fix" as const, text: "wl_output v4 events (scale, name, description)" },
          { type: "fix" as const, text: "Türkçe intent matching with morphological variants" },
    ],
  },
]

export default function Changelog() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <ChangelogClient releases={releases} />
      </main>
      <Footer />
    </>
  )
}
