import { useState } from 'react'
import { CalendarDays, ChartNoAxesCombined, CirclePlay, Heart, Menu, Monitor, Store, UsersRound, X } from 'lucide-react'
import './App.css'

const baseUrl = import.meta.env.BASE_URL

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Próximas ferias', href: '#proximas-ferias' },
  { label: 'Para emprendedores', href: '#emprendedores' },
  { label: 'Planes de stand', href: '#planes' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
]

// Silueta trazada a partir de la referencia; mantiene el mismo perfil en cualquier tamaño.
const feriaBlobPath = `M 401 19
C 447 13, 503 34, 568 70
C 634 106, 680 159, 705 211
C 722 247, 729 289, 727 332
C 723 372, 705 417, 670 454
C 638 491, 600 508, 557 508
C 511 508, 473 487, 426 472
C 376 454, 334 451, 300 464
C 262 478, 218 507, 161 517
C 102 528, 60 517, 36 490
C 9 460, 13 415, 24 368
C 36 321, 49 288, 46 251
C 44 208, 31 171, 36 139
C 40 109, 64 82, 94 77
C 129 68, 174 78, 213 74
C 260 57, 312 21, 401 19 Z`


const benefits = [
  {
    title: 'Más visibilidad',
    description: 'Lleva tu marca del mundo digital a un público real',
    icon: ChartNoAxesCombined,
    tone: 'coral',
  },
  {
    title: 'Más clientes',
    description: 'Conecta, muestra y vende directamente en la feria',
    icon: UsersRound,
    tone: 'mint',
  },
  {
    title: 'Entorno temático',
    description: 'Ferias con temáticas atractivas que generan mayor interés y flujo de personas',
    icon: Store,
    tone: 'gold',
  },
  {
    title: 'Comunidad emprendedora',
    description: 'Forma parte de una red de marcas locales que se apoyan y crecen juntas',
    icon: Heart,
    tone: 'pink',
  },
]

const steps = [
  {
    title: 'Postula',
    description: 'Completa el formulario con tu marca y propuesta',
    icon: Monitor,
  },
  {
    title: 'Te confirmamos',
    description: 'Revisamos tu postulación y te contamos los detalles',
    icon: CalendarDays,
  },
  {
    title: 'Prepara tu stand',
    description: 'Alista tus productos, tu marca y vive la experiencia',
    icon: Store,
  },
  {
    title: '¡Vende en la feria!',
    description: 'Conecta con nuevos clientes y haz crecer tu emprendimiento',
    icon: UsersRound,
  },
]

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="info-section-heading">
      <svg className="heading-rays heading-rays-left" viewBox="0 0 58 58" aria-hidden="true">
        <path d="M47 5 53 23M24 15 40 32M10 43 32 45" />
      </svg>
      <h2>{children}</h2>
      <svg className="heading-rays heading-rays-right" viewBox="0 0 58 58" aria-hidden="true">
        <path d="M47 5 53 23M24 15 40 32M10 43 32 45" />
      </svg>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div id="inicio" className="site">
      <header className="topbar">
        <div className="topbar-content">
          <a href="#inicio" className="brand" aria-label="Del Scroll al Stand — Inicio">
            <img
              src={`${baseUrl}images/logo.png`}
              alt="Del Scroll al Stand"
              className="brand-logo"
              onError={(event) => { event.currentTarget.style.visibility = 'hidden' }}
            />
          </a>

          <nav
            id="mobile-navigation"
            className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Navegación principal"
          >
            {navigation.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${index === 0 ? 'is-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobile-participate"
              href="#participar"
              onClick={() => setMenuOpen(false)}
            >
              <CalendarDays aria-hidden="true" size={19} />
              Quiero participar!
            </a>
          </nav>

          <a className="header-cta" href="#participar">
            <CalendarDays aria-hidden="true" size={20} />
            Quiero participar!
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="hero-copy">
              <div className="headline-art">
                <h1 id="hero-title" className="hero-title">
                  <img
                    className="hero-title-image"
                    src={`${baseUrl}images/titulo-portada.svg`}
                    alt="Del Scroll al Stand"
                  />
                </h1>
              </div>

              <p className="hero-slogan">
                Tu negocio sale del chat y entra
                <span>al mundo real</span>
              </p>

              <p className="hero-description">
                Conectamos marcas locales y emprendedores con ferias
                temáticas y mercados temporales llenos de personas,
                experiencias y ventas reales
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#participar">
                  Participar en una feria
                </a>
                <a className="btn btn-secondary" href="#sobre-nosotros">
                  <CirclePlay aria-hidden="true" size={21} strokeWidth={2.5} />
                  Conoce el proyecto
                </a>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-photo-frame">
                <svg
                  className="hero-photo-svg"
                  viewBox="0 0 738 547"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Feria Del Scroll al Stand con emprendedores y visitantes"
                >
                  <defs>
                    <clipPath id="feria-photo-clip">
                      <path d={feriaBlobPath} />
                    </clipPath>
                  </defs>
                  <g className="hero-photo-depth">
                    <path d={feriaBlobPath} fill="white" />
                    <image
                      href={`${baseUrl}images/feria-portada.png`}
                      x="0"
                      y="0"
                      width="738"
                      height="547"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#feria-photo-clip)"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-and-process" aria-label="Beneficios y participación">
          <SectionHeading>¿Por qué participar con nosotros?</SectionHeading>

          <div className="benefits-grid" id="emprendedores">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <article className="benefit-item" key={benefit.title}>
                  <div className={'benefit-icon benefit-icon-' + benefit.tone}>
                    <Icon
                      size={50}
                      strokeWidth={benefit.tone === 'mint' ? 3 : 2}
                      fill={benefit.tone === 'pink' ? '#ff6870' : 'none'}
                      stroke={benefit.tone === 'pink' ? 'none' : 'currentColor'}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="benefit-text">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="process-heading" id="planes">
            <SectionHeading>¿Cómo funciona?</SectionHeading>
          </div>

          <div className="process-background" id="participar">
            <div className="process-grid">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <article className="process-item" key={step.title}>
                    <div className="process-icon">
                      <Icon size={55} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
