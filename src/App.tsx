import { useState } from 'react'
import { CalendarDays, ChartNoAxesCombined, CirclePlay, Facebook, Heart, Instagram, Menu, MessageCircle, Monitor, Music2, Store, UsersRound, X } from 'lucide-react'
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


const testimonials = [
  {
    name: 'Ana R.',
    handle: '@Anacreativa',
    quote: 'Fue la mejor experiencia para mi marca. Conocí clientes increíbles y mis ventas superaron mis expectativas',
    category: 'Diseño y papelería',
    image: 'testimonio-ana.webp',
  },
  {
    name: 'Diego M.',
    handle: '@saboresdiego',
    quote: 'La organización es espectacular, todo muy claro y el ambiente de la feria es súper bonito y familiar',
    category: 'Gastronomía',
    image: 'testimonio-diego.webp',
  },
  {
    name: 'Lucía P.',
    handle: '@luciamoda',
    quote: 'Me encantó la temática, la difusión y el apoyo del equipo. Definitivamente volveré a participar',
    category: 'Moda',
    image: 'testimonio-lucia.webp',
  },
]

function MarketStandIllustration() {
  return (
    <svg
      className="market-stand-illustration"
      viewBox="0 0 220 210"
      aria-hidden="true"
    >
      <g transform="rotate(-8 112 105)">
        <path d="M28 45 172 45 185 69 39 69Z" fill="#ffbd00" />
        <path d="M41 69 178 69 170 197 53 197Z" fill="#c32854" />
        <path d="M57 75 69 75 80 194 64 194Z" fill="#f64b65" />
        <path d="M95 75 109 75 121 194 103 194Z" fill="#f64b65" />
        <path d="M136 75 148 75 162 194 145 194Z" fill="#f64b65" />
        <path d="M30 45 165 24 188 55 40 70Z" fill="#ffc900" />
        <path d="M38 69 187 53 186 70 39 85Z" fill="#efa100" />
        <path d="M38 85Q49 99 59 84Q69 99 80 82Q92 98 103 80Q114 95 126 77Q137 93 149 75Q162 89 174 71L186 70" fill="#ab2e5b"/>
        <path d="M35 163 184 147 186 166 39 183Z" fill="#ffba00" />
        <rect x="116" y="101" width="23" height="37" rx="2" fill="#bd2953" stroke="#ffbf00" strokeWidth="5"/>
        <path d="M121 107H134M121 114H134M121 122H134" stroke="#ffbf00" strokeWidth="3"/>
        <path d="M55 52l17-2-12 5M89 48l17-2-12 5M128 43l17-2-12 5" stroke="#f39b00" strokeWidth="4" strokeLinecap="round"/>
      </g>
      <g fill="#a62c57">
        <rect x="193" y="163" width="9" height="35" rx="2" />
        <rect x="176" y="162" width="37" height="8" rx="4" transform="rotate(-10 194 166)"/>
        <path d="M187 170 182 207M203 170 209 207" stroke="#a62c57" strokeWidth="5" />
      </g>
    </svg>
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
                    src={`${baseUrl}images/titulo-portada.png`}
                    alt="Del Scroll al Stand"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = `${baseUrl}images/titulo-portada.svg`
                    }}
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

        <section className="testimonials-section" id="testimonios" aria-label="Testimonios de emprendedores">
          <SectionHeading>Lo que dicen nuestros emprendedores</SectionHeading>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <img
                  className="testimonial-photo"
                  src={`${baseUrl}images/${testimonial.image}`}
                  alt={`Retrato de ${testimonial.name}`}
                  width="134"
                  height="134"
                  loading="lazy"
                />
                <div className="testimonial-body">
                  <div className="testimonial-stars" aria-label="5 estrellas">★★★★★</div>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <p className="testimonial-author">{testimonial.name} <span>{testimonial.handle}</span></p>
                  <span className="testimonial-category">{testimonial.category}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="join-banner" aria-labelledby="join-title">
          <MarketStandIllustration />
          <div className="join-copy">
            <h2 id="join-title">¿Listo para llevar tu marca del scroll al stand?</h2>
            <p>Sé parte de nuestras próximas ferias y conecta con más personas en el mundo real.</p>
          </div>
          <a className="join-cta" href="#participar">
            <Store aria-hidden="true" size={26} strokeWidth={1.8} />
            Quiero participar ahora
          </a>
          <svg className="join-rays" viewBox="0 0 58 58" aria-hidden="true">
            <path d="M5 24 31 17M13 38 38 47M31 9 48 4" />
          </svg>
        </section>
      </main>

      <footer className="site-footer" id="sobre-nosotros">
        <svg className="footer-wave" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 24 C220 46 475 48 700 31 S1180 0 1440 24 L1440 48 L0 48 Z" />
        </svg>
        <div className="footer-content">
          <div className="footer-identity">
            <img
              className="footer-logo"
              src={`${baseUrl}images/logo.png`}
              alt="Del Scroll al Stand"
              loading="lazy"
            />
            <p><strong>Ferias temáticas y mercados temporales</strong> para emprendedores locales</p>
          </div>

          <nav className="footer-column" aria-label="Enlaces">
            <h3>Enlaces</h3>
            <a href="#inicio">Inicio</a>
            <span>Próximas ferias</span>
            <a href="#planes">Planes de stand</a>
          </nav>

          <nav className="footer-column footer-for-entrepreneurs" aria-label="Para emprendedores">
            <h3>Para emprendedores</h3>
            <a href="#participar">Cómo participar</a>
            <span>Preguntas frecuentes</span>
            <span>Términos y condiciones</span>
          </nav>

          <nav className="footer-column" aria-label="Sobre nosotros">
            <h3>Sobre nosotros</h3>
            <a href="#sobre-nosotros">Nuestra historia</a>
            <span>Contacto</span>
          </nav>

          <div className="footer-socials">
            <h3>Síguenos</h3>
            <div className="social-icons" aria-label="Redes sociales, pendientes de configurar">
              <span className="social-icon" title="Instagram"><Instagram size={30} strokeWidth={2.5} /></span>
              <span className="social-icon" title="Facebook"><Facebook size={30} fill="currentColor" strokeWidth={1.6}/></span>
              <span className="social-icon" title="TikTok"><Music2 size={30} strokeWidth={3} /></span>
              <span className="social-icon" title="WhatsApp"><MessageCircle size={30} strokeWidth={2.5} /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
