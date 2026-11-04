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
      viewBox="0 0 56 60"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M39 7 47 23 M17 23 35 34 M6 48 29 45" />
    </svg>
  )
}
