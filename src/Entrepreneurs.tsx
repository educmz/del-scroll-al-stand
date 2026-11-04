import {
  ArrowRight, CalendarDays, ChartNoAxesCombined, ClipboardPenLine,
  Image as ImageIcon, MapPin, Megaphone, Play, ShieldCheck,
  ChartColumnIncreasing, Star, Store, UsersRound, Sparkles,
} from 'lucide-react'
import PageHero from './PageHero'
import TitleRays from './TitleRays'
import SectionEyebrow from './SectionEyebrow'
import './Entrepreneurs.css'

const baseUrl = import.meta.env.BASE_URL

const benefits = [
  {
    title: 'Más visibilidad',
    description: 'Da a conocer tu marca a nuevos clientes.',
    icon: ChartNoAxesCombined,
    tone: 'rose',
  },
  {
    title: 'Más ventas',
    description: 'Incrementa tus oportunidades de venta en un evento de alto flujo.',
    icon: UsersRound,
    tone: 'mint',
  },
  {
    title: 'Evento organizado',
    description: 'Con stands equipados, seguridad y soporte constante.',
    icon: CalendarDays,
    tone: 'gold',
  },
  {
    title: 'Resultados reales',
    description: 'Recibe información y feedback después de la feria.',
    icon: Star,
    tone: 'peach',
  },
]

const offerings = [
  {
    title: 'Espacio de exposición',
    description: 'Stands adecuados y organizados por categorías.',
    icon: Store,
    tone: 'rose',
  },
  {
    title: 'Promoción de tu marca',
    description: 'Difusión antes, durante y después del evento.',
    icon: Megaphone,
    tone: 'gold',
  },
  {
    title: 'Visitantes interesados',
    description: 'Conecta con personas que buscan descubrir productos y regalos.',
    icon: UsersRound,
    tone: 'mint',
  },
  {
    title: 'Seguridad y soporte',
    description: 'Acompañamiento del equipo organizador en todo momento.',
    icon: ShieldCheck,
    tone: 'peach',
  },
  {
    title: 'Reporte de resultados',
    description: 'Información de asistencia, feedback y oportunidades de mejora.',
    icon: ChartColumnIncreasing,
    tone: 'rose',
  },
]

function EntrepreneursHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string
  title: string
  description: string
  id: string
}) {
  return (
    <div className="entre-section-intro">
      <div className="title-eyebrow-group">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <div className="entre-section-title title-eyebrow-heading">
          <TitleRays side="left" />
          <h2 id={id}>{title}</h2>
          <TitleRays side="right" />
        </div>
      </div>
      <p>{description}</p>
    </div>
  )
}

function PromotionalBanner() {
  return (
    <div className="entre-promo-visual">
      <div className="entre-promo-placeholder" aria-hidden="true">
        <span className="entre-promo-placeholder-icon">
          <ImageIcon size={38} strokeWidth={1.6} />
        </span>
        <strong>Feria Navideña</strong>
        <span>Espacio para el banner promocional oficial</span>
      </div>
      <img
        src={`${baseUrl}images/banner-feria-navidad.png`}
        alt="Banner promocional oficial de la Feria Navideña de Del Scroll al Stand"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          // Se mostrará la vista provisional hasta que se suba el PNG.
          event.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

export default function Entrepreneurs() {
  return (
    <main className="entre-page" id="entrepreneurs-page">
      <PageHero
        id="entre-main-title"
        eyebrow="Haz crecer tu marca"
        badgeIcon="store"
        compactTitle
        title={<><span>Para</span><em>Emprendedores</em></>}
        description="Impulsa tu emprendimiento en ferias temáticas que conectan tu marca con más personas."
        imageFile="para-emprendedores-portada.png"
        imageAlt="Emprendedora atendiendo a una visitante en su stand"
        actions={
          <>
            <a href="#planes-postular" className="page-hero__button page-hero__button--primary">
              <ClipboardPenLine size={19} aria-hidden="true" /> Postula tu marca
            </a>
            <a href="#planes" className="page-hero__button page-hero__button--secondary">
              <Play size={19} aria-hidden="true" /> Conoce los planes
            </a>
          </>
        }
      />

      <section className="entre-benefits-section" aria-labelledby="entre-benefits-title">
        <EntrepreneursHeading
          eyebrow="TU SIGUIENTE PASO"
          title="Haz crecer tu marca"
          id="entre-benefits-title"
          description="Lleva tu emprendimiento más allá de las redes y haz que nuevas personas descubran lo que creas."
        />
        <div className="entre-benefits-grid">
          {benefits.map(({ title, description, icon: Icon, tone }, index) => (
            <article className={`entre-benefit entre-tone-${tone}`} key={title}>
              <div className="entre-card-top">
                <span className="entre-card-icon"><Icon size={33} strokeWidth={1.9} aria-hidden="true" /></span>
                <span className="entre-card-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="entre-offerings-section" aria-labelledby="entre-offerings-heading">
        <div className="entre-offerings-content">
          <EntrepreneursHeading
            eyebrow="CRECEMOS CONTIGO"
            title="¿Qué te ofrecemos?"
            id="entre-offerings-heading"
            description="Nos ocupamos de los detalles para que tú puedas concentrarte en mostrar el valor de tu marca."
          />
          <div className="entre-offering-grid">
            {offerings.map(({ title, description, icon: Icon, tone }, index) => (
              <article className={`entre-offering entre-tone-${tone}`} key={title}>
                <div className="entre-offering-top">
                  <span className="entre-card-icon"><Icon size={31} strokeWidth={1.9} aria-hidden="true" /></span>
                  <span className="entre-card-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="entre-event-section" aria-labelledby="entre-event-title">
        <div className="entre-event">
          <div className="entre-event-content">
            <span className="entre-event-eyebrow">
              <Sparkles size={19} aria-hidden="true" /> PRÓXIMA FERIA
            </span>
            <h2 id="entre-event-title">Nos vemos en la <em>Feria Navideña</em></h2>
            <p className="entre-event-intro">
              Una nueva oportunidad para compartir tus productos, conocer clientes y ser parte de nuestra comunidad emprendedora.
            </p>
            <div className="entre-event-details">
              <p><CalendarDays size={21} strokeWidth={2} aria-hidden="true" /><span>12 y 13 de diciembre de 2026</span></p>
              <p><MapPin size={21} strokeWidth={2} aria-hidden="true" /><span>Parque Próceres de la Independencia, Jesús María, Lima</span></p>
            </div>
            <div className="entre-event-actions">
              <a href="#planes-postular" className="entre-event-cta">
                Postula tu marca <ArrowRight size={19} aria-hidden="true" />
              </a>
              <a href="#proximas-ferias" className="entre-event-link">
                Conoce la feria <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <PromotionalBanner />
        </div>
      </section>
    </main>
  )
}
