import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const filters = ['كل الأعمال', 'تصميم UI/UX', 'تطوير الويب'];

const projects = [
  {
    image: '/images/project-1.jpg',
    title: 'منصة تعليمية',
    category: 'تصميم UI/UX',
    description: 'تطبيق ويب تفاعلي للتعلم عن بعد',
  },
  {
    image: '/images/project-2.jpg',
    title: 'متجر إلكتروني',
    category: 'تطوير الويب',
    description: 'تجربة تسوق سلسة وممتعة',
  },
  {
    image: '/images/project-3.jpg',
    title: 'تطبيق موبايل',
    category: 'تصميم UI/UX',
    description: 'تصميم واجهة تطبيق للصحة واللياقة',
  },
  {
    image: '/images/project-4.jpg',
    title: 'موقع شركات',
    category: 'تطوير الويب',
    description: 'موقع احترافي لشركة تقنية',
  },
  {
    image: '/images/project-5.jpg',
    title: 'لوحة تحكم',
    category: 'تطوير الويب',
    description: 'واجهة إدارية أنيقة وعملية',
  },
  {
    image: '/images/project-6.jpg',
    title: 'موقع شخصي',
    category: 'تصميم UI/UX',
    description: 'بورتفوليو لمصور محترف',
  },
];

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState('كل الأعمال');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeFilter === 'كل الأعمال'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.filter-btn', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, [activeFilter]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10 bg-dark"
    >
      <div className="max-w-[1440px] mx-auto">
        <h2
          ref={titleRef}
          className="font-urbanist text-3xl md:text-4xl lg:text-[48px] font-semibold text-ivory text-right mb-8"
        >
          أحدث الأعمال
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-8 justify-start mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn relative font-urbanist text-base font-medium pb-1 transition-colors duration-300 ${
                activeFilter === filter
                  ? 'text-gold-light'
                  : 'text-warm-gray hover:text-ivory'
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-gold-light" />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div key={project.title} className="project-card">
              <ProjectCard
                image={project.image}
                title={project.title}
                category={project.category}
                description={project.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
