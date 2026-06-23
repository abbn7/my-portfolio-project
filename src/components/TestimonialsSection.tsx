import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TestimonialCard from './TestimonialCard';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'أحمد قام بعمل رائع في تصميم موقعنا. فهم رؤيتنا بسرعة وقدم تصميمًا يفوق توقعاتنا. كان التعاون معه سلسًا وممتعًا.',
    name: 'محمد علي',
    title: 'مدير شركة التقنية',
    marginTop: '0',
  },
  {
    quote: 'العمل مع أحمد كان تجربة مميزة. أبدع في تصميم متجرنا الإلكتروني وزاد من مبيعاتنا بنسبة كبيرة. أنصح بالتعامل معه بشدة.',
    name: 'سارة أحمد',
    title: 'مؤسسة متجر إلكتروني',
    marginTop: '40px',
  },
  {
    quote: 'أحمد مطور متميز يجمع بين الإبداع التصميمي والكفاءة التقنية. عمله دائمًا عالي الجودة ويصل في المواعيد المحددة.',
    name: 'خالد محمود',
    title: 'مطور تطبيقات',
    marginTop: '20px',
  },
];

export default function TestimonialsSection() {
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
      id="testimonials"
      className="py-[120px] px-6 md:px-10 bg-dark"
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          ref={titleRef}
          className="font-urbanist text-3xl md:text-4xl lg:text-[48px] font-semibold text-ivory text-right mb-12"
        >
          آراء العملاء
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              marginTop={testimonial.marginTop}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
