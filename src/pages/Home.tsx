import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Clock, Headset, Mail, MapPin, Phone, Play, Route, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { SectionHeading, VehicleImage } from '../components/ui'
import { InquiryForm } from '../components/InquiryForm'
import { DirectContact } from '../components/DirectContact'
import { Hero } from '../components/Hero'
import { CONTACT, categories, findVehicle, formatPrice, type VehicleCategory } from '../data/fleet'
import { useModals } from '../context/ModalContext'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useScrollReveal } from '../lib/useScrollReveal'

const heroCar = findVehicle('escalade-platinum')!
const sideCarA = findVehicle('porsche-911')!
const sideCarB = findVehicle('ghost-extended')!

const reasons = [
  { icon: ShieldCheck, title: 'Transparent Quotes', body: 'A fixed quotation before you commit, with no hidden charges.' },
  { icon: Route, title: 'Flexible Bookings', body: 'Hourly, daily, weekly or monthly, changed as your plans change.' },
  { icon: Sparkles, title: 'Well Maintained', body: 'Every vehicle inspected, sanitised and serviced on schedule.' },
  { icon: Headset, title: '24/7 Support', body: 'A concierge reachable any hour, including airport arrivals.' },
]

const steps = [
  { icon: Route, title: 'Choose your vehicle', body: 'Browse the fleet or tell us what you need for the journey.' },
  { icon: CalendarCheck, title: 'Request a quote', body: 'Share dates, locations and requirements. We confirm within one business hour.' },
  { icon: Play, title: 'Drive or ride', body: 'Collect your vehicle at the agreed time and arrive in style.' },
]

const benefits = [
  { icon: Clock, title: 'Quote in one hour', body: 'A concierge confirms availability and pricing within one business hour.' },
  { icon: MapPin, title: 'Across the GTA', body: 'Doorstep delivery across the GTA and airport curbside pickup.' },
  { icon: Star, title: 'Corporate accounts', body: 'Consolidated billing, priority allocation and a named account manager.' },
]

// Sample copy in the review slots. Replace with real client testimonials before launch.
const reviews = [
  'Our car was ready before we landed, and the handover could not have been smoother.',
  'We book the shuttle for every client visit. Timings are always kept and the team anticipates needs.',
  'Discreet, precise and beautifully presented. It is the standard we expect from a private car service.',
]

const categoryImage: Record<VehicleCategory, string> = {
  'Luxury Cars': 'ghost-extended',
  SUVs: 'escalade-platinum',
  'Executive Vans': 'sprinter-jet-class',
  'Sports Cars': 'porsche-911',
}

