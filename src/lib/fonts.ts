import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from './utils'

export const fontSans = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const fontVariables = cn(fontSans.variable, fontMono.variable)
