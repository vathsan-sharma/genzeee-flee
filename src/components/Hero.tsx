import { Clock, Headset, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModals } from '../context/ModalContext'

const trust = [
  { icon: Clock, label: 'Quote in 1 hour' },
  { icon: Headset, label: '24/7 concierge' },
  { icon: ShieldCheck, label: 'Fully insured' },
]

/**
 * Full-width hero inside a curved frame. The background is a full-bleed white studio render,
 * with dark copy on top, so the frame stays bright.
 */
export function Hero() {
  const { openQuote } = useModals()

  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative isolate flex min-h-[calc(100dvh-6rem)] items-start justify-center overflow-hidden rounded-[2rem] border border-line bg-[#d4d4d8] sm:rounded-[2.75rem]">
        <img
          src="/images/white-sports-coupe-hd.jpg"
          alt="White sports coupe, studio render"
          className="ken-burns absolute inset-0 -z-10 h-full w-full object-cover object-[50%_0%]"
        />

        <div className="reveal mx-auto max-w-4xl px-6 pb-12 pt-32 text-center sm:pt-36">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7a4a14]">Private fleet · Toronto</p>

          <h1 className="mt-6 text-5xl font-medium uppercase leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Drive luxury,
            <span className="mt-2 block font-light italic normal-case tracking-normal text-ink/85 sm:text-[4.25rem] lg:text-[5rem]">
              arrive in style
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
            Exotic and executive cars, with chauffeur on request.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={() => openQuote()} className="btn-gold !px-8 !py-4">
              Request a quote
            </button>
            <Link
              to="/fleet"
              className="border border-ink/50 px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-ink hover:text-snow"
            >
              Explore fleet
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-ink/70">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={14} strokeWidth={1.5} className="text-gold-deep" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
