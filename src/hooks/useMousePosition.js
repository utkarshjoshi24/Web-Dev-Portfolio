import { useState, useEffect, useCallback } from 'react';

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, nx: 0.5, ny: 0.5 });

  const handleMouseMove = useCallback((e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
      nx: e.clientX / window.innerWidth,
      ny: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return mouse;
}
