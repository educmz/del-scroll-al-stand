import PageHero from './PageHero'
import AboutUsContent from './AboutUsContent'
import './AboutUs.css'

export default function AboutUs() {
  return (
    <main className="about-page" id="about-page">
      <PageHero
        id="about-main-title"
        eyebrow="Sobre nosotros"
        title={<><span>Del Scroll</span><em>al Stand</em></>}
        description="Conectamos el mundo digital de los emprendedores con ferias reales llenas de oportunidades."
        imageFile="sobre-nosotros-portada.png"
        imageAlt="Feria con emprendedores, stands y visitantes"
        actions={
          <>
            <a className="page-hero__button page-hero__button--primary" href="#proximas-ferias">Conoce las ferias</a>
            <a className="page-hero__button page-hero__button--secondary" href="#planes">Ver planes de stand</a>
          </>
        }
      />

      <AboutUsContent />
    </main>
  )
}
