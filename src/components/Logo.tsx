import { Link } from 'react-router-dom'

/** The official Genzee Fleet logo with no background. It sits on a small ivory card so the navy reads on the dark footer. */
export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center rounded-2xl border border-gold/35 bg-[#f7f4ee] px-4 py-2" aria-label="Genzee Fleet home">
      <img src="/images/genzee-fleet-logo-transparent.png" alt="Genzee Fleet" width="1536" height="1024" className="h-[90px] w-auto" />
    </Link>
  )
}
