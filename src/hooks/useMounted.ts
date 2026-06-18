import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export const useMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}
