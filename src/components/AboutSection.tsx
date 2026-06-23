import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cinematicWords = [
  'أنا', 'أحمد', 'جبر', '—', 'مصمم', 'ومطور', 'واجهات', 'أمامية', 'مقيم', 'في', 'القاهرة', '—', 'أقوم', 'بتحويل', 'الأفكار', 'إلى', 'واقع', 'رقمي', '—', 'من', 'خلال', 'التصميم', 'البسيط', 'والكود', 'النظيف',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Title animation
      gsap.from('.about-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Cinematic text animation
      const wordElements = wordsRef.current?.querySelectorAll('.cinematic-word');
      if (wordElements) {
        gsap.fromTo(
          wordElements,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wordsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Description animation
      gsap.from('.about-desc', {
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Button animation
      gsap.from('.about-btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10 bg-dark"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center">
          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <img
                src="/images/about-portrait.jpg"
                alt="أحمد جبر"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="about-title font-urbanist text-3xl md:text-4xl lg:text-[48px] font-semibold text-ivory mb-8">
              من أنا
            </h2>

            {/* Cinematic Text */}
            <div
              ref={wordsRef}
              className="flex flex-wrap gap-x-2 gap-y-1 mb-8"
            >
              {cinematicWords.map((word, index) => (
                <span
                  key={index}
                  className="cinematic-word font-urbanist text-lg md:text-xl lg:text-[22px] text-gold-light leading-relaxed"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="about-desc font-urbanist text-base md:text-lg text-warm-gray leading-7 mb-8">
              أعمل في مجال تصميم وتطوير الويب منذ أكثر من 5 سنوات. أؤمن بأن التصميم الجيد ليس فقط عن الجماليات، بل عن حل المشكلات وخلق تجارب سلسة وممتعة للمستخدم. أحب العمل مع فرق متنوعة وأتعلم باستمرار تقنيات جديدة لتحسين عملي.
            </p>

            {/* Button */}
            <a
              href="#services"
              className="about-btn inline-block bg-gold-light text-dark-card font-urbanist text-lg font-medium rounded-2xl px-8 py-4 hover:bg-gold transition-colors duration-500"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              تعرف علي أكثر
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
