import { useEffect, useRef } from 'react';

export default function CircularBadge() {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const scrollSpeed = Math.abs(window.scrollY) * 0.5;
        const rotation = (scrollSpeed * 0.1) % 360;
        svgRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const text = 'مصمم واجهات المستخدم — مطور واجهات أمامية — ';

  return (
    <svg
      ref={svgRef}
      width="160"
      height="160"
      viewBox="0 0 160 160"
      className="animate-spin-slow"
    >
      <defs>
        <path
          ref={textRef}
          id="circlePath"
          d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
          fill="none"
        />
      </defs>
      <text className="fill-ivory/90" style={{ fontSize: '13px', fontFamily: 'Urbanist, sans-serif', fontWeight: 500 }}>
        <textPath href="#circlePath">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
