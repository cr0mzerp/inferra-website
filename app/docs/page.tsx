import type { Metadata } from "next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Docs",
  description: "Installation guide, configuration, and architecture overview for Inferra OS.",
}

const sections = [
  {
    title: "Installation",
    items: [
      {
        q: "How do I boot Inferra for the first time?",
        a: "Download the latest ISO from the Download page. Boot it via QEMU or write it to a USB drive and boot from UEFI. The live environment starts automatically. Run `inferra-install` to begin the guided installation.",
      },
      {
        q: "What are the disk requirements?",
        a: "Minimum 16 GB disk space. Inferra uses Btrfs by default with zstd compression. A swap partition is created automatically if you have more than 8 GB of disk space.",
      },
      {
        q: "Does Inferra support dual-boot?",
        a: "Currently Inferra uses the full disk. Dual-boot support is planned for a future release.",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        q: "How do I configure the system?",
        a: "The configuration file is at `/etc/inferra/config.toml`. It includes UI colors, service settings, API keys for OpenRouter.ai, and hardware parameters. Changes take effect after reboot or service restart.",
      },
      {
        q: "Can I change the API endpoint?",
        a: "Yes. Set `openrouter_base_url` in `/etc/inferra/config.toml` to any OpenAI-compatible API endpoint. The NLP service will route through it.",
      },
    ],
  },
  {
    title: "Architecture",
    items: [
      {
        q: "How do microservices work?",
        a: "Each capability (file management, process control, networking, etc.) runs as an independent Rust service. They communicate via gRPC through the orchestrator, which handles routing and aggregation.",
      },
      {
        q: "What is Aura?",
        a: "Aura is the display compositor. It manages the framebuffer via KMS/DRM directly, renders the UI with wgpu (Vulkan/GL), and hosts the Wayland compositor for application windows. It runs as PID 1 in the display session.",
      },
      {
        q: "How does NLP intent routing work?",
        a: "User input is first classified by a keyword-based intent system that maps to specific actions (file read, package install, etc.). If confidence is low, it falls through to an LLM (OpenRouter.ai) for general chat. Each intent has a dedicated routing rule with its own system prompt.",
      },
    ],
  },
]

export default function Docs() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
          <p className="mt-3 text-lg text-zinc-400">
            Everything you need to get started with Inferra.
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-6 text-2xl font-bold text-white">{section.title}</h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl border border-white/10 bg-deep-800/50 transition-all open:border-accent/30"
                    >
                      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium text-zinc-200 transition-colors hover:text-white">
                        {item.q}
                        <svg
                          className="ml-2 shrink-0 text-zinc-500 transition-transform group-open:rotate-180"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </summary>
                      <div className="border-t border-white/5 px-6 py-4 text-sm leading-relaxed text-zinc-400">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
