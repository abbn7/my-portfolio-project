import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function ServiceCard({ icon, title, description, delay = 0 }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: delay * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-dark-card rounded-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover group"
    >
      <div className="text-gold-light mb-6 group-hover:text-ivory transition-colors duration-500">
        {icon}
      </div>
      <h3 className="font-urbanist text-xl md:text-[22px] font-medium text-ivory mb-3">
        {title}
      </h3>
      <p className="font-urbanist text-base text-warm-gray leading-[26px]">
        {description}
      </p>
    </div>
  );
}
