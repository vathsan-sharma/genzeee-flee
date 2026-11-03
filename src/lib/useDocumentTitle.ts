import { useEffect } from 'react'

/** Sets the document title for the lifetime of a page. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
