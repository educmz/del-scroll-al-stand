import { ArrowUpRight, Camera, Gem, Handshake, Heart, ShieldCheck, Sparkles, Store, Target, UsersRound, TrendingUp } from 'lucide-react'
import SectionEyebrow from './SectionEyebrow'
import TitleRays from './TitleRays'
import './AboutUsContent.css'

const baseUrl = import.meta.env.BASE_URL

const values = [
  {
    title: 'Apoyo al emprendedor',
    description: 'Acompañamos a las marcas para que puedan mostrar lo que hacen con orgullo.',
    Icon: Handshake,
    tone: 'rose',
  },
  {
    title: 'Comunidad y colaboración',
    description: 'Creemos en los encuentros que generan conexiones y nuevas oportunidades.',
    Icon: UsersRound,
    tone: 'peach',
  },
  {
    title: 'Confianza y seguridad',
    description: 'Cuidamos cada detalle para construir experiencias cercanas y organizadas.',
    Icon: ShieldCheck,
    tone: 'mint',
  },
  {
    title: 'Calidad en la experiencia',
    description: 'Buscamos que cada feria sea especial para marcas y visitantes.',
    Icon: Gem,
    tone: 'gold',
  },
]

type AboutPhotoProps = {
  filename: string
  alt: string
  label: string
  className?: string
}

function AboutPhoto({ filename, alt, label, className = '' }: AboutPhotoProps) {
  return (
    <div className={`about-content-photo ${className}`.trim()}>
      <div className="about-content-photo-placeholder" aria-hidden="true">
        <span className="about-content-placeholder-icon"><Camera size={36} strokeWidth={1.65} /></span>
        <span>{label}</span>
      </div>
      <img
        src={`${baseUrl}images/${filename}`}
        alt={alt}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

function AboutHeading({ eyebrow, title, id, description }: {
  eyebrow: string
  title: string
  id: string
  description?: string
}) {
  return (
    <div className="about-content-section-heading">
      <div className="title-eyebrow-group">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <div className="about-content-heading-row title-eyebrow-heading">
          <TitleRays side="left" />
          <h2 id={id}>{title}</h2>
          <TitleRays side="right" />
        </div>
      </div>
      {description && <p>{description}</p>}
    </div>
  )
}

export default function AboutUsContent() {
  return (
    <div className="about-redesign">
      <section className="about-story" aria-labelledby="about-intro-title">
        <div className="about-story-copy">
          <div className="title-eyebrow-group">
            <SectionEyebrow>NUESTRA HISTORIA</SectionEyebrow>
            <div className="about-content-heading-row about-story-heading title-eyebrow-heading">
              <TitleRays side="left" />
              <h2 id="about-intro-title">¿Quiénes somos?</h2>
              <TitleRays side="right" />
            </div>
          </div>
          <p className="about-story-lead">
            Somos <strong>Del Scroll al Stand</strong>, una iniciativa que ayuda a emprendedores y pequeñas marcas a dar el salto del mundo digital a las ferias presenciales.
          </p>
          <p className="about-story-description">
            Creamos espacios para mostrar productos, compartir experiencias y conectar cara a cara con nuevas personas. Queremos que detrás de cada stand haya una oportunidad de crecer.
          </p>
          <div className="about-story-highlights" aria-label="Lo que nos caracteriza">
            <span><Store size={17} aria-hidden="true" /> Ferias temáticas</span>
            <span><Heart size={17} aria-hidden="true" /> Talento local</span>
            <span><Sparkles size={17} aria-hidden="true" /> Conexiones reales</span>
          </div>
        </div>
        <div className="about-story-visual">
          <AboutPhoto
            filename="sobre-nosotros-historia.png"
            alt="Emprendedores y visitantes compartiendo en una feria de Del Scroll al Stand"
            label="Una fotografía de nuestros emprendedores"
            className="about-story-photo"
          />
          <div className="about-story-photo-note">
            <span className="about-story-note-icon"><Heart size={19} fill="currentColor" aria-hidden="true" /></span>
            <span>De las pantallas a los encuentros</span>
          </div>
        </div>
      </section>

      <section className="about-direction" aria-labelledby="about-direction-title">
        <AboutHeading
          eyebrow="NUESTRO RUMBO"
          title="Lo que nos mueve"
          id="about-direction-title"
          description="Una misma pasión, dos ideas que nos inspiran a seguir conectando emprendimientos con personas."
        />
        <div className="about-direction-grid">
          <article className="about-direction-card about-direction-mission">
            <div className="about-direction-top">
              <span className="about-direction-icon"><Target size={34} strokeWidth={1.9} aria-hidden="true" /></span>
              <span className="about-direction-counter">01</span>
            </div>
            <div className="title-eyebrow-group">
              <SectionEyebrow>LO QUE NOS IMPULSA</SectionEyebrow>
              <h3>Nuestra misión</h3>
            </div>
            <p>Brindar experiencias de feria que potencien la visibilidad, las ventas y el crecimiento de los emprendimientos locales.</p>
            <span className="about-direction-accent" aria-hidden="true" />
          </article>
          <article className="about-direction-card about-direction-vision">
            <div className="about-direction-top">
              <span className="about-direction-icon"><TrendingUp size={34} strokeWidth={1.9} aria-hidden="true" /></span>
              <span className="about-direction-counter">02</span>
            </div>
            <div className="title-eyebrow-group">
              <SectionEyebrow>HACIA DÓNDE VAMOS</SectionEyebrow>
              <h3>Nuestra visión</h3>
            </div>
            <p>Ser una plataforma de ferias temáticas reconocida por conectar emprendimientos con comunidades reales en Lima.</p>
            <span className="about-direction-accent" aria-hidden="true" />
          </article>
        </div>
      </section>

      <section className="about-values-section" aria-labelledby="about-values-title">
        <AboutHeading
          eyebrow="LO QUE NOS DEFINE"
          title="Nuestros valores"
          id="about-values-title"
          description="Principios que se reflejan en la manera en que organizamos y vivimos cada encuentro."
        />
        <div className="about-values-cards">
          {values.map(({ title, description, Icon, tone }) => (
            <article className={`about-value-card about-value-card-${tone}`} key={title}>
              <div className="about-value-card-top">
                <span className="about-value-card-icon"><Icon size={32} strokeWidth={1.85} aria-hidden="true" /></span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-purpose-panel" id="sobre-nosotros-galeria" aria-labelledby="about-purpose-title">
        <div className="about-purpose-visual">
          <AboutPhoto
            filename="sobre-nosotros-proposito.png"
            alt="Experiencia de compra y conexión entre expositores y visitantes de una feria"
            label="Una fotografía que represente nuestra comunidad"
            className="about-purpose-photo"
          />
        </div>
        <div className="about-purpose-body">
          <div className="title-eyebrow-group">
            <SectionEyebrow>LA RAZÓN DE TODO</SectionEyebrow>
            <div className="about-content-heading-row about-purpose-heading title-eyebrow-heading">
              <TitleRays side="left" />
              <h2 id="about-purpose-title">Nuestro <span>propósito</span></h2>
              <TitleRays side="right" />
            </div>
          </div>
          <p>Crear espacios donde las ideas digitales se conviertan en experiencias reales, acercando productos únicos, talento local y una comunidad que valora lo nuestro.</p>
          <a href="#proximas-ferias" className="about-purpose-link">
            Descubre nuestras próximas ferias
            <ArrowUpRight size={19} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  )
}
