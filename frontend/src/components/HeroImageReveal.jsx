import { useEffect, useMemo, useRef, useState } from 'react';

function hasFinePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function allowsMotion() {
  if (typeof window === 'undefined') return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const DEFAULT_TRAIL_CONFIG = {
  lingerMs: 550,
  spawnIntervalMs: 22,
  maxStamps: 24,
  stampRadiusPx: 84,
};

export default function HeroImageReveal({
  baseSrc,
  overlaySrc,
  alt,
  overlayAdjust = { x: 0, y: 0, scale: 1 },
  trailConfig = DEFAULT_TRAIL_CONFIG,
}) {
  const frameRef = useRef(null);
  const spawnRef = useRef(0);
  const stampIdRef = useRef(0);
  const rootRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [stamps, setStamps] = useState([]);
  const [overlayReady, setOverlayReady] = useState(true);

  const interactive = useMemo(() => hasFinePointer() && allowsMotion(), []);
  const mergedConfig = { ...DEFAULT_TRAIL_CONFIG, ...trailConfig };

  useEffect(
    () => () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!interactive || !overlayReady) return undefined;
    if (!isActive && stamps.length === 0) return undefined;

    const tick = () => {
      const now = performance.now();
      setStamps((prev) => prev.filter((stamp) => now - stamp.createdAt <= mergedConfig.lingerMs));
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [interactive, isActive, overlayReady, stamps.length, mergedConfig.lingerMs]);

  const getRelativePointer = (clientX, clientY) => {
    if (!rootRef.current) return null;

    const rect = rootRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);

    return { x, y };
  };

  const addStamp = (x, y) => {
    const now = performance.now();

    setStamps((prev) => {
      const next = [...prev, { id: stampIdRef.current, x, y, createdAt: now }];
      stampIdRef.current += 1;
      if (next.length > mergedConfig.maxStamps) {
        return next.slice(next.length - mergedConfig.maxStamps);
      }
      return next;
    });
  };

  const onEnter = (event) => {
    if (!interactive) return;
    setIsActive(true);
    const point = getRelativePointer(event.clientX, event.clientY);
    if (!point) return;
    addStamp(point.x, point.y);
    spawnRef.current = performance.now();
  };

  const onMove = (event) => {
    if (!interactive || !isActive) return;
    const now = performance.now();
    if (now - spawnRef.current < mergedConfig.spawnIntervalMs) return;
    const point = getRelativePointer(event.clientX, event.clientY);
    if (!point) return;
    addStamp(point.x, point.y);
    spawnRef.current = now;
  };

  const onLeave = () => {
    if (!interactive) return;
    setIsActive(false);
  };

  const maskImage = useMemo(() => {
    if (!interactive || stamps.length === 0) return 'none';

    const now = performance.now();
    const gradients = stamps
      .map((stamp) => {
        const age = now - stamp.createdAt;
        const progress = Math.min(Math.max(age / mergedConfig.lingerMs, 0), 1);
        const alpha = Math.max(1 - progress, 0);
        if (alpha <= 0.01) return '';

        const inner = alpha.toFixed(3);
        const mid = (alpha * 0.75).toFixed(3);
        return `radial-gradient(circle ${mergedConfig.stampRadiusPx}px at ${stamp.x}px ${stamp.y}px, rgba(0,0,0,${inner}) 0%, rgba(0,0,0,${mid}) 55%, rgba(0,0,0,0) 100%)`;
      })
      .filter(Boolean);

    return gradients.length > 0 ? gradients.join(', ') : 'none';
  }, [interactive, stamps, mergedConfig.lingerMs, mergedConfig.stampRadiusPx]);

  const overlayStyle = {
    transform: `translate(${overlayAdjust.x}px, ${overlayAdjust.y}px) scale(${overlayAdjust.scale})`,
    transformOrigin: 'center bottom',
  };

  if (interactive) {
    overlayStyle.maskImage = maskImage;
    overlayStyle.WebkitMaskImage = maskImage;
  }

  const hasTrail = interactive && stamps.length > 0;

  return (
    <figure
      ref={rootRef}
      className={`hero-reveal ${isActive || hasTrail ? 'is-active' : ''} ${interactive && overlayReady ? '' : 'is-static'}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <img
        className="hero-reveal-base"
        src={baseSrc}
        alt={alt}
        draggable="false"
      />
      {overlayReady && (
        <img
          className="hero-reveal-overlay"
          src={overlaySrc}
          alt=""
          aria-hidden="true"
          draggable="false"
          onError={() => setOverlayReady(false)}
          style={overlayStyle}
        />
      )}
    </figure>
  );
}
