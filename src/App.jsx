import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideo from './public/hero-overview.mp4'

const values = [
  {
    title: 'Compromiso Tecnologico',
    text: 'Inversion constante en flota Enterprise (Matrice 4T RTK) para mantener acceso a la frontera de la innovacion.',
  },
  {
    title: 'Excelencia Operativa',
    text: 'Protocolos rigurosos de seguridad para operar en entornos donde el riesgo humano es inaceptable.',
  },
  {
    title: 'Integridad de Datos',
    text: 'Exactitud y ciberseguridad para convertir datos crudos en activos estrategicos confiables.',
  },
  {
    title: 'Vision Emprendedora',
    text: 'Talento local con estandares internacionales de mantenimiento inteligente desde Guatemala.',
  },
]

const divisions = [
  'Energy: inspeccion tecnica y mantenimiento predictivo de redes electricas.',
  'Field: analisis foliar, conteo de plantas y gestion de recursos hidricos.',
  'Site: fotogrametria y modelado 3D para arquitectura e infraestructura.',
  'SAR: busqueda, rescate y evaluacion de danos con sensores termicos.',
]

const serviceStack = [
  'Matrice 4T RTK (hardware enterprise)',
  'Camara termica y zoom 200x',
  'Entrega de imagenes crudas (JPG/TIFF)',
  'Precision centimetrica RTK',
  'Procesamiento DJI Terra para modelos 3D',
  'Analisis certificado por experto',
  'Risk Index y dashboard personalizado con TRIAGE',
  'Analisis de degradacion temporal',
  'Prioridad de despliegue 24/7',
]

