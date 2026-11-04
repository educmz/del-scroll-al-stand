import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Camera,
  Clock3, Copy, Gift, Image as ImageIcon, Info,
  MapPin, Megaphone, MessageCircle, Share2,
  ShoppingBag, Store, Ticket,
} from 'lucide-react'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'
import PageHero from './PageHero'
import TitleRays from './TitleRays'
import SectionEyebrow from './SectionEyebrow'
import {
  featuredFair, upcomingFairs, pastEditions, samplePastEditions,
  fairApplicationHref, fairApplicationStatus, getPastEditionById,
  type Fair, type PastEdition,
} from './fairCatalog'
import './UpcomingFairs.css'

const baseUrl = import.meta.env.BASE_URL

const productCategories = [
  'Gastronomía', 'Artesanía', 'Moda y accesorios', 'Decoración',
  'Papelería', 'Cosmética', 'Regalos personalizados', 'Productos sostenibles',
]

const socialContent = [
  {
    channel: 'Instagram',
    icon: FaInstagram,
    label: 'Post para Instagram',
    description: 'Texto sugerido para el feed y las historias.',
    copy: 'La Navidad se vive mejor apoyando marcas locales. 🎁 Descubre productos únicos en la Feria Navideña 2026 de Del Scroll al Stand. 📍 Parque Próceres de la Independencia, Jesús María. 📅 12 y 13 de diciembre de 2026. ¡Nos vemos ahí! #DelScrollAlStand #FeriaNavideña #EmprendedoresLima',
    image: 'feria-navidad-banner.png',
  },
  {
    channel: 'Facebook',
    icon: FaFacebookF,
    label: 'Invitación para Facebook',
    description: 'Comparte los datos principales con tu comunidad.',
    copy: '¡Una feria para descubrir emprendimientos y encontrar regalos con historia! Ven a la Feria Navideña 2026 de Del Scroll al Stand. Sábado 12 y domingo 13 de diciembre, en el Parque Próceres de la Independencia, Jesús María, Lima. Horarios e ingreso sujetos a confirmación. #CompraLocal',
    image: 'feria-portada.png',
  },
  {
    channel: 'TikTok',
    icon: FaTiktok,
    label: 'Idea para video corto',
    description: 'Guion de muestra para una publicación en video.',
    copy: 'Guion sugerido: Empieza mostrando productos navideños y emprendedores. Texto en pantalla: “Del scroll al stand: encuentra el regalo perfecto”. Cierra con: “Feria Navideña 2026 · 12 y 13 de diciembre · Parque Próceres, Jesús María”. Añadir imágenes propias antes de publicar.',
    image: null,
  },
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
      className={className}
      src={baseUrl + 'images/' + file}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null
        event.currentTarget.src = baseUrl + 'images/feria-portada.png'
      }}
    />
  )
}

