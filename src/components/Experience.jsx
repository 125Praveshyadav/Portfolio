import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

/* ========== Data ==========
   `type` and `location` are optional: leave them out if not needed.
   Highlights should be short, factual and start with an action verb.
   Add real numbers only if you have them (e.g. "reduced load time by 30%"). */
const experiences = [
  {
    role: 'Full Stack Web Development Intern',
    company: 'ElevanceSkills',
    type: 'Internship',
    duration: '2026',
     location: 'Remote',
    highlights: [
      'Built authentication flows, dashboards and dynamic UI components for real-world MERN stack projects.',
      'Developed REST APIs with Node.js and Express, backed by MongoDB, and connected them to React front ends.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
]

/* "ElevanceSkills" -> "ES" */
const initials = (name) =>
  (name.match(/[A-Z]/g) || [name[0]]).slice(0, 2).join('').toUpperCase()

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* ========== Heading ========== */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-2 text-3xl font-bold text-heading md:text-4xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          <p className="mx-auto max-w-xl text-sm text-muted">
            Where I have applied my skills in real projects.
          </p>
        </div>

        {/* ========== Timeline ========== */}
        <motion.ol
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl border-l border-slate-200 dark:border-slate-700/70"
        >
          {experiences.map((exp) => (
            <li key={`${exp.company}-${exp.role}`} className="relative pb-8 pl-6 last:pb-0 sm:pl-8">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-cyan-500 ring-4 ring-cyan-500/15"
              />

              <article className="glass rounded-2xl border border-slate-200/80 p-5 shadow-lg transition-colors duration-200 hover:border-cyan-400/30 dark:border-slate-700/60 sm:p-6">
                {/* Header */}
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-sm font-bold tracking-wide text-white shadow-md"
                    >
                      {initials(exp.company)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug text-heading sm:text-lg">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                        {exp.company}
                        {exp.type && (
                          <span className="font-normal text-muted"> &middot; {exp.type}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-row gap-3 text-xs text-muted sm:flex-col sm:items-end sm:gap-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <FaRegCalendarAlt className="text-cyan-500" />
                      {exp.duration}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-cyan-500" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </header>

                {/* Highlights */}
                <ul className="mt-4 space-y-2 border-t border-slate-200/80 pt-4 dark:border-slate-700/60">
                  {exp.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech used */}
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {exp.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

export default Experience