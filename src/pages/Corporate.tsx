import { BadgeCheck, CalendarDays, FileLock2, UserRoundCheck } from 'lucide-react'
import { InquiryForm } from '../components/InquiryForm'
import { PageBanner } from '../components/PageBanner'
import { SectionHeading } from '../components/ui'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const benefits = [
  { icon: CalendarDays, title: 'Consolidated monthly billing', body: 'One invoice across vehicles and transfers, issued monthly.' },
  { icon: UserRoundCheck, title: 'Dedicated account manager', body: 'A named point of contact who knows your schedule and preferences.' },
  { icon: BadgeCheck, title: 'Priority fleet allocation', body: 'Reserved vehicles for recurring clients, productions and events.' },
  { icon: FileLock2, title: 'Non-disclosure privacy agreements', body: 'Confidentiality agreements available for principals and productions.' },
]

const audiences = ['Enterprise clients', 'Production studios', 'Concierge desks']

export function Corporate() {
  useDocumentTitle('Corporate Accounts | Genzee Fleet')

  return (
    <>
      <PageBanner>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            title={
              <>
                A fleet that runs <span className="text-gold">as your team does</span>
              </>
            }
            body="Built for enterprise travel, production schedules and concierge desks that cannot afford a missed pickup."
          />
          <ul className="flex flex-wrap gap-3 lg:justify-end">
            {audiences.map((item) => (
              <li key={item} className="rounded-full border border-line px-5 py-2.5 text-xs font-medium text-snow/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageBanner>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-20 sm:grid-cols-2 lg:px-10 lg:py-24">
        {benefits.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card p-8 lg:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <h2 className="mt-7 text-2xl">{title}</h2>
            <p className="mt-3 leading-relaxed text-mist">{body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 lg:px-10 lg:pb-32">
        <SectionHeading
          title="Open a corporate account"
          body="Share your organisation’s details and expected volume. We reply within one business day."
        />
        <div className="card mt-12 p-6 sm:p-10">
          <InquiryForm service="Corporate Fleet Account" submitLabel="Submit Application" />
        </div>
      </section>
    </>
  )
}