const portfolioProjects = [
  {
    id: 'tato',
    title: 'Portafolio Tato',
    subtitle: 'Cobertura tecnica para ejecucion de obra y seguimiento de hitos',
    description:
      'Levantamiento visual y analitico para control de avance, riesgos en sitio y decisiones de coordinacion operativa.',
    videoSrc: '/tato-portfolio.mp4',
    posterSrc: '/tato-portfolio-poster.jpg',
  },
  {
    id: 'flight-delight',
    title: 'Flight Delight',
    subtitle: 'Narrativa aerea premium para presentacion comercial',
    description:
      'Produccion visual de alto impacto con enfoque en branding, percepcion de calidad y conversion de audiencias.',
    videoSrc: '/flight-delight-portfolio.mp4',
    posterSrc: '/flight-delight-portfolio-poster.jpg',
  },
]

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PortfolioCard({ project, hasError, onVideoError }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const cardVideoY = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])
  const cardVideoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16])

  return (
    <motion.article
      ref={cardRef}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative min-h-[420px] overflow-hidden rounded-3xl border border-ov-gold/30"
    >
      {!hasError ? (
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={project.posterSrc}
          onError={onVideoError}
          src={project.videoSrc}
          style={{ y: cardVideoY, scale: cardVideoScale }}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_30%,rgba(215,166,37,0.24),rgba(5,8,16,0.95)_62%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/30" />
      <div className="relative z-10 h-full flex flex-col justify-end p-7">
        <p className="text-xs tracking-[0.22em] uppercase text-ov-muted mb-3">Case Study</p>
        <h3 className="text-3xl text-ov-gold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {project.title}
        </h3>
        <p className="text-ov-text mb-2">{project.subtitle}</p>
        <p className="text-ov-muted leading-7">{project.description}</p>
      </div>
    </motion.article>
  )
}

export default function App() {
  const [videoError, setVideoError] = useState(false)
  const [portfolioVideoErrors, setPortfolioVideoErrors] = useState({})
  const { scrollYProgress } = useScroll()
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2])

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {!videoError ? (
          <motion.video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-overview-poster.jpg"
            onError={() => setVideoError(true)}
            src={heroVideo}
            style={{ y: videoY, scale: videoScale }}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(215,166,37,0.25),rgba(6,8,14,0.95)_58%)]" />
        )}
        <div className="absolute inset-0 bg-slate-950/72" />
      </div>

      <div className="relative z-10">
      <section className="section-wrap min-h-screen flex items-center relative overflow-hidden hero-theme rounded-[2rem] border border-ov-gold/20">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-ov-gold/15 blur-3xl" />
        <div className="absolute -bottom-24 right-12 h-52 w-52 rounded-full bg-ov-gold-soft/15 blur-3xl" />
        <motion.div className="w-full relative z-10">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] uppercase text-ov-muted mb-4">
              Overview x TRIAGE
            </p>
            <h1
              className="text-5xl md:text-7xl leading-[0.95] mb-6 text-ov-gold gold-glow"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Precision Aerea para
              <br />
              Infraestructura Critica
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-ov-muted mb-8">
              Inteligencia de datos para operaciones mas seguras, eficientes y rentables.
              Capturamos con tecnologia aerea de alta complejidad y convertimos la informacion
              en decisiones de negocio accionables.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacto" className="px-6 py-3 rounded-full bg-ov-gold text-slate-950 font-semibold shadow-[0_0_24px_rgba(215,166,37,0.35)] hover:translate-y-[-1px] transition">
                Solicitar diagnostico
              </a>
              <a href="#divisiones" className="px-6 py-3 rounded-full border border-ov-gold/40 text-ov-text hover:border-ov-gold/70 hover:text-ov-gold transition">
                Ver divisiones
              </a>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      <motion.section
        className="section-wrap pt-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Quienes Somos
            </h2>
            <p className="text-ov-muted leading-7 mb-4">
              Overview es una empresa guatemalteca enfocada en transformar la gestion de
              infraestructura critica mediante tecnologia aerea de precision, liderada por
              Renato Archila.
            </p>
            <p className="text-ov-muted leading-7">
              En alianza estrategica con TRIAGE, cada captura tecnica se traduce en analitica
              operativa, KPIs y rutas de accion con metodologia de clase mundial.
            </p>
          </div>
        </FadeIn>
      </motion.section>

      <motion.section
        className="section-wrap"
        id="divisiones"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <h2 className="text-3xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Divisiones Operativas
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          {divisions.map((item, i) => (
            <FadeIn key={item} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="glass rounded-2xl p-6 h-full">
                <p className="leading-7 text-ov-muted">{item}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <h2 className="text-3xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Valores de Ejecucion
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.08}>
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="glass rounded-2xl p-6 h-full">
                <h3 className="text-xl mb-3 text-ov-gold">{value.title}</h3>
                <p className="text-ov-muted leading-7">{value.text}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <h2 className="text-3xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Arquitectura de Servicios
          </h2>
        </FadeIn>
        <div className="glass rounded-3xl p-8">
          <ul className="grid md:grid-cols-2 gap-4">
            {serviceStack.map((capability) => (
              <li key={capability} className="text-ov-muted leading-7">
                <span className="text-ov-amber mr-2">✓</span>
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        id="portafolio"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <h2 className="text-3xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Portafolio
          </h2>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-6">
          {portfolioProjects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <PortfolioCard
                project={project}
                hasError={portfolioVideoErrors[project.id]}
                onVideoError={() =>
                  setPortfolioVideoErrors((prev) => ({ ...prev, [project.id]: true }))
                }
              />
            </FadeIn>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        id="contacto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-ov-muted mb-4">Contacto</p>
            <h2 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Una solucion integral para Guatemala
            </h2>
            <p className="text-ov-muted max-w-2xl mx-auto mb-8">
              De los datos a la inteligencia, del riesgo a la rentabilidad.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/50255621470" className="px-6 py-3 rounded-full bg-ov-sky text-slate-950 font-semibold inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M12 2a10 10 0 0 0-8.71 14.92L2 22l5.26-1.26A10 10 0 1 0 12 2Zm0 18.18a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.12.75.77-3.04-.2-.31A8.18 8.18 0 1 1 12 20.18Zm4.5-6.13c-.25-.12-1.48-.73-1.7-.81-.23-.08-.4-.12-.57.12s-.65.8-.8.97c-.15.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.24-.02-.37.1-.49.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.21-.5-.43-.43-.57-.43h-.49c-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28Z" />
                </svg>
                +502 5562 1470
              </a>
              <a href="mailto:overviewsolutionsgt@gmail.com" className="px-6 py-3 rounded-full border border-ov-gold/40 text-ov-text hover:border-ov-gold/70 hover:text-ov-gold transition inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M3 5h18a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1Zm8.88 7.18L4 7.06V17h16V7.06l-7.88 5.12a1 1 0 0 1-1.24 0ZM18.16 7H5.84L12 11l6.16-4Z" />
                </svg>
                overviewsolutionsgt@gmail.com
              </a>
            </div>
          </div>
        </FadeIn>
      </motion.section>
      </div>
    </main>
  )
}
