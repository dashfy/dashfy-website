import type { Root } from 'fumadocs-core/page-tree'

import { DocsNav } from './DocsNav'
import { DocsSearch } from './DocsSearch'

interface DocsSidebarProps {
  tree: Root
}

export const DocsSidebar = ({ tree }: DocsSidebarProps) => {
  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-8 pr-4 lg:block">
      <div className="mb-5">
        <DocsSearch />
      </div>
      <DocsNav tree={tree} />
    </aside>
  )
}
