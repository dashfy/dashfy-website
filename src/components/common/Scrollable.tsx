import type { PartialOptions } from 'overlayscrollbars'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

const DEFAULT_OVERLAY_SCROLLBARS_OPTIONS: PartialOptions = {
  scrollbars: {
    autoHide: 'leave',
    autoHideDelay: 800,
  },
}

interface ScrollableProps extends Omit<
  React.ComponentProps<typeof OverlayScrollbarsComponent>,
  'options'
> {
  options?: React.ComponentProps<typeof OverlayScrollbarsComponent>['options']
}

export const Scrollable = ({ className, options, defer = true, ...props }: ScrollableProps) => (
  <OverlayScrollbarsComponent
    className={className}
    defer={defer}
    options={{ ...DEFAULT_OVERLAY_SCROLLBARS_OPTIONS, ...options }}
    {...props}
  />
)
