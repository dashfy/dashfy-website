import { DocsMobileNav } from '@/components/docs/DocsMobileNav'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { CompactStickyFooter } from '@/components/navigation/footer/CompactStickyFooter'
import { Header } from '@/components/navigation/header/Header'
import { source } from '@/lib/source'

interface DocsLayoutProps {
  children: React.ReactNode
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
  const tree = source.pageTree

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <DocsMobileNav tree={tree} />
      <div className="mx-auto w-full max-w-[1400px] flex-1 px-4 sm:px-6">
        <div className="flex gap-8 lg:gap-10">
          <DocsSidebar tree={tree} />
          <main className="min-w-0 flex-1 pb-20">{children}</main>
        </div>
      </div>
      <CompactStickyFooter />
    </div>
  )
}

export default DocsLayout
