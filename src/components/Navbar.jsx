import { useState, useEffect, useMemo } from 'react';
import { SECTIONS } from '../utils/constants';

export default function Navbar({ scrollProgress }) {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine active section
  const activeSection = useMemo(() => {
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      if (scrollProgress >= SECTIONS[i].range[0]) {
        return SECTIONS[i].id;
      }
    }
    return 'hero';
  }, [scrollProgress]);

  // Hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const scrollToSection = (id) => {
    const section = SECTIONS.find(s => s.id === id);
    if (!section) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = section.range[0] * docHeight;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'auto',
      }}
    >
      <div className="glass-panel" style={{
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      }}>
        <div style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--gutter)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            style={{
              background: 'none',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--color-primary)',
              cursor: 'pointer',
            }}
          >
            UJ<span style={{ color: 'var(--color-tertiary)' }}>.</span>
          </button>

          {/* Desktop nav links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
          className="nav-links-desktop"
          >
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  background: 'none',
                  fontSize: '0.875rem',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  color: activeSection === section.id
                    ? 'var(--color-primary)'
                    : 'var(--color-on-surface-variant)',
                  borderBottom: activeSection === section.id
                    ? '2px solid var(--color-primary)'
                    : '2px solid transparent',
                  paddingBottom: '4px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Resume button */}
          <button
            className="btn-primary nav-resume-btn"
            style={{
              padding: '0.5rem 1.5rem',
              fontSize: '0.8125rem',
              boxShadow: '0 0 20px rgba(0, 112, 243, 0.2)',
            }}
          >
            Resume
          </button>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              color: 'var(--color-on-surface)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="nav-mobile-menu" style={{
            padding: '1rem var(--gutter)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  background: 'none',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  color: activeSection === section.id
                    ? 'var(--color-primary)'
                    : 'var(--color-on-surface-variant)',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-resume-btn { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
