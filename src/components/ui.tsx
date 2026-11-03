import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Gauge, Users } from 'lucide-react'
import { categories, vehicleTitle, type Vehicle, type VehicleCategory } from '../data/fleet'

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
}: {
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`${eyebrow ? 'mt-4' : ''} text-4xl leading-[1.08] sm:text-5xl`}>{title}</h2>
      {body && <div className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{body}</div>}
    </div>
  )
}

/** Placeholder used when a vehicle has no photo yet. */
export function VehiclePlate({
  label,
  from,
  to,
  className = '',
  children,
}: {
  label: string
  from: string
  to: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)` }}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_100%]" />
      {children}
    </div>
  )
}

export function VehicleImage({ vehicle, className = '' }: { vehicle: Vehicle; className?: string }) {
  const label = `${vehicleTitle(vehicle)} photograph`
  if (vehicle.photo) {
    return <img src={vehicle.photo} alt={label} loading="lazy" className={`object-cover ${className}`} />
  }
  return (
    <VehiclePlate label={`${vehicleTitle(vehicle)} photograph placeholder`} from={vehicle.plate.from} to={vehicle.plate.to} className={className}>
      <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center font-display text-2xl font-semibold text-snow/50">
        {vehicle.make} {vehicle.model}
      </p>
    </VehiclePlate>
  )
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition-colors duration-500 hover:border-gold/50">
      <Link
        to={`/vehicle/${vehicle.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-panel-2 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
        aria-label={`View ${vehicleTitle(vehicle)}`}
      >
        <VehicleImage
          vehicle={vehicle}
          className="absolute inset-0 h-full w-full transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur">
          {vehicle.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-snug">
          <Link to={`/vehicle/${vehicle.id}`} className="hover:text-gold">
            {vehicleTitle(vehicle)}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-mist">{vehicle.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2 text-xs text-mist">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-panel-2 px-3 py-1.5">
            <Users size={13} strokeWidth={1.5} /> {vehicle.seats} Seats
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-panel-2 px-3 py-1.5">
            <Gauge size={13} strokeWidth={1.5} /> {vehicle.transmission}
          </li>
        </ul>

        <Link
          to={`/vehicle/${vehicle.id}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold transition-colors hover:text-gold-deep"
        >
          Inquire for rates <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  )
}

export function FilterTabs({
  value,
  onChange,
  options,
}: {
  value: VehicleCategory | 'All'
  onChange: (value: VehicleCategory | 'All') => void
  options?: (VehicleCategory | 'All')[]
}) {
  const items: (VehicleCategory | 'All')[] = options ?? ['All', ...categories]
  return (
    <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = value === item
        return (
          <button
            key={item}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(item)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              active ? 'bg-gold text-ink' : 'border border-line text-mist hover:border-gold hover:text-snow'
            }`}
          >
            {item === 'All' ? 'All Vehicles' : item}
          </button>
        )
      })}
    </div>
  )
}
