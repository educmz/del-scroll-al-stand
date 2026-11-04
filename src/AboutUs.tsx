import PageHero from './PageHero'
import AboutUsContent from './AboutUsContent'
import './AboutUs.css'

export default function AboutUs() {
  return (
    <main className="about-page" id="about-page">
      <PageHero
        id="about-main-title"
        compactTitle
        hideDecorations
        showSwoosh
        title={<><span>Nuestra</span><em>historia</em></>}
        description="Creamos encuentros que conectan a los emprendedores con nuevas oportunidades."
        imageFile="sobre-nosotros-portada.png"
        imageAlt="Feria con emprendedores, stands y visitantes"
        actions={
          <>
            <a className="page-hero__button page-hero__button--primary" href="#proximas-ferias">Conoce las ferias</a>
            <a className="page-hero__button page-hero__button--secondary" href="#planes">Ver planes</a>
          </>
        }
      />

      <AboutUsContent />
    </main>
  )
}