function WhatsappContact({ fair }: { fair: Fair }) {
  const phone = (import.meta.env.VITE_APPLICATION_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  if (!phone) return null
  const message = 'Hola, quisiera información sobre ' + fair.name + ' de Del Scroll al Stand.'
  return (
    <a
      className="fair-contact-link"
      href={'https://wa.me/' + phone + '?text=' + encodeURIComponent(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" /> Consultar por WhatsApp
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}

function FairDetails({ fair }: { fair: Fair }) {
  const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(fair.address)
  const mapEmbed = 'https://www.google.com/maps?q=' + encodeURIComponent(fair.address) + '&output=embed'

  return (
    <div className="fair-information">
      <div className="fair-details-grid">
        <div className="fair-detail-cards">
          <article className="fair-detail-card">
            <span className="fair-detail-icon fair-detail-icon-rose"><CalendarDays size={26} aria-hidden="true" /></span>
            <div><h3>Fecha</h3><p>{fair.dates}</p></div>
          </article>
          <article className="fair-detail-card">
            <span className="fair-detail-icon fair-detail-icon-gold"><MapPin size={26} aria-hidden="true" /></span>
            <div><h3>Dirección</h3><p>{fair.venue}</p><small>{fair.district}</small></div>
          </article>
          <article className="fair-detail-card">
            <span className="fair-detail-icon fair-detail-icon-mint"><Clock3 size={26} aria-hidden="true" /></span>
            <div>
              <h3>Horario</h3>
              <p>{fair.schedule || 'Por confirmar'}</p>
              {fair.scheduleIsExample && <small>Propuesta · por confirmar</small>}
            </div>
          </article>
          <article className="fair-detail-card">
            <span className="fair-detail-icon fair-detail-icon-peach"><Ticket size={26} aria-hidden="true" /></span>
            <div>
              <h3>Ingreso</h3>
              <p>{fair.access || 'Por confirmar'}</p>
              {fair.accessIsExample && <small>Propuesta · por confirmar</small>}
            </div>
          </article>
        </div>
        <div className="fair-map-card">
          <div className="fair-map-header">
            <div><strong>Ubicación de la feria</strong><span>{fair.venue} · {fair.district}</span></div>
            <MapPin size={22} aria-hidden="true" />
          </div>
          <iframe
            title={'Google Maps: ' + fair.venue + ', ' + fair.district}
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="fair-map-link" href={mapLink} target="_blank" rel="noopener noreferrer">
            Ver ruta en Google Maps <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="fair-details-note">
        <Info size={18} aria-hidden="true" />
        <p>El horario de 11:00 a. m. a 9:00 p. m. y el ingreso libre son <strong>datos de ejemplo</strong> para completar el diseño, pendientes de confirmación oficial. Comprueba las condiciones antes de asistir.</p>
        <WhatsappContact fair={fair} />
      </div>
    </div>
  )
}

function AdditionalPhotos({ fair }: { fair: Fair }) {
  const photos = fair.photos || []
  return (
    <div className="fair-subsection fair-photo-section" id="feria-fotos">
      <div className="fair-subsection-heading">
        <div><span className="fair-mini-label">UNA EXPERIENCIA PARA RECORDAR</span><h3>Conoce el ambiente de la feria</h3></div>
        <p>Imágenes referenciales y espacios para publicar más fotografías de la edición.</p>
      </div>
      <div className="fair-photos-grid">
        {photos.map((photo, index) => (
          <figure className={'fair-photo-tile fair-photo-tile-' + index} key={photo.title}>
            {photo.file ? (
              <FairPhoto file={photo.file} alt={photo.alt} className="fair-photo-image" />
            ) : (
              <div className="fair-photo-placeholder">
                <Camera size={33} strokeWidth={1.5} aria-hidden="true" />
                <span>{photo.note || 'Fotografía pendiente'}</span>
              </div>
            )}
            <figcaption><strong>{photo.title}</strong><small>{photo.note || 'Imagen del evento'}</small></figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function GuestBrands({ fair }: { fair: Fair }) {
  const brands = fair.invitedBrands || []
  return (
    <div className="fair-subsection fair-brands-section" id="que-encontraras">
      <div className="fair-subsection-heading">
        <div><span className="fair-mini-label">TALENTO LOCAL</span><h3>Marcas invitadas a la feria</h3></div>
        <p>Descubre las marcas y emprendimientos que formarán parte de esta edición.</p>
      </div>
      <div className="fair-brands-grid">
        {brands.length ? brands.map((brand) => (
          <article className="fair-brand-card" key={brand.name}>
            <div className="fair-brand-avatar">{brand.logo
              ? <FairPhoto file={brand.logo} alt={'Logo de ' + brand.name} className="fair-brand-logo" />
              : <ShoppingBag size={29} aria-hidden="true" />}</div>
            <h4>{brand.name}</h4>
            <p>{brand.category}</p>
            {brand.website && <a href={brand.website} target="_blank" rel="noopener noreferrer">Conocer marca <ArrowUpRight size={14} aria-hidden="true" /></a>}
          </article>
        )) : Array.from({ length: 4 }, (_, index) => (
          <article className="fair-brand-card fair-brand-card--pending" key={index}>
            <div className="fair-brand-avatar"><ShoppingBag size={29} strokeWidth={1.7} aria-hidden="true" /></div>
            <h4>Marca invitada {String(index + 1).padStart(2, '0')}</h4>
            <p>Por anunciar</p>
          </article>
        ))}
      </div>
      {!brands.length && (
        <p className="fair-brands-note"><Info size={16} aria-hidden="true" /> Las marcas mostradas son espacios reservados, no confirmaciones de participación.</p>
      )}
      <div className="fair-category-strip" aria-label="Rubros previstos para la feria">
        {productCategories.map((category) => <span key={category}>{category}</span>)}
      </div>
    </div>
  )
}

function SocialPromotions() {
  const [feedback, setFeedback] = useState('')

  async function copyText(text: string, channel: string) {
    try {
      await navigator.clipboard.writeText(text)
      setFeedback('Texto de ' + channel + ' copiado. Revísalo antes de publicarlo.')
    } catch {
      setFeedback('No se pudo copiar automáticamente. Puedes seleccionar el texto de la tarjeta.')
    }
  }

  async function shareFair() {
    const url = window.location.origin + window.location.pathname + '#proximas-ferias'
    const title = featuredFair.name
    const text = 'Descubre la Feria Navideña de Del Scroll al Stand: 12 y 13 de diciembre en Jesús María.'
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        // Si el usuario cancela, no mostrar un error engañoso.
        return
      }
    }
    await copyText(url, 'la feria')
  }

  return (
    <div className="fair-subsection fair-social-section" id="feria-redes">
      <div className="fair-subsection-heading">
        <div><span className="fair-mini-label">HAZ QUE LA NOTICIA CORRA</span><h3>Promoción para redes sociales</h3></div>
        <p>Ideas de publicaciones listas para adaptar y compartir. Son propuestas, no publicaciones realizadas.</p>
      </div>
      <div className="fair-social-grid">
        {socialContent.map(({ channel, icon: Icon, label, description, copy, image }) => (
          <article className="fair-social-card" key={channel}>
            <div className="fair-social-art">
              {image ? <FairPhoto file={image} alt={'Creatividad visual de muestra para ' + channel} className="fair-social-image" /> :
                <div className="fair-social-video-placeholder"><Gift size={36} aria-hidden="true" /><span>Tu video de feria</span></div>}
              <span className="fair-social-tag"><Icon size={16} aria-hidden="true" />{channel}</span>
            </div>
            <div className="fair-social-content">
              <h4>{label}</h4>
              <p className="fair-social-subtitle">{description}</p>
              <p className="fair-social-caption">{copy}</p>
              <button type="button" onClick={() => { void copyText(copy, channel) }}>
                <Copy size={16} aria-hidden="true" /> Copiar contenido
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="fair-social-share">
        <Megaphone size={20} aria-hidden="true" />
        <p>¿Quieres invitar a más personas a esta feria? Comparte el enlace de la página.</p>
        <button type="button" onClick={() => { void shareFair() }}><Share2 size={17} aria-hidden="true" /> Compartir feria</button>
      </div>
      <p className="fair-social-feedback" role="status" aria-live="polite">{feedback}</p>
    </div>
  )
}

function UpcomingEditionCard({ fair }: { fair: Fair }) {
  return (
    <article className="fair-upcoming-card">
      <FairPhoto file={fair.image} alt={'Imagen promocional de ' + fair.name} className="fair-upcoming-photo" />
      <div className="fair-upcoming-copy">
        <span className="fair-card-status">{fairApplicationStatus(fair)}</span>
        <h3>{fair.name}</h3>
        <p><CalendarDays size={17} aria-hidden="true" />{fair.dates}</p>
        <p><MapPin size={17} aria-hidden="true" />{fair.venue}, {fair.district}</p>
        <a href={fairApplicationHref(fair)} className="fair-text-link">
          Solicitar participación <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

function PastEditionCard({ edition, index }: { edition: PastEdition; index: number }) {
  return (
    <article className={'fair-past-card fair-past-card--' + (index % 4)}>
      <a href={'#feria/' + encodeURIComponent(edition.id)} className="fair-past-card-link" aria-label={'Ver detalles de ' + edition.name}>
        <div className="fair-past-cover">
          {edition.cover ? <FairPhoto file={edition.cover} alt={'Portada de ' + edition.name} className="fair-past-photo" />
            : <div className="fair-past-art"><Store size={46} strokeWidth={1.5} aria-hidden="true" /><span>Del Scroll al Stand</span></div>}
          {edition.isSample && <span className="fair-past-demo-pill">Ejemplo de diseño</span>}
        </div>
        <div className="fair-past-copy">
          <span className="fair-past-category">{edition.isSample ? 'FICHA DEMOSTRATIVA' : 'EDICIÓN ANTERIOR'}</span>
          <h3>{edition.name}</h3>
          <p>{edition.dates}</p>
          <span className="fair-past-open">Conocer esta feria <ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
      </a>
    </article>
  )
}

function PastEditions() {
  const editions = pastEditions.length ? pastEditions : samplePastEditions
  const isSampleCatalog = pastEditions.length === 0

  return (
    <section className="fair-history-section" id="ferias-anteriores" aria-labelledby="fair-history-title">
      <FairHeading
        eyebrow="NUESTRA HISTORIA"
        title="Galería de ferias pasadas"
        id="fair-history-title"
        description="Cada feria tiene su propia historia. Explora las ediciones anteriores y descubre sus fotografías y detalles."
      />
      {isSampleCatalog && (
        <div className="fair-history-notice">
          <Info size={19} aria-hidden="true" />
          <p><strong>Vista de ejemplo:</strong> todavía no hay ediciones pasadas registradas. Las tarjetas muestran cómo funcionarán las fichas; no representan ferias realizadas.</p>
        </div>
      )}
      <div className="fair-past-grid">
        {editions.map((edition, index) => <PastEditionCard edition={edition} index={index} key={edition.id} />)}
      </div>
    </section>
  )
}

function PastEditionDetail({ id }: { id: string }) {
  const edition = getPastEditionById(id)
  if (!edition) {
    return (
      <main className="upcoming-fairs-page fair-detail-view">
        <div className="fair-detail-page-content">
          <a className="fair-back-link" href="#ferias-anteriores"><ArrowLeft size={18} aria-hidden="true" /> Volver a ferias pasadas</a>
          <h1>Esta edición no está disponible</h1>
          <p>Quizá el enlace cambió. Puedes volver al catálogo de ferias anteriores.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="upcoming-fairs-page fair-detail-view">
      <div className="fair-detail-page-content">
        <a href="#ferias-anteriores" className="fair-back-link"><ArrowLeft size={18} aria-hidden="true" /> Volver a ferias pasadas</a>
        <div className="fair-detail-page-hero">
          <div>
            <span className="fair-mini-label">{edition.isSample ? 'FICHA DEMOSTRATIVA · NO ES UN EVENTO REAL' : 'EDICIÓN ANTERIOR'}</span>
            <h1>{edition.name}</h1>
            <p>{edition.description}</p>
            <div className="fair-detail-page-facts">
              <span><CalendarDays size={19} aria-hidden="true" />{edition.dates}</span>
              <span><MapPin size={19} aria-hidden="true" />{edition.venue} · {edition.district}</span>
            </div>
          </div>
          <div className="fair-detail-page-art">
            {edition.cover ? <FairPhoto file={edition.cover} alt={'Portada de ' + edition.name} className="fair-detail-page-cover" /> :
              <><Store size={72} strokeWidth={1.3} aria-hidden="true" /><span>{edition.isSample ? 'Vista de muestra' : 'Imagen por publicar'}</span></>}
          </div>
        </div>
        <section className="fair-detail-page-gallery" aria-labelledby="fair-past-photo-title">
          <h2 id="fair-past-photo-title">Momentos de esta feria</h2>
          {edition.photos.length ? (
            <div className="fair-detail-page-photos">
              {edition.photos.map((photo) => (
                <figure key={photo.file}>
                  <FairPhoto file={photo.file} alt={photo.alt} />
                  <figcaption>{photo.alt}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="fair-detail-page-no-photos">
              <ImageIcon size={30} aria-hidden="true" />
              <p>{edition.isSample
                ? 'Así se mostrarán las fotografías, historias y recuerdos cuando se registre una edición real.'
                : 'Las fotografías de esta edición se publicarán próximamente.'}</p>
            </div>
          )}
        </section>
        <a href="#ferias-anteriores" className="fair-back-bottom">Explorar otras ferias <ArrowRight size={19} aria-hidden="true" /></a>
      </div>
    </main>
  )
}

export default function UpcomingFairs({ selectedEditionId = null }: { selectedEditionId?: string | null }) {
  if (selectedEditionId !== null) return <PastEditionDetail id={selectedEditionId} />

  return (
    <main className="upcoming-fairs-page" id="upcoming-fairs-page">
      <div id="feria-destacada">
        <PageHero
          id="fair-main-title"
          compactTitle
          hideDecorations
          showSwoosh
          title={<><span>Vive nuestras</span><em>ferias</em></>}
          description="Descubre marcas locales, nuevas experiencias y los próximos encuentros de nuestra comunidad."
          imageFile="feria-portada.png"
          imageAlt="Ambiente de una feria de emprendimientos con stands y visitantes"
          actions={
            <>
              <a className="page-hero__button page-hero__button--primary" href="#feria-detalles">
                Ver próxima feria
              </a>
              <a className="page-hero__button page-hero__button--secondary" href="#planes-postular">
                Quiero participar
              </a>
            </>
          }
        />
      </div>

      <div className="fair-content">
        <nav className="fair-quick-nav" aria-label="Explorar ferias">
          <a href="#feria-detalles">Feria Navideña 2026</a>
          <a href="#proximas-ediciones">Próximas ferias</a>
          <a href="#ferias-anteriores">Ferias pasadas</a>
        </nav>

        <section className="fair-featured-section" id="feria-detalles" aria-labelledby="fair-details-title">
          <FairHeading
            eyebrow="NUESTRA PRÓXIMA EDICIÓN"
            title="Todo sobre la Feria Navideña"
            id="fair-details-title"
            description="Fecha, horario, ubicación, marcas invitadas y contenido para compartir esta experiencia."
          />
          <figure className="fair-featured-banner">
            <FairPhoto
              file={featuredFair.image}
              alt="Banner promocional de la Feria Navideña 2026, Mercado de Regalos"
              className="fair-featured-banner-image"
            />
            <figcaption>
              <span>Feria Navideña 2026</span>
              <strong>{featuredFair.dates} · {featuredFair.district}</strong>
              <span className="fair-featured-status">{fairApplicationStatus(featuredFair)}</span>
            </figcaption>
          </figure>
          <FairDetails fair={featuredFair} />
          <AdditionalPhotos fair={featuredFair} />
          <GuestBrands fair={featuredFair} />
          <SocialPromotions />
        </section>

        <section className="fair-next-section" id="proximas-ediciones" aria-labelledby="fair-next-title">
          <FairHeading
            eyebrow="LO QUE VIENE"
            title="Próximas ferias"
            id="fair-next-title"
            description="Las próximas ediciones de Del Scroll al Stand se anunciarán aquí con todos sus detalles."
          />
          {upcomingFairs.length ? (
            <div className="fair-upcoming-grid">
              {upcomingFairs.map((fair) => <UpcomingEditionCard key={fair.id} fair={fair} />)}
            </div>
          ) : (
            <div className="fair-next-empty">
              <span className="fair-next-icon"><CalendarDays size={32} strokeWidth={1.7} aria-hidden="true" /></span>
              <div>
                <h3>Nuevas fechas por anunciar</h3>
                <p>Estamos preparando las siguientes ediciones. Por ahora, la próxima cita anunciada es la Feria Navideña 2026.</p>
              </div>
              <a href="#feria-detalles" className="fair-text-link">Ver feria destacada <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          )}
        </section>

        <PastEditions />
      </div>
    </main>
  )
}
