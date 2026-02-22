import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const INITIAL_FORM = { name: '', email: '', message: '' };
const CONNECT_LINKS = [
  {
    id: 'email',
    href: 'mailto:cesardavila03@gmail.com',
    label: 'Email Cesar',
    icon: Mail,
  },
  {
    id: 'github',
    href: 'https://github.com/cesardavila03',
    label: 'Open GitHub profile',
    icon: Github,
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/cesardavila03',
    label: 'Open LinkedIn profile',
    icon: Linkedin,
  },
];

function buildMailtoHref({ name, email, message }) {
  const subject = `Portfolio contact from ${name.trim()}`;
  const body = [`Name: ${name.trim()}`, `Email: ${email.trim()}`, '', message.trim()].join('\n');

  return `mailto:cesardavila03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactSection() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter at least 2 characters.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = 'Please enter at least 10 characters.';
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('');
    setSubmitError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      window.location.href = buildMailtoHref(formData);
      setSuccess('Opening your email app to send the message.');
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      setSubmitError(err.message || 'Unable to open your email app right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-container reveal">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something meaningful.</h2>
          <p className="contact-subtitle">Have an idea or want to collaborate? Reach out.</p>
        </div>

        <div className="contact-connect reveal" aria-label="Connect links">
          {CONNECT_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="contact-connect-btn"
              aria-label={link.label}
              target={link.id === 'email' ? undefined : '_blank'}
              rel={link.id === 'email' ? undefined : 'noreferrer'}
            >
              <link.icon size={24} strokeWidth={1.9} aria-hidden="true" />
            </a>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} autoComplete="name" />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
          </div>

          <div className="contact-field contact-field-full">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} />
            {errors.message && <p className="field-error">{errors.message}</p>}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Preparing...' : 'Send Message'}
          </button>

          {success && <p className="form-success fade-in">{success}</p>}
          {submitError && <p className="field-error fade-in">{submitError}</p>}
        </form>
      </div>
    </section>
  );
}
