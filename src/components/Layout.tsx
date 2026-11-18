import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { CONTACT } from '../data/fleet'
import { useModals } from '../context/ModalContext'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'

const navItems = [
  { to: '/fleet', label: 'Fleet' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

/** A floating ivory menu bar with the navy logo, sitting over the dark pages. */
export function Layout() {
  const [open, setOpen] = useState(false)
  // The bar is ivory on every page, so the navy logo stays readable.
  const overLight = true
  const { pathname } = useLocation()
  const { openQuote } = useModals()

  // Reset the page scroll on route change. The menu closes from its own links.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const bar = overLight
    ? 'border-gold/35 bg-[#f7f4ee]/92 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.9)]'
    : 'border-white/10 bg-ink/70 text-snow shadow-[0_18px_40px_-22px_rgba(0,0,0,0.9)]'
  const link = overLight ? 'text-ink/75 hover:text-[#14306b]' : 'text-snow/85 hover:text-gold'
  const accent = overLight ? 'text-[#14306b]' : 'text-gold'

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
        <div
          className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between h-[60px] rounded-full border py-0 pl-4 pr-5 backdrop-blur-xl transition-colors duration-700 sm:pl-5 sm:pr-7 ${bar}`}
        >
          <Link to="/" className="group inline-flex items-center" aria-label="Genzee Fleet home">
            <img src="/images/genzee-fleet-logo-transparent.png" alt="Genzee Fleet" width="1536" height="1024" className="h-[100px] w-auto" />
          </Link>

          {/* Desktop: links and quote button inside the bar */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide transition-colors duration-500 hover:text-gold"
            >
              <Phone size={14} strokeWidth={1.5} className={accent} aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[0.8rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                    isActive ? accent : link
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => openQuote()}
              className="ml-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#e7c382] via-gold to-gold-deep px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_8px_20px_-10px_rgba(214,170,92,0.8)] transition-transform duration-500 hover:-translate-y-0.5"
            >
              Request a Quote
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </button>
          </nav>

          <a
            href={CONTACT.phoneHref}
            aria-label={`Call ${CONTACT.phoneDisplay}`}
            className="flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
          >
            <Phone size={18} strokeWidth={1.5} className={accent} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <BackToTop />

      {/* Sticky quote button on mobile, always in reach */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-5 lg:hidden">
        <button
          type="button"
          onClick={() => openQuote()}
          className="pointer-events-auto btn-gold w-full shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9)]"
        >
          Get a Quote
        </button>
      </div>

      {/* Mobile menu: a full-screen panel below the bar */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl transition-[opacity,visibility] duration-700 ease-luxe lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-5 py-3 text-4xl font-semibold text-snow transition-colors hover:text-gold"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-gold">0{index + 1}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-12 flex flex-col gap-4 text-sm text-mist">
          <a href={CONTACT.phoneHref} className="inline-flex items-center gap-3 hover:text-gold">
            <Phone size={14} strokeWidth={1.5} className="text-gold" />
            {CONTACT.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              openQuote()
            }}
            className="self-start text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold hover:text-snow"
          >
            Request a Quote →
          </button>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
