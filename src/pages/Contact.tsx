import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { InquiryForm } from '../components/InquiryForm'
import { PageBanner } from '../components/PageBanner'
import { SectionHeading } from '../components/ui'
import { CONTACT } from '../data/fleet'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Contact() {
  useDocumentTitle('Contact | Genzee Fleet')

  return (
    <>
      <PageBanner>
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Speak with <span className="text-gold">concierge</span>
            </>
          }
          body="For urgent arrangements, call directly. For everything else, send an inquiry and we will reply within one business hour."
        />
      </PageBanner>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
        <div className="card p-6 sm:p-10 lg:col-span-7">
          <InquiryForm />
        </div>

        <aside className="lg:col-span-5">
          <div className="card p-8 sm:p-10">
            <p className="eyebrow">Headquarters</p>
            <p className="mt-5 text-2xl">Scarborough, Ontario</p>
            <p className="mt-2 text-sm text-mist">{CONTACT.address}</p>

            <ul className="mt-10 space-y-6 border-t border-line pt-8 text-sm">
              <li className="flex gap-4">
                <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="text-mist">Dispatch line</p>
                  <a href={CONTACT.phoneHref} className="mt-1 block text-base hover:text-gold">{CONTACT.phoneDisplay}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="text-mist">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-base hover:text-gold">{CONTACT.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="text-mist">Operating hours</p>
                  <p className="mt-1 text-base">Monday – Sunday</p>
                  <p className="text-mist">24 hours · By appointment</p>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="text-mist">Location</p>
                  <p className="mt-1">{CONTACT.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}
