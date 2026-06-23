import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const quickLinks = [
  { label: 'من أنا', href: '#about' },
  { label: 'خدماتي', href: '#services' },
  { label: 'أعمالي', href: '#works' },
  { label: 'آراء العملاء', href: '#testimonials' },
  { label: 'تواصل معي', href: '#contact' },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-20 pb-10 px-6 md:px-10 bg-dark-card">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 items-start">
          {/* Quick Links */}
          <div className="text-center md:text-right">
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="font-urbanist text-base text-warm-gray hover:text-ivory transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center">
            <a
              href="#"
              className="font-urbanist text-2xl font-semibold text-ivory mb-6"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              أحمد جبر
            </a>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-warm-gray hover:text-gold-light transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-warm-gray hover:text-gold-light transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-warm-gray hover:text-gold-light transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-warm-gray hover:text-gold-light transition-colors duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left flex items-center justify-center md:justify-start h-full">
            <p className="font-urbanist text-sm text-warm-gray">
              &copy; 2024 أحمد جبر. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
