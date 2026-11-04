import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import {
  BadgeCheck, Check, ChevronDown, ChevronRight, ClipboardList,
  Megaphone, MessageCircle,
  Send, ShieldCheck, Store, Table2, UsersRound, Zap,
} from 'lucide-react'
import PageHero from './PageHero'
import TitleRays from './TitleRays'
import SectionEyebrow from './SectionEyebrow'
import './StandPlans.css'

const baseUrl = import.meta.env.BASE_URL

type PlanId = 'basico' | 'plus' | 'premium'

const plans: {
  id: PlanId
  name: string
  tagline: string
  price: number
  features: string[]
  photo: string
}[] = [
  {
    id: 'basico',
    name: 'Stand Básico',
    tagline: 'Ideal para emprendedores que se inician en ferias.',
    price: 149,
    features: ['Espacio en feria', 'Mesas y silla', 'Difusión en redes'],
    photo: 'stand-basico.png',
  },
  {
    id: 'plus',
    name: 'Stand Plus',
    tagline: 'Más visibilidad y presencia para tu marca.',
    price: 249,
    features: ['Espacio preferente', 'Mesas, sillas y señalética básica', 'Electricidad incluida', 'Difusión destacada en redes'],
    photo: 'stand-plus.png',
  },
  {
    id: 'premium',
    name: 'Stand Premium',
    tagline: 'Máxima exposición y una experiencia completa.',
    price: 399,
    features: ['Ubicación principal (alto tráfico)', 'Mobiliario y señalética personalizada', 'Electricidad incluida', 'Difusión top en redes y web', 'Asesoría de montaje'],
    photo: 'stand-premium.png',
  },
]

const comparisonRows = [
  { feature: 'Espacio en feria (stand)', values: ['✓', '✓', '✓'] },
  { feature: 'Ubicación preferente', values: ['—', '✓', '✓'] },
  { feature: 'Mesas y sillas', values: ['✓', '✓', '✓'] },
  { feature: 'Señalética básica (nombre del emprendimiento)', values: ['—', '✓', '✓ Personalizada'] },
  { feature: 'Electricidad (punto de energía)', values: ['—', '✓', '✓'] },
  { feature: 'Difusión en redes sociales', values: ['✓ Básica', '✓ Destacada', '✓ Top + web'] },
  { feature: 'Asesoría de montaje', values: ['—', '—', '✓'] },
]

const services = [
  { title: 'Mobiliario', text: 'Mesas, sillas y opciones de exhibición.', icon: Table2, tone: 'sun' },
  { title: 'Electricidad', text: 'Punto de energía seguro y habilitado.', icon: Zap, tone: 'sun' },
  { title: 'Seguridad', text: 'Feria organizada, con control y asistencia.', icon: ShieldCheck, tone: 'mint' },
  { title: 'Difusión', text: 'Promoción en nuestras redes y canales oficiales.', icon: Megaphone, tone: 'rose' },
]

const applicationSteps = [
  { title: 'Completa tu postulación', detail: 'Cuéntanos sobre tu emprendimiento.', icon: ClipboardList },
  { title: 'Revisión y selección', detail: 'Evaluamos tu propuesta según nuestros criterios.', icon: UsersRound },
  { title: 'Confirmación', detail: 'Te contactamos con los siguientes pasos y el plan asignado.', icon: MessageCircle },
]

function Heading({ children, eyebrow, id, description }: {
  children: string
  eyebrow: string
  id?: string
  description?: string
}) {
  return (
    <div className="plans-heading-block">
      <div className="title-eyebrow-group">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <div className="plans-section-heading title-eyebrow-heading">
          <TitleRays side="left" />
          <h2 id={id}>{children}</h2>
          <TitleRays side="right" />
        </div>
      </div>
      {description && <p className="plans-heading-description">{description}</p>}
    </div>
  )
}

