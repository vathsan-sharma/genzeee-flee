import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found | Genzee Fleet')
  return (
    <section className="flex min-h-[80dvh] flex-col items-center justify-center px-6 py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 text-5xl sm:text-6xl">This page has taken another route.</h1>
      <p className="mt-6 max-w-md text-mist">The page you are looking for has moved or does not exist.</p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-gold">
          Return home
        </Link>
        <Link to="/fleet" className="btn-outline">
          View the fleet
        </Link>
      </div>
    </section>
  )
}
