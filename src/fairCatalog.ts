/**
 * Datos públicos de Ferias. Los campos "example" son propuestas de diseño:
 * NO se deben tratar como horarios, accesos o eventos confirmados.
 * Reemplazar con información oficial antes de publicar la convocatoria.
 */
export type FairPhoto = {
  file?: string
  alt: string
  title: string
  note?: string
}

export type InvitedBrand = {
  name: string
  category: string
  logo?: string
  website?: string
}

export type Fair = {
  id: string
  name: string
  dates: string
  venue: string
  district: string
  address: string
  image: string
  schedule?: string
  scheduleIsExample?: boolean
  access?: string
  accessIsExample?: boolean
  description?: string
  photos?: FairPhoto[]
  invitedBrands?: InvitedBrand[]
  applicationsOpen?: boolean
}

export type PastEdition = {
  id: string
  name: string
  dates: string
  description: string
  venue: string
  district: string
  cover?: string
  photos: { file: string; alt: string }[]
  isSample?: boolean
}

export const featuredFair: Fair = {
  id: 'feria-navidena-2026',
  name: 'Feria Navideña 2026',
  dates: '12 y 13 de diciembre de 2026',
  venue: 'Parque Próceres de la Independencia',
  district: 'Jesús María, Lima',
  address: 'Parque Próceres de la Independencia, Jesús María, Lima, Perú',
  image: 'feria-navidad-banner.png',
  description: 'Mercado de regalos, emprendimientos y experiencias para celebrar la Navidad apoyando al talento local.',
  // Datos inventados solo para completar la maqueta. Deben confirmarse.
  schedule: '11:00 a. m. a 9:00 p. m.',
  scheduleIsExample: true,
  access: 'Ingreso libre',
  accessIsExample: true,
  // La fotografía existente es referencial, no se presenta como foto de 2026.
  photos: [
    { file: 'feria-portada.png', alt: 'Imagen ilustrativa de una feria de emprendimientos', title: 'Ambiente de feria', note: 'Imagen referencial' },
    { title: 'Emprendedores y stands', alt: 'Fotografía del evento pendiente de publicar', note: 'Fotografía por publicar' },
    { title: 'Regalos y productos', alt: 'Fotografía del evento pendiente de publicar', note: 'Fotografía por publicar' },
  ],
  // Añadir marcas solo cuando confirmen su participación.
  invitedBrands: [],
  // applicationsOpen: true
}

/** Otras ferias anunciadas oficialmente, posteriores a la principal. */
export const upcomingFairs: Fair[] = []

/** Historial real: agregar tantas ferias como existan; no hay límite de tarjetas. */
export const pastEditions: PastEdition[] = []

/**
 * Muestras de interfaz cuando aún no hay ediciones pasadas registradas.
 * Cada tarjeta enlaza a una ficha DEMOSTRATIVA, no a un evento real.
 * Desaparecen automáticamente cuando se agregan entradas a pastEditions.
 */
export const samplePastEditions: PastEdition[] = [
  {
    id: 'ejemplo-feria-creativa',
    name: 'Feria Creativa',
    dates: 'Edición de ejemplo · sin fecha real',
    description: 'Ejemplo de ficha para mostrar cómo se organizarán las historias, fotografías y detalles de cada feria realizada.',
    venue: 'Lugar por completar',
    district: 'Lima',
    photos: [],
    isSample: true,
  },
  {
    id: 'ejemplo-mercado-de-sabores',
    name: 'Mercado de Sabores',
    dates: 'Edición de ejemplo · sin fecha real',
    description: 'Una maqueta de edición gastronómica para visualizar cómo se descubrirán los eventos anteriores.',
    venue: 'Lugar por completar',
    district: 'Lima',
    photos: [],
    isSample: true,
  },
  {
    id: 'ejemplo-feria-de-regalos',
    name: 'Feria de Regalos',
    dates: 'Edición de ejemplo · sin fecha real',
    description: 'Vista de muestra del catálogo histórico; los eventos reales se incorporarán con sus propios datos y fotografías.',
    venue: 'Lugar por completar',
    district: 'Lima',
    photos: [],
    isSample: true,
  },
]

export function getPastEditionById(id: string | null): PastEdition | undefined {
  if (!id) return undefined
  return [...pastEditions, ...(pastEditions.length ? [] : samplePastEditions)].find((edition) => edition.id === id)
}

export function getFairById(id: string | null): Fair | undefined {
  if (!id) return undefined
  return [featuredFair, ...upcomingFairs].find((fair) => fair.id === id)
}

export function fairApplicationStatus(fair: Fair): string {
  if (fair.applicationsOpen === true) return 'Convocatoria abierta'
  if (fair.applicationsOpen === false) return 'Convocatoria cerrada'
  return 'Convocatoria por confirmar'
}

export function fairApplicationHref(fair: Fair): string {
  return `?feria=${encodeURIComponent(fair.id)}#planes-postular`
}
