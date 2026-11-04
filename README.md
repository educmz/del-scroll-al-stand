# Del Scroll al Stand

Landing page estática del emprendimiento **Del Scroll al Stand**.

## Tecnologías

- React 19 + TypeScript 5
- Vite 8
- Tailwind CSS 4
- Motion y Lucide React

No requiere backend ni base de datos.

## Requisitos

- Node.js 22.12 o superior (o una versión de Node compatible con Vite 8)
- npm

## Desarrollo local

```bash
npm ci
npm run dev
```

## Comprobaciones

```bash
npm run lint
npm run build
npm run preview
```

La compilación genera los archivos estáticos en `dist/`.

## Ramas

- `develop`: trabajo y validación de cambios.
- `main`: rama de producción; despliega automáticamente con GitHub Pages.

Los cambios en `develop` se verifican automáticamente mediante GitHub Actions.

## Despliegue en GitHub Pages

El proyecto utiliza `base: '/del-scroll-al-stand/'` en `vite.config.ts`, necesario para la URL:

https://educmz.github.io/del-scroll-al-stand/

1. En GitHub, entra en **Settings → Pages → Build and deployment** y asegúrate de que esté seleccionada la opción **GitHub Actions**.
2. Cada cambio enviado a `main` ejecuta `.github/workflows/deploy.yml` e instala dependencias, compila y publica `dist/`.

El workflow está configurado para `main`, por lo que trabajar en `develop` no publica la web.

> Nota: revisa las restricciones de GitHub Pages para sitios comerciales antes de utilizarlo como alojamiento oficial del negocio.

## Página Planes de stand

La ruta `#planes` muestra la vista independiente de planes de stand, con tres tarjetas,
comparativa, servicios, testimonios de referencia y formulario de postulación.

Las siguientes imágenes pueden añadirse a `public/images/` para sustituir la foto de feria provisional:

- `planes-portada.png`: imagen principal de la página de planes.
- `stand-basico.png`: fotografía del stand básico.
- `stand-plus.png`: fotografía del stand plus.
- `stand-premium.png`: fotografía del stand premium.

Si falta alguna, se usa `feria-portada.png` como respaldo.

### Postulaciones sin backend

No se almacenan datos ni se envían a servidores propios. El formulario valida los campos y,
si hay un número configurado, abre WhatsApp con un mensaje prellenado. **La persona debe
confirmar el envío dentro de WhatsApp.** Si falta el número, se indica que no se ha enviado nada
y se intenta copiar el contenido del formulario al portapapeles.

En local crea un archivo `.env.local` (no lo subas a GitHub):

```env
VITE_APPLICATION_WHATSAPP_NUMBER=51999999999
```

Sustituye el número de ejemplo por el WhatsApp real del emprendimiento, con prefijo de país,
solo números.

Para GitHub Pages ve a **Settings → Secrets and variables → Actions → Variables**
y crea la variable `APPLICATION_WHATSAPP_NUMBER` con ese número real.
El workflow lo incorpora como `VITE_APPLICATION_WHATSAPP_NUMBER` durante la compilación de `main`.
Al estar incluido en el JavaScript público, **no debe considerarse secreto**.

Los precios, beneficios y testimonios de la maqueta son contenido de referencia y deben
confirmarse antes de abrir postulaciones.

## Página Para emprendedores

La ruta `#emprendedores` utiliza el banner `PageHero` compartido, seguido de dos
bloques editoriales coherentes con Sobre nosotros:

- **Haz crecer tu marca:** cuatro tarjetas de beneficios con iconos pastel y colores coral, verde y dorado.
- **¿Qué te ofrecemos?:** cinco tarjetas de servicios adaptables a escritorio, tablet y móvil.
- **Feria Navideña:** una sección final con la información de la feria del **12 y 13 de diciembre de 2026**
  (Parque Próceres de la Independencia, Jesús María, Lima) y un espacio grande reservado
  para el banner promocional oficial.

### Imágenes de Para emprendedores

Sube los archivos a `public/images/` con estos nombres exactos:

- `para-emprendedores-portada.png`: fotografía del banner superior de la página.
- **`banner-feria-navidad.png`**: banner promocional de la última sección.
  Mientras no exista, aparece una tarjeta provisional con el texto «Feria Navideña».
  La imagen se muestra completa con `object-fit: contain`, sin cortar letras, personas ni logotipos.

Mientras falte la fotografía superior, se usa `feria-portada.png` como respaldo.

Los botones de postulación llevan al formulario existente en Planes de stand.
Los accesos a planes y a Próximas ferias se conservan. El formulario no registra
ni envía datos por sí solo; para WhatsApp sigue la configuración del apartado anterior.

Antes de difundir la feria, confirma la fecha, dirección y condiciones con el equipo organizador.

## Ferias — estructura 2026

La ruta `#proximas-ferias` sigue esta arquitectura:
**1) Feria Navideña destacada → 2) Próximas ferias → 3) Galería de ferias pasadas**.
Se eliminó el CTA granate que aparecía debajo de la galería.

### Feria principal: banner y ficha completa

- Banner de `public/images/feria-navidad-banner.png`, fecha y lugar.
- Cuatro datos: fecha, dirección, horario y condiciones de ingreso, junto con Google Maps.
- Fotos adicionales editables: la foto referencial `feria-portada.png` y espacios reservados
  para imágenes propias. No se muestran como fotos reales del evento si no lo son.
- Marcas invitadas, identificadas individualmente cuando estén confirmadas. Mientras no
  haya nombres reales hay cuatro espacios claramente marcados «Por anunciar».
- Rubros de emprendimientos previstos.
- Tres propuestas de publicación para Instagram, Facebook y TikTok con botón **Copiar contenido**,
  y un botón **Compartir feria** con alternativa de copiar enlace.

El catálogo vive en `src/fairCatalog.ts`. Puedes editar `featuredFair` para ajustar
horarios, ingreso, galería adicional, marcas invitadas o nuevos datos. **Los horarios
«11:00 a. m. a 9:00 p. m.» y «Ingreso libre» son ejemplos inventados a solicitud
del diseño y se muestran explícitamente como «Propuesta · por confirmar».**
No publicar esos datos como oficiales sin verificar.

### Próximas ferias

Agregar ferias reales a `upcomingFairs` (mismo catálogo). No se inventan fechas:
mientras el arreglo esté vacío, se muestra «Nuevas fechas por anunciar».

### Galería de ferias pasadas — una tarjeta por edición

Agregar ediciones reales a `pastEditions` en `src/fairCatalog.ts`. La cuadrícula se
extiende automáticamente con **todas** las ediciones; no se limita a cinco fotografías
ni existe un máximo fijo. Cada tarjeta navega a `#feria/<id>`, una ficha específica
con historia, fecha, ubicación y galería propia, y enlaces para volver al catálogo.

Mientras `pastEditions` no tenga datos, se muestran tres **tarjetas de demostración**
marcadas «Ejemplo de diseño» y un aviso prominente que explica que no son eventos
realizados. Estas tarjetas también abren fichas demostrativas. Cuando agregues una
primera edición real, las fichas de muestra dejan de mostrarse automáticamente.

Ejemplo de entrada real (completar con información y fotografías verificadas):

```ts
{
  id: 'mi-feria-real',
  name: 'Nombre real de la feria',
  dates: 'Fecha oficial',
  venue: 'Lugar real',
  district: 'Distrito y ciudad',
  description: 'Resumen de la edición',
  cover: 'portada-mi-feria.png',
  photos: [
    { file: 'galeria-mi-feria-01.png', alt: 'Descripción de la fotografía' },
  ],
}
```

Las imágenes se guardan en `public/images/`. No se deben atribuir fotografías
referenciales ni contenido ficticio a ediciones realizadas.

La postulación a una feria sigue dirigiendo a `#planes-postular` con el parámetro
`?feria=...`. El formulario incluye la feria seleccionada en el mensaje. Si no
está configurado `VITE_APPLICATION_WHATSAPP_NUMBER`, no se afirma que se envió
una postulación. Las preguntas frecuentes generales siguen en Inicio.

## Banners compartidos de las cuatro páginas internas

Las páginas **Próximas ferias**, **Para emprendedores**, **Planes de stand** y
**Sobre nosotros** utilizan `src/PageHero.tsx` y `src/PageHero.css`. El diseño
es el mismo en las cuatro: **40 % para texto y botones, 60 % para fotografía**
en escritorio, y texto sobre imagen en pantallas pequeñas.

Para cambiar las fotos, sube los archivos a `public/images/`:

| Página | Nombre de imagen |
| --- | --- |
| Ferias | `feria-navidad-banner.png` |
| Para emprendedores | `para-emprendedores-portada.png` |
| Planes de stand | `planes-portada.png` |
| Sobre nosotros | `sobre-nosotros-portada.png` |

**Recomendación:** usar imágenes horizontales de al menos 1400 × 900 px con el
sujeto principal cerca del centro para evitar recortes. Se muestran usando
`object-fit: cover`. Mientras falte alguna fotografía, el componente utiliza
`public/images/feria-portada.png` como respaldo. No hace falta modificar el
código cuando subas los cuatro archivos con esos nombres.
