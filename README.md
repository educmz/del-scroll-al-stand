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

## Próximas ferias

La ruta `#proximas-ferias` muestra el evento **Feria Navideña: Mercado de Regalos**,
con portada, detalles y mapa, ubicación y galería, y categorías participantes.

Las **preguntas frecuentes** se encuentran ahora en Inicio, justo antes del CTA final,
en la ruta `#preguntas-frecuentes`. El enlace anterior
`#proximas-ferias-preguntas` también lleva allí.
Las fechas y el lugar de la maqueta se basan en la referencia proporcionada
(12 y 13 de diciembre de 2026, Parque Próceres de la Independencia, Jesús María, Lima).
Deben confirmarse con el organizador antes de anunciarse oficialmente.

El mapa utiliza Google Maps insertado mediante una búsqueda por nombre del parque,
y un enlace externo para abrir la ubicación. No requiere una API key.

Las fotografías originales pueden subirse a `public/images/` con estos nombres:

- `feria-navidad-portada.png`: imagen principal de la cabecera navideña.
- `parque-proceres.png`: fotografía de la ubicación del evento.
- `feria-galeria-1.png` a `feria-galeria-6.png`: galería de ediciones anteriores.

Si falta alguna, se usa provisionalmente la foto existente `feria-portada.png`.
Los controles del carrusel de Próximas ferias y las preguntas frecuentes en Inicio funcionan sin backend.

El botón `Postular a esta feria` abre el formulario en Planes de stand
(`#planes-postular`). El botón de WhatsApp se habilita al configurar
la variable `APPLICATION_WHATSAPP_NUMBER` descrita anteriormente.

## Banners compartidos de las cuatro páginas internas

Las páginas **Próximas ferias**, **Para emprendedores**, **Planes de stand** y
**Sobre nosotros** utilizan `src/PageHero.tsx` y `src/PageHero.css`. El diseño
es el mismo en las cuatro: **40 % para texto y botones, 60 % para fotografía**
en escritorio, y texto sobre imagen en pantallas pequeñas.

Para cambiar las fotos, sube los archivos a `public/images/`:

| Página | Nombre de imagen |
| --- | --- |
| Próximas ferias | `feria-navidad-portada.png` |
| Para emprendedores | `para-emprendedores-portada.png` |
| Planes de stand | `planes-portada.png` |
| Sobre nosotros | `sobre-nosotros-portada.png` |

**Recomendación:** usar imágenes horizontales de al menos 1400 × 900 px con el
sujeto principal cerca del centro para evitar recortes. Se muestran usando
`object-fit: cover`. Mientras falte alguna fotografía, el componente utiliza
`public/images/feria-portada.png` como respaldo. No hace falta modificar el
código cuando subas los cuatro archivos con esos nombres.
