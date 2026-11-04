import { ChevronDown } from 'lucide-react'
import './HomeFAQ.css'

const questions = [
  {
    question: '¿Cómo puedo participar como expositor?',
    answer: 'Completa el formulario de postulación con los datos de tu emprendimiento, rubro, redes sociales y el plan de stand de tu interés. Nuestro equipo revisará la información y te contactará por WhatsApp Business o correo para confirmar los siguientes pasos.',
  },
  {
    question: '¿Cuáles son los requisitos para participar?',
    answer: 'Debes contar con un emprendimiento o pequeño negocio activo, ofrecer productos o servicios compatibles con la temática de la feria, brindar información básica de tu marca y aceptar las condiciones de participación. También se evaluará que tu propuesta esté alineada con las categorías y el público de cada edición.',
  },
  {
    question: '¿Qué incluye el espacio del stand?',
    answer: 'El servicio incluye el espacio asignado dentro de la feria y, según el plan elegido, puede incluir mesa, sillas, punto de electricidad, señalización de la marca, seguridad, promoción digital y presencia en el catálogo de expositores.',
  },
  {
    question: '¿Cuándo confirman a los expositores seleccionados?',
    answer: 'Después de revisar la postulación, nuestro equipo se comunicará con el emprendimiento para informar si fue seleccionado y confirmar disponibilidad, plan, condiciones y proceso de pago. La confirmación se realizará antes del cierre de inscripciones de cada edición.',
  },
  {
    question: '¿Puedo elegir la ubicación de mi stand?',
    answer: 'La ubicación dependerá de la disponibilidad, el plan seleccionado y la distribución de categorías dentro de la feria. Buscamos organizar los stands de forma equilibrada y evitar una concentración excesiva de negocios con productos muy similares.',
  },
]

export default function HomeFAQ() {
  return (
    <div className="home-faq-list">
      {questions.map(({ question, answer }, index) => (
        <details className="home-faq-item" key={question} open={index === 0}>
          <summary>
            <span className="home-faq-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="home-faq-question">{question}</span>
            <span className="home-faq-toggle" aria-hidden="true">
              <ChevronDown size={22} strokeWidth={2.1} />
            </span>
          </summary>
          <div className="home-faq-answer">
            <p>{answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
