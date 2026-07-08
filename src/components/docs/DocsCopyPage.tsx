'use client'

import { ExternalLink } from '@/components/common/ExternalLink'
import {
  ChatGptIcon,
  CheckIcon,
  ChevronDownIcon,
  ClaudeIcon,
  CopilotIcon,
  CopyIcon,
  CursorIcon,
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
import { siteConfig } from '@/config/site'
import { useCopy } from '@/hooks/useCopy'

const buildPrompt = (url: string) =>
  `I'm looking at this ${siteConfig.name} documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help me debug based on it.`

const buildPromptUrl = (baseUrl: string, url: string) =>
  `${baseUrl}?q=${encodeURIComponent(buildPrompt(url))}`

const buildCopilotPromptUrl = (url: string) => {
  const prompt = buildPrompt(url)

  const link = new URL('vscode://GitHub.Copilot-Chat/chat')
  link.searchParams.set('prompt', prompt)
  return link.toString()
}

const buildCursorPromptUrl = (url: string) => {
  const prompt = buildPrompt(url)

  const link = new URL('https://cursor.com/link/prompt')
  link.searchParams.set('text', prompt)
  return link.toString()
}

interface DocsCopyPageProps {
  markdown: string
  url: string
}

export const DocsCopyPage = ({ markdown, url }: DocsCopyPageProps) => {
  const { copied, copy } = useCopy()

  const menuItems = [
    {
      key: 'markdown',
      href: url,
      icon: <MarkdownIcon />,
      label: 'View as Markdown',
    },
    {
      key: 'chatgpt',
      href: buildPromptUrl('https://chatgpt.com', url),
      icon: <ChatGptIcon />,
      label: 'Open in ChatGPT',
    },
    {
      key: 'claude',
      href: buildPromptUrl('https://claude.ai/new', url),
      icon: <ClaudeIcon />,
      label: 'Open in Claude',
    },
    {
      key: 'copilot',
      href: buildCopilotPromptUrl(url),
      icon: <CopilotIcon />,
      label: 'Open in Copilot',
    },
    {
      key: 'cursor',
      href: buildCursorPromptUrl(url),
      icon: <CursorIcon />,
      label: 'Open in Cursor',
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
      <div className="group/buttons relative flex rounded-lg bg-secondary *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10">
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
