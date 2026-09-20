import resume from "../Documents/Resume.pdf";
import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin, FaJava, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiJavascript, SiMongodb } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'
import { FiChevronDown } from 'react-icons/fi'

// Tech icons that orbit around the photo
const orbitIcons = [
  { icon: <FaJava />, color: '#f89820', angle: 0 },
  { icon: <FaReact />, color: '#61dafb', angle: 72 },
  { icon: <SiJavascript />, color: '#f7df1e', angle: 144 },
  { icon: <FaNodeJs />, color: '#68a063', angle: 216 },
  { icon: <SiMongodb />, color: '#4db33d', angle: 288 },
]

const Hero = () => {
  const cardRef = useRef(null)

  // 3D tilt effect (desktop only)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [12, -12]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-12, 12]), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-20 md:pt-20"
    >
      {/* ===== Animated Background ===== */}
      <div className="absolute inset-0 bg-white dark:bg-slate-950 transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 dark:from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-[10%] w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          {/* ================= LEFT: TEXT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-cyan-600 dark:text-cyan-400 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Open to Internships & Full-time Roles
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-heading leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text block sm:inline">Pravesh Yadav</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-body mb-4 font-semibold"
            >
              Aspiring Software Engineer
            </motion.p>

            <p className="text-base md:text-lg text-muted max-w-xl mx-auto md:mx-0 mb-8">
              Java • 200+ DSA Problems • MERN Stack Developer
              <br className="hidden sm:block" />
              Building efficient, scalable & user-focused applications 🚀
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
              <Link to="projects" smooth duration={500} offset={-80} className="btn-primary w-full sm:w-auto text-center cursor-pointer">
                View My Work
              </Link>
              <a href={resume} download className="btn-outline w-full sm:w-auto text-center">
                Download Resume
              </a>
            </div>

            {/* Socials - hidden on mobile (shown in bottom dock instead) */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://github.com/125Praveshyadav" target="_blank" rel="noopener noreferrer"
                 className="p-3 rounded-full glass hover:bg-cyan-500/20 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all hover:scale-110 hover:-translate-y-1">
                <FaGithub size={20} />
              </a>
              <a href="https://in.linkedin.com/in/pravesh-yadav-99b6a3312" target="_blank" rel="noopener noreferrer"
                 className="p-3 rounded-full glass hover:bg-cyan-500/20 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all hover:scale-110 hover:-translate-y-1">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:your.125praveshyadav@gmail.com"
                 className="p-3 rounded-full glass hover:bg-cyan-500/20 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all hover:scale-110 hover:-translate-y-1">
                <HiOutlineMail size={20} />
              </a>
            </div>
          </motion.div>

          {/* ================= RIGHT: PHOTO + CYCLE FRAME ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex-shrink-0"
            style={{ perspective: 1000 }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center"
            >
              {/* 🔄 Rotating "Cycle" Gradient Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full p-[3px]"
                style={{
                  background:
                    'conic-gradient(from 0deg, #22d3ee, #3b82f6, #a855f7, #22d3ee)',
                }}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-950" />
              </motion.div>

              {/* Dashed secondary ring - opposite rotation */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-400/30"
              />

              {/* Orbiting Tech Icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 md:-inset-8"
              >
                {orbitIcons.map((item, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-full h-full"
                    style={{ transform: `rotate(${item.angle}deg)` }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full glass flex items-center justify-center text-lg md:text-xl shadow-lg"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Photo with 3D Tilt */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl z-10"
              >
                <img
                  src="/pravesh.png"
                  alt="Pravesh Yadav"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
              </motion.div>

              {/* Floating Stat Badge - DSA */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 sm:-left-8 top-6 glass rounded-2xl px-3 py-2 shadow-xl z-20"
              >
                <p className="text-lg font-bold gradient-text leading-none">200+</p>
                <p className="text-[10px] text-muted whitespace-nowrap">DSA Questions Solved</p>
              </motion.div>

              {/* Floating Stat Badge - Stack */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 sm:-right-8 bottom-8 glass rounded-2xl px-3 py-2 shadow-xl z-20"
              >
                <p className="text-sm font-bold text-heading leading-none ">MERN</p>
                <p className="text-[10px] text-muted whitespace-nowrap"><b>Stack Developer</b></p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - desktop only */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="hidden md:flex absolute -bottom-6 left-1/2 -translate-x-1/2"
        >
          <Link to="about" smooth duration={500}>
            <FiChevronDown size={28} className="text-cyan-500 dark:text-cyan-400/70 cursor-pointer" />
          </Link>
        </motion.div>
      </div>

      {/* ================= 📱 MOBILE APP-STYLE BOTTOM DOCK ================= */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="md:hidden fixed bottom-4 left-4 right-4 z-40"
      >
        <div className="glass rounded-2xl shadow-2xl px-5 py-3 flex items-center justify-between backdrop-blur-2xl">
          <a href="https://github.com/125praveshyadav" target="_blank" rel="noopener noreferrer"
             className="p-2.5 rounded-xl active:scale-90 transition-transform text-slate-700 dark:text-slate-300">
            <FaGithub size={20} />
          </a>
          <a href="https://in.linkedin.com/in/pravesh-yadav-99b6a3312" target="_blank" rel="noopener noreferrer"
             className="p-2.5 rounded-xl active:scale-90 transition-transform text-slate-700 dark:text-slate-300">
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:your.125praveshyadav@gmail.com"
             className="p-2.5 rounded-xl active:scale-90 transition-transform text-slate-700 dark:text-slate-300">
            <HiOutlineMail size={20} />
          </a>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700" />
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-80}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold active:scale-95 transition-transform cursor-pointer"
          >
            Hire Me
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero