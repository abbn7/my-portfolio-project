import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const animate = () => {
      setPosition(prev => {
        const lerp = 0.1;
        const newX = prev.x + (targetRef.current.x - prev.x) * lerp;
        const newY = prev.y + (targetRef.current.y - prev.y) * lerp;
        return {
          x: newX,
          y: newY,
          normalizedX: (newX / window.innerWidth) * 2 - 1,
          normalizedY: -(newY / window.innerHeight) * 2 + 1,
        };
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
}
