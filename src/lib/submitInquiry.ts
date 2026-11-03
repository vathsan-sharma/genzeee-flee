export interface InquiryPayload {
  name: string
  email: string
  phone: string
  service: string
  vehicle: string
  pickupLocation: string
  pickupDate: string
  pickupTime: string
  dropoffLocation: string
  dropoffDate: string
  dropoffTime: string
  message: string
  /** Page the inquiry was sent from, to help concierge triage. */
  source: string
}

export class InquiryError extends Error {}

const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined
const TIMEOUT_MS = 15000

/**
 * Sends an inquiry to the backend endpoint configured as VITE_INQUIRY_ENDPOINT.
 *
 * With no endpoint set, development builds log the payload and resolve, so the form can be
 * exercised locally. Production builds reject instead, so a missing endpoint never drops an
 * inquiry silently.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info('[inquiry] VITE_INQUIRY_ENDPOINT not set, logging payload only', payload)
      return
    }
    throw new InquiryError('Inquiries are temporarily unavailable. Please call 416-677-0606.')
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!response.ok) throw new InquiryError(`Request failed with status ${response.status}.`)
  } catch (error) {
    if (error instanceof InquiryError) throw error
    throw new InquiryError('We could not send your inquiry. Check your connection, or call 416-677-0606.')
  } finally {
    window.clearTimeout(timer)
  }
}
