import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'TedBus',
    subtitle: 'Bus Ticket Booking and Travelling Platform',
    description:
      'A full-featured MERN stack bus ticket booking platform with authentication, real-time bus search, interactive seat selection, secure payment integration, and a complete admin dashboard for managing routes and bookings.',
    image: '/tedbus.png',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    features: ['User Authentication', 'Seat Selection UI', 'Payment Integration', 'Admin Dashboard'],
    github: 'https://github.com/125Praveshyadav/TedBus',
    live: 'https://tedbus-frontend.vercel.app/',
    featured: true,
  },
 
]

const ProjectCard = ({ project, index, isInView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`glass rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`grid ${project.featured ? 'md:grid-cols-2' : ''} h-full`}>
        {/* Image */}
        <div className="relative overflow-hidden h-56 md:h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-cyan-500 text-slate-950 rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
            <p className="text-cyan-400 text-sm font-medium mb-4">{project.subtitle}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/70 text-slate-300 border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <ul className="grid grid-cols-2 gap-2 mb-6">
              {project.features.map((f) => (
                <li key={f} className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
            >
              <FaGithub /> Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-medium transition-all"
            >
              <FaExternalLinkAlt size={12} /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding bg-slate-900/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Real-world applications built with modern technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects