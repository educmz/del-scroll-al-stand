import { Flag, Gem, Handshake, Mountain, ShieldCheck, ShoppingBag, Target, UsersRound } from 'lucide-react'
import TitleRays from './TitleRays'
import './AboutUs.css'

const baseUrl = import.meta.env.BASE_URL

const values = [
  { label: 'Apoyo al emprendedor', Icon: Handshake, tone: 'rose' },
  { label: 'Comunidad y colaboración', Icon: UsersRound, tone: 'gold' },
  { label: 'Confianza y seguridad', Icon: ShieldCheck, tone: 'mint' },
  { label: 'Calidad en la experiencia', Icon: Gem, tone: 'rose' },
]

function Rays({ className = '' }: { className?: string }) {
  return (
    <svg className={`about-rays ${className}`} viewBox="0 0 70 75" aria-hidden="true">
      <path d="M46 6 56 24M17 22 34 38M8 57 30 56" />
    </svg>
  )
}

function FairStandArt() {
  return (
    <svg className="about-stand-art" viewBox="0 0 400 235" aria-hidden="true">
      <defs>
        <linearGradient id="about-awning" x1="0" x2="1" y1="0" y2="0">
          <stop stopColor="#ff786e" />
          <stop offset=".5" stopColor="#ffe6c8" />
          <stop offset="1" stopColor="#ff786e" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="226" rx="186" ry="6" fill="#e8c3a5" opacity=".7" />
      <path d="M49 111 355 111 345 217 60 217Z" fill="#ffd99c" stroke="#361416" strokeWidth="7" strokeLinejoin="round" />
      <path d="M57 109 57 219M347 109 347 219" stroke="#431819" strokeWidth="10" strokeLinecap="round" />
      <path d="M43 103 95 30 310 30 362 103Z" fill="#ff9f92" stroke="#361416" strokeWidth="8" strokeLinejoin="round"/>
      <path d="M101 31 132 31 113 104 67 104Z M164 31 194 31 194 104 151 104Z M226 31 259 31 287 104 238 104Z" fill="#fff6e5"/>
      <path d="M63 105q19 38 46 0 19 38 45 0 18 38 45 0 18 38 45 0 18 38 45 0 19 38 54 0" fill="none" stroke="#361416" strokeWidth="7" strokeLinecap="round"/>
      <rect x="159" y="135" width="84" height="80" rx="6" fill="#fff6e9" stroke="#551e26" strokeWidth="6"/>
      <path d="M174 135q0-25 27-25t27 25" fill="none" stroke="#551e26" strokeWidth="6"/>
      <path d="M201 175c-20-26-38-5 0 19 38-24 20-45 0-19Z" fill="#ff7978" stroke="#551e26" strokeWidth="3"/>
      <g transform="translate(56 179)">
        <rect x="0" y="14" width="73" height="34" fill="#f94c57" stroke="#431819" strokeWidth="4"/>
        <rect x="29" y="14" width="13" height="34" fill="#f9c32e"/>
        <rect x="-4" y="9" width="80" height="12" rx="3" fill="#ffb732" stroke="#431819" strokeWidth="4"/>
        <path d="M35 8C-1 8 14-19 35 8Zm0 0C65-17 71 8 35 8Z" fill="#ffe8a7" stroke="#431819" strokeWidth="3"/>
      </g>
      <g transform="translate(269 172)">
        <rect x="0" y="18" width="69" height="46" fill="#ffc540" stroke="#431819" strokeWidth="4"/>
        <rect x="28" y="18" width="14" height="46" fill="#f65b60"/>
        <rect x="-5" y="13" width="79" height="13" rx="3" fill="#ff9f8b" stroke="#431819" strokeWidth="4"/>
        <path d="M34 13C8-11 4 19 34 13Zm0 0C60-15 68 18 34 13Z" fill="#fff3dc" stroke="#431819" strokeWidth="3"/>
      </g>
      <g fill="#4b9b52" stroke="#21552c" strokeWidth="4">
        <path d="M33 214C9 178 22 154 40 189 30 144 52 143 58 183 61 143 84 158 75 195 98 173 107 193 78 217Z"/>
        <path d="M349 217C322 179 342 158 359 194 352 150 374 146 376 190 387 163 402 184 386 217Z"/>
      </g>
      <path d="M27 125 18 114M377 133l10-15M16 165l-9 8M391 169l8 9" stroke="#f49e16" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  )
}

export default function AboutUs() {
  return (
    <main className="about-page" id="about-page">
      <section className="about-hero" aria-labelledby="about-main-title">
        <div className="about-hero-copy">
          <span className="about-label">Sobre Nosotros</span>
          <div className="about-hero-headline">
            <Rays className="about-hero-rays-left" />
            <h1 id="about-main-title">
              Del Scroll
              <span>al <em>Stand</em></span>
            </h1>
            <Rays className="about-hero-rays-right" />
          </div>
          <p>Conectamos el mundo digital de los emprendedores con ferias reales llenas de oportunidades.</p>
          <span className="about-brushline" aria-hidden="true" />
        </div>
        <div className="about-hero-photo">
          <img
            src={`${baseUrl}images/sobre-nosotros-portada.png`}
            alt="Feria con emprendedores, stands y visitantes"
            loading="eager"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = `${baseUrl}images/feria-portada.png`
            }}
          />
        </div>
      </section>

      <section className="about-intro" aria-labelledby="about-intro-title">
        <div className="about-intro-illustration">
          <FairStandArt />
        </div>
        <div className="about-intro-copy">
          <div className="about-title-with-rays">
            <TitleRays side="left" />
            <h2 id="about-intro-title">¿Quiénes somos?</h2>
            <TitleRays side="right" />
          </div>
          <p>
            Somos <strong>Del Scroll al Stand</strong>, una iniciativa que impulsa a emprendedores
            y pequeñas marcas a llevar sus productos del mundo digital a ferias temáticas
            presenciales, brindándoles espacios organizados, seguros y con alto flujo de personas.
          </p>
        </div>
      </section>

      <section className="about-pillars" aria-label="Misión y visión">
        <article className="about-pillar about-mission">
          <div className="about-pillar-icon"><Target size={92} strokeWidth={2.4} aria-hidden="true" /></div>
          <div>
            <h2><TitleRays side="left" />Nuestra Misión<TitleRays side="right" /></h2>
            <p>Brindar experiencias de feria que potencien la visibilidad, las ventas y el crecimiento de emprendimientos locales.</p>
          </div>
        </article>
        <article className="about-pillar about-vision">
          <div className="about-pillar-icon about-mountain-icon">
            <Flag size={31} strokeWidth={2.3} aria-hidden="true" />
            <Mountain size={100} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div>
            <h2><TitleRays side="left" />Nuestra Visión<TitleRays side="right" /></h2>
            <p>Ser la plataforma de ferias temáticas más reconocida por conectar emprendimientos con comunidades reales, en todo Lima.</p>
          </div>
        </article>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <div className="about-title-with-rays about-values-heading">
          <TitleRays side="left" />
          <h2 id="about-values-title">Nuestros Valores</h2>
          <TitleRays side="right" />
        </div>
        <div className="about-values-grid">
          {values.map(({ label, Icon, tone }) => (
            <div className="about-value" key={label}>
              <div className={`about-value-icon about-value-${tone}`}>
                <Icon aria-hidden="true" size={67} strokeWidth={1.9} />
              </div>
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="about-purpose" id="sobre-nosotros-galeria" aria-labelledby="about-purpose-title">
        <div className="about-purpose-image">
          <img
            src={`${baseUrl}images/sobre-nosotros-proposito.png`}
            alt="Stand de una feria con emprendedores y visitantes"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = `${baseUrl}images/feria-portada.png`
            }}
          />
          <div className="about-purpose-sign">
            <img src={`${baseUrl}images/logo.png`} alt="" loading="lazy" />
          </div>
        </div>
        <div className="about-purpose-copy">
          <ShoppingBag className="about-purpose-bag" size={94} strokeWidth={1.5} aria-hidden="true" />
          <div className="about-purpose-title">
            <TitleRays side="left" />
            <h2 id="about-purpose-title">Nuestro <em>propósito</em></h2>
            <TitleRays side="right" />
          </div>
          <p>Crear espacios donde las ideas digitales se convierten en experiencias reales, acercando productos únicos, talento local y una comunidad que valora lo nuestro.</p>
        </div>
      </section>
    </main>
  )
}
