import { useMemo } from 'react';
import { SECTIONS, SERVICES } from '../utils/constants';

export default function ServicesSection({ scrollProgress }) {
  const sectionRange = SECTIONS[5].range;

  const visibility = useMemo(() => {
    const rangeLen = sectionRange[1] - sectionRange[0];
    const localP = (scrollProgress - sectionRange[0]) / rangeLen;

    // Fade in from 0 to 0.2, fully visible 0.2-0.8, fade out 0.8-1
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

  return (
    <div className="section-container" style={visibility}>
      <div className="section-inner">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="text-headline-lg" style={{
            color: 'var(--color-secondary)',
            marginBottom: '0.75rem',
          }}>
            🌀 System Operations (Services)
          </h2>
          <div style={{
            width: '5rem',
            height: '3px',
            background: 'var(--color-secondary-container)',
            borderRadius: 'var(--radius-full)',
          }} />
        </div>

        {/* Services Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="services-grid"
        >
          {SERVICES.map((srv, i) => (
            <div
              key={i}
              className="glass-panel"
              data-interactive
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 'var(--radius-2xl)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(219, 184, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.querySelector('.srv-icon').style.transform = 'scale(1.2) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.srv-icon').style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div
                className="srv-icon"
                style={{
                  fontSize: '2.5rem',
                  transition: 'transform 0.3s ease',
                  width: 'fit-content',
                }}
              >
                {srv.icon}
              </div>
              <h3 className="text-headline-md" style={{ color: '#fff' }}>
                {srv.title}
              </h3>
              <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {srv.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
