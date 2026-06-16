import type { LinkProps } from 'next/link'
import Link from 'next/link'

type ExternalLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & LinkProps

export const ExternalLink = ({
  children,
  className,
  href,
  rel = 'noopener noreferrer',
  ...props
}: ExternalLinkProps) => (
  <Link className={className} href={href} prefetch={false} rel={rel} target="_blank" {...props}>
    {children}
  </Link>
)
