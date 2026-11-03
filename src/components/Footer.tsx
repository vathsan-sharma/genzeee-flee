import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../data/fleet'
import { useModals } from '../context/ModalContext'
import { Logo } from './Logo'

const quickLinks = [
  { to: '/fleet', label: 'Fleet' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { to: '/fleet', label: 'Luxury Car Rentals' },
  { to: '/fleet', label: 'Executive Van Rentals' },
  { to: '/corporate', label: 'Corporate Rentals' },
  { to: '/services', label: 'Airport Transfers' },
]

const socials = [
  { href: 'https://www.instagram.com/', label: 'Instagram' },
  { href: 'https://www.facebook.com/', label: 'Facebook' },
  { href: 'https://www.linkedin.com/', label: 'LinkedIn' },
]

const legal = ['Privacy Policy', 'Terms & Conditions', 'Rental Agreement', 'Insurance Requirements', 'Refund Policy'] as const

const year = new Date().getFullYear()

export function Footer() {
  const { openLegal } = useModals()

  return (
    <footer className="border-t border-line bg-[#070708] text-mist">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs leading-relaxed">
            Canada’s premier private fleet. Exotic, executive and chauffeur-driven vehicles, arranged with discretion.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Social media">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-line px-4 py-2 text-xs font-medium transition-colors hover:border-gold hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Quick Links">
          {quickLinks.map((item) => (
            <li key={item.label}>
              <Link className="hover:text-gold" to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {serviceLinks.map((item) => (
            <li key={item.label}>
              <Link className="hover:text-gold" to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <li>
            <a className="hover:text-gold" href={CONTACT.phoneHref}>
              {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a className="hover:text-gold" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </li>
          <li className="leading-relaxed">{CONTACT.address}</li>
        </FooterColumn>

        <FooterColumn title="Hours">
          <li>Monday – Sunday</li>
          <li>24 Hours</li>
          <li>By Appointment</li>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {year} Genzee Fleet. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((name) => (
              <li key={name}>
                <button type="button" onClick={() => openLegal(name)} className="transition-colors hover:text-gold">
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="lg:col-span-2">
      <p className="eyebrow">{title}</p>
      <ul className="mt-6 space-y-3 text-sm">{children}</ul>
    </div>
  )
}
