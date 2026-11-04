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

## Ferias

La ruta `#proximas-ferias` es la **agenda de ferias**. Presenta la Feria Navideña
2026 como edición destacada, incluye fecha y ubicación, mapa, información para
visitantes, categorías previstas, próximas ediciones y acceso a la postulación.

La información de ferias se mantiene en **`src/fairCatalog.ts`**:

- `featuredFair`: próxima feria destacada. Fecha y lugar configurados:
  **12 y 13 de diciembre de 2026, Parque Próceres de la Independencia, Jesús María**.
- `upcomingFairs`: agregar solo ferias futuras con datos confirmados. Mientras esté vacío,
  la web muestra que no hay nuevas fechas anunciadas, sin inventar eventos.
- `pastEditions`: registrar ediciones realizadas con fotografías auténticas en
  `public/images/`. La galería se oculta si aún no existe material real.
- `applicationsOpen`: establecer `true` o `false` cuando se confirme el estado
  de la convocatoria. Sin valor, se muestra «Convocatoria por confirmar».
- `schedule` y `access`: completar al conocer horario y condiciones de ingreso.
  Hasta entonces, la web informa que están pendientes.

La portada de Feria Navideña usa el recurso **`public/images/feria-navidad-banner.png`**
disponible en el repositorio, y su respaldo visual es `feria-portada.png`.
Las fotografías de ferias pasadas no se sustituyen por fotos ilustrativas:
solo se publican cuando se registran ediciones verificadas.

El visitante puede revisar los detalles y abrir Google Maps. Los emprendedores
pueden pulsar «Quiero ser expositor» o «Solicitar participación». Esos enlaces
abren `#planes-postular` con el parámetro `?feria=...`, que preselecciona la feria
y la incluye en el mensaje del formulario. Si el número de WhatsApp no está
configurado, el formulario advierte expresamente que **no se ha enviado**.

Las preguntas frecuentes siguen en Inicio (`#preguntas-frecuentes`), también
accesibles desde el enlace heredado `#proximas-ferias-preguntas`.

**Antes de publicar:** confirmar fechas, horario, ingreso y estado de la
convocatoria con la organización; no presentar categorías previstas como
marcas confirmadas.

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
