import { BracesIcon, FileCode2Icon, FileCogIcon, FileIcon } from '@/components/common/Icons'

const className = 'size-3.5 shrink-0 text-muted-foreground'

// Fumadocs does not emit a language attribute, so the icon is picked from the
// filename in the code block's `title` meta instead.
export const getFileIcon = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'astro':
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'ts':
    case 'tsx':
      return <FileCode2Icon className={className} />
    case 'json':
      return <BracesIcon className={className} />
    case 'yaml':
    case 'yml':
      return <FileCogIcon className={className} />
    default:
      return <FileIcon className={className} />
  }
}
