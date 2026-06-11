import { useMemo } from 'react';
import { SECTIONS } from '../utils/constants';

export default function AboutSection({ scrollProgress }) {
  const sectionRange = SECTIONS[1].range;

  const visibility = useMemo(() => {
    const rangeLen = sectionRange[1] - sectionRange[0];
    const localP = (scrollProgress - sectionRange[0]) / rangeLen;

    // Fade in from 0 to 0.3, fully visible 0.3-0.7, fade out 0.7-1
    let opacity = 0;
    if (localP >= 0 && localP <= 0.2) {
      opacity = localP / 0.2;
    } else if (localP > 0.2 && localP <= 0.8) {
      opacity = 1;
    } else if (localP > 0.8 && localP <= 1) {
      opacity = 1 - ((localP - 0.8) / 0.2);
    }

    const translateY = localP < 0.2 ? (1 - localP / 0.2) * 40 : 0;

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.1 ? 'auto' : 'none',
    };
  }, [scrollProgress, sectionRange]);

  if (visibility.opacity <= 0) return null;

  const capabilities = [
    { icon: '⚡', label: 'MERN Stack', color: 'var(--color-primary)' },
    { icon: '🎲', label: 'Three.js / 3D', color: 'var(--color-tertiary)' },
    { icon: '🎬', label: 'GSAP Motion', color: 'var(--color-secondary)' },
    { icon: '🚀', label: 'High Perf', color: '#ffb4ab' },
  ];

  return (
    <div className="section-container" style={visibility}>
      <div className="section-inner">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="about-grid"
        >
          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: '-1rem',
              background: 'radial-gradient(circle, rgba(0,112,243,0.15) 0%, transparent 70%)',
              borderRadius: 'var(--radius-2xl)',
              filter: 'blur(20px)',
              opacity: 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
            }}
            className="about-photo-glow"
            />
            <img
              src="/profile.jpg"
              alt="Utkarsh Joshi"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                objectFit: 'cover',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid rgba(255,255,255,0.08)',
                filter: 'grayscale(100%)',
                transition: 'filter 0.7s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'grayscale(0%)';
                e.target.previousSibling.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = 'grayscale(100%)';
                e.target.previousSibling.style.opacity = '0';
              }}
              data-interactive
            />
          </div>

          {/* Content */}
          <div className="glass-panel" style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius-2xl)',
          }}>
            <h2 className="text-headline-lg" style={{
              color: 'var(--color-primary)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{ fontSize: '1.5rem' }}>🔐</span> About Me
            </h2>

            <p className="text-body-lg" style={{
              color: 'var(--color-on-surface-variant)',
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}>
              Based at the intersection of technical precision and creative expression,
              I specialize in crafting high-performance web ecosystems. My approach merges
              the robust reliability of the MERN stack with the fluid, immersive possibilities
              of 3D web technologies.
            </p>

            {/* Capability cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
            }}>
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  data-interactive
                  style={{
                    background: 'var(--color-surface-container)',
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cap.color}44`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.25rem', display: 'block', marginBottom: '0.375rem' }}>
                    {cap.icon}
                  </span>
                  <span className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>
                    {cap.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
