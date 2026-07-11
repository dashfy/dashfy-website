import {
  CircleAlertIcon,
  InfoIcon,
  LightbulbIcon,
  TriangleAlertIcon,
} from '@/components/common/Icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type CalloutType = 'info' | 'warning' | 'danger' | 'note'

interface CalloutProps extends Omit<React.ComponentProps<typeof Alert>, 'variant'> {
  type?: CalloutType
  title?: string
}

const VARIANT_BY_TYPE: Record<CalloutType, React.ComponentProps<typeof Alert>['variant']> = {
  info: 'info',
  note: 'default',
  warning: 'warning',
  danger: 'destructive',
}

const ICON_BY_TYPE: Record<CalloutType, React.ComponentType<{ className?: string }>> = {
  info: InfoIcon,
  note: LightbulbIcon,
  warning: TriangleAlertIcon,
  danger: CircleAlertIcon,
}

export const Callout = ({ type = 'note', title, children, ...props }: CalloutProps) => {
  const Icon = ICON_BY_TYPE[type]

  return (
    <Alert className="my-6" variant={VARIANT_BY_TYPE[type]} {...props}>
      <Icon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
