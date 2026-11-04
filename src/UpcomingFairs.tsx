import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChefHat, House, Leaf,
  MapPin, MessageCircle, Palette, Shirt, ShoppingBag, Sparkles,
} from 'lucide-react'
import PageHero from './PageHero'
import TitleRays from './TitleRays'
import SectionEyebrow from './SectionEyebrow'
import './UpcomingFairs.css'

const baseUrl = import.meta.env.BASE_URL
const eventAddress = 'Parque Próceres de la Independencia, Jesús María, Lima'
const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(eventAddress)
const mapEmbed = 'https://www.google.com/maps?q=' + encodeURIComponent(eventAddress) + '&output=embed'

const gallery = [
  { file: 'feria-galeria-1.png', caption: 'Puestos iluminados y visitantes de la feria' },
  { file: 'feria-galeria-2.png', caption: 'Emprendedores mostrando sus productos' },
  { file: 'feria-galeria-3.png', caption: 'Ambiente festivo y gastronomía local' },
  { file: 'feria-galeria-4.png', caption: 'Compras y regalos en la feria' },
  { file: 'feria-galeria-5.png', caption: 'Decoraciones navideñas y stands temáticos' },
  { file: 'feria-galeria-6.png', caption: 'Encuentro entre marcas y visitantes' },
]

const categories = [
  { name: 'Gastronomía', icon: ChefHat, tone: 'rose' },
  { name: 'Artesanía', icon: Palette, tone: 'mint' },
  { name: 'Moda y accesorios', icon: ShoppingBag, tone: 'gold' },
  { name: 'Decoración', icon: House, tone: 'rose' },
  { name: 'Papelería', icon: BookOpen, tone: 'gold' },
  { name: 'Ropa', icon: Shirt, tone: 'mint' },
  { name: 'Cosmética', icon: Sparkles, tone: 'rose' },
  { name: 'Productos sostenibles', icon: Leaf, tone: 'mint' },
]

function EventImage({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return (
    <img
      className={className}
      src={`${baseUrl}images/${file}`}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null
        event.currentTarget.src = `${baseUrl}images/feria-portada.png`
      }}
    />
  )
}

function WhatsAppButton() {
  const phone = (import.meta.env.VITE_APPLICATION_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  const message = 'Hola, quisiera información sobre la Feria Navideña del 12 y 13 de diciembre de 2026 de Del Scroll al Stand.'
  return (
    <a
      className={`fair-whatsapp-btn page-hero__button page-hero__button--secondary ${phone ? '' : 'is-unavailable'}`}
      href={phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : undefined}
      target={phone ? '_blank' : undefined}
      rel={phone ? 'noopener noreferrer' : undefined}
      aria-disabled={!phone}
      title={phone ? 'Abrir conversación de WhatsApp' : 'WhatsApp estará disponible cuando se configure el número de contacto'}
      onClick={(event) => { if (!phone) event.preventDefault() }}
    >
      <MessageCircle size={21} strokeWidth={2.2} aria-hidden="true" />
      Hablar por WhatsApp
    </a>
  )
}


function FairSectionHeading({ eyebrow, title, id, description }: {
  eyebrow: string
  title: string
  id: string
  description?: string
}) {
  return (
    <header className="fair-section-heading">
      <div className="title-eyebrow-group">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 id={id} className="fair-serif-heading title-eyebrow-heading">
          <TitleRays side="left" />
          <span>{title}</span>
          <TitleRays side="right" />
        </h2>
      </div>
      {description && <p className="fair-section-description">{description}</p>}
    </header>
  )
}

function Gallery() {
  const [page, setPage] = useState(0)
  const images = Array.from({ length: 4 }, (_, index) => gallery[(page * 2 + index) % gallery.length])
  const changePage = (delta: number) => setPage((current) => (current + delta + 3) % 3)

  return (
    <section className="fair-gallery" aria-labelledby="fair-gallery-title">
      <FairSectionHeading
        eyebrow="RECUERDOS DE NUESTRAS FERIAS"
        title="Galería de ediciones anteriores"
        id="fair-gallery-title"
      />
      <div className="fair-gallery-frame">
        <button className="fair-gallery-arrow fair-gallery-prev" type="button" aria-label="Ver fotografías anteriores" onClick={() => changePage(-1)}>
          <ArrowLeft size={26} strokeWidth={3} />
        </button>
        <div className="fair-gallery-images">
          {images.map((image) => (
            <EventImage
              key={image.file}
              file={image.file}
              alt={image.caption}
              className="fair-gallery-photo"
            />
          ))}
        </div>
        <button className="fair-gallery-arrow fair-gallery-next" type="button" aria-label="Ver las siguientes fotografías" onClick={() => changePage(1)}>
          <ArrowRight size={26} strokeWidth={3} />
        </button>
      </div>
      <div className="fair-gallery-dots" aria-label="Seleccionar grupo de fotografías">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => setPage(dot)}
            className={dot === page ? 'is-active' : ''}
            aria-label={`Mostrar grupo de fotos ${dot + 1}`}
            aria-current={dot === page ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  )
}

export default function UpcomingFairs() {
  return (
    <main className="upcoming-fairs-page" id="upcoming-fairs-page">
      <PageHero
        id="fair-main-title"
        eyebrow="Mercado de Regalos"
        badgeIcon="gift"
        title={<><span>Feria</span><em>Navideña</em></>}
        description={<>¡Encuentra el <strong>regalo perfecto</strong> hecho a mano, vive la magia de la Navidad y apoya a tus talentos locales!</>}
        imageFile="feria-navidad-portada.png"
        imageAlt="Feria navideña con puestos y visitantes"
        actions={
          <>
            <a className="page-hero__button page-hero__button--primary" href="#planes-postular">Postular a esta feria</a>
            <WhatsAppButton />
          </>
        }
      />

      <div className="fair-content">
        <section className="fair-details-section" aria-labelledby="fair-details-title">
          <FairSectionHeading
            eyebrow="TODO LO QUE NECESITAS SABER"
            title="Detalles del evento"
            id="fair-details-title"
            description="Conoce cuándo nos reuniremos y dónde encontrarás esta edición del Mercado de Regalos."
          />
          <div className="fair-details-grid">
            <div className="fair-detail-cards">
              <article className="fair-detail-card">
                <span className="fair-detail-icon fair-detail-icon-date"><CalendarDays size={32} strokeWidth={1.9} aria-hidden="true" /></span>
                <div className="fair-detail-copy">
                  <h3>Fecha</h3>
                  <p>12 y 13 de diciembre de 2026</p>
                  <span>Sábado y domingo</span>
                </div>
              </article>
              <article className="fair-detail-card">
                <span className="fair-detail-icon fair-detail-icon-location"><MapPin size={33} strokeWidth={1.9} aria-hidden="true" /></span>
                <div className="fair-detail-copy">
                  <h3>Ubicación</h3>
                  <p>Parque Próceres de la Independencia</p>
                  <span>Jesús María, Lima</span>
                </div>
              </article>
            </div>
            <div className="fair-map">
              <iframe
                title="Mapa del Parque Próceres de la Independencia, Jesús María"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href={mapLink} target="_blank" rel="noopener noreferrer">
                <MapPin size={16} aria-hidden="true" />
                Ver ubicación en Google Maps
              </a>
            </div>
          </div>
        </section>

        <section className="fair-location-gallery" aria-label="Lugar y recuerdos de nuestras ferias">
          <div className="fair-location">
            <FairSectionHeading
              eyebrow="ENCUÉNTRANOS AQUÍ"
              title="Ubicación del evento"
              id="fair-location-title"
            />
            <div className="fair-location-photo-wrap">
              <EventImage
                file="parque-proceres.png"
                alt="Parque Próceres de la Independencia, sede de la feria"
                className="fair-location-photo"
              />
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="fair-location-tag">
                <MapPin size={19} strokeWidth={2} aria-hidden="true" />
                <span>Parque Próceres de la Independencia, Jesús María</span>
              </a>
            </div>
          </div>
          <Gallery />
        </section>

        <section className="fair-categories-section" aria-labelledby="fair-categories-title">
          <FairSectionHeading
            eyebrow="MARCAS QUE HACEN LA DIFERENCIA"
            title="Categorías participantes"
            id="fair-categories-title"
            description="Descubre la variedad de emprendimientos que forman parte de nuestras ferias."
          />
          <div className="fair-categories-grid">
            {categories.map(({ name, icon: Icon, tone }) => (
              <article className={'fair-category fair-category-' + tone} key={name}>
                <span className="fair-category-icon"><Icon size={29} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
