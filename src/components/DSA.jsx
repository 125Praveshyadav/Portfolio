import { Fragment, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import { FaCode } from 'react-icons/fa'
import { HiChevronRight } from 'react-icons/hi2'

/* ========== Data ==========
   Topics are ordered the way they are usually learned, so the
   arrows actually mean something (one topic leads to the next). */
const learningPaths = [
  {
    title: 'Foundations',
    topics: ['Arrays', 'Strings', 'Hashing', 'Sorting', 'Binary Search', 'Recursion' , 'Backtracking','Greedy Algorithms' , 'Dynamic Programming'],
  },
  {
    title: 'Patterns & Structures',
    topics: ['Two Pointers', 'Sliding Window', 'Linked Lists', 'Stacks', 'Queues', 'Trees'],
  },
]

const totalTopics = learningPaths.reduce((n, p) => n + p.topics.length, 0)

const stats = [
  { label: 'Problems solved', value: 200, suffix: '+' },
  { label: 'Topics covered', value: totalTopics, suffix: '' },
  { label: 'Primary language', text: 'Java' },
]

/* ========== Animated counter ========== */
const Counter = ({ to, suffix = '' }) => {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = nodeRef.current
    if (!node || !isInView) return
    if (reduce) {
      node.textContent = to + suffix
      return
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(v) {
        node.textContent = Math.round(v) + suffix
      },
    })
    return () => controls.stop()
  }, [isInView, reduce, to, suffix])

  return <span ref={nodeRef}>0{suffix}</span>
}

/* ========== Arrow connector between two topics ========== */
const Connector = ({ isInView, delay, reduce }) => (
  <motion.span
    aria-hidden="true"
    initial={reduce ? false : { opacity: 0, scaleX: 0 }}
    animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
    transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    className="flex shrink-0 origin-left items-center text-cyan-500/50"
  >
    <span className="h-px w-5 bg-current sm:w-7" />
    <HiChevronRight className="-ml-1.5 text-base" />
  </motion.span>
)

/* ========== One horizontal path: topic → topic → topic ========== */
const TopicPath = ({ path, isInView, reduce, offset }) => (
  <div>
    <p className="mb-2.5 text-xs font-medium text-muted">{path.title}</p>

    <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center">
        {path.topics.map((topic, i) => {
          const delay = 0.35 + (offset + i) * 0.07
          return (
            <Fragment key={topic}>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay }}
                className="shrink-0 cursor-default rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors duration-200 hover:border-cyan-400/50 hover:text-cyan-600 dark:border-cyan-500/20 dark:bg-slate-800/70 dark:text-cyan-300 dark:hover:border-cyan-400/50 dark:hover:bg-cyan-500/10 sm:text-sm"
              >
                {topic}
              </motion.span>

              {i < path.topics.length - 1 && (
                <Connector isInView={isInView} delay={delay + 0.15} reduce={reduce} />
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  </div>
)

const DSA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section id="dsa" ref={ref} className="section-padding relative overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* ========== Heading ========== */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-2 text-3xl font-bold text-heading md:text-4xl">
            DSA <span className="gradient-text">Journey</span>
          </h2>
          <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          <p className="mx-auto max-w-xl text-sm text-muted">
            Strengthening problem-solving skills, one problem at a time.
          </p>
        </div>

        {/* ========== Single premium panel ========== */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass mx-auto max-w-4xl rounded-3xl border border-slate-200/80 p-5 shadow-xl dark:border-slate-700/60 sm:p-6"
        >
          {/* Stats strip */}
          <div className="grid grid-cols-3 divide-x divide-slate-200/80 border-b border-slate-200/80 pb-5 dark:divide-slate-700/60 dark:border-slate-700/60">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 text-center sm:px-4">
                <div className="gradient-text text-2xl font-bold sm:text-3xl">
                  {stat.text ? stat.text : <Counter to={stat.value} suffix={stat.suffix} />}
                </div>
                <p className="mt-1 text-[11px] text-muted sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Topic paths */}
          <div className="pt-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-heading">
              <FaCode className="text-cyan-500" />
              Topics covered
            </h3>

            <div className="space-y-5">
              {learningPaths.map((path, idx) => (
                <TopicPath
                  key={path.title}
                  path={path}
                  isInView={isInView}
                  reduce={reduce}
                  offset={idx * learningPaths[0].topics.length}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DSA