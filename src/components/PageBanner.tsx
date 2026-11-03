import type { ReactNode } from 'react'

/** Top-of-page banner: skyline photo under a dark gradient, with the page heading inside. */
export function PageBanner({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-20 pt-32 lg:pb-24 lg:pt-40">
      <img src="/images/toronto-skyline-night.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/85 to-ink" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">{children}</div>
    </section>
  )
}
