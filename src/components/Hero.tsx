import { Clock, Headset, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModals } from '../context/ModalContext'

const trust = [
  { icon: Clock, label: 'Quote in 1 hour' },
  { icon: Headset, label: '24/7 concierge' },
  { icon: ShieldCheck, label: 'Fully insured' },
]

/**
 * Full-bleed night skyline with a dark wash, the headline on the left and a luxury sedan on the right.
 * On small screens the sedan drops below the copy.
 */
export function Hero() {
  const { openQuote } = useModals()

  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative isolate flex min-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b14] sm:rounded-[2.75rem] lg:flex-row lg:items-center">
        <img
          src="/images/toronto-skyline-night.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070b14] via-[#070b14]/80 to-[#070b14]/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />

        <div className="reveal relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 pt-32 text-left sm:pt-36 lg:px-10 lg:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">Canada’s premier private fleet</p>

          <h1 className="mt-6 text-5xl font-medium leading-[1.02] tracking-tight text-snow sm:text-6xl lg:text-7xl">
            Drive luxury.
            <span className="mt-2 block font-light italic text-[#9fb8e8] sm:text-[4.25rem] lg:text-[5rem]">Arrive in style.</span>
          </h1>

          <span className="mt-8 block h-px w-16 bg-gold/70" aria-hidden="true" />

          <p className="mt-8 max-w-md text-sm leading-relaxed text-snow/80 sm:text-base">
            Luxury and commercial vehicle rentals in Toronto, from special occasions to everyday business.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Link
              to="/fleet"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-[#14306b] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-snow transition-colors duration-500 hover:bg-[#1c3f89]"
            >
              Explore our fleet
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex items-center justify-center rounded-md border border-snow/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-snow transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              Request a quote
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-snow/70">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={14} strokeWidth={1.5} className="text-gold" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <img
          src="/images/rolls-royce-ghost-extended.webp"
          alt="Rolls-Royce Ghost Extended, luxury sedan"
          width="1280"
          height="720"
          className="relative z-0 mx-auto mt-6 w-[92%] object-contain [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)] lg:absolute lg:bottom-[4%] lg:right-[-2%] lg:mt-0 lg:w-[60%] lg:max-w-none"
        />
      </div>
    </section>
  )
}
