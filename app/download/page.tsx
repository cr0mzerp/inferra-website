import type { Metadata } from "next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Download",
  description: "Download the latest Inferra OS ISO. Open-source AI-native operating system.",
}

const releases = [
  {
    version: "v0.1.0",
    date: "June 17, 2026",
    size: "664 MB",
    sha256: "a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    url: "https://github.com/cr0mzerp/inferra-website/releases/download/v0.1.0/Inferra-OS-v0.1.0.iso",
    notes: [
      "Initial public pre-release",
      "UEFI systemd-boot support",
      "Aura KMS/DRM compositor with Wayland",
      "NLP intent routing (OpenRouter.ai)",
      "File, Process, Network, Hardware, Package microservices",
      "WebUI dashboard on port 8080",
      "Custom Linux 6.8.1 kernel with AI scheduler patches",
    ],
  },
]

export default function Download() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-bold text-white">Download Inferra</h1>
          <p className="mt-3 text-lg text-zinc-400">
            Get the latest release. Open-source, free, and ready to run.
          </p>

          <div className="mt-12 space-y-8">
            {releases.map((r) => (
              <div
                key={r.version}
                className="rounded-xl border border-white/10 bg-deep-800/50 p-6 sm:p-8"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">{r.version}</h2>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
                        Latest
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">
                      {r.date} &middot; {r.size}
                    </p>
                  </div>
                  <a
                    href={r.url}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-light glow"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download ISO
                  </a>
                </div>

                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-semibold text-zinc-300">SHA-256 Checksum</h3>
                  <div className="overflow-x-auto rounded-lg bg-deep-900 p-3">
                    <code className="text-xs text-zinc-500 break-all">{r.sha256}</code>
                  </div>
                </div>

                <details className="mt-6 group">
                  <summary className="cursor-pointer text-sm font-medium text-accent transition-colors hover:text-accent-light">
                    Changelog
                  </summary>
                  <ul className="mt-3 space-y-2 pl-1">
                    {r.notes.map((n, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <svg className="mt-0.5 shrink-0 text-emerald-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                        {n}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-white/10 bg-deep-800/50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">System Requirements</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-zinc-300">Minimum</h4>
                <ul className="space-y-1 text-sm text-zinc-400">
                  <li>x86-64 CPU (Intel Core 2 / AMD K8+)</li>
                  <li>2 GB RAM</li>
                  <li>16 GB disk</li>
                  <li>UEFI firmware</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-zinc-300">Recommended</h4>
                <ul className="space-y-1 text-sm text-zinc-400">
                  <li>Intel Core i5 / AMD Ryzen 5+</li>
                  <li>8 GB RAM</li>
                  <li>64 GB SSD</li>
                  <li>UEFI + GPU with Vulkan support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-deep-800/50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Quick Start</h2>
            <div className="mt-4 space-y-3 text-sm text-zinc-400">
              <p><strong className="text-zinc-200">QEMU (recommended for testing):</strong></p>
              <pre className="overflow-x-auto rounded-lg bg-deep-900 p-4 text-xs text-zinc-400">
{`qemu-system-x86_64 -m 4096 -smp 4 -cdrom inferra-${releases[0].version}.iso \\
  -drive if=pflash,format=raw,readonly=on,file=ovmf-x86_64-4m.code.fd \\
  -nic user,model=virtio-net-pci -vga virtio -display default`}
              </pre>
              <p className="mt-4"><strong className="text-zinc-200">Bare metal:</strong></p>
              <p>Flash the ISO to a USB drive with <code className="rounded bg-deep-900 px-1.5 py-0.5 text-zinc-300">dd</code> or <code className="rounded bg-deep-900 px-1.5 py-0.5 text-zinc-300">balenaEtcher</code>, boot from it, and follow the installer.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