export function Home() {
  useDocumentTitle('Genzee Fleet | Luxury Car Rental & Private Transit')
  const { openQuote } = useModals()
  const rootRef = useRef<HTMLDivElement>(null)
  useScrollReveal(rootRef)

  return (
    <>
      <Hero />

      <div ref={rootRef}>
      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading title={<>Your journey, <span className="text-gold">our priority</span></>} />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist lg:col-span-4 lg:col-start-9">
            We combine comfort, style and reliability to give you the best rental experience.
          </p>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-panel p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 text-base">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Top picks: one large feature and two smaller cards */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <SectionHeading title="Choose your perfect car" />
        <div className="mt-14 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Link to={`/vehicle/${heroCar.id}`} className="card group relative flex min-h-[420px] min-w-0 flex-col justify-end overflow-hidden">
            <VehicleImage vehicle={heroCar} className="absolute inset-0 h-full w-full transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative flex items-end justify-between gap-6 p-8">
              <div>
                <span className="rounded-full bg-gold px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink">Popular</span>
                <h3 className="mt-4 text-2xl">{heroCar.make} {heroCar.model}</h3>
                <p className="mt-2 text-sm text-mist">{heroCar.seats} seats · {heroCar.transmission}</p>
                <p className="mt-1 text-sm text-gold">Price {formatPrice(heroCar)}</p>
              </div>
              <span className="whitespace-nowrap text-sm font-medium text-gold">Inquire for rates →</span>
            </div>
          </Link>

          <div className="grid min-w-0 gap-5">
            {[sideCarA, sideCarB].map((vehicle) => (
              <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`} className="card group flex min-w-0 items-center gap-4 p-4 transition-colors hover:border-gold/50">
                <VehicleImage vehicle={vehicle} className="h-24 w-24 shrink-0 rounded-2xl sm:w-32" />
                <div className="min-w-0">
                  <h3 className="truncate text-base">{vehicle.make} {vehicle.model}</h3>
                  <p className="mt-1 text-xs text-mist">{vehicle.seats} seats · {vehicle.transmission}</p>
                  <p className="mt-1 text-xs text-gold">Price {formatPrice(vehicle)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold">
                    Inquire <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <h2 className="text-4xl sm:text-5xl">Rent in 3 simple steps</h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="rounded-3xl border border-line bg-ink p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-4xl font-semibold text-line">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={<>More than just a <span className="text-gold">car rental</span></>} />
          <Link to="/services" className="btn-outline self-start md:self-auto">
            View all benefits
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }) => (
            <li key={title} className="card flex gap-6 p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories: each card links to the fleet filtered to that category */}
      <section className="border-y border-line bg-panel py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={<>Find the right car <span className="text-gold">for you</span></>} />
            <Link to="/fleet" className="btn-outline self-start md:self-auto">
              View all
            </Link>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => {
              const vehicle = findVehicle(categoryImage[category])!
              return (
                <li key={category}>
                  <Link
                    to={`/fleet?type=${encodeURIComponent(category)}`}
                    className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-gold/50"
                  >
                    <div className="flex items-start justify-between p-6 pb-2">
                      <div>
                        <h3 className="text-lg">{category}</h3>
                        <p className="mt-1 text-xs text-mist">{categoryBlurb(category)}</p>
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-gold transition-colors group-hover:border-gold">
                        <ArrowRight size={15} strokeWidth={1.5} />
                      </span>
                    </div>
                    <VehicleImage vehicle={vehicle} className="mt-auto aspect-[4/3] w-full" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <h2 className="text-4xl sm:text-5xl">Trusted by discerning drivers</h2>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((quote) => (
            <li key={quote} className="card flex flex-col justify-between p-8">
              <div>
                <div className="flex gap-1 text-gold" aria-label="Five stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} strokeWidth={1.25} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-6 leading-relaxed text-snow/90">“{quote}”</p>
              </div>
              <div className="mt-10 flex items-center gap-4 border-t border-line pt-6">
                <span className="h-10 w-10 shrink-0 rounded-full bg-panel-2" />
                <div>
                  <p className="text-sm">Client name</p>
                  <p className="text-xs text-mist">Role, company</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Quote: a CTA band that opens the modal */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-r from-panel to-panel-2 p-10 md:flex-row md:items-center lg:p-14">
          <div>
            <h2 className="text-3xl sm:text-4xl">Tell us where you need to be.</h2>
            <p className="mt-4 max-w-md text-mist">A dedicated concierge confirms vehicle and pricing within one business hour.</p>
          </div>
          <button type="button" onClick={() => openQuote()} className="btn-gold shrink-0">
            Request a Quote
          </button>
        </div>
      </section>

      {/* Send an inquiry */}
      <section className="border-t border-line bg-panel py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-7">
            <SectionHeading title="Tell us about your journey" />
            <div className="card mt-10 p-6 sm:p-10">
              <InquiryForm />
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <DirectContact className="mb-6" />
            <img
              src="/images/mercedes-maybach-s680.png"
              alt="Mercedes-Maybach S 680"
              className="aspect-[4/5] w-full rounded-3xl object-cover"
            />
            <div className="glass absolute inset-x-4 bottom-4 p-6 sm:inset-x-8 sm:bottom-8 sm:p-8">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                  <a href={CONTACT.phoneHref} className="hover:text-gold">{CONTACT.phoneDisplay}</a>
                </li>
                <li className="flex gap-3">
                  <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a>
                </li>
                <li className="flex gap-3">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                  <span>{CONTACT.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-line bg-line px-6 sm:grid-cols-3 lg:px-10">
          <SupportItem icon={Headset} title="24/7 Customer Support" body="Concierge on call around the clock." />
          <SupportItem icon={Mail} title="Email Us" body={CONTACT.email} href={`mailto:${CONTACT.email}`} />
          <SupportItem icon={Phone} title="Call Us" body={CONTACT.phoneDisplay} href={CONTACT.phoneHref} />
        </div>
      </section>
      </div>
    </>
  )
}

function categoryBlurb(category: VehicleCategory) {
  switch (category) {
    case 'Luxury Cars':
      return 'Refined sedans for executive travel'
    case 'SUVs':
      return 'Perfect for family and adventure'
    case 'Executive Vans':
      return 'Spacious and ideal for group travel'
    case 'Sports Cars':
      return 'Feel the drive, live the moment'
  }
}

function SupportItem({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: typeof Headset
  title: string
  body: string
  href?: string
}) {
  const content = (
    <>
      <Icon size={20} strokeWidth={1.5} className="text-gold" />
      <div>
        <p className="font-medium text-snow">{title}</p>
        <p className="text-sm text-mist">{body}</p>
      </div>
    </>
  )
  const className = 'flex items-center gap-4 bg-panel px-6 py-7'
  return href ? (
    <a href={href} className={`${className} transition-colors hover:bg-panel-2`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}
