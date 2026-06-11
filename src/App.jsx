import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import { useMousePosition } from './hooks/useMousePosition';
import { SCROLL_PAGES } from './utils/constants';

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
      zIndex: 9999,
    }}>
      <div style={{
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: '#aec6ff',
        marginBottom: '1.5rem',
      }}>
        UJ<span style={{ color: '#00ddd6' }}>.</span>
      </div>
      <div style={{
        width: '120px',
        height: '2px',
        background: '#1c1b1b',
        borderRadius: '999px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '40%',
          background: 'linear-gradient(90deg, #0070f3, #6807ba)',
          borderRadius: '999px',
          animation: 'loadingSlide 1.2s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes loadingSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouse = useMousePosition();
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(p);
    };

    // Listen to both native scroll and Lenis scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    lenis.on('scroll', handleScroll);

    // Initial check
    handleScroll();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
      {/* Scroll spacer - creates the scrollable height */}
      <div
        className="scroll-spacer"
        style={{ height: `${SCROLL_PAGES * 100}vh` }}
      />

      {/* 3D Canvas - fixed background */}
      <div className="canvas-container">
        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              stencil: false,
              depth: true,
            }}
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
            camera={{
              fov: 60,
              near: 0.1,
              far: 100,
              position: [0, 2, 28],
            }}
            style={{ background: '#000000' }}
          >
            <Scene
              scrollProgress={scrollProgress}
              mouseX={mouse.nx}
              mouseY={mouse.ny}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Navbar - separate from overlay for pointer events */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Scroll progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress * 100}%`,
        height: '2px',
        background: 'linear-gradient(90deg, #0070f3, #6807ba, #00ddd6)',
        zIndex: 200,
        transition: 'width 0.1s linear',
      }} />

      {/* HTML Overlay */}
      <div className="html-overlay">
        <HeroSection scrollProgress={scrollProgress} />
        <AboutSection scrollProgress={scrollProgress} />
        <SkillsSection scrollProgress={scrollProgress} />
        <ExperienceSection scrollProgress={scrollProgress} />
        <ProjectsSection scrollProgress={scrollProgress} />
        <ServicesSection scrollProgress={scrollProgress} />
        <ContactSection scrollProgress={scrollProgress} />
      </div>
    </>
  );
}
