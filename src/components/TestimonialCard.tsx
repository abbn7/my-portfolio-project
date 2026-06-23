import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  marginTop?: string;
  delay?: number;
}

export default function TestimonialCard({
  quote,
  name,
  title,
  marginTop = '0',
  delay = 0,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: delay * 0.15,
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
      className="bg-dark-card rounded-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
      style={{ marginTop }}
    >
      <Quote size={40} className="text-gold-light opacity-30 mb-5" />
      <p className="font-urbanist text-base text-warm-gray leading-7 mb-6">
        {quote}
      </p>
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[50px] rounded-full bg-gold-light/20 flex items-center justify-center">
          <span className="font-urbanist text-lg font-medium text-gold-light">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-urbanist text-base font-medium text-ivory">
            {name}
          </h4>
          <p className="font-urbanist text-sm text-warm-gray">{title}</p>
        </div>
      </div>
    </div>
  );
}
