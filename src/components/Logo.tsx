import { Link } from 'react-router-dom'

/** GZ monogram with a gold accent dot, followed by the GENZEE FLEET wordmark. */
export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Genzee Fleet home">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
        <rect x="0" y="0" width="40" height="40" rx="10" fill="#d6aa5c" />
        <path d="M25.5 13.2A8.6 8.6 0 1 0 27 22.5h-6.2" fill="none" stroke="#0a0a0b" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="31" cy="9" r="2.6" fill="#f4f2ee" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[0.95rem] font-bold tracking-[0.2em] text-snow">GENZEE FLEET</span>
        <span className="mt-1.5 block font-sans text-[0.55rem] font-medium tracking-[0.42em] text-gold">PRIVATE FLEET</span>
      </span>
    </Link>
  )
}
