import type { ReactNode } from 'react'
import './PageHero.css'

const baseUrl = import.meta.env.BASE_URL

type PageHeroProps = {
  id: string
  eyebrow: string
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
  title,
  description,
  imageFile,
  imageAlt,
  actions,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby={id}>
      <div className="page-hero__copy">
        <span className="page-hero__eyebrow">{eyebrow}</span>
        <h1 className="page-hero__title" id={id}>{title}</h1>
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
