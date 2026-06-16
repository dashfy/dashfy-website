export interface ThemedSvg {
  light: string
  dark: string
}

interface ThesvgIcon {
  svg: string
  variants: Record<string, string>
}

/**
 * Resolves a theme-aware pair of raw SVG strings from a `thesvg` icon module.
 *
 * Brand icons expose a `variants` map that may include `light` (dark ink, for
 * light backgrounds) and `dark` (light ink, for dark backgrounds). When a
 * variant is missing, it falls back to `default`, then to the base `svg`, so
 * single-variant logos keep working unchanged.
 */
export const getThemedSvg = (icon: ThesvgIcon): ThemedSvg => ({
  light: icon.variants.light ?? icon.variants.default ?? icon.svg,
  dark: icon.variants.dark ?? icon.variants.default ?? icon.svg,
})
