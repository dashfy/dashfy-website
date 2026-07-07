'use client'

import type { Node, Root } from 'fumadocs-core/page-tree'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn, generateReactKey } from '@/lib/utils'

interface DocsNavProps {
  tree: Root
  onNavigate?: () => void
}

interface NavLinkProps {
  href: string
  active: boolean
  onNavigate?: () => void
  children: React.ReactNode
}

const NavLink = ({ href, active, onNavigate, children }: NavLinkProps) => {
  return (
    <Link
      className={cn(
        'block rounded-md px-3 py-1.5 text-[0.8rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        active && 'bg-muted text-foreground',
      )}
      href={href}
      onClick={onNavigate}
    >
      {children}
    </Link>
  )
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="px-3 pt-5 pb-1.5 text-xs font-semibold tracking-wide text-foreground/70 first:pt-0">
    {children}
  </p>
)

// A nav item is active on its own page and on any nested page (e.g.
// `/docs/installation` stays active on `/docs/installation/next`). The docs
// root is excluded from prefix matching since every page starts with `/docs`.
const isNavActive = (url: string, pathname: string) => {
  if (pathname === url) {
    return true
  }

  if (url === '/docs') {
    return false
  }

  return pathname.startsWith(`${url}/`)
}

export const DocsNav = ({ tree, onNavigate }: DocsNavProps) => {
  const pathname = usePathname()

  const renderNode = (node: Node, index: number): React.ReactNode => {
    if (node.type === 'separator') {
      return (
        <SectionLabel key={generateReactKey('docs-sep', String(node.name), index)}>
          {node.name}
        </SectionLabel>
      )
    }

    if (node.type === 'folder') {
      return (
        <div
          key={generateReactKey('docs-folder', String(node.name), index)}
          className="flex flex-col gap-0.5"
        >
          <SectionLabel>{node.name}</SectionLabel>
          {node.index ? (
            <NavLink
              active={isNavActive(node.index.url, pathname)}
              href={node.index.url}
              onNavigate={onNavigate}
            >
              {node.index.name}
            </NavLink>
          ) : null}
          {node.children.map((child, childIndex) => renderNode(child, childIndex))}
        </div>
      )
    }

    return (
      <NavLink
        key={generateReactKey('docs-page', node.url, index)}
        active={isNavActive(node.url, pathname)}
        href={node.url}
        onNavigate={onNavigate}
      >
        {node.name}
      </NavLink>
    )
  }

  return (
    <nav aria-label="Docs navigation" className="flex flex-col gap-0.5">
      {tree.children.map((node, index) => renderNode(node, index))}
    </nav>
  )
}
