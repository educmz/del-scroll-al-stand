import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, X, Images,
 BookOpen, CalendarDays, ChefHat, Clock3,
  House, Info, Leaf, MapPin, MessageCircle, Palette, Shirt,
  ShoppingBag, Sparkles, Store, Ticket,
} from 'lucide-react'
import PageHero from './PageHero'
import TitleRays from './TitleRays'
import SectionEyebrow from './SectionEyebrow'
import {
  featuredFair, upcomingFairs, pastEditions, fairApplicationHref, fairApplicationStatus, type Fair,
} from './fairCatalog'
import './UpcomingFairs.css'

const baseUrl = import.meta.env.BASE_URL

const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(featuredFair.address)
const mapEmbed = 'https://www.google.com/maps?q=' + encodeURIComponent(featuredFair.address) + '&output=embed'

const categories = [
  { name: 'Gastronomía', Icon: ChefHat },
  { name: 'Artesanía', Icon: Palette },
  { name: 'Moda y accesorios', Icon: ShoppingBag },
  { name: 'Decoración', Icon: House },
  { name: 'Papelería', Icon: BookOpen },
  { name: 'Ropa', Icon: Shirt },
  { name: 'Cosmética', Icon: Sparkles },
  { name: 'Productos sostenibles', Icon: Leaf },
]

function FairHeading({ eyebrow, title, id, description }: {
  eyebrow: string
  title: string
  id: string
  description?: string
}) {
  return (
    <header className="fair-section-heading">
      <div className="title-eyebrow-group">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="fair-serif-heading title-eyebrow-heading" id={id}>
          <TitleRays side="left" />
          <span>{title}</span>
          <TitleRays side="right" />
        </h2>
      </div>
      {description && <p className="fair-section-description">{description}</p>}
    </header>
  )
}

function FairPhoto({ file, alt, className = '' }: {
  file: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={baseUrl + 'images/' + file}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null
        event.currentTarget.src = baseUrl + 'images/feria-portada.png'
      }}
    />
  )
}

