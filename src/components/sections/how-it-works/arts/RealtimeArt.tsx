import { borderStroke, cardSurface, cardSurfaceMuted } from './styles'

export const RealtimeArt = () => (
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
      fontFamily="system-ui, sans-serif"
      fontSize="11"
      fontWeight="700"
      style={{ fill: 'currentColor' }}
      x="40"
      y="46"
    >
      GitHub Dashboard
    </text>
    <circle cx="278" cy="42" r="3" style={{ fill: 'currentColor' }} />
    <circle cx="278" cy="42" opacity="0.3" r="6" style={{ fill: 'currentColor' }} />

    <rect
      height="60"
      rx="6"
      strokeWidth="1"
      style={{ fill: 'var(--muted)', stroke: 'var(--border)' }}
      width="112"
      x="40"
      y="64"
    />
    <text
      fontFamily="system-ui, sans-serif"
      fontSize="9"
      fontWeight="700"
      letterSpacing="0.06em"
      style={{ fill: 'currentColor', opacity: 0.55 }}
      x="48"
      y="80"
    >
      STARS
    </text>
    <text
      fontFamily="system-ui, sans-serif"
      fontSize="20"
      fontWeight="700"
      style={{ fill: 'currentColor' }}
      x="48"
      y="106"
    >
      12.4k
    </text>
    <g style={{ stroke: 'currentColor', opacity: 0.5 }}>
      <line strokeWidth="1.4" x1="48" x2="62" y1="116" y2="112" />
      <line strokeWidth="1.4" x1="62" x2="78" y1="112" y2="115" />
      <line strokeWidth="1.4" x1="78" x2="94" y1="115" y2="108" />
      <line strokeWidth="1.4" x1="94" x2="110" y1="108" y2="110" />
      <line strokeWidth="1.4" x1="110" x2="126" y1="110" y2="104" />
      <line strokeWidth="1.4" x1="126" x2="142" y1="104" y2="100" />
    </g>

    <rect
      height="60"
      rx="6"
      strokeWidth="1"
      style={{ fill: 'var(--muted)', stroke: 'var(--border)' }}
      width="112"
      x="168"
      y="64"
    />
    <text
      fontFamily="system-ui, sans-serif"
      fontSize="9"
      fontWeight="700"
      letterSpacing="0.06em"
      style={{ fill: 'currentColor', opacity: 0.55 }}
      x="176"
      y="80"
    >
      OPEN PRS
    </text>
    <g>
      <rect
        height="6"
        rx="3"
        style={{ fill: 'currentColor', opacity: 0.25 }}
        width="96"
        x="176"
        y="92"
      />
      <rect height="6" rx="3" style={{ fill: 'currentColor' }} width="64" x="176" y="92" />
      <rect
        height="6"
        rx="3"
        style={{ fill: 'currentColor', opacity: 0.25 }}
        width="96"
        x="176"
        y="104"
      />
      <rect height="6" rx="3" style={{ fill: 'currentColor' }} width="40" x="176" y="104" />
      <rect
        height="6"
        rx="3"
        style={{ fill: 'currentColor', opacity: 0.25 }}
        width="96"
        x="176"
        y="116"
      />
      <rect height="6" rx="3" style={{ fill: 'currentColor' }} width="78" x="176" y="116" />
    </g>

    <rect
      height="44"
      rx="6"
      strokeWidth="1"
      style={{ fill: 'var(--muted)', stroke: 'var(--border)' }}
      width="240"
      x="40"
      y="132"
    />
    <text
      fontFamily="system-ui, sans-serif"
      fontSize="9"
      fontWeight="700"
      letterSpacing="0.06em"
      style={{ fill: 'currentColor', opacity: 0.55 }}
      x="48"
      y="148"
    >
      COMMIT ACTIVITY
    </text>
    <polyline
      fill="none"
      points="48,170 70,162 92,168 114,158 136,164 158,150 180,156 202,148 224,154 246,142 268,148"
      strokeWidth="1.6"
      style={{ stroke: 'currentColor' }}
    />
  </g>
)
