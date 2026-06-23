import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from './ServiceCard';
import { Monitor, Code2, Palette, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Monitor size={40} />,
    title: 'تصميم UI/UX',
    description: 'تصميم واجهات المستخدم وتجربة المستخدم بشكل احترافي يجمع بين الجماليات والوظائف',
  },
  {
    icon: <Code2 size={40} />,
    title: 'تطوير الويب',
    description: 'تطوير مواقع ويب تفاعلية وسريعة باستخدام أحدث التقنيات والأطر',
  },
  {
    icon: <Palette size={40} />,
    title: 'تصميم الجرافيك',
    description: 'تصميم هويات بصرية ومواد تسويقية تبرز علامتك التجارية',
  },
  {
    icon: <TrendingUp size={40} />,
    title: 'تحسين الأداء',
    description: 'تحسين سرعة وأداء المواقع لتحقيق أفضل تجربة للمستخدم',
  },
];

export default function ServicesSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="py-[120px] px-6 md:px-10 bg-dark"
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          ref={titleRef}
          className="font-urbanist text-3xl md:text-4xl lg:text-[48px] font-semibold text-ivory text-right mb-12"
        >
          خدماتي
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
