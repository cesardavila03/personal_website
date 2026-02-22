import aboutPortrait from '../assets/hero/cesar-portrait-casual.png';

export default function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">About</p>
          <h2>A bit about me.</h2>
        </div>

        <div className="about-content">
          <figure className="about-portrait reveal" aria-hidden="true">
            <img src={aboutPortrait} alt="" draggable="false" />
          </figure>

          <div className="about-bio reveal">
            <p>
              I transitioned from consulting into software engineering with a clear mission: build systems that work
              harder than the people using them. My focus is backend development, automation, and financial tools
              that scale.
            </p>
            <p>
              From designing CI/CD pipelines to building ML-informed workflows, I enjoy creating infrastructure that
              stays reliable, efficient, and maintainable under real-world pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
