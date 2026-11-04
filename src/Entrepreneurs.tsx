import {
  ArrowRight, CalendarDays, ChartNoAxesCombined, ClipboardPenLine,
  Heart, MapPin, Megaphone, Play, ShieldCheck, Snowflake,
  SquareChartGantt, Star, Store, UsersRound, Gift, Sparkles,
} from 'lucide-react'
import './Entrepreneurs.css'

const baseUrl = import.meta.env.BASE_URL

const benefits = [
  {
    title: 'Más visibilidad',
    description: 'Da a conocer tu marca a nuevos clientes.',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Más ventas',
    description: 'Incrementa tus oportunidades de venta en un evento de alto flujo.',
    icon: UsersRound,
  },
  {
    title: 'Evento organizado',
    description: 'Con stands equipados, seguridad y soporte constante.',
    icon: CalendarDays,
  },
  {
    title: 'Resultados reales',
    description: 'Recibe información y feedback después de la feria.',
    icon: Star,
  },
]

const offerings = [
  {
    title: 'Espacio de exposición',
    description: 'Stands adecuados y por categorías.',
    icon: Store,
  },
  {
    title: 'Promoción de tu marca',
    description: 'Difusión antes, durante y después del evento.',
    icon: Megaphone,
  },
  {
    title: 'Alto flujo de visitantes',
    description: 'Conecta con un público interesado en compras y regalos.',
    icon: UsersRound,
  },
  {
    title: 'Seguridad y soporte',
    description: 'Acompañamiento del equipo organizador en todo momento.',
    icon: ShieldCheck,
  },
  {
    title: 'Reporte de resultados',
    description: 'Información de asistencia, feedback y oportunidades de mejora.',
    icon: SquareChartGantt,
  },
]

function CelebrationLines() {
  return (
    <span className="entre-rays" aria-hidden="true">
      <i /><i /><i />
    </span>
  )
}

function ChristmasTree() {
  return (
    <svg viewBox="0 0 210 252" className="entre-tree-art" aria-hidden="true">
      <defs>
        <linearGradient id="entre-tree-green" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#74c776" />
          <stop offset="1" stopColor="#07613a" />
        </linearGradient>
      </defs>
      <rect x="93" y="180" width="23" height="49" rx="3" fill="#825137"/>
      <path d="M103 13 121 45 157 99 143 102 180 155 165 167 195 202 171 216 34 216 17 201 47 164 34 159 66 104 54 98 86 44Z" fill="url(#entre-tree-green)" stroke="#135d38" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M67 106q37 24 75 0M46 163q54 31 115 0M29 204q77 35 151-1" fill="none" stroke="#105436" strokeWidth="12" strokeLinecap="round" opacity=".8"/>
      <path d="m103 4 8 18 20 3-15 14 3 20-16-9-17 9 4-20-16-14 20-3Z" fill="#ffce38" stroke="#e79b0b" strokeWidth="4"/>
      {[[74,89,"#f85f72"],[130,94,"#ffbd27"],[55,163,"#ffca35"],[150,154,"#f95c73"],[95,136,"#ff4d58"],[112,194,"#f8c52e"],[48,203,"#f84f63"],[162,201,"#ffdd48"]].map(([x,y,color],i)=>(
        <g key={i}><path d={`M${x} ${Number(y)-13}v9`} stroke="#ffd979" strokeWidth="3"/><circle cx={x} cy={y} r="9" fill={color as string} stroke="#fff2d0" strokeWidth="2"/><ellipse cx={Number(x)-3} cy={Number(y)-3} rx="2" ry="3" fill="white" opacity=".7"/></g>
      ))}
      <g transform="translate(14 196)"><rect x="0" y="15" width="56" height="40" rx="3" fill="#fff0da"/><path d="M24 15v40" stroke="#ef4e60" strokeWidth="10"/><rect x="-3" y="9" width="62" height="12" rx="3" fill="#f34f60"/><path d="M29 10C2 7 12-14 29 10Zm0 0C58-9 57 9 29 10Z" fill="#ffcc3e" stroke="#9b1736" strokeWidth="3"/></g>
      <g transform="translate(132 194)"><rect x="0" y="15" width="60" height="43" rx="3" fill="#ed4b52"/><path d="M28 14v44" stroke="#ffcc37" strokeWidth="11"/><rect x="-4" y="10" width="68" height="13" rx="3" fill="#ffd44e"/><path d="M32 9C6 4 13-13 32 9Zm0 0C56-12 65 4 32 9Z" fill="#a0de8a" stroke="#ffe5af" strokeWidth="3"/></g>
    </svg>
  )
}

