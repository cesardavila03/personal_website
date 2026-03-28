import { Github, Linkedin, Mail } from 'lucide-react';

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

export default function ContactSection() {
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
      </div>
    </section>
  );
}
