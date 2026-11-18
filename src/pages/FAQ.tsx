import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { PageBanner } from '../components/PageBanner'
import { SectionHeading } from '../components/ui'
import { useModals } from '../context/ModalContext'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const faqs = [
  {
    q: 'What is the minimum age to rent?',
    a: 'Renters must be at least 25 years old for the luxury tier.',
  },
  {
    q: 'Which driver’s licence do I need?',
    a: 'A valid Canadian driver’s licence is accepted. International renters need a valid International Driving Permit alongside their home licence.',
  },
  {
    q: 'How do security deposits and authorization holds work?',
    a: 'A security deposit is placed as an authorization hold on your card at pickup. It is released after the vehicle is returned, within the timeline stated in the Refund Policy.',
  },
  {
    q: 'Do you deliver to hotels, residences and airports?',
    a: 'Yes. We offer doorstep delivery across the GTA, airport curbside pickup at Toronto Pearson and Billy Bishop, and hotel or residence handovers. Delivery fees depend on distance and timing.',
  },
  {
    q: 'Can I cancel or reschedule my booking?',
    a: 'Yes. Reschedules are free within the window stated on your confirmation. Cancellation windows and any applicable charges are set out in the Refund Policy.',
  },
]

export function FAQ() {
  useDocumentTitle('FAQ | Genzee Fleet')
  const { openQuote } = useModals()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <PageBanner>
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Answers, <span className="text-gold">before you ask</span>
            </>
          }
        />
      </PageBanner>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <p className="max-w-sm leading-relaxed text-mist">
            The questions we hear most. For anything else, our concierge is available around the clock.
          </p>
          <button type="button" onClick={() => openQuote()} className="btn-gold mt-10">
            Request a Quote
          </button>
          <p className="mt-8 text-sm text-mist">
            Or call <a href="tel:+14166770606" className="font-medium text-snow hover:text-gold">416-677-0606</a>
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:col-span-6 lg:col-start-7">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium text-snow sm:text-xl">{item.q}</span>
                  <span className="shrink-0 text-gold">
                    {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                  </span>
                </button>
                <div id={`faq-${index}`} role="region" hidden={!isOpen} className="pb-7 pr-12 leading-relaxed text-mist">
                  {item.a}
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="pb-24 text-center text-sm text-mist">
        Full <Link to="/contact" className="font-medium text-snow underline underline-offset-4 hover:text-gold">contact details</Link> and legal documents are in the footer.
      </p>
    </>
  )
}
