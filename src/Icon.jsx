// SVG icons from src/icons. They are inlined so the dark-blue parts
// (fill="currentColor") follow the theme: dark blue in light mode, light in dark mode.
const files = import.meta.glob('./icons/*.svg', { query: '?raw', import: 'default', eager: true })

const ICONS = {}
for (const path in files) {
  ICONS[path.slice('./icons/'.length, -'.svg'.length)] = files[path]
}

export default function Icon({ name, size, className = '' }) {
  const svg = ICONS[name]
  if (!svg) return null
  return (
    <span
      className={'icon ' + className}
      style={size ? { width: size, height: size } : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
