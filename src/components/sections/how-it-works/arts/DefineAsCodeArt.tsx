import { borderStroke, cardSurface, cardSurfaceMuted } from './styles'

export const DefineAsCodeArt = () => (
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

    <g style={{ fill: 'currentColor', opacity: 0.55 }}>
      <circle cx="38" cy="42" r="3" />
      <circle cx="48" cy="42" r="3" />
      <circle cx="58" cy="42" r="3" />
    </g>

    <text
      fontFamily="ui-monospace, Menlo, monospace"
      fontSize="9.5"
      style={{ fill: 'currentColor', opacity: 0.6 }}
      x="78"
      y="46"
    >
      dashfy.config.yml
    </text>

    <path d="M 24 52 H 52 V 188 H 36 A 12 12 0 0 1 24 176 Z" style={cardSurfaceMuted} />
    <line strokeWidth="1" style={borderStroke} x1="52" x2="52" y1="52" y2="188" />

    <g
      fontFamily="ui-monospace, Menlo, monospace"
      fontSize="9.5"
      style={{ fill: 'currentColor', opacity: 0.4 }}
      textAnchor="middle"
    >
      <text x="38" y="73">
        1
      </text>
      <text x="38" y="91">
        2
      </text>
      <text x="38" y="109">
        3
      </text>
      <text x="38" y="127">
        4
      </text>
      <text x="38" y="145">
        5
      </text>
      <text x="38" y="163">
        6
      </text>
      <text x="38" y="181">
        7
      </text>
    </g>

    <rect height="18" style={{ fill: 'currentColor', opacity: 0.06 }} width="240" x="52" y="115" />
    <rect height="18" style={{ fill: 'currentColor' }} width="2" x="52" y="115" />

    <g fontFamily="ui-monospace, Menlo, monospace" fontSize="10" xmlSpace="preserve">
      <text style={{ fill: 'currentColor' }} x="60" y="73">
        - title: <tspan style={{ fill: 'currentColor', opacity: 0.7 }}>GitHub Dashboard</tspan>
      </text>
      <text style={{ fill: 'currentColor' }} x="73" y="91">
        columns: <tspan style={{ fill: 'currentColor', opacity: 0.7 }}>2</tspan>
      </text>
      <text style={{ fill: 'currentColor' }} x="73" y="109">
        rows: <tspan style={{ fill: 'currentColor', opacity: 0.7 }}>3</tspan>
      </text>
      <text fontWeight="600" style={{ fill: 'currentColor' }} x="73" y="127">
        widgets:
      </text>
      <text style={{ fill: 'currentColor' }} x="85" y="145">
        - extension: <tspan style={{ fill: 'currentColor', opacity: 0.7 }}>github</tspan>
      </text>
      <text style={{ fill: 'currentColor' }} x="98" y="163">
        widget: <tspan style={{ fill: 'currentColor', opacity: 0.7 }}>RepoBadge</tspan>
      </text>
      <text style={{ fill: 'currentColor' }} x="97" y="181">
        repository: <tspan style={{ fill: 'currentColor', opacity: 0.7 }}>vercel/next.js</tspan>
      </text>
    </g>
  </g>
)
