import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import AboutUs from './AboutUs'
import StandPlans from './StandPlans'
import Entrepreneurs from './Entrepreneurs'
import UpcomingFairs from './UpcomingFairs'
import { ArrowUpRight, CalendarDays, ChartNoAxesCombined, CirclePlay, Camera, Heart, Menu, MessageCircle, Monitor, Music2, Quote, Store, UsersRound, X } from 'lucide-react'
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(() => window.location.hash)
  const [navPill, setNavPill] = useState<{ left: number; top: number; width: number; height: number } | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const isAbout = currentHash.startsWith('#sobre-nosotros')
  const isPlans = currentHash === '#planes' || currentHash === '#planes-de-stand' || currentHash === '#planes-postular'
  const isEntrepreneurs = currentHash === '#emprendedores'
  const isFairs = currentHash === '#proximas-ferias' || currentHash === '#proximas-ferias-preguntas'
  const activeHref = isAbout ? '#sobre-nosotros' : isPlans ? '#planes' : isEntrepreneurs ? '#emprendedores' : isFairs ? '#proximas-ferias' : '#inicio'

  // La píldora sigue únicamente a la sección seleccionada, no al hover.
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('.nav-link'))
    const updatePill = () => {
      const link = links.find((item) => item.getAttribute('href') === activeHref)
      if (!link || link.offsetWidth === 0 || link.offsetHeight === 0) {
        setNavPill(null)
        return
      }

      const next = {
        left: link.offsetLeft,
        top: link.offsetTop,
        width: link.offsetWidth,
        height: link.offsetHeight,
      }
      setNavPill((previous) =>
        previous &&
        previous.left === next.left &&
        previous.top === next.top &&
        previous.width === next.width &&
        previous.height === next.height
          ? previous
          : next,
      )
    }

    updatePill()
    window.addEventListener('resize', updatePill)
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updatePill) : null
    if (observer) {
      observer.observe(nav)
      links.forEach((link) => observer.observe(link))
    }
    return () => {
      window.removeEventListener('resize', updatePill)
      observer?.disconnect()
    }
  }, [activeHref, menuOpen])

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash)
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (currentHash === '#planes-postular') {
      window.requestAnimationFrame(() => {
        document.getElementById('stand-plans-form')?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    } else if (currentHash === '#proximas-ferias-preguntas') {
      window.requestAnimationFrame(() => {
        document.getElementById('fair-faq')?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    } else if (currentHash === '#sobre-nosotros' || isPlans || isEntrepreneurs || isFairs) {
      window.scrollTo(0, 0)
    }
  }, [currentHash, isPlans, isEntrepreneurs, isFairs])

  return (
    <div id="inicio" className={`site ${isAbout ? 'site-about' : isPlans ? 'site-plans' : isEntrepreneurs ? 'site-entrepreneurs' : isFairs ? 'site-fairs' : ''}`}>
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
            ref={navRef}
            id="mobile-navigation"
            className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Navegación principal"
          >
            {navPill && (
              <span
                className="nav-pill"
                aria-hidden="true"
                style={{
                  width: navPill.width,
                  height: navPill.height,
                  transform: `translate3d(${navPill.left}px, ${navPill.top}px, 0)`,
                }}
              />
            )}
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${item.href === activeHref ? 'is-active' : ''}`}
                aria-current={item.href === activeHref ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobile-participate"
              href={isPlans ? '#planes' : isEntrepreneurs || isFairs ? '#planes-postular' : '#participar'}
              onClick={(event) => {
                setMenuOpen(false)
                if (isPlans) {
                  event.preventDefault()
                  document.getElementById('stand-plans-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              <CalendarDays aria-hidden="true" size={19} />
              Quiero participar
            </a>
          </nav>

          <a
            className="header-cta"
            href={isPlans ? '#planes' : isEntrepreneurs || isFairs ? '#planes-postular' : '#participar'}
            onClick={(event) => {
              if (isPlans) {
                event.preventDefault()
                document.getElementById('stand-plans-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            <CalendarDays aria-hidden="true" size={20} />
            Quiero participar
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

      {isAbout ? (
        <AboutUs />
      ) : isPlans ? (
        <StandPlans />
      ) : isEntrepreneurs ? (
        <Entrepreneurs />
      ) : isFairs ? (
        <UpcomingFairs />
      ) : (
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
          <div className="testimonials-heading">
            <SectionHeading>Lo que dicen nuestros emprendedores</SectionHeading>
            <p className="testimonials-subtitle">Historias que nos inspiran a seguir creciendo juntos.</p>
          </div>
          <div
            className="testimonials-marquee"
            aria-label="Comentarios de emprendedores. El desplazamiento se pausa al pasar el cursor por encima."
          >
            <div className="testimonials-track">
              {[0, 1].map((copyIndex) => (
                <div
                  className="testimonials-set"
                  key={copyIndex}
                  aria-hidden={copyIndex === 1 ? true : undefined}
                >
                  {testimonials.map((testimonial) => (
                    <article
                      className="testimonial-card"
                      key={testimonial.name}
                      tabIndex={copyIndex === 0 ? 0 : -1}
                    >
                      <div className="testimonial-card-top">
                        <div className="testimonial-person">
                          <img
                            className="testimonial-photo"
                            src={`${baseUrl}images/${testimonial.image}`}
                            alt={copyIndex === 0 ? `Retrato de ${testimonial.name}` : ''}
                            width="78"
                            height="78"
                            loading="lazy"
                          />
                          <div className="testimonial-identity">
                            <p className="testimonial-author">{testimonial.name}</p>
                            <span className="testimonial-handle">{testimonial.handle}</span>
                          </div>
                        </div>
                        <Quote className="testimonial-quote-icon" aria-hidden="true" size={30} strokeWidth={1.6} />
                      </div>
                      <div className="testimonial-stars" aria-label="5 estrellas">★★★★★</div>
                      <blockquote>“{testimonial.quote}”</blockquote>
                      <div className="testimonial-card-bottom">
                        <span className="testimonial-category">{testimonial.category}</span>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="join-banner" aria-labelledby="join-title">
          <div className="join-copy">
            <span className="join-kicker">EL PRÓXIMO PASO DE TU MARCA</span>
            <h2 id="join-title">¿Listo para llevar tu marca del scroll al stand?</h2>
            <p>Sé parte de nuestras próximas ferias y conecta con más personas en el mundo real.</p>
          </div>
          <a className="join-cta" href="#participar">
            <Store aria-hidden="true" size={25} strokeWidth={1.9} />
            <span>Quiero participar ahora</span>
            <ArrowUpRight className="join-cta-arrow" aria-hidden="true" size={19} strokeWidth={2.2} />
          </a>
        </section>
      </main>
      )}

      <footer className="site-footer">
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
            <a href="#proximas-ferias">Próximas ferias</a>
            <a href="#planes">Planes de stand</a>
          </nav>

          <div className="footer-column footer-contact" aria-label="Contacto">
            <h3>Contacto</h3>
            <span>+51 000 000 000</span>
            <span>hola@stand.example</span>
            <span className="footer-contact-note">Datos de ejemplo</span>
          </div>

          <nav className="footer-column" aria-label="Sobre nosotros">
            <h3>Sobre nosotros</h3>
            <a href="#sobre-nosotros">Nuestra historia</a>
          </nav>

          <div className="footer-socials">
            <h3>Síguenos</h3>
            <div className="social-icons" aria-label="Redes sociales (enlaces pendientes de configurar)">
              <span className="social-icon" role="img" aria-label="Instagram"><Camera size={29} aria-hidden="true" /></span>
              <span className="social-icon" role="img" aria-label="Facebook"><UsersRound size={27} aria-hidden="true" /></span>
              <span className="social-icon" role="img" aria-label="TikTok"><Music2 size={27} aria-hidden="true" /></span>
              <span className="social-icon" role="img" aria-label="WhatsApp"><MessageCircle size={29} aria-hidden="true" /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
