import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  
  FaCode,
  FaServer,
} from 'react-icons/fa'
import {
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  
  SiMysql,
  SiC,
} from 'react-icons/si'
import { HiSparkles } from 'react-icons/hi2'


const LEVELS = {
  1: 'Learning',
  2: 'Comfortable',
  3: 'Confident',
}

const skillCategories = [
  {
    title: 'Languages',
    icon: <FaCode />,
    skills: [
      { name: 'Java', icon: <FaJava />, level: 3, color: '#f89820' },
      { name: 'JavaScript', icon: <SiJavascript />, level: 3, color: '#eab308' },
      { name: 'C', icon: <SiC />, level: 2, color: '#5c8dbc' },  
    ],
  },
  {
    title: 'Frontend',
    icon: <FaReact />,
    skills: [
      { name: 'React.js', icon: <FaReact />, level: 3, color: '#22b8d8' },
      { name: 'HTML5', icon: <FaHtml5 />, level: 3, color: '#e34f26' },
      { name: 'CSS3', icon: <FaCss3Alt />, level: 3, color: '#1572b6' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 3, color: '#38bdf8' },
   
    ],
  },
  {
    title: 'Backend & Tools',
    icon: <FaServer />,
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, level: 2, color: '#68a063' },
      { name: 'Express', icon: <SiExpress />, level: 2, color: '#94a3b8' },
      { name: 'MongoDB', icon: <SiMongodb />, level: 2, color: '#4db33d' },
      { name: 'MySQL', icon: <SiMysql />, level: 2, color: '#4479a1' },
      { name: 'Git & GitHub', icon: <FaGitAlt />, level: 3, color: '#f05032' },
    ],
  },
]

/* ========== Level meter (3 small segments) ========== */
const LevelMeter = ({ level, isInView, delay, reduce }) => (
  <div
    className="flex items-center gap-1"
    role="img"
    aria-label={`${LEVELS[level]} level`}
  >
    {[1, 2, 3].map((seg) => {
      const filled = seg <= level
      return (
        <span
          key={seg}
          className="relative h-1 w-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700/80"
        >
          {filled && (
            <motion.span
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={reduce ? false : { scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: delay + seg * 0.08, ease: 'easeOut' }}
            />
          )}
        </span>
      )
    })}
  </div>
)

/* ========== Single skill row ========== */
const SkillRow = ({ skill, isInView, delay, reduce }) => (
  <li className="group flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60">
    <div className="flex min-w-0 items-center gap-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[15px] ring-1 ring-inset transition-transform duration-200 group-hover:scale-105"
        style={{
          color: skill.color,
          backgroundColor: `${skill.color}1f`,
          '--tw-ring-color': `${skill.color}33`,
        }}
      >
        {skill.icon}
      </span>
      <span className="truncate text-sm font-medium text-heading">{skill.name}</span>
    </div>

    <div className="flex shrink-0 flex-col items-end gap-1">
      <LevelMeter level={skill.level} isInView={isInView} delay={delay} reduce={reduce} />
      <span className="text-[10px] leading-none text-muted">{LEVELS[skill.level]}</span>
    </div>
  </li>
)

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0)

  return (
    <section id="skills" ref={ref} className="section-padding relative overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* ========== Heading ========== */}
        <div className="mb-8 text-center md:mb-10">
          <div className="glass mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-cyan-600 dark:text-cyan-400 sm:text-sm">
            <HiSparkles />
            Technical Skills
          </div>

          <h2 className="mb-2 text-3xl font-bold text-heading md:text-4xl">
            My <span className="gradient-text">Tech Stack</span>
          </h2>

          <p className="mx-auto max-w-xl text-sm text-muted">
            What I build with, and how comfortable I am with each tool.
          </p>
        </div>

        {/* ========== Skills panel ========== */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass mx-auto max-w-5xl rounded-3xl border border-slate-200/80 p-5 shadow-xl dark:border-slate-700/60 sm:p-6"
        >
          {/* Panel header: count + legend */}
          <div className="mb-5 flex flex-col gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-700/60 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              <span className="font-semibold text-heading">{total} technologies</span> across{' '}
              {skillCategories.length} areas
            </p>

            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {[1, 2, 3].map((lvl) => (
                <li key={lvl} className="flex items-center gap-1.5 text-[11px] text-muted">
                  <span className="flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <span
                        key={s}
                        className={`h-1 w-2.5 rounded-full ${
                          s <= lvl
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                            : 'bg-slate-200 dark:bg-slate-700/80'
                        }`}
                      />
                    ))}
                  </span>
                  {LEVELS[lvl]}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="grid gap-6 md:grid-cols-3 md:gap-0">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className="md:border-l md:border-slate-200/80 md:px-5 md:first:border-l-0 md:first:pl-0 md:last:pr-0 dark:md:border-slate-700/60"
              >
                <div className="mb-2 flex items-center gap-2 px-2">
                  <span className="text-sm text-cyan-500">{category.icon}</span>
                  <h3 className="text-sm font-semibold text-heading">{category.title}</h3>
                </div>

                <ul className="space-y-0.5">
                  {category.skills.map((skill, i) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      isInView={isInView}
                      delay={0.3 + catIndex * 0.1 + i * 0.05}
                      reduce={reduce}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills