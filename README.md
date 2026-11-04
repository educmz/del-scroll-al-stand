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
