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
              active={pathname === node.index.url}
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
        active={pathname === node.url}
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
