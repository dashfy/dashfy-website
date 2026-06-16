import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateReactKey(
  prefix: string,
  identifier: string | number,
  index?: number,
): string {
  const base = `${prefix}_${identifier}`
  return typeof index === 'number' ? `${base}_${index}` : base
}
