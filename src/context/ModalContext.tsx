import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { QuoteModal } from '../components/QuoteModal'
import { LegalModal, type LegalTab } from '../components/LegalModal'
import type { ServiceType } from '../data/fleet'

interface QuoteOptions {
  vehicleId?: string
  service?: ServiceType
}

interface ModalContextValue {
  openQuote: (options?: QuoteOptions) => void
  openLegal: (tab?: LegalTab) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

/** Owns the site-wide quote and legal modals so any page or card can open them. */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<{ open: boolean } & QuoteOptions>({ open: false })
  const [legal, setLegal] = useState<{ open: boolean; tab: LegalTab }>({
    open: false,
    tab: 'Privacy Policy',
  })

  const openQuote = useCallback((options: QuoteOptions = {}) => setQuote({ open: true, ...options }), [])
  const openLegal = useCallback((tab: LegalTab = 'Privacy Policy') => setLegal({ open: true, tab }), [])

  const value = useMemo(() => ({ openQuote, openLegal }), [openQuote, openLegal])

  return (
    <ModalContext.Provider value={value}>
      {children}
      {quote.open && (
        <QuoteModal
          vehicleId={quote.vehicleId}
          service={quote.service}
          onClose={() => setQuote({ open: false })}
        />
      )}
      {legal.open && (
        <LegalModal initialTab={legal.tab} onClose={() => setLegal((state) => ({ ...state, open: false }))} />
      )}
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModals must be used inside ModalProvider')
  return context
}
