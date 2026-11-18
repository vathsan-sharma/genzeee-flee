import { MessageCircle, Phone } from 'lucide-react'
import { CONTACT } from '../data/fleet'

/** WhatsApp and call buttons so customers can reach the concierge directly. */
export function DirectContact({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={`https://wa.me/${CONTACT.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-gold/50 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
      >
        <MessageCircle size={16} strokeWidth={1.5} />
        Message us on WhatsApp
      </a>
      <a
        href={CONTACT.phoneHref}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-snow/40 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-snow transition-colors duration-500 hover:border-gold hover:text-gold"
      >
        <Phone size={16} strokeWidth={1.5} />
        Call us
      </a>
    </div>
  )
}
