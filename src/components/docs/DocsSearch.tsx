'use client'

import { useDocsSearch } from 'fumadocs-core/search/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SearchIcon } from '@/components/common/Icons'
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTitle,
} from '@/components/common/ResponsiveDialog'
import { Kbd } from '@/components/ui/kbd'
import { cn, generateReactKey } from '@/lib/utils'

export const DocsSearch = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { search, setSearch, query } = useDocsSearch({ type: 'fetch' })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const results = Array.isArray(query.data) ? query.data : []

  const handleSelect = (url: string) => {
    setOpen(false)
    setSearch('')
    router.push(url)
  }

  const handleClose = () => {
    setOpen(false)
    setSearch('')
  }

  return (
    <>
      <button
        className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span className="flex-1 text-left">Search docs…</span>
        <Kbd>⌘K</Kbd>
      </button>

      <ResponsiveDialog open={open} onOpenChange={handleClose}>
        <ResponsiveDialogContent className="top-24 translate-y-0 gap-0 p-0" showCloseButton={false}>
          <ResponsiveDialogTitle className="sr-only">Search documentation</ResponsiveDialogTitle>
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <SearchIcon className="size-4 text-muted-foreground" />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search documentation…"
              value={search}
              autoFocus
              onChange={(event) => setSearch(event.target.value)}
            />
            <Kbd className="hidden md:flex">ESC</Kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {search.length > 0 && results.length === 0 && !query.isLoading ? (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </p>
            ) : null}

            {results.map((result, index) => (
              <button
                key={generateReactKey('search', result.id, index)}
                className={cn(
                  'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                  result.type !== 'page' && 'pl-6 text-muted-foreground',
                )}
                type="button"
                onClick={() => handleSelect(result.url)}
              >
                {result.content}
              </button>
            ))}
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  )
}
