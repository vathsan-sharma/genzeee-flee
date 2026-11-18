import { Car, Plane, Users } from 'lucide-react'
import { PageBanner } from '../components/PageBanner'
import { SectionHeading } from '../components/ui'
import { useModals } from '../context/ModalContext'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import type { ServiceType } from '../data/fleet'

const services: {
  icon: typeof Car
  title: string
  body: string
  service: ServiceType
  points: string[]
}[] = [
  {
    icon: Car,
    title: 'Luxury Car Rentals',
    body: 'Self-drive premium sedans, exotics and performance vehicles, delivered to your door.',
    service: 'Luxury Car Rental',
    points: ['Daily and weekly terms', 'Concierge delivery and collection', 'Comprehensive insurance options'],
  },
  {
    icon: Users,
    title: 'Executive Sprinter & Van Rentals',
    body: 'High-capacity transport for VIP delegations, executive teams and families.',
    service: 'Executive Van Rental',
    points: ['Up to eight passengers in Jet Class', 'Luggage space for delegations', 'Event and multi-stop routing'],
  },
  {
    icon: Plane,
    title: 'VIP Airport Transfers',
    body: 'Meet-and-greet service at Toronto Pearson (YYZ), Billy Bishop (YTZ) and private FBOs.',
    service: 'VIP Airport Transfer',
    points: ['Toronto Pearson (YYZ)', 'Billy Bishop (YTZ)', 'Private FBO terminals'],
  },
]

export function Services() {
  useDocumentTitle('Services | Genzee Fleet')
  const { openQuote } = useModals()

  return (
    <>
      <PageBanner>
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              One concierge. <span className="text-gold">Every</span> journey.
            </>
          }
          body="From self-drive rentals to executive transfers, each service is built around how you travel."
        />
      </PageBanner>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2 lg:px-10 lg:py-28">
        {services.map(({ icon: Icon, title, body, service, points }) => (
          <article key={title} className="card flex flex-col p-8 sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <h2 className="mt-8 text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-4 leading-relaxed text-mist">{body}</p>
            <ul className="mt-8 space-y-3 text-sm">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => openQuote({ service })} className="btn-outline mt-auto self-start !mt-10">
              Request a quote
            </button>
          </article>
        ))}
      </section>
    </>
  )
}
