import { EXPERIENCE } from '../data/experience';

function companyInitials(company = '') {
  return company
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Experience</p>
          <h2>Progressively solving harder engineering problems.</h2>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((item, index) => (
            <article className="timeline-item reveal" key={`${item.company}-${item.role}`} style={{ transitionDelay: `${index * 50}ms` }}>
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-role-row">
                <span className="timeline-company-logo" aria-hidden="true">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={item.darkInvert ? 'logo-invert-dark' : undefined}
                    />
                  ) : (
                    <span className="timeline-company-fallback">{companyInitials(item.company)}</span>
                  )}
                </span>
                <div className="timeline-role-text">
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                </div>
              </div>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
