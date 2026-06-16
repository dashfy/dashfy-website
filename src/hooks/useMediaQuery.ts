import { useCallback, useSyncExternalStore } from 'react'

export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const result = matchMedia(query)

      result.addEventListener('change', onStoreChange)

      return () => {
        result.removeEventListener('change', onStoreChange)
      }
    },
    [query],
  )

  const getSnapshot = () => matchMedia(query).matches
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
