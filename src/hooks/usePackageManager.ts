'use client'

import { useCallback, useEffect, useState } from 'react'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const DEFAULT_PACKAGE_MANAGER: PackageManager = 'pnpm'
const STORAGE_PREFIX = 'dashfy-package-manager'
const SYNC_EVENT = 'dashfy:package-manager-change'

const isPackageManager = (value: unknown): value is PackageManager =>
  value === 'pnpm' || value === 'npm' || value === 'yarn' || value === 'bun'

const storageKey = (groupId: string) => `${STORAGE_PREFIX}:${groupId}`

/**
 * Persists the selected package manager per `groupId` (from fumadocs' remarkNpm
 * `persist.id`) in localStorage and keeps every mounted code block in sync,
 * both across tabs (native `storage` event) and within the same tab (custom event).
 */
export const usePackageManager = (groupId: string, fallback?: string) => {
  const defaultValue = isPackageManager(fallback) ? fallback : DEFAULT_PACKAGE_MANAGER

  // Start from a stable value for SSR, then hydrate from localStorage in the effect.
  const [value, setValue] = useState<PackageManager>(defaultValue)

  useEffect(() => {
    const key = storageKey(groupId)

    const readStored = () => {
      const stored = window.localStorage.getItem(key)

      if (isPackageManager(stored)) {
        setValue(stored)
      }
    }

    readStored()

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        readStored()
      }
    }

    const handleSync = (event: Event) => {
      const detail = (event as CustomEvent<{ groupId: string }>).detail

      if (detail?.groupId === groupId) {
        readStored()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(SYNC_EVENT, handleSync)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(SYNC_EVENT, handleSync)
    }
  }, [groupId])

  const update = useCallback(
    (next: string) => {
      if (!isPackageManager(next)) {
        return
      }

      setValue(next)
      window.localStorage.setItem(storageKey(groupId), next)
      window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { groupId } }))
    },
    [groupId],
  )

  return [value, update] as const
}
