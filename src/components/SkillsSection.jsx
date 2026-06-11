import { useMemo } from 'react';
import { SECTIONS, SKILLS } from '../utils/constants';

const colorMap = {
  primary: { accent: 'var(--color-primary)', bg: 'rgba(174, 198, 255, 0.08)', badge: 'rgba(174, 198, 255, 0.12)' },
  secondary: { accent: 'var(--color-secondary)', bg: 'rgba(219, 184, 255, 0.08)', badge: 'rgba(219, 184, 255, 0.12)' },
  tertiary: { accent: 'var(--color-tertiary)', bg: 'rgba(0, 221, 214, 0.08)', badge: 'rgba(0, 221, 214, 0.12)' },
};

function SkillCard({ data, index, localProgress }) {
  const colors = colorMap[data.color];
  const staggerDelay = index * 0.1;
  const cardProgress = Math.max(0, Math.min(1, (localProgress - staggerDelay) / 0.3));

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        borderRadius: 'var(--radius-2xl)',
        position: 'relative',
        overflow: 'hidden',
        opacity: cardProgress,
        transform: `translateY(${(1 - cardProgress) * 30}px)`,
        transition: 'border-color 0.3s ease',
      }}
      data-interactive
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${colors.accent}44`;
        e.currentTarget.querySelector('.skill-glow').style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.querySelector('.skill-glow').style.opacity = '0';
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="skill-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: colors.bg,
          opacity: 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      <h3 className="text-headline-md" style={{
        color: colors.accent,
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {data.title}
      </h3>

      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {data.items.map((skill, j) => (
          <li key={j} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span className="text-body-md" style={{ color: 'var(--color-on-surface)' }}>
              {skill.name}
            </span>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              background: colors.badge,
              color: colors.accent,
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-md)',
            }}>
              {skill.level}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillsSection({ scrollProgress }) {
  const sectionRange = SECTIONS[2].range;

  const visibility = useMemo(() => {
    const rangeLen = sectionRange[1] - sectionRange[0];
    const localP = (scrollProgress - sectionRange[0]) / rangeLen;

    let opacity = 0;
    if (localP >= 0 && localP <= 0.2) {
      opacity = localP / 0.2;
    } else if (localP > 0.2 && localP <= 0.8) {
      opacity = 1;
    } else if (localP > 0.8 && localP <= 1) {
      opacity = 1 - ((localP - 0.8) / 0.2);
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      localP: Math.max(0, Math.min(1, localP)),
    };
  }, [scrollProgress, sectionRange]);

  if (visibility.opacity <= 0) return null;

  return (
    <div className="section-container" style={{
      opacity: visibility.opacity,
      flexDirection: 'column',
    }}>
      <div className="section-inner">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="text-headline-lg" style={{
            color: 'var(--color-on-surface)',
            marginBottom: '0.75rem',
          }}>
            Technical Arsenal
          </h2>
          <div style={{
            width: '5rem',
            height: '3px',
            background: 'var(--color-primary-container)',
            borderRadius: 'var(--radius-full)',
          }} />
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="skills-grid"
        >
          {Object.values(SKILLS).map((skillGroup, i) => (
            <SkillCard
              key={i}
              data={skillGroup}
              index={i}
              localProgress={visibility.localP}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}
