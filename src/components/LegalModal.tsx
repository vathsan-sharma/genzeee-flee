import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const legalTabs = [
  'Privacy Policy',
  'Terms & Conditions',
  'Rental Agreement',
  'Insurance Requirements',
  'Refund Policy',
] as const

export type LegalTab = (typeof legalTabs)[number]

// Draft wording for structure only. Counsel must review every section before publication.
const content: Record<LegalTab, { heading: string; points: string[] }> = {
  'Privacy Policy': {
    heading: 'How we handle personal and payment data',
    points: [
      'We collect only what is needed to quote, reserve and deliver a vehicle: contact details, licence information and booking preferences.',
      'Under PIPEDA, we collect personal information with your knowledge and consent, use it for the stated purpose, and keep it accurate and secure.',
      'Payment card details are processed by a PCI-compliant provider. Genzee does not store full card numbers. You may request access to or correction of your information at any time.',
    ],
  },
  'Terms & Conditions': {
    heading: 'Website use and booking terms',
    points: [
      'Information on this website, including indicative rates, is subject to availability and may change without notice.',
      'A booking is confirmed only when Genzee issues written confirmation and any required deposit is authorised.',
      'You may not use this website for unlawful purposes or to copy material without permission.',
    ],
  },
  'Rental Agreement': {
    heading: 'Renter responsibilities and permitted use',
    points: [
      'The renter must hold a valid licence, meet the minimum age for the vehicle class, and be named on the agreement.',
      'Mileage allowances and fuel policies are set out per vehicle in the signed agreement. Excess mileage is charged at the stated rate.',
      'Prohibited uses include racing, off-road use unless permitted, subletting, carrying passengers for hire, and operation under the influence.',
    ],
  },
  'Insurance Requirements': {
    heading: 'Coverage, deductibles and collision waivers',
    points: [
      'Each vehicle is covered by comprehensive commercial insurance. Renters must hold, or purchase, the coverage stated in the agreement.',
      'Deductible options vary by vehicle class and are shown before you confirm. A collision damage waiver may reduce your liability.',
      'Damage must be reported immediately. Failure to report may void coverage and waiver benefits.',
    ],
  },
  'Refund Policy': {
    heading: 'Cancellations, deposits and weather',
    points: [
      'Cancellation and rescheduling windows are stated on your confirmation. Reschedules are free within the stated window.',
      'Security deposit holds are released after vehicle return, within the timeline stated in your agreement.',
      'Where inclement weather prevents service, we will reschedule or refund the affected portion of your booking.',
    ],
  },
}

export function LegalModal({ initialTab, onClose }: { initialTab: LegalTab; onClose: () => void }) {
  const [tab, setTab] = useState<LegalTab>(initialTab)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const active = content[tab]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-panel sm:max-w-3xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-line px-7 py-5 sm:px-10">
          <h2 id="legal-title" className="text-xl sm:text-2xl">
            Legal & trust
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-snow hover:bg-white/10">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div role="tablist" aria-label="Legal documents" className="flex gap-2 overflow-x-auto border-b border-line px-7 py-3 sm:px-10 [scrollbar-width:none]">
          {legalTabs.map((name) => (
            <button
              key={name}
              role="tab"
              type="button"
              aria-selected={tab === name}
              onClick={() => setTab(name)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                tab === name ? 'bg-gold text-ink' : 'text-mist hover:bg-white/5 hover:text-snow'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="overflow-y-auto px-7 py-8 sm:px-10">
          <h3 className="text-2xl">{active.heading}</h3>
          <ul className="mt-6 space-y-4 leading-relaxed text-mist">
            {active.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 border-t border-line pt-5 text-xs leading-relaxed text-mist/70">
            Summary text for structure only. Full terms are provided at booking and must be reviewed by counsel before
            publication.
          </p>
        </div>
      </div>
    </div>
  )
}
