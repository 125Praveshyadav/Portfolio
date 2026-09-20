import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { FiDownload, FiArrowUpRight } from 'react-icons/fi'
import resume from '../Documents/Resume.pdf';

const navLinks = [
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'DSA', to: 'dsa' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' },
]

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)

      let current = 'about'

      for (const link of navLinks) {
        const section = document.getElementById(link.to)
        if (section) {
          const sectionTop = section.offsetTop - 140
          if (scrollY >= sectionTop) {
            current = link.to
          }
        }
      }

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 z-[60] h-[2px] w-full bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        />
      </div>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6"
      >
        <div className="container-custom">
          <div
            className={`mt-3 rounded-[24px] transition-all duration-300 ${
              scrolled
                ? 'glass shadow-2xl shadow-cyan-500/5 border border-slate-200/70 dark:border-slate-700/60'
                : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 py-3">
              {/* Logo */}
              <Link
                to="hero"
                smooth
                duration={500}
                offset={-80}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                  <span className="text-white text-lg font-bold">P</span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-white dark:ring-slate-950 animate-pulse" />
                </div>

                <div className="leading-tight">
                  <h1 className="text-sm sm:text-base font-bold text-heading">
                    Pravesh <span className="gradient-text">Yadav</span>
                  </h1>
                  <p className="text-[11px] sm:text-xs text-muted">
                    Software Engineer Portfolio
                  </p>
                </div>
              </Link>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.to
                  return (
                    <Link
                      key={link.name}
                      to={link.to}
                      smooth
                      duration={500}
                      offset={-90}
                      spy={true}
                      className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                          : 'text-body hover:text-heading hover:bg-white/70 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </div>

              {/* Right actions desktop */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-heading hover:-translate-y-0.5 hover:border-cyan-400/30 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {darkMode ? <BsSunFill size={18} /> : <BsMoonStarsFill size={18} />}
                </button>

                <a
                  href={resume}
                  download
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-300"
                >
                  <FiDownload />
                  Resume
                </a>
              </div>

              {/* Mobile actions */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-10 h-10 rounded-2xl glass flex items-center justify-center text-heading transition-all duration-300 active:scale-95"
                  aria-label="Toggle theme"
                >
                  {darkMode ? <BsSunFill size={16} /> : <BsMoonStarsFill size={16} />}
                </button>

                <button
                  onClick={() => setIsOpen(true)}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-300"
                  aria-label="Open menu"
                >
                  <HiOutlineMenuAlt3 size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 top-4 z-50 md:hidden"
            >
              <div className="glass rounded-[28px] shadow-2xl border border-slate-200/80 dark:border-slate-700/70 overflow-hidden">
                {/* Mobile top */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700/60">
                  <div>
                    <h3 className="text-lg font-bold text-heading">Navigation</h3>
                    <p className="text-xs text-muted">Explore portfolio sections</p>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-heading flex items-center justify-center active:scale-95 transition-all"
                    aria-label="Close menu"
                  >
                    <HiX size={22} />
                  </button>
                </div>

                {/* Links */}
                <div className="p-4 space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.to
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.to}
                          smooth
                          duration={500}
                          offset={-85}
                          spy={true}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-400/20'
                              : 'bg-slate-100 dark:bg-slate-800/70 text-body hover:text-heading'
                          }`}
                        >
                          <span className="font-medium">{link.name}</span>
                          <FiArrowUpRight className={isActive ? 'opacity-100' : 'opacity-50'} />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Bottom actions */}
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-heading font-medium active:scale-95 transition-all"
                    >
                      {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
                      {darkMode ? 'Light' : 'Dark'}
                    </button>

                    <a
                      href="/images/resume.pdf"
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold active:scale-95 transition-all"
                    >
                      <FiDownload />
                      Resume
                    </a>
                  </div>

                  <div className="mt-4 p-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40">
                    <div className="rounded-2xl bg-white dark:bg-slate-950 px-4 py-3">
                      <p className="text-xs text-muted">Currently</p>
                      <p className="text-sm font-semibold text-heading">
                        Open to internships & software roles
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar