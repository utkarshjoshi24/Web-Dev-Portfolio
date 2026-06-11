import { useMemo, useState } from 'react';
import { SECTIONS, PROJECTS } from '../utils/constants';

function ProjectCard({ project, index, localProgress }) {
  const [hovered, setHovered] = useState(false);
  const staggerDelay = index * 0.08;
  const cardProgress = Math.max(0, Math.min(1, (localProgress - staggerDelay) / 0.25));

  return (
    <div
      className="glass-panel"
      data-interactive
      style={{
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        opacity: cardProgress,
        transform: `translateY(${(1 - cardProgress) * 30}px) scale(${0.95 + cardProgress * 0.05})`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        borderColor: hovered ? 'rgba(174, 198, 255, 0.2)' : undefined,
        boxShadow: hovered ? '0 0 40px rgba(0, 112, 243, 0.1)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient header */}
      <div style={{
        height: '140px',
        background: project.gradient,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(20,20,20,0.9) 100%)',
        }} />
        {/* Category badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          color: 'rgba(255,255,255,0.8)',
        }}>
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 className="text-headline-md" style={{
          color: 'var(--color-on-surface)',
          marginBottom: '0.75rem',
          fontSize: '1.125rem',
        }}>
          {project.title}
        </h3>
        <p className="text-body-md" style={{
          color: 'var(--color-on-surface-variant)',
          marginBottom: '1.25rem',
          lineHeight: 1.6,
          fontSize: '0.875rem',
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.375rem',
        }}>
          {project.tags.map((tag, j) => (
            <span key={j} style={{
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              background: 'var(--color-surface-container)',
              color: 'var(--color-on-surface-variant)',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ scrollProgress }) {
  const sectionRange = SECTIONS[4].range;
  const [activeFilter, setActiveFilter] = useState('All');

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

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));
  }, [activeFilter]);

  if (visibility.opacity <= 0) return null;

  const filters = ['All', 'Full-Stack', '3D', 'React'];

  return (
    <div className="section-container" style={{
      opacity: visibility.opacity,
      flexDirection: 'column',
      alignItems: 'stretch',
    }}>
      <div className="section-inner">
        {/* Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2rem',
          gap: '1rem',
        }}>
          <div>
            <h2 className="text-headline-lg" style={{
              color: 'var(--color-on-surface)',
              marginBottom: '0.5rem',
            }}>
              Projects
            </h2>
            <p className="text-body-md text-muted" style={{ maxWidth: '400px' }}>
              A curated gallery of full-stack applications and immersive 3D experiments.
            </p>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            {filters.map((f) => (
              <button
                key={f}
                data-interactive
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.375rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: activeFilter === f ? 'var(--color-primary-container)' : 'rgba(255,255,255,0.05)',
                  color: activeFilter === f ? '#fff' : 'var(--color-on-surface-variant)',
                  border: activeFilter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              localProgress={visibility.localP}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
