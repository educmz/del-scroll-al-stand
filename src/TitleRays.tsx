import './TitleRays.css'

type TitleRaysProps = {
  side?: 'left' | 'right'
  className?: string
}

/** Adornos laterales decorativos con la misma alineación en todas las secciones. */
export default function TitleRays({ side = 'left', className = '' }: TitleRaysProps) {
  return (
    <svg
      className={`title-rays title-rays-${side} ${className}`.trim()}
      viewBox="0 0 52 96"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M37 17 18 6 M35 48 H6 M37 79 18 90" />
    </svg>
  )
}
