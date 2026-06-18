import { siteConfig } from './site'

export type BrandAssetTone = 'light' | 'dark'

export interface BrandDownload {
  label: string
  href: string
}

export interface BrandAsset {
  title: string
  src: string
  tone: BrandAssetTone
  downloads: readonly BrandDownload[]
}

export interface BrandScreenshot {
  title: string
  light: string
  dark: string
  downloads: readonly BrandDownload[]
}

export const BRAND_ZIP_HREF = '/brand/dashfy-brand-assets.zip'

export const LOGO_ASSETS: readonly BrandAsset[] = [
  {
    title: `${siteConfig.name} Wordmark White`,
    src: '/brand/dashfy-wordmark-white.svg',
    tone: 'dark',
    downloads: [
      { label: '.svg', href: '/brand/dashfy-wordmark-white.svg' },
      { label: '.png', href: '/brand/dashfy-wordmark-white.png' },
    ],
  },
  {
    title: `${siteConfig.name} Wordmark Black`,
    src: '/brand/dashfy-wordmark-black.svg',
    tone: 'light',
    downloads: [
      { label: '.svg', href: '/brand/dashfy-wordmark-black.svg' },
      { label: '.png', href: '/brand/dashfy-wordmark-black.png' },
    ],
  },
] as const

export const ICON_ASSETS: readonly BrandAsset[] = [
  {
    title: `${siteConfig.name} Icon White`,
    src: '/brand/dashfy-icon-white.svg',
    tone: 'dark',
    downloads: [
      { label: '.svg', href: '/brand/dashfy-icon-white.svg' },
      { label: '.png', href: '/brand/dashfy-icon-white.png' },
    ],
  },
  {
    title: `${siteConfig.name} Icon Black`,
    src: '/brand/dashfy-icon-black.svg',
    tone: 'light',
    downloads: [
      { label: '.svg', href: '/brand/dashfy-icon-black.svg' },
      { label: '.png', href: '/brand/dashfy-icon-black.png' },
    ],
  },
  {
    title: `${siteConfig.name} Social Logo`,
    src: '/brand/dashfy-social-logo.svg',
    tone: 'light',
    downloads: [
      { label: '.svg', href: '/brand/dashfy-social-logo.svg' },
      { label: '.png', href: '/brand/dashfy-social-logo.png' },
    ],
  },
] as const

export const SCREENSHOTS: readonly BrandScreenshot[] = [
  {
    title: `${siteConfig.name} Screenshot 1`,
    light: '/brand/dashfy-screenshot_01-light.png',
    dark: '/brand/dashfy-screenshot_01-dark.png',
    downloads: [
      { label: 'Light', href: '/brand/dashfy-screenshot_01-light.png' },
      { label: 'Dark', href: '/brand/dashfy-screenshot_01-dark.png' },
    ],
  },
  {
    title: `${siteConfig.name} Screenshot 2`,
    light: '/brand/dashfy-screenshot_02-light.png',
    dark: '/brand/dashfy-screenshot_02-dark.png',
    downloads: [
      { label: 'Light', href: '/brand/dashfy-screenshot_02-light.png' },
      { label: 'Dark', href: '/brand/dashfy-screenshot_02-dark.png' },
    ],
  },
  {
    title: `${siteConfig.name} Screenshot 3`,
    light: '/brand/dashfy-screenshot_03-light.png',
    dark: '/brand/dashfy-screenshot_03-dark.png',
    downloads: [
      { label: 'Light', href: '/brand/dashfy-screenshot_03-light.png' },
      { label: 'Dark', href: '/brand/dashfy-screenshot_03-dark.png' },
    ],
  },
  {
    title: `${siteConfig.name} Screenshot 4`,
    light: '/brand/dashfy-screenshot_04-light.png',
    dark: '/brand/dashfy-screenshot_04-dark.png',
    downloads: [
      { label: 'Light', href: '/brand/dashfy-screenshot_04-light.png' },
      { label: 'Dark', href: '/brand/dashfy-screenshot_04-dark.png' },
    ],
  },
] as const
