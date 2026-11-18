import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { serviceTypes, vehicles, type ServiceType } from '../data/fleet'
import { submitInquiry } from '../lib/submitInquiry'

interface Props {
  vehicleId?: string
  service?: ServiceType
  /** Label for the final button. Defaults to "Submit Request". Corporate uses "Submit Application". */
  submitLabel?: string
  onCancel?: () => void
}

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'pickupLocation' | 'pickupDate', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\-\s\d]{7,}$/

/**
 * Two-step quote form, shared by the quote modal, home, contact and corporate pages.
 * Step 1 covers the rental details. Step 2 collects contact details and submits.
 * Validates client-side, then sends through submitInquiry (configured by VITE_INQUIRY_ENDPOINT).
 */
export function InquiryForm({ vehicleId, service, submitLabel = 'Submit Request', onCancel }: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: (service ?? serviceTypes[0]) as string,
    vehicle: vehicles.some((v) => v.id === vehicleId) ? vehicleId! : '',
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffLocation: '',
    dropoffDate: '',
    dropoffTime: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [failure, setFailure] = useState('')

  const set = (key: keyof typeof values) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [key]: event.target.value }))
  }

  const validateRental = (): Errors => {
    const next: Errors = {}
    if (!values.pickupLocation.trim()) next.pickupLocation = 'Enter a pickup location.'
    if (!values.pickupDate) next.pickupDate = 'Choose a pickup date.'
    return next
  }

  const validateContact = (): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!emailPattern.test(values.email)) next.email = 'Enter a valid email address.'
    if (!phonePattern.test(values.phone)) next.phone = 'Enter a valid phone number.'
    return next
  }

  const onContinue = () => {
    const found = validateRental()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStep(2)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateContact()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    setFailure('')
    try {
      await submitInquiry({ ...values, source: window.location.pathname })
      setStatus('sent')
    } catch (error) {
      setFailure(error instanceof Error ? error.message : 'We could not send your request. Please try again.')
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start py-8" role="status">
        <CheckCircle2 size={36} strokeWidth={1.25} className="text-gold" />
        <h3 className="mt-6 text-3xl">Request received</h3>
        <p className="mt-4 max-w-md leading-relaxed text-mist">
          Thank you, {values.name.split(' ')[0]}. A concierge will reply to <span className="text-snow">{values.email}</span>{' '}
          within one business hour.
        </p>
        <button
          type="button"
          className="btn-outline mt-10"
          onClick={() => {
            setStatus('idle')
            setStep(1)
            setValues((current) => ({ ...current, message: '' }))
          }}
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-label="Quote request">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        Step {step} of 2 · {step === 1 ? 'Rental details' : 'Contact details'}
      </p>

      {step === 1 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="service" label="Service type">
              <select id="service" className="field" value={values.service} onChange={set('service')}>
                {serviceTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field id="vehicle" label="Vehicle preference">
              <select id="vehicle" className="field" value={values.vehicle} onChange={set('vehicle')}>
                <option value="">Let concierge recommend</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <fieldset className="grid gap-5 rounded-2xl border border-line bg-panel-2/50 p-5 sm:grid-cols-2">
            <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Pickup</legend>
            <Field id="pickupLocation" label="Location *" error={errors.pickupLocation} className="sm:col-span-2">
              <input id="pickupLocation" className="field" value={values.pickupLocation} onChange={set('pickupLocation')} placeholder="Address, hotel, residence or airport" />
            </Field>
            <Field id="pickupDate" label="Date *" error={errors.pickupDate}>
              <input id="pickupDate" type="date" className="field" value={values.pickupDate} onChange={set('pickupDate')} />
            </Field>
            <Field id="pickupTime" label="Time">
              <input id="pickupTime" type="time" className="field" value={values.pickupTime} onChange={set('pickupTime')} />
            </Field>
          </fieldset>

          <fieldset className="grid gap-5 rounded-2xl border border-line bg-panel-2/50 p-5 sm:grid-cols-2">
            <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Drop-off</legend>
            <Field id="dropoffLocation" label="Location" className="sm:col-span-2">
              <input id="dropoffLocation" className="field" value={values.dropoffLocation} onChange={set('dropoffLocation')} placeholder="Leave blank if same as pickup" />
            </Field>
            <Field id="dropoffDate" label="Date">
              <input id="dropoffDate" type="date" className="field" value={values.dropoffDate} onChange={set('dropoffDate')} />
            </Field>
            <Field id="dropoffTime" label="Time">
              <input id="dropoffTime" type="time" className="field" value={values.dropoffTime} onChange={set('dropoffTime')} />
            </Field>
          </fieldset>

          <Field id="message" label="Additional information & special requests">
            <textarea id="message" rows={4} className="field resize-none" value={values.message} onChange={set('message')} placeholder="Itinerary, child seats, refreshments, branding or event details" />
          </Field>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            {onCancel ? (
              <button type="button" onClick={onCancel} className="btn-outline">
                Cancel
              </button>
            ) : (
              <p className="max-w-xs text-xs leading-relaxed text-mist">
                Your details are used only to respond to this request and are never shared.
              </p>
            )}
            <button type="button" onClick={onContinue} className="btn-gold min-w-[200px]">
              Continue
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name *" error={errors.name} className="sm:col-span-2">
              <input id="name" autoComplete="name" className="field" value={values.name} onChange={set('name')} />
            </Field>
            <Field id="email" label="Email address *" error={errors.email}>
              <input id="email" type="email" autoComplete="email" className="field" value={values.email} onChange={set('email')} />
            </Field>
            <Field id="phone" label="Phone number *" error={errors.phone}>
              <input id="phone" type="tel" autoComplete="tel" className="field" value={values.phone} onChange={set('phone')} placeholder="416-000-0000" />
            </Field>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => {
                setErrors({})
                setStep(1)
              }}
              className="btn-outline"
            >
              Back
            </button>
            <button type="submit" className="btn-gold min-w-[200px]" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : submitLabel}
            </button>
          </div>
        </>
      )}

      {status === 'failed' && (
        <p role="alert" className="text-sm text-red-400">
          {failure}
        </p>
      )}
    </form>
  )
}

function Field({
  id,
  label,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
