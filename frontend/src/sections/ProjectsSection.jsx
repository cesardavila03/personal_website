import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';

export default function ProjectsSection() {
  const visibleProjects = PROJECTS.filter(
    (project) =>
      project?.title &&
      project?.description &&
      project?.github_url &&
      Array.isArray(project?.tech_stack) &&
      project.tech_stack.length > 0
  );

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Projects</p>
          <h2>Selected work with production mindset.</h2>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
