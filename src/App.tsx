import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

function App() {
  return (
    <div className="min-h-svh bg-stone-50 text-stone-950">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-base font-semibold tracking-tight">
            Del Scroll al Stand
          </span>
          <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600">
            Próximamente
          </span>
        </header>

        <main className="flex flex-1 items-center py-24">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-600">
              <Sparkles aria-hidden="true" size={18} />
              Estamos preparando algo nuevo
            </p>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
              Del Scroll
              <span className="block text-stone-500">al Stand.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
              Nuestra página web está en preparación. Pronto encontrarás aquí
              más información sobre el emprendimiento.
            </p>
          </motion.section>
        </main>

        <footer className="border-t border-stone-200 pt-5 text-sm text-stone-500">
          © {new Date().getFullYear()} Del Scroll al Stand
        </footer>
      </div>
    </div>
  )
}

export default App
