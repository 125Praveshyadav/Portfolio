import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa'

/* ========== Setup ==========
   1. Go to https://web3forms.com and enter your email -> you get an Access Key by mail.
   2. Create a `.env` file in the project root:
        VITE_WEB3FORMS_KEY=your_access_key_here
   3. Restart the dev server. Every form submission will land in your inbox.
   (Access keys are meant to be public; they can only send to the email you registered.) */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const contactLinks = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: '125praveshyadav@gmail.com',
    href: 'mailto:125praveshyadav@gmail.com',
    external: false,
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: '125Praveshyadav',
    href: 'https://github.com/125Praveshyadav',
    external: true,
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'Pravesh Yadav',
    href: 'https://in.linkedin.com/in/pravesh-yadav-99b6a3312',
    external: true,
  },
]

const initialForm = { name: '', email: '', message: '' }

const validate = ({ name, email, message }) => {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

const inputBase =
  'w-full rounded-xl border bg-slate-100/80 px-3.5 py-2.5 text-sm text-heading placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:bg-slate-800/60 dark:placeholder:text-slate-500'

const Field = ({ label, id, error, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
        {error}
      </p>
    )}
  </div>
)

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [honeypot, setHoneypot] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    // Bots fill hidden fields; pretend success and drop the request.
    if (honeypot) {
      setStatus('success')
      setForm(initialForm)
      return
    }

    if (!ACCESS_KEY) {
      console.error('Missing VITE_WEB3FORMS_KEY in your .env file.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New portfolio message from ${form.name.trim()}`,
          from_name: 'Portfolio Contact Form',
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm(initialForm)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* ========== Heading ========== */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-2 text-3xl font-bold text-heading md:text-4xl">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          <p className="mx-auto max-w-xl text-sm text-muted">
            Have an opportunity or just want to connect? I would love to hear from you.
          </p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto grid max-w-5xl gap-5 md:grid-cols-5"
        >
          {/* ========== Contact info ========== */}
          <div className="glass h-fit rounded-3xl border border-slate-200/80 p-2 shadow-xl dark:border-slate-700/60 md:col-span-2">
            <ul>
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-base text-cyan-600 ring-1 ring-inset ring-cyan-500/20 transition-colors duration-200 group-hover:bg-cyan-500/20 dark:text-cyan-400">
                      {link.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{link.label}</span>
                      <span className="block truncate text-sm font-medium text-heading">
                        {link.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== Form ========== */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass space-y-4 rounded-3xl border border-slate-200/80 p-5 shadow-xl dark:border-slate-700/60 sm:p-6 md:col-span-3"
          >
            {/* Honeypot: hidden from people, visible to bots */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" id="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`${inputBase} ${errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                />
              </Field>

              <Field label="Your email" id="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                />
              </Field>
            </div>

            <Field label="Message" id="message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Let's talk about..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputBase} resize-none ${errors.message ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
              />
            </Field>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-xs" />
                  Send message
                </>
              )}
            </button>

            {/* Result message */}
            <div aria-live="polite" className="min-h-[1.25rem]">
              {status === 'success' && (
                <p className="flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <FaCheckCircle /> Message sent. I will get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center justify-center gap-2 text-sm text-red-500">
                  <FaExclamationCircle /> Could not send the message. Please try again in a moment.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact