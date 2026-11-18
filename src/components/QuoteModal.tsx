import { useEffect } from 'react'
import { X } from 'lucide-react'
import { InquiryForm } from './InquiryForm'
import { DirectContact } from './DirectContact'
import type { ServiceType } from '../data/fleet'

/** Quick reservation inquiry. Closes on Escape, the close button, or a click outside the panel. */
export function QuoteModal({
  vehicleId,
  service,
  onClose,
}: {
  vehicleId?: string
  service?: ServiceType
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-line bg-panel p-7 sm:max-w-2xl sm:rounded-3xl sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-2 text-snow transition-colors hover:bg-white/10"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <p className="eyebrow">Quick reservation</p>
        <h2 id="quote-title" className="mt-4 text-3xl sm:text-4xl">
          Request a quote
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
          Tell us what you need. We confirm availability and a fixed quotation before any payment is taken.
        </p>
        <div className="mt-8">
          <DirectContact className="mb-8" />
          <InquiryForm vehicleId={vehicleId} service={service} onCancel={onClose} />
        </div>
      </div>
    </div>
  )
}
