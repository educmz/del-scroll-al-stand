import { useState } from 'react'
import { CalendarDays, CirclePlay, Menu, X } from 'lucide-react'
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
      </main>
    </div>
  )
}

export default App
