import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import HeroImageReveal from '../components/HeroImageReveal';
import basePortrait from '../assets/hero/cesar-portrait-casual.png';

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffsetY(window.scrollY * 0.15);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="hero" aria-label="Intro">
      <div
        className="hero-background"
        style={{ transform: `translateY(${offsetY}px)` }}
      />
      <div className="container hero-layout fade-in-load">
        <div className="hero-copy">
          <p className="hero-eyebrow">Hi, I&apos;m</p>
          <h1>Cesar Davila.</h1>
          <h2>Software Engineer | Builder | Problem Solver.</h2>
          <p className="hero-subline">
            Designing systems that scale. Writing code that lasts.
          </p>
          <a href="#projects" className="btn btn-primary">
            View Work
          </a>
        </div>
        <div className="hero-visual">
          <HeroImageReveal
            baseSrc={basePortrait}
            alt="Portrait of Cesar Davila"
          />
        </div>
      </div>
      <a
        href="#about"
        className="scroll-indicator"
        aria-label="Scroll to about section"
      >
        <ArrowDown aria-hidden="true" size={28} strokeWidth={2.5} />
      </a>
    </section>
  );
}
