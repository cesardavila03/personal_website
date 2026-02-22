export default function ProjectCard({ project }) {
  return (
    <article className="project-card reveal">
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul className="project-tags" aria-label={`${project.title} tech stack`}>
          {project.tech_stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="project-actions">
        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-link">
          GitHub
        </a>
        <a href={project.details_url || project.github_url} target="_blank" rel="noreferrer" className="btn btn-secondary">
          View Details
        </a>
      </div>
    </article>
  );
}
