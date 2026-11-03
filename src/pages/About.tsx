import { Link } from 'react-router-dom'
import { ArrowRight, MapPinned, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { PageBanner } from '../components/PageBanner'
import { SectionHeading } from '../components/ui'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const protocols = [
  {
    icon: Sparkles,
    title: 'Vehicle sanitisation',
    body: 'Every interior is sanitised and detailed between bookings, with high-touch surfaces treated on each handover.',
  },
  {
    icon: ShieldCheck,
    title: 'Mechanical inspection',
    body: 'Pre-trip checks cover tyres, brakes, fluids and lighting, recorded against each vehicle before it leaves base.',
  },
  {
    icon: Wrench,
    title: 'Scheduled maintenance',
    body: 'Servicing follows manufacturer intervals, and vehicles are rotated out of service before they are due.',
  },
]

const footprint = [
  { place: 'Greater Toronto Area', note: 'Core service area, including both airports.' },
  { place: 'Ontario', note: 'Province-wide transfers by arrangement.' },
  { place: 'Vancouver & Calgary', note: 'Reach through trusted partner operators.' },
]

export function About() {
  useDocumentTitle('About | Genzee Fleet')

  return (
    <>
      <PageBanner>
        <SectionHeading
          eyebrow="About Genzee"
          title={
            <>
              Canadian luxury, <span className="text-gold">held to a higher standard</span>
            </>
          }
        />
      </PageBanner>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
        <p className="text-2xl leading-snug text-snow lg:col-span-6 lg:text-3xl">
          Genzee was built on a simple belief: a private car should feel effortless from the first enquiry to the final arrival.
        </p>
        <div className="space-y-6 text-lg leading-relaxed text-mist lg:col-span-5 lg:col-start-8">
          <p>
            We operate a curated fleet of exotic, executive and sports vehicles, supported by a concierge team that manages
            each booking from one conversation.
          </p>
          <p>
            Our standards are deliberately conservative. We would rather decline a request than deliver it poorly, and we
            would rather be early than late.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-panel py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Vehicle protocols</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {protocols.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-8 lg:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <h3 className="mt-7 text-2xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-mist">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading eyebrow="Service footprint" title="Where we operate" />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {footprint.map(({ place, note }) => (
            <li key={place} className="card p-8 lg:p-10">
              <MapPinned size={20} strokeWidth={1.5} className="text-gold" />
              <p className="mt-6 text-2xl">{place}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <Link to="/fleet" className="btn-outline">
            View the fleet <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  )
}
