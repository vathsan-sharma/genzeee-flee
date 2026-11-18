import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Floating button that appears after the visitor scrolls down and returns them to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-24 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ink/80 text-gold shadow-[0_12px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur transition-all duration-500 hover:bg-gold hover:text-ink lg:bottom-8 lg:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  )
}
