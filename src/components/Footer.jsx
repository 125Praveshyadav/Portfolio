import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="container-custom flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link to="hero" smooth duration={500} className="cursor-pointer text-lg font-bold">
          <span className="gradient-text">Pravesh</span>
          <span className="text-heading">.dev</span>
        </Link>

        <p className="order-3 flex items-center gap-1.5 text-sm text-muted md:order-2">
          © {new Date().getFullYear()} Pravesh Yadav. Made with{' '}
          <FaHeart className="text-red-500" size={12} aria-label="love" /> in React
        </p>

        <div className="order-2 flex items-center gap-4 md:order-3">
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-70}
            className="cursor-pointer text-sm text-muted transition-colors hover:text-cyan-500"
          >
            Contact
          </Link>
          <a
            href="https://github.com/125Praveshyadav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-cyan-500"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://in.linkedin.com/in/pravesh-yadav-99b6a3312"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-cyan-500"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer