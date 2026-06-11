import { useMemo } from 'react';
import { SECTIONS, EXPERIENCE } from '../utils/constants';

export default function ExperienceSection({ scrollProgress }) {
  const sectionRange = SECTIONS[3].range;

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
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="text-headline-lg" style={{
            color: 'var(--color-primary)',
            marginBottom: '0.75rem',
          }}>
            🛰️ Flight Log (Experience)
          </h2>
          <div style={{
            width: '5rem',
            height: '3px',
            background: 'var(--color-primary-container)',
            borderRadius: 'var(--radius-full)',
          }} />
        </div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingLeft: '2rem',
          borderLeft: '2px solid rgba(0, 221, 214, 0.2)',
        }}>
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className="glass-panel"
              data-interactive
              style={{
                position: 'relative',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--radius-xl)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 221, 214, 0.3)';
                e.currentTarget.querySelector('.timeline-dot').style.background = '#00ddd6';
                e.currentTarget.querySelector('.timeline-dot').style.boxShadow = '0 0 12px #00ddd6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.querySelector('.timeline-dot').style.background = '#131313';
                e.currentTarget.querySelector('.timeline-dot').style.boxShadow = 'none';
              }}
            >
              {/* Timeline dot */}
              <div
                className="timeline-dot"
                style={{
                  position: 'absolute',
                  left: '-2.7rem',
                  top: '2rem',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#131313',
                  border: '2px solid #00ddd6',
                  zIndex: 2,
                  transition: 'all 0.3s ease',
                }}
              />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                <div>
                  <h3 className="text-headline-md" style={{ color: '#fff', fontSize: '1.15rem' }}>
                    {exp.role}
                  </h3>
                  <span className="text-label-md" style={{ color: 'var(--color-primary)' }}>
                    {exp.company}
                  </span>
                </div>
                <span className="text-label-sm" style={{
                  color: 'var(--color-on-surface-variant)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  height: 'fit-content',
                }}>
                  {exp.period}
                </span>
              </div>
              <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
