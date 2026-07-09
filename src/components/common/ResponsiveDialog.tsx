import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface RootResponsiveDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface ResponsiveDialogProps {
  className?: string
  children: React.ReactNode
  asChild?: true
}

const desktop = '(min-width: 768px)'

export const ResponsiveDialog = ({ children, ...props }: RootResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialog = isDesktop ? Dialog : Drawer

  return <ResponsiveDialog {...props}>{children}</ResponsiveDialog>
}

export const ResponsiveDialogTrigger = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <ResponsiveDialogTrigger className={className} {...props}>
      {children}
    </ResponsiveDialogTrigger>
  )
}

export const ResponsiveDialogClose = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogClose = isDesktop ? DialogClose : DrawerClose

  return (
    <ResponsiveDialogClose className={className} {...props}>
      {children}
    </ResponsiveDialogClose>
  )
}

export const ResponsiveDialogContent = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogContent = isDesktop ? DialogContent : DrawerContent

  return (
    <ResponsiveDialogContent className={className} {...props}>
      {children}
    </ResponsiveDialogContent>
  )
}

export const ResponsiveDialogHeader = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogHeader = isDesktop ? DialogHeader : DrawerHeader

  return (
    <ResponsiveDialogHeader className={className} {...props}>
      {children}
    </ResponsiveDialogHeader>
  )
}

export const ResponsiveDialogTitle = ({ className, children, ...props }: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogTitle = isDesktop ? DialogTitle : DrawerTitle

  return (
    <ResponsiveDialogTitle className={className} {...props}>
      {children}
    </ResponsiveDialogTitle>
  )
}

export const ResponsiveDialogDescription = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogDescription = isDesktop ? DialogDescription : DrawerDescription

  return (
    <ResponsiveDialogDescription className={className} {...props}>
      {children}
    </ResponsiveDialogDescription>
  )
}

export const ResponsiveDialogBody = ({ className, children, ...props }: ResponsiveDialogProps) => {
  return (
    <div className={cn('px-6 md:px-0', className)} {...props}>
      {children}
    </div>
  )
}

export const ResponsiveDialogFooter = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const ResponsiveDialogFooter = isDesktop ? DialogFooter : DrawerFooter

  return (
    <ResponsiveDialogFooter className={className} {...props}>
      {children}
    </ResponsiveDialogFooter>
  )
}
