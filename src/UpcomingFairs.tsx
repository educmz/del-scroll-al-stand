import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, CalendarDays, MapPin, MessageCircle,
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
  { name: 'Gastronomía', emoji: '🥘', tone: 'pink' },
  { name: 'Artesanía', emoji: '🧶', tone: 'green' },
  { name: 'Moda y accesorios', emoji: '👜', tone: 'pink' },
  { name: 'Decoración', emoji: '🏺', tone: 'peach' },
  { name: 'Papelería', emoji: '✏️', tone: 'peach' },
  { name: 'Ropa', emoji: '👕', tone: 'pink' },
  { name: 'Cosmética', emoji: '💄', tone: 'green' },
  { name: 'Productos sostenibles', emoji: '♻️', tone: 'pink' },
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

function Gallery() {
  const [page, setPage] = useState(0)
  const images = Array.from({ length: 4 }, (_, index) => gallery[(page * 2 + index) % gallery.length])
  const changePage = (delta: number) => setPage((current) => (current + delta + 3) % 3)

  return (
    <section className="fair-gallery" aria-labelledby="fair-gallery-title">
      <div className="title-eyebrow-group">
        <SectionEyebrow>RECUERDOS DE NUESTRAS FERIAS</SectionEyebrow>
        <h2 id="fair-gallery-title" className="title-eyebrow-heading"><TitleRays side="left" /><span>Galería de ediciones anteriores</span><TitleRays side="right" /></h2>
      </div>
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
        <section className="fair-details-grid" aria-labelledby="fair-details-title">
          <div className="fair-details-left">
            <div className="title-eyebrow-group">
              <SectionEyebrow>TODO LO QUE NECESITAS SABER</SectionEyebrow>
              <h2 id="fair-details-title" className="fair-serif-heading title-eyebrow-heading"><TitleRays side="left" /><span>Detalles del evento</span><TitleRays side="right" /></h2>
            </div>
            <div className="fair-detail-cards">
              <article className="fair-detail-card">
                <div className="fair-detail-icon"><CalendarDays size={55} strokeWidth={2.1} aria-hidden="true" /></div>
                <div><h3>Fecha</h3><p>12 y 13 de diciembre del 2026</p><em>Sábado y Domingo</em></div>
              </article>
              <article className="fair-detail-card">
                <div className="fair-detail-icon"><MapPin size={61} fill="currentColor" strokeWidth={1.6} aria-hidden="true" /></div>
                <div><h3>Ubicación</h3><p>Parque próceres de la Independencia</p><em>Jesús María, Lima</em></div>
              </article>
            </div>
          </div>
          <div className="fair-map">
            <iframe title="Mapa del Parque Próceres de la Independencia, Jesús María" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a href={mapLink} target="_blank" rel="noopener noreferrer">Abrir ubicación en Google Maps</a>
          </div>
        </section>

        <section className="fair-location-gallery" aria-label="Ubicación y galería">
          <div className="fair-location">
            <div className="title-eyebrow-group">
              <SectionEyebrow>ENCUÉNTRANOS AQUÍ</SectionEyebrow>
              <h2 className="fair-serif-heading title-eyebrow-heading"><TitleRays side="left" /><span>Ubicación del evento</span><TitleRays side="right" /></h2>
            </div>
            <div className="fair-location-photo-wrap">
              <EventImage file="parque-proceres.png" alt="Monumento del Parque Próceres de la Independencia" className="fair-location-photo" />
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="fair-location-tag">
                <MapPin size={28} fill="#d42b37" color="#d42b37" aria-hidden="true" />
                <span>Parque Próceres de la Independencia, Jesús María</span>
              </a>
            </div>
          </div>
          <Gallery />
        </section>

        <section className="fair-categories-section" aria-label="Categorías participantes">
          <div className="fair-categories">
            <div className="title-eyebrow-group">
              <SectionEyebrow>MARCAS QUE HACEN LA DIFERENCIA</SectionEyebrow>
              <h2 className="fair-serif-heading title-eyebrow-heading"><TitleRays side="left" /><span>Categorías participantes</span><TitleRays side="right" /></h2>
            </div>
            <p>Recibimos emprendimientos de diversos rubros navideños y locales</p>
            <div className="fair-categories-grid">
              {categories.map((category) => (
                <div className={`fair-category fair-category-${category.tone}`} key={category.name}>
                  <span className="fair-category-emoji" aria-hidden="true">{category.emoji}</span>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
