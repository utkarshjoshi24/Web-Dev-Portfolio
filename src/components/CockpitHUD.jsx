import { useMemo } from 'react';
import { SECTIONS } from '../utils/constants';

export default function CockpitHUD({ scrollProgress, scrollVelocity = 0 }) {
  // Determine current active and next target sections
  const currentSectionInfo = useMemo(() => {
    let activeIndex = 0;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      if (scrollProgress >= SECTIONS[i].range[0]) {
        activeIndex = i;
        break;
      }
    }
    const active = SECTIONS[activeIndex];
    const next = activeIndex < SECTIONS.length - 1 ? SECTIONS[activeIndex + 1] : null;

    // Relative distance calculation (in Light Years)
    let distToNext = 0;
    if (next) {
      const rangeSpan = next.range[0] - active.range[0];
      const localProgress = (scrollProgress - active.range[0]) / rangeSpan;
      distToNext = Math.max(0, (1 - localProgress) * 20); // starts at 20 LY and drops to 0
    }

    // Map planet names
    const planetMap = {
      hero: 'Earth',
      about: 'Mars',
      skills: 'Jupiter',
      experience: 'Saturn',
      projects: 'Uranus',
      services: 'Neptune',
      contact: 'Moon',
    };

    return {
      activePlanet: planetMap[active.id] || 'Unknown',
      nextPlanet: next ? planetMap[next.id] : 'Void',
      distToNext: distToNext.toFixed(1),
    };
  }, [scrollProgress]);

  // Telemetry details
  const speed = Math.round(Math.abs(scrollVelocity) * 1850);
  const altitude = Math.round((28 - scrollProgress * 60) * 100) / 100; // relative space coordinate Z
  const shield = Math.max(82, Math.min(100, Math.round(100 - Math.abs(scrollVelocity) * 15)));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        fontFamily: 'monospace',
        color: '#00ddd6',
        textShadow: '0 0 8px rgba(0, 221, 214, 0.4)',
      }}
    >
      {/* ========================================================
          HUD TOP BAR
         ======================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        border: '1px solid rgba(0, 221, 214, 0.25)',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        borderRadius: '8px',
        fontSize: '0.8rem',
      }}>
        <div>
          SYS: <span style={{ color: '#fff' }}>OK</span> | FTL DRIVE: <span style={{ color: '#fff' }}>STANDBY</span>
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
          SHUTTLE FLIGHT: NAV-MODE
        </div>
        <div>
          COORDS Z: <span style={{ color: '#fff' }}>{altitude} LY</span>
        </div>
      </div>

      {/* ========================================================
          HUD CORNER BRACKETS (windshield frame visual)
         ======================================================== */}
      <div style={{
        position: 'absolute',
        inset: 0,
        border: '2px solid rgba(255, 255, 255, 0.03)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.85)',
        pointerEvents: 'none',
        borderRadius: '16px',
      }} />

      {/* Top Left corner bracket overlay */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '24px',
        width: '40px',
        height: '40px',
        borderLeft: '2px solid rgba(0, 221, 214, 0.5)',
        borderTop: '2px solid rgba(0, 221, 214, 0.5)',
      }} />
      {/* Top Right corner bracket overlay */}
      <div style={{
        position: 'absolute',
        top: '80px',
        right: '24px',
        width: '40px',
        height: '40px',
        borderRight: '2px solid rgba(0, 221, 214, 0.5)',
        borderTop: '2px solid rgba(0, 221, 214, 0.5)',
      }} />
      {/* Bottom Left corner bracket overlay */}
      <div style={{
        position: 'absolute',
        bottom: '120px',
        left: '24px',
        width: '40px',
        height: '40px',
        borderLeft: '2px solid rgba(0, 221, 214, 0.5)',
        borderBottom: '2px solid rgba(0, 221, 214, 0.5)',
      }} />
      {/* Bottom Right corner bracket overlay */}
      <div style={{
        position: 'absolute',
        bottom: '120px',
        right: '24px',
        width: '40px',
        height: '40px',
        borderRight: '2px solid rgba(0, 221, 214, 0.5)',
        borderBottom: '2px solid rgba(0, 221, 214, 0.5)',
      }} />

      {/* ========================================================
          HUD LATERAL DIALS (Speed / Shield)
         ======================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        padding: '0 20px',
      }}>
        {/* Left HUD Panel (Velocity & Warp Control) */}
        <div style={{
          padding: '16px',
          background: 'rgba(0, 0, 0, 0.5)',
          borderLeft: '3px solid #aec6ff',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '0.75rem',
          color: '#aec6ff',
          textShadow: '0 0 8px rgba(174, 198, 255, 0.4)',
        }}>
          <div>SPEEDOMETER</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>
            {speed} <span style={{ fontSize: '0.75rem' }}>M/S</span>
          </div>
          <div style={{ width: '80px', height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, speed / 30)}%`, height: '100%', background: '#aec6ff' }} />
          </div>
          <div>FTL ENG: {speed > 50 ? 'FIRING' : 'IDLE'}</div>
        </div>

        {/* Center Target Lock HUD */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '1px dashed rgba(0, 221, 214, 0.4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'hudRotate 15s linear infinite',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              background: '#00ddd6',
              borderRadius: '50%',
            }} />
          </div>
          <div style={{
            fontSize: '0.75rem',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(0, 221, 214, 0.2)',
          }}>
            PLANET LOCK: <span style={{ color: '#fff', fontWeight: 'bold' }}>{currentSectionInfo.activePlanet}</span>
          </div>
        </div>

        {/* Right HUD Panel (Shield & Destination Info) */}
        <div style={{
          padding: '16px',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRight: '3px solid #dbb8ff',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          fontSize: '0.75rem',
          color: '#dbb8ff',
          textShadow: '0 0 8px rgba(219, 184, 255, 0.4)',
        }}>
          <div>SHIELD ENERGY</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>
            {shield}%
          </div>
          <div style={{ width: '80px', height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${shield}%`, height: '100%', background: '#dbb8ff' }} />
          </div>
          {currentSectionInfo.nextPlanet !== 'Void' ? (
            <div style={{ textAlign: 'right' }}>
              NEXT: <span style={{ color: '#fff' }}>{currentSectionInfo.nextPlanet}</span>
              <br />
              DIST: <span style={{ color: '#fff' }}>{currentSectionInfo.distToNext} LY</span>
            </div>
          ) : (
            <div>END OF SYSTEM</div>
          )}
        </div>
      </div>

      {/* ========================================================
          HUD LOWER PANEL
         ======================================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        border: '1px solid rgba(0, 221, 214, 0.25)',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        borderRadius: '8px',
        fontSize: '0.75rem',
        marginTop: '20px',
      }}>
        <div>
          THRUST DIRECTION: <span style={{ color: '#fff' }}>FORWARD [Z-]</span>
        </div>
        <div>
          LOCK STATUS: <span style={{ color: '#fff', animation: 'hudPulse 1.5s infinite' }}>ACQUIRED</span>
        </div>
        <div>
          AUTOPILOT: <span style={{ color: '#fff' }}>ACTIVE (SCROLL TO STEER)</span>
        </div>
      </div>

      <style>{`
        @keyframes hudRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hudPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