function StandPhoto({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return (
    <img
      className={className}
      src={`${baseUrl}images/${file}`}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null
        event.currentTarget.src = `${baseUrl}images/feria-portada.png`
      }}
    />
  )
}

function JumpToForm({ children, className = '', plan }: { children: ReactNode; className?: string; plan?: PlanId }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (plan) {
          window.dispatchEvent(new CustomEvent<PlanId>('stand-plan-choice', { detail: plan }))
        }
        document.getElementById('stand-plans-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
    >
      {children}
    </button>
  )
}

function ApplicationForm() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | ''>('')
  const [feedback, setFeedback] = useState('')
  const [application, setApplication] = useState({
    business: '',
    fullName: '',
    whatsapp: '',
    email: '',
    description: '',
  })
  const contactNumber = (import.meta.env.VITE_APPLICATION_WHATSAPP_NUMBER || '').replace(/\D/g, '')

  useEffect(() => {
    const onPlanChoice = (event: Event) => {
      setSelectedPlan((event as CustomEvent<PlanId>).detail)
      setFeedback('')
    }
    window.addEventListener('stand-plan-choice', onPlanChoice)
    return () => window.removeEventListener('stand-plan-choice', onPlanChoice)
  }, [])

  const choosePlan = (plan: PlanId | '') => {
    setSelectedPlan(plan)
    setFeedback('')
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const planName = plans.find((plan) => plan.id === selectedPlan)?.name || 'Por definir'
    const message = [
      'Hola, quiero postular a Del Scroll al Stand.',
      `Emprendimiento: ${application.business}`,
      `Nombre: ${application.fullName}`,
      `WhatsApp: ${application.whatsapp}`,
      `Correo: ${application.email}`,
      `Propuesta: ${application.description}`,
      `Plan de interés: ${planName}`,
    ].join('\n')

    if (!contactNumber) {
      setFeedback('El canal de recepción aún no está configurado. Tu postulación no ha sido enviada. Puedes copiar los datos para compartirlos manualmente.')
      window.navigator.clipboard?.writeText(message).then(
        () => setFeedback('Datos copiados. El canal de recepción aún no está configurado: tu postulación no ha sido enviada.'),
        () => setFeedback('El canal de recepción aún no está configurado. Tu postulación no ha sido enviada.')
      )
      return
    }

    const whatsappWindow = window.open(`https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setFeedback(whatsappWindow
      ? 'Se abrió WhatsApp con tus datos. Debes pulsar Enviar allí para completar la postulación.'
      : 'Si WhatsApp no se abrió, comprueba que tu navegador permita ventanas emergentes. Tu postulación aún no se ha enviado.')
  }

  return (
    <form id="stand-plans-form" className="plans-application-form" onSubmit={onSubmit}>
      <div className="title-eyebrow-group plans-application-heading">
        <SectionEyebrow>CUÉNTANOS SOBRE TU MARCA</SectionEyebrow>
        <h3>Formulario de Postulación</h3>
      </div>
      <label>
        <span className="plans-field-label">Nombre del emprendimiento <b aria-hidden="true">*</b></span>
        <input value={application.business} onChange={(event) => setApplication({ ...application, business: event.target.value })} required maxLength={100} placeholder="Nombre de tu marca" />
      </label>
      <label>
        <span className="plans-field-label">Tu nombre completo <b aria-hidden="true">*</b></span>
        <input value={application.fullName} onChange={(event) => setApplication({ ...application, fullName: event.target.value })} required maxLength={120} placeholder="Nombres y apellidos" autoComplete="name" />
      </label>
      <div className="plans-input-grid">
        <label>
          <span className="plans-field-label">WhatsApp <b aria-hidden="true">*</b></span>
          <input value={application.whatsapp} onChange={(event) => setApplication({ ...application, whatsapp: event.target.value })} required type="tel" inputMode="tel" pattern="[+0-9 ()-]{7,20}" placeholder="+51 987 654 321" autoComplete="tel" />
        </label>
        <label>
          <span className="plans-field-label">Correo electrónico <b aria-hidden="true">*</b></span>
          <input value={application.email} onChange={(event) => setApplication({ ...application, email: event.target.value })} required type="email" placeholder="tuemail@ejemplo.com" autoComplete="email" />
        </label>
      </div>
      <label>
        <span className="plans-field-label">Cuéntanos sobre tu emprendimiento <b aria-hidden="true">*</b></span>
        <textarea value={application.description} onChange={(event) => setApplication({ ...application, description: event.target.value })} rows={3} maxLength={1000} required placeholder="¿Qué productos o servicios ofreces? ¿Cuál es tu propuesta de valor?" />
      </label>
      <label>
        Plan de stand de interés
        <span className="plans-select-wrap">
          <select
            value={selectedPlan}
            onChange={(event) => choosePlan(event.target.value as PlanId | '')}
          >
            <option value="">Selecciona un plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>{plan.name} — S/ {plan.price}</option>
            ))}
          </select>
          <ChevronDown size={17} aria-hidden="true" />
        </span>
      </label>
      <button type="submit" className="plans-submit"><Send size={17} aria-hidden="true" /> Enviar postulación</button>
      {feedback && <p className="plans-form-feedback" role="status">{feedback}</p>}
    </form>
  )
}

export default function StandPlans() {
  return (
    <main className="stand-plans-page" id="stand-plans-page">
      <PageHero
        id="plans-main-title"
        eyebrow="Elige tu espacio"
        badgeIcon="sparkles"
        title={<><span>Planes de</span><em>Stand</em></>}
        description="Elige el plan ideal para tu emprendimiento y lleva tu marca a nuestras ferias."
        imageFile="planes-portada.png"
        imageAlt="Emprendedora en su stand de feria"
        actions={
          <>
            <JumpToForm className="page-hero__button page-hero__button--primary">Postula tu marca</JumpToForm>
            <button
              type="button"
              className="page-hero__button page-hero__button--secondary"
              onClick={() => document.getElementById('plans-comparison-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Comparar planes
            </button>
          </>
        }
      >
        <ul className="page-hero__highlights">
          <li>Más visibilidad en ferias con alto flujo.</li>
          <li>Conecta con nuevos clientes y aliados.</li>
          <li>Impulsa tus ventas en un entorno real.</li>
        </ul>
      </PageHero>

      <section className="plans-catalog" aria-labelledby="plans-catalog-title">
        <Heading
          eyebrow="ELIGE TU ESPACIO IDEAL"
          id="plans-catalog-title"
          description="Tres opciones pensadas para que tu marca crezca y se conecte con nuevos clientes."
        >Conoce nuestros planes</Heading>
        <div className="plans-card-grid">
          {plans.map((plan) => (
            <article className={`plans-card plans-card-${plan.id}`} key={plan.id}>
              {plan.id === 'plus' && <span className="plans-most-popular"><BadgeCheck size={15} aria-hidden="true" /> Más elegido</span>}
              <header className="plans-card-header">
                <span className="plans-card-icon"><Store size={38} strokeWidth={1.9} aria-hidden="true" /></span>
                <div><h3>{plan.name}</h3><p>{plan.tagline}</p></div>
              </header>
              <div className="plans-card-content">
                <StandPhoto file={plan.photo} alt={`Ejemplo visual de ${plan.name}`} className="plans-card-photo" />
                <ul>
                  {plan.features.map((feature) => <li key={feature}><Check size={17} strokeWidth={3} aria-hidden="true" />{feature}</li>)}
                </ul>
              </div>
              <JumpToForm className="plans-price" plan={plan.id}>S/ {plan.price} <span>por feria</span></JumpToForm>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-compare" aria-labelledby="plans-comparison-title">
        <div className="plans-compare-intro">
          <div className="title-eyebrow-group">
            <SectionEyebrow>ENCUENTRA TU MEJOR OPCIÓN</SectionEyebrow>
            <div className="plans-accent-heading title-eyebrow-heading">
              <TitleRays side="left" />
              <h2 id="plans-comparison-title">Comparativa<br />de planes</h2>
              <TitleRays side="right" />
            </div>
          </div>
          <p>Elige fácilmente el plan que mejor se adapte a tus objetivos.</p>
        </div>
        <div className="plans-table-scroll">
          <table className="plans-table">
            <thead><tr><th scope="col">¿Qué incluye?</th><th scope="col">Básico</th><th scope="col">Plus</th><th scope="col">Premium</th></tr></thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {row.values.map((value, index) => (
                    <td key={index} className={value === '—' ? 'plans-no' : 'plans-yes'}>
                      {value.startsWith('✓') ? <><Check size={17} strokeWidth={3} aria-hidden="true" />{value.slice(1).trim() && <span>{value.slice(1).trim()}</span>}</> : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="plans-services" aria-labelledby="plans-services-title">
        <div className="plans-services-heading-block">
          <div className="title-eyebrow-group">
            <SectionEyebrow>TODO PARA HACERTE BRILLAR</SectionEyebrow>
            <div className="plans-accent-heading title-eyebrow-heading">
              <TitleRays side="left" />
              <h2 id="plans-services-title">Servicios que<br />potencian tu stand</h2>
              <TitleRays side="right" />
            </div>
          </div>
        </div>
        <div className="plans-services-grid">
          {services.map(({ title, text, icon: Icon, tone }) => (
            <article className="plans-service" key={title}>
              <span className={`plans-service-icon tone-${tone}`}><Icon size={31} strokeWidth={1.8} aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-application" aria-labelledby="plans-apply-title">
        <header className="plans-apply-heading">
          <div className="title-eyebrow-group">
            <SectionEyebrow>EL PRIMER PASO ES AQUÍ</SectionEyebrow>
            <div className="plans-accent-heading title-eyebrow-heading">
              <TitleRays side="left" />
              <h2 id="plans-apply-title">Postula como expositor</h2>
              <TitleRays side="right" />
            </div>
          </div>
          <p className="plans-apply-intro">Es muy fácil. Completa el formulario y nuestro equipo revisará tu propuesta.</p>
        </header>
        <div className="plans-apply-layout">
          <div className="plans-apply-info">
            <ol className="plans-apply-steps">
              {applicationSteps.map(({ title, detail, icon: Icon }, index) => (
                <li key={title}>
                  <span className="plans-step-icon"><Icon size={28} strokeWidth={2} aria-hidden="true" /></span>
                  <span className="plans-step-number">{index + 1}</span>
                  <div><h3>{title}</h3><p>{detail}</p></div>
                  {index !== 2 && <ChevronRight className="plans-step-arrow" size={20} aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <aside className="plans-apply-right">
              <div className="plans-selection-card">
                <BadgeCheck size={44} strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <div className="title-eyebrow-group">
                    <SectionEyebrow>SELECCIÓN DE MARCAS</SectionEyebrow>
                    <h3>¿Cómo elegimos a los expositores?</h3>
                  </div>
                  <p>Buscamos emprendimientos auténticos, con productos o servicios de calidad, propuestas de valor claras y alineados con el espíritu de nuestras ferias: diversidad, creatividad, comunidad y experiencia positiva para los visitantes.</p>
                  <ul>
                    <li><Check size={15} /> Originalidad y calidad de la propuesta.</li>
                    <li><Check size={15} /> Alineación con la temática de la feria.</li>
                    <li><Check size={15} /> Variedad para ofrecer una experiencia diversa.</li>
                    <li><Check size={15} /> Compromiso y buena disposición para la feria.</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
          <ApplicationForm />
        </div>
      </section>

    </main>
  )
}
