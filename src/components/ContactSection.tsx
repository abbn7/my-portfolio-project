import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-desc', {
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-info-item', {
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.social-link', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.form-field', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.submit-btn', {
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('شكراً لتواصلك! سأرد عليك في أقرب وقت.');
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10 bg-dark"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px]">
          {/* Info */}
          <div>
            <h2 className="contact-title font-urbanist text-3xl md:text-4xl lg:text-[48px] font-semibold text-ivory mb-6">
              تواصل معي
            </h2>
            <p className="contact-desc font-urbanist text-lg md:text-xl text-warm-gray leading-8 mb-10">
              هل لديك مشروع في ذهنك؟ دعنا نتحدث عنه وأحول فكرتك إلى واقع رقمي.
            </p>

            <div className="space-y-5 mb-10">
              <div className="contact-info-item flex items-center gap-4">
                <Mail size={20} className="text-gold-light" />
                <span className="font-urbanist text-lg text-ivory">
                  hello@ahmedgabr.com
                </span>
              </div>
              <div className="contact-info-item flex items-center gap-4">
                <Phone size={20} className="text-gold-light" />
                <span className="font-urbanist text-lg text-ivory">
                  +20 123 456 7890
                </span>
              </div>
              <div className="contact-info-item flex items-center gap-4">
                <MapPin size={20} className="text-gold-light" />
                <span className="font-urbanist text-lg text-ivory">
                  القاهرة، مصر
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="social-link w-10 h-10 rounded-full bg-dark-card flex items-center justify-center text-warm-gray hover:text-gold-light hover:bg-dark-border transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="social-link w-10 h-10 rounded-full bg-dark-card flex items-center justify-center text-warm-gray hover:text-gold-light hover:bg-dark-border transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="social-link w-10 h-10 rounded-full bg-dark-card flex items-center justify-center text-warm-gray hover:text-gold-light hover:bg-dark-border transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="social-link w-10 h-10 rounded-full bg-dark-card flex items-center justify-center text-warm-gray hover:text-gold-light hover:bg-dark-border transition-all duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-field">
              <label className="block font-urbanist text-base text-ivory mb-2">
                الاسم
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark-card border border-dark-border rounded-2xl px-6 py-4 font-urbanist text-ivory placeholder:text-warm-gray/60 focus:border-gold-light focus:shadow-[0_0_0_3px_rgba(200,169,126,0.2)] outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="form-field">
              <label className="block font-urbanist text-base text-ivory mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark-card border border-dark-border rounded-2xl px-6 py-4 font-urbanist text-ivory placeholder:text-warm-gray/60 focus:border-gold-light focus:shadow-[0_0_0_3px_rgba(200,169,126,0.2)] outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="form-field">
              <label className="block font-urbanist text-base text-ivory mb-2">
                نوع المشروع
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-dark-card border border-dark-border rounded-2xl px-6 py-4 font-urbanist text-ivory focus:border-gold-light focus:shadow-[0_0_0_3px_rgba(200,169,126,0.2)] outline-none transition-all duration-300 appearance-none cursor-pointer"
                required
              >
                <option value="">اختر نوع المشروع</option>
                <option value="uiux">تصميم UI/UX</option>
                <option value="web">تطوير ويب</option>
                <option value="graphic">تصميم جرافيك</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            <div className="form-field">
              <label className="block font-urbanist text-base text-ivory mb-2">
                الرسالة
              </label>
              <textarea
                placeholder="اكتب رسالتك هنا..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-dark-card border border-dark-border rounded-2xl px-6 py-4 font-urbanist text-ivory placeholder:text-warm-gray/60 focus:border-gold-light focus:shadow-[0_0_0_3px_rgba(200,169,126,0.2)] outline-none transition-all duration-300 resize-y min-h-[150px]"
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn w-full bg-gold-light text-dark-card font-urbanist text-lg font-medium rounded-2xl px-8 py-4 hover:bg-gold active:scale-[0.98] transition-all duration-500"
            >
              أرسل الرسالة
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
