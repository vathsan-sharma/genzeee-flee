import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { FilterTabs, SectionHeading, VehicleCard } from '../components/ui'
import { categories, vehicles, type VehicleCategory } from '../data/fleet'
import { useModals } from '../context/ModalContext'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { PageBanner } from '../components/PageBanner'

/** Reads the initial category from ?type=, so home-page category cards can link here. */
function initialCategory(param: string | null): VehicleCategory | 'All' {
  return categories.find((category) => category === param) ?? 'All'
}

export function Fleet() {
  useDocumentTitle('The Fleet | Genzee Fleet')
  const { openQuote } = useModals()
  const [params] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<VehicleCategory | 'All'>(() => initialCategory(params.get('type')))

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return vehicles.filter((vehicle) => {
      const matchesCategory = category === 'All' || vehicle.category === category
      const haystack = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.category}`.toLowerCase()
      return matchesCategory && (term === '' || haystack.includes(term))
    })
  }, [query, category])

  return (
    <>
      <PageBanner>
        <SectionHeading
          title={
            <>
              Exotic, executive and <span className="text-gold">private</span>
            </>
          }
          body="Every vehicle is maintained to manufacturer standard, inspected and detailed before each booking."
        />
      </PageBanner>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">Search vehicles</span>
            <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by make, model or category"
              className="field !rounded-full !py-3.5 !pl-12"
            />
          </label>
          <FilterTabs value={category} onChange={setCategory} />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-mist" aria-live="polite">
          {results.length} {results.length === 1 ? 'vehicle' : 'vehicles'} available
        </p>

        {results.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {results.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-3xl">No vehicles match your search.</p>
            <p className="mt-4 text-mist">Try a different keyword, or let our concierge find the right car.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
              >
                Clear filters
              </button>
              <button type="button" className="btn-gold" onClick={() => openQuote()}>
                Request a Quote
              </button>
            </div>
          </div>
        )}

        <div className="mt-20 flex justify-center">
          <Link to="/contact" className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold-deep">
            Need something not listed? Speak to concierge
          </Link>
        </div>
      </section>
    </>
  )
}