function ChristmasStall() {
  return (
    <svg viewBox="0 0 220 255" className="entre-christmas-stall" aria-hidden="true">
      <path d="M28 76 108 15 187 76Z" fill="#ffbd6c" stroke="#66232b" strokeWidth="6"/>
      <path d="M28 76h159v23c-14 22-26 21-40 0-13 21-26 21-39 0-14 21-27 21-40 0-12 21-27 21-40 0Z" fill="#ff6b70" stroke="#67262b" strokeWidth="6"/>
      <path d="M47 76 73 40 90 76v27q-18 25-43-4ZM107 76V18l23 24v34 27q-12 25-23 0ZM148 76l27-20 12 20v23q-16 24-39 0Z" fill="#fff5e0"/>
      <path d="M35 103v105M178 103v105M33 198h150" stroke="#fff1d6" strokeWidth="8"/>
      <path d="M37 144Q105 173 176 144" fill="none" stroke="#2d623c" strokeWidth="5"/>
      {[[49,153],[81,160],[112,163],[145,156],[171,148]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="6.5" fill={i%2===0?"#ffd12f":"#ff6869"}/><circle cx={x-2} cy={y-2} r="2" fill="white"/></g>)}
      <g transform="translate(34 188)"><rect x="0" y="10" width="50" height="49" fill="#fcf0d9"/><path d="M20 10v49" stroke="#ff5b62" strokeWidth="10"/><rect x="-3" y="6" width="57" height="13" rx="2" fill="#ff606c"/></g>
      <g transform="translate(139 194)"><rect x="0" y="9" width="50" height="41" fill="#f65059"/><path d="M23 9v41" stroke="#ffcd38" strokeWidth="8"/><rect x="-3" y="4" width="56" height="13" rx="2" fill="#ffd13a"/></g>
      <g transform="translate(104 181)"><circle r="22" fill="none" stroke="#2f8d54" strokeWidth="12"/><circle cx="-13" cy="-12" r="4.5" fill="#ffcd37"/><circle cx="17" cy="6" r="5" fill="#fd5663"/><path d="M-4-23Q-19-40-26-22Q-20-9-4-23Zm4 0Q19-42 26-23Q21-9 0-23Z" fill="#ff5c65"/></g>
    </svg>
  )
}

function StringLights({ className = '' }: {className?: string}) {
  return (
    <svg viewBox="0 0 220 66" className={`entre-light-string ${className}`} aria-hidden="true">
      <path d="M-10 6Q100 71 233 4" fill="none" stroke="#254b2d" strokeWidth="3.4"/>
      {[[20,22],[51,37],[82,44],[113,45],[144,38],[177,26],[204,14]].map(([x,y],i)=><g key={i}><path d={`M${x} ${y-7}v8`} stroke="#274c36" strokeWidth="3"/><ellipse cx={x} cy={y+5} rx="5.7" ry="8" fill={i%3===0?"#f7f15e":i%2===0?"#88c85f":"#ffd342"}/><ellipse cx={x} cy={y+6} rx="10" ry="12" fill={i%2===0?"#ffe28a":"#fff4b2"} opacity=".18"/></g>)}
    </svg>
  )
}

export default function Entrepreneurs() {
  return (
    <main className="entre-page" id="entrepreneurs-page">
      <section className="entre-hero" aria-labelledby="entre-main-title">
        <div className="entre-hero-content">
          <div className="entre-hero-title">
            <div className="entre-brand-title">
              <CelebrationLines />
              <h1 id="entre-main-title">Para <Store className="entre-title-stand" size={74} aria-hidden="true" /><span>Emprendedores</span></h1>
              <CelebrationLines />
            </div>
            <p>Impulsa tu emprendimiento en ferias temáticas que conectan tu marca con más personas.</p>
            <div className="entre-hero-actions">
              <a href="#planes-postular" className="entre-button entre-button-yellow"><ClipboardPenLine size={23} aria-hidden="true"/> Postula tu Marca</a>
              <a href="#planes" className="entre-button entre-button-outline"><Play size={23} aria-hidden="true"/> Conoce los Planes</a>
            </div>
            <Snowflake className="entre-hero-snowflake" size={28} aria-hidden="true"/>
          </div>
          <div className="entre-hero-visual">
            <img
              src={`${baseUrl}images/para-emprendedores-portada.png`}
              alt="Emprendedora atendiendo a una visitante en un stand de feria navideña"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = `${baseUrl}images/feria-portada.png`
              }}
            />
          </div>
        </div>
      </section>

      <section className="entre-benefits" aria-label="Beneficios para emprendedores">
        {benefits.map(({ title, description, icon: Icon }) => (
          <article key={title} className="entre-benefit">
            <span className="entre-benefit-icon"><Icon size={46} strokeWidth={1.9} aria-hidden="true" /></span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="entre-offerings" aria-labelledby="entre-offerings-heading">
        <div className="entre-section-heading">
          <CelebrationLines />
          <h2 id="entre-offerings-heading">¿Qué te ofrecemos?</h2>
          <CelebrationLines />
        </div>
        <div className="entre-offering-grid">
          {offerings.map(({ title, description, icon: Icon }) => (
            <article className="entre-offering" key={title}>
              <Icon size={55} strokeWidth={1.8} aria-hidden="true"/>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="entre-event-section" aria-labelledby="entre-event-title">
        <div className="entre-event">
          <StringLights className="entre-lights-left"/>
          <StringLights className="entre-lights-right"/>
          <div className="entre-event-decor entre-event-decor-left"><ChristmasTree /></div>
          <div className="entre-event-content">
            <span className="entre-event-eyebrow">Próxima Feria:</span>
            <h2 id="entre-event-title">Feria <em>Navideña</em></h2>
            <p className="entre-event-detail"><CalendarDays size={23} strokeWidth={2.6} aria-hidden="true"/><strong>12 y 13 de diciembre de 2026</strong></p>
            <p className="entre-event-detail entre-event-place"><MapPin size={26} fill="#bd1433" aria-hidden="true"/><span>Parque Próceres de la Independencia<br/>Jesús María, Lima</span></p>
            <a href="#planes-postular" className="entre-event-cta">Postula Ahora <ArrowRight size={25} aria-hidden="true"/></a>
          </div>
          <div className="entre-event-decor entre-event-decor-right"><ChristmasStall /></div>
          <Snowflake className="entre-event-snowflake snowflake-one" size={25} aria-hidden="true"/>
          <Snowflake className="entre-event-snowflake snowflake-two" size={25} aria-hidden="true"/>
          <Sparkles className="entre-event-sparkle" size={28} aria-hidden="true"/>
        </div>
      </section>
    </main>
  )
}
