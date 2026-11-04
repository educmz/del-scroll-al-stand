import type { ReactNode } from 'react'
import { Gift, Heart, Sparkles, Store } from 'lucide-react'
import './PageHero.css'

const baseUrl = import.meta.env.BASE_URL

type PageHeroProps = {
  id: string
  eyebrow?: string
  badgeIcon?: 'gift' | 'heart' | 'sparkles' | 'store'
  compactTitle?: boolean
  hideDecorations?: boolean
  title: ReactNode
  description: ReactNode
  imageFile: string
  imageAlt: string
  actions?: ReactNode
  children?: ReactNode
}

/**
 * Cabecera compartida por las cuatro páginas interiores.
 * Para actualizar la imagen solo hay que subir imageFile a public/images/.
 */
export default function PageHero({
  id,
  eyebrow,
  badgeIcon = 'sparkles',
  compactTitle = false,
  hideDecorations = false,
  title,
  description,
  imageFile,
  imageAlt,
  actions,
  children,
}: PageHeroProps) {
  const BadgeIcon = { gift: Gift, heart: Heart, sparkles: Sparkles, store: Store }[badgeIcon]

  return (
    <section className={`page-hero${compactTitle ? ' page-hero--compact-title' : ''}${hideDecorations ? ' page-hero--clean' : ''}`} aria-labelledby={id}>
      <div className="page-hero__copy">
        {eyebrow && (
          <span className="page-hero__badge">
            {!hideDecorations && <BadgeIcon size={23} strokeWidth={2.1} aria-hidden="true" />}
            <span>{eyebrow}</span>
          </span>
        )}
        <div className="page-hero__headline">
          {!hideDecorations && <Sparkles className="page-hero__spark page-hero__spark--left" size={31} strokeWidth={2.2} aria-hidden="true" />}
          <h1 className="page-hero__title" id={id}>{title}</h1>
          {!hideDecorations && <Sparkles className="page-hero__spark page-hero__spark--right" size={32} strokeWidth={2.2} aria-hidden="true" />}
          {!hideDecorations && <span className="page-hero__swoosh" aria-hidden="true" />}
        </div>
        <p className="page-hero__description">{description}</p>
        {children && <div className="page-hero__extras">{children}</div>}
        {actions && <div className="page-hero__actions">{actions}</div>}
      </div>
      <div className="page-hero__media">
        <img
          className="page-hero__image"
          src={`${baseUrl}images/${imageFile}`}
          alt={imageAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(event) => {
            // Las imágenes de cada sección se subirán más adelante.
            // Hasta entonces se muestra una imagen existente de la feria.
            event.currentTarget.onerror = null
            event.currentTarget.src = `${baseUrl}images/feria-portada.png`
          }}
        />
      </div>
    </section>
  )
}
