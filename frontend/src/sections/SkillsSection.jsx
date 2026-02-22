import awsLogo from '../assets/logos/aws.svg';
import cssLogo from '../assets/logos/css3.svg';
import fastApiLogo from '../assets/logos/fastapi.svg';
import gitLogo from '../assets/logos/git.svg';
import githubActionsLogo from '../assets/logos/github-actions.svg';
import goLogo from '../assets/logos/go.svg';
import htmlLogo from '../assets/logos/html5.svg';
import javascriptLogo from '../assets/logos/javascript.svg';
import openApiLogo from '../assets/logos/openapi.svg';
import postgresqlLogo from '../assets/logos/postgresql.svg';
import pytestLogo from '../assets/logos/pytest.svg';
import pythonLogo from '../assets/logos/python.svg';
import reactLogo from '../assets/logos/react.svg';

const LOGO_BY_SKILL = {
  Python: pythonLogo,
  JavaScript: javascriptLogo,
  React: reactLogo,
  Go: goLogo,
  SQL: postgresqlLogo,
  HTML: htmlLogo,
  CSS: cssLogo,
  FastAPI: fastApiLogo,
  AWS: awsLogo,
  'REST APIs': openApiLogo,
  Pytest: pytestLogo,
  'CI/CD': githubActionsLogo,
  Git: gitLogo,
};

const SKILL_GROUPS = {
  languages: ['Python', 'JavaScript', 'React', 'Go', 'SQL', 'HTML', 'CSS'],
  technologies: ['FastAPI', 'AWS', 'REST APIs', 'Pytest', 'CI/CD', 'Git'],
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Skills</p>
          <h2>Tools I work with.</h2>
        </div>

        <div className="skills-groups">
          <div className="skills-group reveal">
            <h3>Languages</h3>
            <ul className="skills-pills" aria-label="Programming languages">
              {SKILL_GROUPS.languages.map((skill, index) => {
                const logo = LOGO_BY_SKILL[skill];
                return (
                  <li style={{ transitionDelay: `${index * 35}ms` }} className="reveal" key={skill}>
                    <span className="skill-pill-content">
                      {logo ? (
                        <img
                          src={logo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          aria-hidden="true"
                          className={skill === 'AWS' ? 'logo-invert-dark' : undefined}
                        />
                      ) : null}
                      <span>{skill}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="skills-group reveal">
            <h3>Technologies</h3>
            <ul className="skills-pills" aria-label="Technologies">
              {SKILL_GROUPS.technologies.map((skill, index) => {
                const logo = LOGO_BY_SKILL[skill];
                return (
                  <li style={{ transitionDelay: `${index * 35}ms` }} className="reveal" key={skill}>
                    <span className="skill-pill-content">
                      {logo ? (
                        <img
                          src={logo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          aria-hidden="true"
                          className={skill === 'AWS' ? 'logo-invert-dark' : undefined}
                        />
                      ) : null}
                      <span>{skill}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
