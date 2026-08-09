import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Converts a string or null/undefined value to undefined if it is blank,
 * otherwise returns the original value.
 */
export const blankToUndefined = (value: string | null | undefined): string | undefined => {
  const trimmed = value?.trim()
  return trimmed !== undefined && trimmed.length > 0 ? trimmed : undefined
}

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const generateReactKey = (
  prefix: string,
  identifier: string | number,
  index?: number,
): string => {
  const base = `${prefix}_${identifier}`
  return typeof index === 'number' ? `${base}_${index}` : base
}
