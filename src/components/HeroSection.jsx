import { useMemo } from 'react';
import { SECTIONS } from '../utils/constants';

export default function HeroSection({ scrollProgress }) {
  const sectionRange = SECTIONS[0].range;
  
  const style = useMemo(() => {
    // Visible at the start, fade out as we leave hero
    const progress = Math.min(1, Math.max(0, (scrollProgress - sectionRange[0]) / (sectionRange[1] - sectionRange[0])));
    const opacity = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3);
    const translateY = -progress * 60;
    const scale = 1 - progress * 0.08;

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px) scale(${scale})`,
    };
  }, [scrollProgress, sectionRange]);

  return (
    <div
      className="section-container"
      style={{
        ...style,
        flexDirection: 'column',
        textAlign: 'center',
        gap: '0',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <p
          className="text-label-sm"
          style={{
            color: 'var(--color-tertiary)',
            marginBottom: '1rem',
            opacity: 0.8,
            letterSpacing: '0.2em',
          }}
        >
          WELCOME TO MY UNIVERSE
        </p>
      </div>

      {/* Name with parallax - moves slower */}
      <h1
        className="text-display"
        style={{
          color: '#fff',
          marginBottom: '1rem',
          textShadow: '0 0 80px rgba(0, 112, 243, 0.3), 0 0 40px rgba(107, 7, 186, 0.2)',
          transform: `translateY(${(scrollProgress * 100) * -0.3}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        Utkarsh Joshi
      </h1>

      {/* Subtitle - moves faster (parallax) */}
      <p
        className="text-headline-md"
        style={{
          color: 'var(--color-primary)',
          marginBottom: '2.5rem',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          transform: `translateY(${(scrollProgress * 100) * -0.15}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        MERN Stack Developer & 3D Web Experience Creator
      </p>

      {/* CTA Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}>
        <button
          className="btn-primary"
          data-interactive
          onClick={() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const targetScroll = SECTIONS[4].range[0] * docHeight;
            if (window.lenis) {
              window.lenis.scrollTo(targetScroll, { duration: 1.2 });
            } else {
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
          }}
        >
          Explore My Work
        </button>
        <button
          className="btn-ghost"
          data-interactive
          onClick={() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const targetScroll = SECTIONS[6].range[0] * docHeight;
            if (window.lenis) {
              window.lenis.scrollTo(targetScroll, { duration: 1.2 });
            } else {
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
          }}
        >
          Contact Me
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'heroFloat 2s ease-in-out infinite',
        }}
      >
        <span
          className="text-label-sm"
          style={{ color: 'var(--color-on-surface-variant)', letterSpacing: '0.15em' }}
        >
          SCROLL
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
