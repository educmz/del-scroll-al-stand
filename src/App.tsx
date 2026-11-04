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
                <svg className="headline-rays rays-left" viewBox="0 0 70 80" aria-hidden="true">
                  <path d="M43 13 58 37M12 45 35 58M6 73 29 71" />
                </svg>
                <h1 id="hero-title" className="hero-title">
                  <span className="title-line-first">Del Scroll</span>
                  <span className="title-line-second">
                    al <span className="title-stand">Stand</span>
                  </span>
                </h1>
                <svg className="headline-rays rays-right" viewBox="0 0 65 80" aria-hidden="true">
                  <path d="M11 39 26 13M27 58 52 44" />
                </svg>
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
                <img
                  src={`${baseUrl}images/feria-portada.png`}
                  alt="Feria Del Scroll al Stand con emprendedores y visitantes"
                  className="hero-photo"
                  loading="eager"
                  fetchPriority="high"
                  onError={(event) => { event.currentTarget.style.visibility = 'hidden' }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
