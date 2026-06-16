/**
 * Local type stub for `@thesvg/icons` subpath imports.
 *
 * The published package ships a malformed `await.d.ts` (the slug `await` is a
 * reserved word, emitted as `declare const await`). Importing any icon pulls in
 * the icon barrel, which re-exports that file and makes `tsc` fail with a parse
 * error that `skipLibCheck` cannot suppress. Remapping `@thesvg/icons/*` to this
 * stub (see `paths` in tsconfig.json) keeps the broken file out of the program
 * while preserving the shared icon shape. Runtime resolution is unaffected.
 */
export const slug: string
export const title: string
export const hex: string
export const categories: string[]
export const aliases: string[]
export const svg: string
export const variants: Record<string, string>
export const license: string
export const url: string

declare const icon: {
  slug: string
  title: string
  hex: string
  categories: string[]
  aliases: string[]
  svg: string
  variants: Record<string, string>
  license: string
  url: string
}

export default icon
