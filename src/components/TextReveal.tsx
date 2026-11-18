import { useEffect, useRef, useState } from 'react'

/**
 * Reveals a line of text one word at a time, with a soft blur and rise.
 * Runs once, when the text first scrolls into view.
 */
export function TextReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <span ref={ref} className={`${className} ${shown ? 'tr-shown' : ''}`} aria-label={text}>
      {words.map((word, index) => (
        <span key={index}>
          {index > 0 && ' '}
          <span
            aria-hidden="true"
            className="tr-word"
            style={{ ['--tr-delay' as string]: `${delay + index * 90}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}
