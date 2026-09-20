import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaBookOpen, FaRegCalendarAlt } from 'react-icons/fa'

/* ========== Data ==========
   Latest first. `score`, `affiliation` and `status` are optional. */
const education = [
  {
    icon: <FaGraduationCap />,
    title: 'B.Tech in Computer Science & Engineering',
    institute: 'IIMT Engineering College, Meerut',
    affiliation: 'Affiliated to Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
    duration: '2023 – 2027',
    status: 'Currently in 4th year',
    // score: { label: 'CGPA', value: '8.x' },  // add when you want to show it
  },
  {
    icon: <FaBookOpen />,
    title: 'Class XII – Senior Secondary',
    institute: 'Zoniya Intermediate College',
    duration: '2023',
    score: { label: 'Percentage', value: '92.8%' },
  },
  {
    icon: <FaBookOpen />,
    title: 'Class X – Secondary',
    institute: 'Zoniya Intermediate College',
    duration: '2021',
    score: { label: 'Percentage', value: '90%' },
  },
]

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section id="education" ref={ref} className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* ========== Heading ========== */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-2 text-3xl font-bold text-heading md:text-4xl">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          <p className="mx-auto max-w-xl text-sm text-muted">
            My academic background, from school to engineering.
          </p>
        </div>

        {/* ========== Timeline ========== */}
        <motion.ol
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl border-l border-slate-200 dark:border-slate-700/70"
        >
          {education.map((edu) => (
            <li key={edu.title} className="relative pb-6 pl-6 last:pb-0 sm:pl-8">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-cyan-500 ring-4 ring-cyan-500/15"
              />

              <article className="glass rounded-2xl border border-slate-200/80 p-5 shadow-lg transition-colors duration-200 hover:border-cyan-400/30 dark:border-slate-700/60 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: icon + details */}
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-lg text-white shadow-md"
                    >
                      {edu.icon}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug text-heading sm:text-lg">
                        {edu.title}
                      </h3>
                      <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                        {edu.institute}
                      </p>
                      {edu.affiliation && (
                        <p className="mt-1 text-xs leading-relaxed text-muted">{edu.affiliation}</p>
                      )}
                    </div>
                  </div>

                  {/* Right: year, status, score */}
                  <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted sm:flex-col sm:items-end sm:gap-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <FaRegCalendarAlt className="text-cyan-500" />
                      {edu.duration}
                    </span>

                    {edu.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-cyan-700 dark:text-cyan-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                        {edu.status}
                      </span>
                    )}

                    {edu.score && (
                      <span className="inline-flex items-baseline gap-1.5">
                        <span className="gradient-text text-lg font-bold leading-none">
                          {edu.score.value}
                        </span>
                        <span>{edu.score.label}</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

export default Education