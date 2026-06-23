import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
}

export default function ProjectCard({ image, title, category, description }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-800 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent flex flex-col justify-end p-6 transition-all duration-500 ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="font-urbanist text-sm text-gold-light mb-2">
          {category}
        </span>
        <h3 className="font-urbanist text-xl font-medium text-ivory mb-1">
          {title}
        </h3>
        <p className="font-urbanist text-sm text-warm-gray mb-3">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 font-urbanist text-sm text-ivory hover:text-gold-light transition-colors duration-300">
          عرض المشروع
          <ArrowLeft size={16} className="rotate-180" />
        </span>
      </div>
    </div>
  );
}