function WhatsappContact() {
  const phone = (import.meta.env.VITE_APPLICATION_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  if (!phone) return null
  const message = 'Hola, quisiera más información sobre ' + featuredFair.name + ' de Del Scroll al Stand.'
  return (
    <a
      className="fair-contact-link"
      href={'https://wa.me/' + phone + '?text=' + encodeURIComponent(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" />
      Consultar por WhatsApp
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}

function UpcomingEditionCard({ fair }: { fair: Fair }) {
  return (
    <article className="fair-upcoming-card">
      <FairPhoto file={fair.image} alt={'Imagen promocional de ' + fair.name} className="fair-upcoming-photo" />
      <div className="fair-upcoming-copy">
        <h3>{fair.name}</h3>
        <span className="fair-card-status">{fairApplicationStatus(fair)}</span>
        <p><CalendarDays size={17} aria-hidden="true" />{fair.dates}</p>
        <p><MapPin size={17} aria-hidden="true" />{fair.venue}, {fair.district}</p>
        <a href={fairApplicationHref(fair)} className="fair-text-link">
          Solicitar participación <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

function PreviousEditions() {
  const photos = pastEditions.flatMap((edition) =>
    edition.photos.map((photo) => ({
      ...photo,
      editionName: edition.name,
      dates: edition.dates,
    })),
  )
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (activePhoto === null) return
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActivePhoto(null)
      } else if (event.key === 'ArrowRight') {
        setActivePhoto((current) => current === null ? null : (current + 1) % photos.length)
      } else if (event.key === 'ArrowLeft') {
        setActivePhoto((current) => current === null ? null : (current - 1 + photos.length) % photos.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhoto, photos.length])

  const closeGallery = () => {
    setActivePhoto(null)
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  const hasPhotos = photos.length > 0

  return (
    <section className="fair-history-section" id="ferias-anteriores" aria-labelledby="fair-history-title">
      <FairHeading
        eyebrow="RECUERDOS DE NUESTRAS FERIAS"
        title="Galería de ferias pasadas"
        id="fair-history-title"
        description={hasPhotos
          ? 'Revive algunos momentos de nuestras ediciones anteriores y descubre cómo se viven nuestros encuentros.'
          : 'Este espacio está reservado para las fotografías auténticas de nuestras ediciones anteriores.'}
      />

      {hasPhotos ? (
        <div className="fair-gallery-mosaic">
          {photos.map((photo, index) => (
            <button
              key={photo.editionName + '-' + photo.file}
              type="button"
              className="fair-gallery-item"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget
                setActivePhoto(index)
              }}
              aria-label={'Ampliar fotografía de ' + photo.editionName + ': ' + photo.alt}
            >
              <img src={baseUrl + 'images/' + photo.file} alt={photo.alt} loading="lazy" />
              <span className="fair-gallery-item-caption">
                <strong>{photo.editionName}</strong>
                <span>{photo.dates}</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="fair-gallery-empty">
          <div className="fair-gallery-mosaic fair-gallery-mosaic--preview" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <div className={'fair-gallery-item fair-gallery-item--placeholder fair-gallery-item--placeholder-' + (index + 1)} key={index}>
                <Images size={index === 0 ? 48 : 27} strokeWidth={1.45} />
                {index === 0 && <span>Un espacio para nuestros mejores recuerdos</span>}
              </div>
            ))}
          </div>
          <div className="fair-gallery-empty-copy">
            <span className="fair-gallery-empty-label">GALERÍA EN PREPARACIÓN</span>
            <h3>Pronto compartiremos nuestras mejores fotos</h3>
            <p>Las fotografías de ferias pasadas todavía no están disponibles. Cuando las incorporemos, podrás explorarlas y ampliarlas aquí mismo.</p>
          </div>
        </div>
      )}

      {activePhoto !== null && photos[activePhoto] && (
        <div
          className="fair-lightbox-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery()
          }}
        >
          <div className="fair-lightbox" role="dialog" aria-modal="true" aria-label="Fotografía ampliada de feria pasada">
            <div className="fair-lightbox-toolbar">
              <span>{activePhoto + 1} de {photos.length}</span>
              <button type="button" ref={closeButtonRef} onClick={closeGallery} aria-label="Cerrar galería">
                <X size={23} aria-hidden="true" />
              </button>
            </div>
            <img
              src={baseUrl + 'images/' + photos[activePhoto].file}
              alt={photos[activePhoto].alt}
              className="fair-lightbox-image"
            />
            <div className="fair-lightbox-footer">
              <button type="button" onClick={() => setActivePhoto((activePhoto - 1 + photos.length) % photos.length)} aria-label="Fotografía anterior" disabled={photos.length < 2}>
                <ArrowLeft size={21} aria-hidden="true" />
              </button>
              <div>
                <strong>{photos[activePhoto].editionName}</strong>
                <span>{photos[activePhoto].dates}</span>
              </div>
              <button type="button" onClick={() => setActivePhoto((activePhoto + 1) % photos.length)} aria-label="Siguiente fotografía" disabled={photos.length < 2}>
                <ArrowRight size={21} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default function UpcomingFairs() {
  return (
    <main className="upcoming-fairs-page" id="upcoming-fairs-page">
      <div id="feria-destacada">
        <PageHero
          id="fair-main-title"
          eyebrow="PRÓXIMA FERIA · MERCADO DE REGALOS"
          badgeIcon="gift"
          title={<><span>Feria</span><em>Navideña</em></>}
          description={<>Descubre regalos únicos, apoya el talento local y vive una experiencia navideña llena de emprendimientos.</>}
          imageFile={featuredFair.image}
          imageAlt="Imagen promocional de la Feria Navideña de Del Scroll al Stand"
          actions={
            <>
              <a className="page-hero__button page-hero__button--primary" href={fairApplicationHref(featuredFair)}>
                <Store size={18} aria-hidden="true" />
                Quiero ser expositor
              </a>
              <a className="page-hero__button page-hero__button--secondary" href="#feria-detalles">
                Información para visitantes <ArrowRight size={18} aria-hidden="true" />
              </a>
            </>
          }
        >
          <div className="fair-hero-facts">
            <span><CalendarDays size={17} aria-hidden="true" />{featuredFair.dates}</span>
            <span><MapPin size={17} aria-hidden="true" />{featuredFair.district}</span>
            <span className="fair-hero-status">{fairApplicationStatus(featuredFair)}</span>
          </div>
        </PageHero>
      </div>

      <div className="fair-content">
        <nav className="fair-quick-nav" aria-label="Explorar la página de ferias">
          <a href="#feria-detalles">Información del evento</a>
          <a href="#que-encontraras">Qué encontrarás</a>
          <a href="#proximas-ediciones">Próximas ediciones</a>
          <a href="#ferias-anteriores">Ferias pasadas</a>
        </nav>

        <section className="fair-details-section" id="feria-detalles" aria-labelledby="fair-details-title">
          <FairHeading
            eyebrow="FERIA DESTACADA"
            title="Todo sobre nuestra próxima feria"
            id="fair-details-title"
            description="Planifica tu visita a la Feria Navideña. Actualizaremos los detalles pendientes cuando estén confirmados."
          />
          <div className="fair-details-grid">
            <div className="fair-detail-cards">
              <article className="fair-detail-card">
                <span className="fair-detail-icon fair-detail-icon-rose"><CalendarDays size={26} aria-hidden="true" /></span>
                <div>
                  <h3>Fecha</h3>
                  <p>{featuredFair.dates}</p>
                </div>
              </article>
              <article className="fair-detail-card">
                <span className="fair-detail-icon fair-detail-icon-gold"><MapPin size={27} aria-hidden="true" /></span>
                <div>
                  <h3>Lugar</h3>
                  <p>{featuredFair.venue}</p>
                  <small>{featuredFair.district}</small>
                </div>
              </article>
              <article className="fair-detail-card">
                <span className="fair-detail-icon fair-detail-icon-mint"><Clock3 size={27} aria-hidden="true" /></span>
                <div>
                  <h3>Horario</h3>
                  <p>{featuredFair.schedule || 'Por confirmar'}</p>
                </div>
              </article>
              <article className="fair-detail-card">
                <span className="fair-detail-icon fair-detail-icon-peach"><Ticket size={27} aria-hidden="true" /></span>
                <div>
                  <h3>Ingreso</h3>
                  <p>{featuredFair.access || 'Información por confirmar'}</p>
                </div>
              </article>
            </div>
            <div className="fair-map-card">
              <div className="fair-map-header">
                <div>
                  <strong>Encuéntranos aquí</strong>
                  <span>{featuredFair.venue} · {featuredFair.district}</span>
                </div>
                <MapPin size={22} aria-hidden="true" />
              </div>
              <iframe
                title={'Mapa de ' + featuredFair.venue + ', ' + featuredFair.district}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="fair-map-link">
                Cómo llegar en Google Maps <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="fair-details-note">
            <Info size={18} aria-hidden="true" />
            <p>Los horarios y las condiciones de ingreso aún no están publicados. Consulta esta página antes de asistir.</p>
            <WhatsappContact />
          </div>
        </section>

        <section className="fair-experience-section" id="que-encontraras" aria-labelledby="fair-experience-title">
          <FairHeading
            eyebrow="DESCUBRE TALENTO LOCAL"
            title="¿Qué encontrarás en la feria?"
            id="fair-experience-title"
            description="Estas son las categorías previstas para la edición. Las marcas y los productos participantes se confirmarán más adelante."
          />
          <ul className="fair-categories-grid">
            {categories.map(({ name, Icon }) => (
              <li className="fair-category" key={name}>
                <span className="fair-category-icon"><Icon size={25} strokeWidth={1.9} aria-hidden="true" /></span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="fair-next-section" id="proximas-ediciones" aria-labelledby="fair-next-title">
          <FairHeading
            eyebrow="LO QUE VIENE"
            title="Próximas ediciones"
            id="fair-next-title"
            description="Conoce las siguientes fechas de Del Scroll al Stand y elige el encuentro que mejor vaya contigo."
          />
          {upcomingFairs.length > 0 ? (
            <div className="fair-upcoming-grid">
              {upcomingFairs.map((fair) => <UpcomingEditionCard key={fair.id} fair={fair} />)}
            </div>
          ) : (
            <div className="fair-next-empty">
              <span className="fair-next-icon"><CalendarDays size={32} strokeWidth={1.7} aria-hidden="true" /></span>
              <div>
                <h3>Nuevas fechas por anunciar</h3>
                <p>Estamos preparando próximas ediciones. Por ahora, nuestra siguiente cita es la Feria Navideña 2026.</p>
              </div>
              <a href="#feria-destacada" className="fair-text-link">
                Ver la feria destacada <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          )}
        </section>

        <PreviousEditions />

        <section className="fair-join-section" aria-labelledby="fair-join-title">
          <div className="fair-join-copy">
            <span className="fair-join-overline">PARA EMPRENDEDORES</span>
            <h2 id="fair-join-title">Tu marca puede ser parte del próximo encuentro</h2>
            <p>Cuéntanos sobre tu emprendimiento y solicita participar en la Feria Navideña 2026. Revisaremos tu propuesta y te compartiremos los siguientes pasos.</p>
          </div>
          <div className="fair-join-actions">
            <a className="fair-join-primary" href={fairApplicationHref(featuredFair)}>
              Solicitar participación <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a className="fair-join-secondary" href="#planes">
              Conocer planes y precios <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
