import { useCallback, useEffect, useRef, useState } from 'react'

const COPIED_RESET_MS = 1_800

export const useCopy = (resetMs: number = COPIED_RESET_MS) => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value)
      } catch {
        // Clipboard API unavailable or denied; fail silently.
      }

      setCopied(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => setCopied(false), resetMs)
    },
    [resetMs],
  )

  return { copied, copy }
}
