import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange to-purple-deep text-xs font-bold text-white">
                I
              </span>
              <span className="bg-gradient-to-r from-orange to-orange-light bg-clip-text text-transparent">
                inferra
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              AI-native operating system.<br />
              Open-source. Wayland-native. Built from the ground up.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Pages</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-orange-light transition-colors">Home</Link>
              <Link href="/download" className="hover:text-orange-light transition-colors">Download</Link>
              <Link href="/docs" className="hover:text-orange-light transition-colors">Docs</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Community</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <a href="https://github.com/cr0mzerp/inferra-website" target="_blank" rel="noreferrer" className="hover:text-orange-light transition-colors">GitHub</a>
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-orange-light transition-colors">Discord</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} InferraOS. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
