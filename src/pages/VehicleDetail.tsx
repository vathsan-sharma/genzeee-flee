import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Armchair, Check, Car, Gauge, Timer, Users, Zap } from 'lucide-react'
import { VehicleCard, VehicleImage } from '../components/ui'
import { findVehicle, inclusions, vehicleTitle, vehicles } from '../data/fleet'
import { useModals } from '../context/ModalContext'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFound } from './NotFound'

export function VehicleDetail() {
  const { id } = useParams()
  const vehicle = findVehicle(id)
  useDocumentTitle(vehicle ? `${vehicleTitle(vehicle)} | Genzee Fleet` : 'Vehicle | Genzee Fleet')
  const { openQuote } = useModals()

  if (!vehicle) return <NotFound />

  const related = vehicles.filter((v) => v.id !== vehicle.id && v.category === vehicle.category).slice(0, 3)
  const title = vehicleTitle(vehicle)

  const specs = [
    { icon: Car, label: 'Engine / displacement', value: vehicle.specs.engine },
    { icon: Zap, label: 'Horsepower', value: vehicle.specs.horsepower ? `${vehicle.specs.horsepower} HP` : null },
    { icon: Timer, label: '0–100 km/h', value: vehicle.specs.zeroToHundred },
    { icon: Gauge, label: 'Drivetrain', value: vehicle.specs.drivetrain },
    { icon: Users, label: 'Seating', value: `${vehicle.seats} seats` },
    { icon: Armchair, label: 'Luggage capacity', value: vehicle.specs.luggage },
  ]

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-28 lg:px-10 lg:pt-32">
        <Link to="/fleet" className="inline-flex items-center gap-2 py-4 text-sm font-medium text-mist transition-colors hover:text-gold">
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to fleet
        </Link>
        <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] border border-line sm:aspect-[16/7]">
          <VehicleImage vehicle={vehicle} className="absolute inset-0 h-full w-full" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
        <div className="lg:col-span-7">
          <span className="rounded-full border border-gold/40 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
            {vehicle.category}
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
          <p className="mt-4 text-xl text-gold">{vehicle.tagline}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">{vehicle.description}</p>

          <h2 className="mt-16 text-2xl">Key performance specs</h2>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-panel p-6">
                <Icon size={18} strokeWidth={1.5} className="text-gold" />
                <dt className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-mist">{label}</dt>
                <dd className="mt-2 text-lg">
                  {value ?? <span className="text-sm font-normal italic text-mist">To be confirmed</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-mist">
            Transmission: {vehicle.transmission}. Figures marked “To be confirmed” await the manufacturer specification sheet.
          </p>

          <h2 className="mt-16 text-2xl">Concierge inclusions</h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-4 py-5 text-mist">
                <Check size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="card sticky top-28 p-8 sm:p-10">
            <p className="text-sm leading-relaxed text-mist">
              Pricing depends on duration, route and season. Reserve this vehicle and a concierge will send a fixed quotation.
            </p>
            <dl className="mt-8 space-y-4 border-t border-line pt-8 text-sm">
              <div className="flex justify-between gap-6">
                <dt className="text-mist">Model year</dt>
                <dd>{vehicle.year}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-mist">Seats</dt>
                <dd>{vehicle.seats}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-mist">Transmission</dt>
                <dd>{vehicle.transmission}</dd>
              </div>
            </dl>
            <button type="button" onClick={() => openQuote({ vehicleId: vehicle.id })} className="btn-gold mt-10 w-full">
              Reserve this vehicle
            </button>
            <a href="tel:+14166770606" className="btn-outline mt-3 w-full">
              Call 416-677-0606
            </a>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-panel py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-3xl">More {vehicle.category}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <VehicleCard key={item.id} vehicle={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
