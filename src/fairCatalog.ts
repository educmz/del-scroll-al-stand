/**
 * Catálogo de ferias de Del Scroll al Stand.
 *
 * Añade aquí las nuevas ediciones únicamente cuando sus datos estén confirmados.
 * Las fotos de ediciones anteriores deben ser fotografías reales del evento.
 * Evita incluir fechas, horarios, precios o convocatorias no verificadas.
 */
export type Fair = {
  id: string
  name: string
  dates: string
  venue: string
  district: string
  address: string
  image: string
  schedule?: string
  access?: string
  applicationsOpen?: boolean
}

export type PastEdition = {
  id: string
  name: string
  dates: string
  photos: { file: string; alt: string }[]
}

export const featuredFair: Fair = {
  id: 'feria-navidena-2026',
  name: 'Feria Navideña 2026',
  dates: '12 y 13 de diciembre de 2026',
  venue: 'Parque Próceres de la Independencia',
  district: 'Jesús María, Lima',
  address: 'Parque Próceres de la Independencia, Jesús María, Lima, Perú',
  image: 'feria-navidad-banner.png',
  // Completar cuando la organización confirme la información:
  // schedule: '...'
  // access: '...'
  // applicationsOpen: true
}

/** Otras ferias confirmadas, posteriores a la edición destacada. */
export const upcomingFairs: Fair[] = []

/** Ediciones efectivamente realizadas y con fotografías auténticas. */
export const pastEditions: PastEdition[] = []

export function getFairById(id: string | null): Fair | undefined {
  if (!id) return undefined
  return [featuredFair, ...upcomingFairs].find((fair) => fair.id === id)
}

/** No asumir que aceptar solicitudes de interés implica convocatoria abierta. */
export function fairApplicationStatus(fair: Fair): string {
  if (fair.applicationsOpen === true) return 'Convocatoria abierta'
  if (fair.applicationsOpen === false) return 'Convocatoria cerrada'
  return 'Convocatoria por confirmar'
}

export function fairApplicationHref(fair: Fair): string {
  return `?feria=${encodeURIComponent(fair.id)}#planes-postular`
}
