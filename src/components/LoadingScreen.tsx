import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    gsap.to({}, {
      duration: 2,
      onUpdate: function () {
        setProgress(Math.round(this.progress() * 100));
      },
    });

    tl.to('.loading-screen', {
      opacity: 0,
      duration: 0.8,
      delay: 2.5,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark">
      <div className="font-urbanist text-2xl font-semibold text-gold-light mb-8">
        أحمد جبر
      </div>
      <div className="w-48 h-0.5 bg-dark-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-light transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-urbanist text-sm text-warm-gray">
        {progress}%
      </div>
    </div>
  );
}
