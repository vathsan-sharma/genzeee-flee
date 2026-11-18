import { Clock, Headset, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModals } from '../context/ModalContext'
import { TextReveal } from './TextReveal'

const trust = [
  { icon: Clock, label: 'Quote in 1 hour' },
  { icon: Headset, label: '24/7 concierge' },
  { icon: ShieldCheck, label: 'Fully insured' },
]

/**
 * Premium night hero. The photo stays fully visible. A fine gold frame sits inside the edge,
 * the headline and actions sit on the left, and a glass strip along the bottom carries the trust points.
 */
export function Hero() {
  const { openQuote } = useModals()

  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative isolate flex min-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b14] sm:rounded-[2.75rem]">
        <img
          src="/images/home-hero.jpg"
          alt="Dark sedan parked by the Toronto waterfront at night, with the city skyline behind"
          width="2000"
          height="1116"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_50%]"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070b14]/85 via-[#070b14]/55 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070b14]/70 via-transparent to-transparent" aria-hidden="true" />

        <span
          className="pointer-events-none absolute inset-3 -z-0 rounded-[1.6rem] border border-gold/25 sm:inset-5 sm:rounded-[2.3rem]"
          aria-hidden="true"
        />

        <div className="reveal relative z-10 flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:pt-36 lg:px-14 lg:pb-28">
            <div className="max-w-2xl">
              <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.34em] text-gold sm:text-sm">
                <span className="h-px w-10 bg-gold" aria-hidden="true" />
                Canada’s premier private fleet
              </p>

              <h1 className="mt-7 text-5xl font-medium leading-[1.02] tracking-tight text-snow [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
                <TextReveal text="Drive luxury." />
                <span className="mt-3 block font-light italic text-[#9fb8e8] sm:text-[4.25rem] lg:text-[5rem]">
                  <TextReveal text="Arrive in style." delay={500} />
                </span>
              </h1>

              <p className="mt-9 max-w-md border-l border-gold/50 pl-5 text-sm leading-relaxed text-snow [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:text-base">
                Luxury and commercial vehicle rentals in Toronto, from special occasions to everyday business.
              </p>

              <div className="mt-11 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/fleet"
                  className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#e7c382] via-gold to-gold-deep px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-12px_rgba(214,170,92,0.7)] transition-transform duration-500 hover:-translate-y-0.5"
                >
                  Explore our fleet
                  <span aria-hidden="true">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => openQuote()}
                  className="inline-flex items-center justify-center rounded-md border border-snow/40 bg-ink/20 px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-snow backdrop-blur-sm transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  Request a quote
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal relative z-10 mt-auto border-t border-white/10 bg-ink/55 backdrop-blur-md">
          <ul className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-14">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-3 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-snow/85 sm:py-5">
                <Icon size={15} strokeWidth={1.5} className="text-gold" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
