import { borderStroke, cardSurface, cardSurfaceMuted } from './styles'

export const RunServerArt = () => (
  <g>
    <rect height="156" rx="12" style={cardSurface} width="272" x="24" y="32" />
    <rect
      fill="none"
      height="156"
      rx="12"
      strokeWidth="1"
      style={borderStroke}
      width="272"
      x="24"
      y="32"
    />

    <path
      d="M 24 44 A 12 12 0 0 1 36 32 H 284 A 12 12 0 0 1 296 44 V 52 H 24 Z"
      style={cardSurfaceMuted}
    />
    <line strokeWidth="1" style={borderStroke} x1="24" x2="296" y1="52" y2="52" />
    <text
      fontFamily="ui-monospace, Menlo, monospace"
      fontSize="10"
      style={{ fill: 'currentColor', opacity: 0.65 }}
      x="40"
      y="46"
    >
      ~/dashfy
    </text>

    <g fontFamily="ui-monospace, Menlo, monospace" fontSize="10.5">
      <text style={{ fill: 'currentColor', opacity: 0.55 }} x="40" y="74">
        $
      </text>
      <text style={{ fill: 'currentColor' }} x="54" y="74">
        pnpm dev:all
      </text>

      <text style={{ fill: 'currentColor', opacity: 0.7 }} x="40" y="94">
        ✓ Loaded dashfy.config.yml
      </text>
      <text style={{ fill: 'currentColor', opacity: 0.7 }} x="40" y="110">
        ✓ Registered 3 extensions
      </text>
      <text style={{ fill: 'currentColor', opacity: 0.7 }} x="40" y="126">
        ✓ Connected to APIs
      </text>

      <text style={{ fill: 'currentColor', opacity: 0.55 }} x="40" y="146">
        →
      </text>
      <text style={{ fill: 'currentColor' }} x="54" y="146">
        http://localhost:3000 ready
      </text>
    </g>

    <rect
      height="22"
      rx="6"
      style={{ fill: 'var(--muted)', stroke: 'var(--border)' }}
      width="116"
      x="40"
      y="158"
    />
    <circle cx="54" cy="169" r="3.5" style={{ fill: 'currentColor' }} />
    <circle cx="54" cy="169" opacity="0.4" r="6" style={{ fill: 'currentColor' }} />
    <text
      fontFamily="system-ui, sans-serif"
      fontSize="10"
      fontWeight="600"
      style={{ fill: 'currentColor' }}
      x="66"
      y="173"
    >
      Server running
    </text>
  </g>
)
