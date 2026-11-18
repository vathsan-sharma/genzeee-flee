import { Link } from 'react-router-dom'

/** The official Genzee Fleet logo. It sits on a white badge so its white background reads on dark surfaces. */
export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center rounded-xl bg-white p-2" aria-label="Genzee Fleet home">
      <img src="/images/genzee-fleet-logo.webp" alt="Genzee Fleet" width="1536" height="1024" className="h-12 w-auto" />
    </Link>
  )
}
