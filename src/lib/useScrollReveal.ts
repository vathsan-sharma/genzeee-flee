import { useEffect, type RefObject } from 'react'

/** Elements that fade up as they scroll into view on the homepage. */
const SELECTOR = 'h2, h3, p, img, li, form, fieldset, .card, .btn-gold, .btn-outline'

/**
 * Marks the outermost matching elements inside `ref` and fades each one up once it scrolls into view.
 * Siblings get a short stagger so lists and card rows arrive in sequence.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.parentElement?.closest(SELECTOR),
    )

    const seen = new Map<Element, number>()
    targets.forEach((el) => {
      const parent = el.parentElement!
      const index = seen.get(parent) ?? 0
      seen.set(parent, index + 1)
      el.style.setProperty('--rv-delay', `${Math.min(index, 5) * 120}ms`)
      el.classList.add('rv')
    })

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('rv-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rv-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}
