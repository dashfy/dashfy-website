import { useCallback, useEffect, useState } from 'react'

export const useMobileNav = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  const toggle = useCallback(() => setOpen((value) => !value), [])
  const close = useCallback(() => setOpen(false), [])

  return { open, toggle, close }
}
