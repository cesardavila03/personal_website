export default function HeroImageReveal({
  baseSrc,
  alt,
}) {
  return (
    <figure className="hero-reveal">
      <img
        className="hero-reveal-base"
        src={baseSrc}
        alt={alt}
        draggable="false"
      />
    </figure>
  );
}
