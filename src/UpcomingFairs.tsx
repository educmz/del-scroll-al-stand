import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, CalendarDays, MapPin, MessageCircle,
  Gift, Snowflake, Sparkles,
} from 'lucide-react'
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

const questions = [
  {
    question: '¿Cómo puedo participar como expositor?',
    answer: 'Completa el formulario de postulación con los datos de tu emprendimiento, rubro, redes sociales y el plan de stand de tu interés. Nuestro equipo revisará la información y te contactará por WhatsApp Business o correo para confirmar los siguientes pasos.',
  },
  {
    question: '¿Cuáles son los requisitos para participar?',
    answer: 'Debes contar con un emprendimiento o pequeño negocio activo, ofrecer productos o servicios compatibles con la temática de la feria, brindar información básica de tu marca y aceptar las condiciones de participación. También se evaluará que tu propuesta esté alineada con las categorías y el público de cada edición.',
  },
  {
    question: '¿Qué incluye el espacio del stand?',
    answer: 'El servicio incluye el espacio asignado dentro de la feria y, según el plan elegido, puede incluir mesa, sillas, punto de electricidad, señalización de la marca, seguridad, promoción digital y presencia en el catálogo de expositores.',
  },
  {
    question: '¿Cuándo confirman a los expositores seleccionados?',
    answer: 'Después de revisar la postulación, nuestro equipo se comunicará con el emprendimiento para informar si fue seleccionado y confirmar disponibilidad, plan, condiciones y proceso de pago. La confirmación se realizará antes del cierre de inscripciones de cada edición.',
  },
  {
    question: '¿Puedo elegir la ubicación de mi stand?',
    answer: 'La ubicación dependerá de la disponibilidad, el plan seleccionado y la distribución de categorías dentro de la feria. Buscamos organizar los stands de forma equilibrada y evitar una concentración excesiva de negocios con productos muy similares.',
  },
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

function FestiveRays() {
  return (
    <span className="fair-title-rays" aria-hidden="true">
      <i /><i /><i />
    </span>
  )
}

function WhatsAppButton() {
  const phone = (import.meta.env.VITE_APPLICATION_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  const message = 'Hola, quisiera información sobre la Feria Navideña del 12 y 13 de diciembre de 2026 de Del Scroll al Stand.'
  return (
    <a
      className={`fair-whatsapp-btn ${phone ? '' : 'is-unavailable'}`}
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
      <h2 id="fair-gallery-title">Galería de ediciones anteriores <FestiveRays /></h2>
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
      <section className="fair-hero" aria-labelledby="fair-main-title">
        <div className="fair-hero-copy">
          <span className="fair-market-label"><Gift size={19} aria-hidden="true" /> Mercado de Regalos</span>
          <div className="fair-name-wrap">
            <Sparkles className="fair-name-sparkle fair-name-sparkle-left" size={33} aria-hidden="true" />
            <h1 id="fair-main-title"><span>Feria</span><strong>Navideña</strong></h1>
            <Snowflake className="fair-name-snowflake" size={30} aria-hidden="true" />
            <Sparkles className="fair-name-sparkle fair-name-sparkle-right" size={32} aria-hidden="true" />
          </div>
          <p className="fair-hero-message">
            ¡Encuentra el <strong>regalo perfecto</strong> hecho a mano,
            vive la <strong>magia de la Navidad</strong> y apoya a tus talentos locales!
          </p>
          <div className="fair-hero-actions">
            <a className="fair-postulate-btn" href="#planes-postular">Postular a esta feria</a>
            <WhatsAppButton />
          </div>
        </div>
        <div className="fair-hero-media">
          <svg className="fair-hero-blob" viewBox="0 0 660 510" role="img" aria-label="Feria navideña con puestos decorados y emprendedoras">
            <defs>
              <clipPath id="fair-photo-mask">
                <path d="M128 48C175 0 218 12 255 35C304 67 326 85 379 67C432 53 467 45 507 71C542 95 548 145 578 162C610 180 642 164 653 192C668 227 627 276 593 288C560 302 559 315 582 348C598 377 583 416 549 427C501 442 451 400 415 405C367 414 332 456 287 472C230 494 159 486 124 455C79 421 82 375 91 325C102 270 80 230 45 187C3 135 53 81 128 48Z"/>
              </clipPath>
            </defs>
            <image
              href={`${baseUrl}images/feria-navidad-portada.png`}
              x="0"
              y="0"
              width="660"
              height="510"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#fair-photo-mask)"
              onError={(event) => {
                event.currentTarget.setAttribute('href', `${baseUrl}images/feria-portada.png`)
              }}
            />
          </svg>
        </div>
      </section>

      <div className="fair-content">
        <section className="fair-details-grid" aria-labelledby="fair-details-title">
          <div className="fair-details-left">
            <h2 id="fair-details-title" className="fair-serif-heading">Detalles del evento <FestiveRays /></h2>
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
            <h2 className="fair-serif-heading">Ubicación del evento <FestiveRays /></h2>
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

        <section className="fair-categories-faq" aria-label="Categorías y preguntas frecuentes">
          <div className="fair-categories">
            <h2 className="fair-serif-heading">Categorías participantes</h2>
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
          <div className="fair-faq" id="fair-faq">
            <h2 className="fair-serif-heading">Preguntas frecuentes</h2>
            <div className="fair-faq-list">
              {questions.map((item) => (
                <details key={item.question} open>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
