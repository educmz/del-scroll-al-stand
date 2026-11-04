import './SectionEyebrow.css'

type SectionEyebrowProps = {
  children: string
  className?: string
}

/** Solo texto: sin líneas, íconos ni adornos. */
export default function SectionEyebrow({ children, className = '' }: SectionEyebrowProps) {
  return <span className={`section-overline ${className}`.trim()}>{children}</span>
}
