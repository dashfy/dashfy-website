'use client'

import { ExternalLink } from '@/components/common/ExternalLink'
import {
  ChatGptIcon,
  CheckIcon,
  ChevronDownIcon,
  ClaudeIcon,
  CopyIcon,
  MarkdownIcon,
} from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useCopy } from '@/hooks/useCopy'

const buildPromptUrl = (baseUrl: string, url: string) =>
  `${baseUrl}?q=${encodeURIComponent(
    `I'm looking at this Dashfy documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help me debug based on it.`,
  )}`

interface DocsCopyPageProps {
  markdown: string
  url: string
}

export const DocsCopyPage = ({ markdown, url }: DocsCopyPageProps) => {
  const { copied, copy } = useCopy()

  const menuItems = [
    {
      key: 'markdown',
      href: `${url}.md`,
      icon: <MarkdownIcon />,
      label: 'View as Markdown',
    },
    {
      key: 'chatgpt',
      href: buildPromptUrl('https://chatgpt.com', `${url}.md`),
      icon: <ChatGptIcon />,
      label: 'Open in ChatGPT',
    },
    {
      key: 'claude',
      href: buildPromptUrl('https://claude.ai/new', `${url}.md`),
      icon: <ClaudeIcon />,
      label: 'Open in Claude',
    },
  ]

  const trigger = (
    <Button
      aria-label="More options"
      className="peer -ml-0.5 shadow-none"
      size="icon-sm"
      variant="secondary"
    >
      <ChevronDownIcon className="rotate-180 sm:rotate-0" />
    </Button>
  )

  return (
    <Popover>
      <div className="group/buttons relative flex rounded-lg bg-secondary *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
        <PopoverAnchor />
        <Button
          className="shadow-none"
          size="sm"
          variant="secondary"
          onClick={() => copy(markdown)}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          Copy Page
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="hidden sm:flex" asChild>
            {trigger}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-lg shadow-none">
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.key} asChild>
                <a href={item.href} rel="noopener noreferrer" target="_blank">
                  {item.icon}
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator
          className="absolute top-1 right-7 z-0 h-5! bg-foreground/5! peer-focus-visible:opacity-0"
          orientation="vertical"
        />

        <PopoverTrigger className="flex sm:hidden" asChild>
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-52 origin-center! rounded-lg bg-background/70 p-1 shadow-none backdrop-blur-sm dark:bg-background/60"
        >
          {menuItems.map((item) => (
            <Button
              key={item.key}
              className="w-full justify-start text-base font-normal *:[svg]:text-muted-foreground"
              size="lg"
              variant="ghost"
              asChild
            >
              <ExternalLink href={item.href}>
                {item.icon}
                {item.label}
              </ExternalLink>
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  )
}
