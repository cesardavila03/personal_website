import { useMemo, useState } from 'react';

import texasLonghornsLogo from '../assets/logos/texas-longhorns.svg';
import freeCodeCampLogo from '../assets/logos/freeCodeCamp.svg';
import harvardLogo from '../assets/logos/harvard.svg';
import oracleNetsuiteLogo from '../assets/logos/oracle-netsuite.svg';

const EDUCATION = [
  {
    institution: 'The University of Texas at Austin',
    logo: texasLonghornsLogo,
    credential: 'Bachelor of Science in Kinesiology and Health',
    period: 'May 2020',
    details:
      'Relevant coursework: Probability and Statistics, Computers and Programming.',
  },
];

const CERTIFICATIONS = [
  {
    provider: 'Oracle NetSuite',
    title: 'NetSuite Certified Administrator',
    logo: oracleNetsuiteLogo,
    period: 'Oct 2023',
    category: 'professional',
    certificateUrl: '/certificates/netsuite-certified-administrator.pdf',
  },
  {
    provider: 'Oracle NetSuite',
    title: 'NetSuite Certified ERP Consultant',
    logo: oracleNetsuiteLogo,
    period: 'Oct 2024',
    category: 'professional',
    certificateUrl: '/certificates/netsuite-certified-erp-consultant.pdf',
  },
  {
    provider: 'Oracle NetSuite',
    title: 'NetSuite Certified Financial User',
    logo: oracleNetsuiteLogo,
    period: 'Dec 2022',
    category: 'professional',
    certificateUrl: '/certificates/netsuite-certified-financial-user.pdf',
  },
  {
    provider: 'Oracle NetSuite',
    title: 'NetSuite Certified SuiteFoundation',
    logo: oracleNetsuiteLogo,
    period: 'Jun 2022',
    category: 'professional',
    certificateUrl: '/certificates/netsuite-certified-suitefoundation.pdf',
  },
  {
    provider: 'Harvard University',
    title: 'CS50: Introduction to Computer Science',
    logo: harvardLogo,
    period: 'Jul 2024',
    category: 'technical',
  },
  {
    provider: 'freeCodeCamp',
    title: 'Python for Everybody',
    logo: freeCodeCampLogo,
    period: 'May 2024',
    category: 'technical',
  },
];

const FILTER_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'technical', label: 'Technical' },
  { key: 'professional', label: 'Professional' },
];

const MONTH_TO_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseCertificationPeriod(period) {
  const [monthRaw, yearRaw] = period.split(' ');
  const month = MONTH_TO_INDEX[monthRaw?.slice(0, 3).toLowerCase()] ?? 0;
  const year = Number.parseInt(yearRaw, 10);

  return new Date(Number.isNaN(year) ? 0 : year, month, 1).getTime();
}

export default function EducationSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sortedCertifications = useMemo(
    () =>
      [...CERTIFICATIONS].sort(
        (a, b) =>
          parseCertificationPeriod(b.period) - parseCertificationPeriod(a.period),
      ),
    [],
  );

  const filteredCertifications = useMemo(() => {
    if (activeFilter === 'all') {
      return sortedCertifications;
    }

    return sortedCertifications.filter((item) => item.category === activeFilter);
  }, [activeFilter, sortedCertifications]);

  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Education</p>
          <h2>Foundation and continued growth.</h2>
        </div>

        <div className="education-grid">
          <article className="education-card reveal">
            <h3>Degree</h3>
            {EDUCATION.map((item) => (
              <div
                key={`${item.institution}-${item.period}`}
                className="education-item"
              >
                <div className="education-item-head">
                  {item.logo ? (
                    <div className="education-item-logo" aria-hidden="true">
                      <img
                        src={item.logo}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                  <div className="education-item-meta">
                    <p className="education-item-period">{item.period}</p>
                    <h4>{item.institution}</h4>
                  </div>
                </div>
                <p className="education-item-title">{item.credential}</p>
                <p>{item.details}</p>
              </div>
            ))}
          </article>

          <article className="education-card reveal">
            <div className="education-cert-header">
              <h3>Certifications</h3>
              <div
                className="education-cert-filters"
                role="group"
                aria-label="Filter certifications"
              >
                {FILTER_OPTIONS.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`education-cert-filter ${activeFilter === filter.key ? 'is-active' : ''}`}
                    aria-pressed={activeFilter === filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="education-cert-timeline" aria-label="Certifications">
              {filteredCertifications.map((item) => (
                <article
                  key={`${item.provider}-${item.title}`}
                  className="education-cert-timeline-item"
                >
                  <div className="education-cert-card">
                    <p className="education-cert-period">{item.period}</p>
                    <div className="education-cert-content">
                      {item.logo ? (
                        <span className="education-cert-logo" aria-hidden="true">
                          <img
                            src={item.logo}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className={
                              item.provider === 'freeCodeCamp' ||
                              item.provider === 'Oracle NetSuite'
                                ? 'logo-invert-dark'
                                : undefined
                            }
                          />
                        </span>
                      ) : null}
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.provider}</p>
                      </div>
                    </div>
                    {item.certificateUrl ? (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary education-cert-link"
                      >
                        View Certificate
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
