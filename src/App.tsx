import { useState } from 'react'
import { CalendarDays, CirclePlay, Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import './App.css'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Próximas ferias', href: '#proximas-ferias' },
  { label: 'Para emprendedores', href: '#emprendedores' },
  { label: 'Planes de stand', href: '#planes' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
]

function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Del Scroll al Stand — Inicio">
      <span className="brand-del">Del</span>
      <span className="brand-scroll">Scroll</span>
      <span className="brand-bottom">
        <span className="brand-al">al</span>
        <span className="brand-stand">Stand</span>
      </span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div id="inicio" className="site">
      <header className="topbar">
        <div className="topbar-content">
          <Brand />

          <nav id="mobile-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                className={`nav-link ${index === 0 ? 'is-active' : ''}`}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a className="mobile-participate" href="#participar" onClick={closeMenu}>
              <CalendarDays aria-hidden="true" size={18} />
              Quiero participar!
            </a>
          </nav>

          <a className="header-cta" href="#participar">
            <CalendarDays aria-hidden="true" size={20} strokeWidth={2.2} />
            Quiero participar!
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
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
            </motion.div>

            <motion.div
              className="hero-media"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            >
              <div className="hero-photo-frame">
                <img
                  src="https://images.unsplash.com/photo-1767458478242-325a2cab1c64?auto=format&fit=crop&w=1400&q=85"
                  alt="Personas recorriendo puestos en una feria al aire libre"
                  className="hero-photo"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="information-sections">
          <section id="proximas-ferias" className="info-panel">
            <span className="info-eyebrow">Descubre</span>
            <h2>Próximas ferias</h2>
            <p>Estamos preparando la agenda de nuestros próximos encuentros.</p>
          </section>

          <section id="emprendedores" className="info-panel">
            <span className="info-eyebrow">Conecta</span>
            <h2>Para emprendedores</h2>
            <p>Queremos que más marcas locales pasen del mundo digital a experiencias reales.</p>
          </section>

          <section id="planes" className="info-panel">
            <span className="info-eyebrow">Participa</span>
            <h2>Planes de stand</h2>
            <p>Pronto compartiremos las opciones para formar parte de nuestras ferias.</p>
          </section>

          <section id="sobre-nosotros" className="info-panel">
            <span className="info-eyebrow">Nuestra idea</span>
            <h2>Sobre nosotros</h2>
            <p>Conectamos marcas locales con personas, ferias temáticas y oportunidades de venta.</p>
          </section>

          <section id="participar" className="info-panel info-participate">
            <span className="info-eyebrow">Súmate</span>
            <h2>¿Quieres participar?</h2>
            <p>Estamos preparando la información para inscribirte a nuestras próximas ferias.</p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
