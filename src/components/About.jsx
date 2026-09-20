import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'
import {
  FaGithub,
  FaDownload,
  FaJava,
  FaReact,
  FaNodeJs,
  FaCode,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import { SiMongodb, SiExpress, SiJavascript } from 'react-icons/si'
import { HiSparkles } from 'react-icons/hi2'
import { BsBriefcaseFill, BsMortarboardFill, BsRocketTakeoffFill } from 'react-icons/bs'
import resume from '../Documents/Resume.pdf';

const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 1.8,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + suffix
          }
        },
      })
      return () => controls.stop()
    }
  }, [isInView, to, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const highlights = [
  {
    icon: <FaJava />,
    title: 'Java + DSA',
    desc: '200+ problems solved with strong problem-solving fundamentals.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: <FaReact />,
    title: 'Frontend',
    desc: 'Building modern responsive UIs with React, Tailwind and JavaScript.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <FaNodeJs />,
    title: 'Backend',
    desc: 'REST APIs, authentication, routing and scalable MERN architecture.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <SiMongodb />,
    title: 'Database',
    desc: 'Hands-on with MongoDB and MySQL for real-world applications.',
    color: 'from-lime-500 to-green-600',
  },
]

const techStack = [
  { icon: <FaJava />, name: 'Java' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <FaReact />, name: 'React' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <SiExpress />, name: 'Express' },
  { icon: <SiMongodb />, name: 'MongoDB' },
]

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-cyan-600 dark:text-cyan-400 mb-4">
            <HiSparkles />
            About Me
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            A Quick Look At <span className="gradient-text">My Journey</span>
          </h2>

          <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Passionate about solving problems, building real-world products, and growing into a skilled software engineer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="glass rounded-[28px] p-4 sm:p-5 h-full shadow-2xl">
              {/* top badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  Open to Opportunities
                </span>
                <span className="text-xs text-muted">2026 Grad</span>
              </div>

              {/* image - MOBILE COMPACT + DESKTOP BALANCED */}
              <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-slate-100 to-cyan-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%)]" />
                
                {/* Mobile: smaller aspect, Desktop: taller */}
                <div className="aspect-[16/10] lg:aspect-[4/3.6] w-full">
                  <img
                    src="/mintu.png"
                    alt="Pravesh Yadav"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                {/* floating badges */}
                <div className="absolute left-3 top-3 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold glass">
                  Java + DSA
                </div>
                <div className="absolute right-3 bottom-3 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg">
                  MERN Stack
                </div>
              </div>

              {/* name */}
              <div className="mt-5">
                <h3 className="text-2xl font-bold text-heading">Pravesh Yadav</h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm sm:text-base">
                  Aspiring Software Engineer
                </p>

                <div className="flex items-center gap-2 text-muted text-sm mt-2">
                  <FaMapMarkerAlt className="text-cyan-500" />
                  Meerut, India
                </div>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { value: 200, suffix: '+', label: 'DSA' },
                  { value: 10, suffix: '+', label: 'Projects' },
                  { value: 4, suffix: 'th', label: 'Year' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-3 text-center"
                  >
                    <div className="text-lg sm:text-xl font-bold gradient-text">
                      <Counter to={item.value} suffix={item.suffix} />
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* buttons */}
              <div className="flex gap-3 mt-5">
                <a
                  href="https://github.com/125Praveshyadav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-heading transition-all duration-300"
                >
                  <FaGithub />
                  GitHub
                </a>

                <a
                  href={resume}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  <FaDownload />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* main intro card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="glass rounded-[28px] p-5 sm:p-6 md:p-7 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-lg">
                  <FaCode />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-heading">Who I Am</h3>
                  <p className="text-sm text-muted">Developer mindset with problem-solving focus</p>
                </div>
              </div>

              <div className="space-y-4 text-body leading-relaxed text-sm sm:text-base">
                <p>
                  I'm a <span className="text-heading font-semibold">final-year B.Tech CSE student</span> at{' '}
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">IIMT Engineering College, Meerut</span>.
                </p>

                <p>
                  I enjoy working on <span className="text-heading font-semibold">software development</span>,{' '}
                  <span className="text-heading font-semibold">data structures & algorithms</span>, and{' '}
                  <span className="text-heading font-semibold">full-stack web development</span>.
                </p>

                <p>
                  My core strength is combining <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Java-based DSA practice</span> with
                  practical MERN projects like <span className="text-heading font-semibold">TedBus</span>, a real-world bus booking platform with
                  authentication, seat selection, payments, and admin features.
                </p>

                <p>
                  Right now, I’m focused on becoming a strong <span className="text-heading font-semibold">Software Engineer</span> by improving DSA,
                  full-stack skills, core CS subjects, communication, and interview readiness.
                </p>
              </div>
            </motion.div>

            {/* highlights cards - HOVER EFFECT ADDED */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass rounded-[24px] p-5 hover:border-cyan-500/40 transition-all duration-300 cursor-default"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl mb-4 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h4 className="text-heading font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-body leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* bottom card - HOVER EFFECT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-[28px] p-5 sm:p-6 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center text-lg">
                      <BsRocketTakeoffFill />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-heading">Currently Focused On</h3>
                      <p className="text-sm text-muted">Learning, building and preparing for placements</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {[
                      'DSA Practice',
                      'MERN Projects',
                      'Core CS',
                      'Aptitude',
                      'Interview Prep',
                      'Communication Skills',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-2 rounded-full text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 min-w-[220px]">
                  {[
                    { icon: <BsMortarboardFill />, label: 'Education', value: 'B.Tech CSE' },
                    { icon: <BsBriefcaseFill />, label: 'Internship', value: 'MERN Intern' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4"
                    >
                      <div className="text-cyan-500 text-lg mb-2">{item.icon}</div>
                      <p className="text-[11px] text-muted">{item.label}</p>
                      <p className="text-sm font-semibold text-heading">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* tech chips */}
              <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-700/50">
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-body"
                    >
                      <span className="text-cyan-500">{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About