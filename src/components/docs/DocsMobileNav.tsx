'use client'

import type { Root } from 'fumadocs-core/page-tree'
import { useState } from 'react'

import { MenuIcon } from '@/components/common/Icons'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { DocsNav } from './DocsNav'
import { DocsSearch } from './DocsSearch'

interface DocsMobileNavProps {
  tree: Root
}

export const DocsMobileNav = ({ tree }: DocsMobileNavProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-14 z-30 flex items-center gap-2 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden">
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <MenuIcon className="size-4" />
          Menu
        </DrawerTrigger>
        <DrawerContent className="w-72 data-[vaul-drawer-direction=left]:rounded-none">
          <DrawerHeader>
            <DrawerTitle>Documentation</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-8">
            <DocsNav tree={tree} onNavigate={() => setOpen(false)} />
          </div>
        </DrawerContent>
      </Drawer>
      <div className="flex-1">
        <DocsSearch />
      </div>
    </div>
  )
}
