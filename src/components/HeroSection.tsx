import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useMousePosition } from '@/hooks/useMousePosition';
import CircularBadge from './CircularBadge';
import { ChevronDown } from 'lucide-react';

function HeroImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();
  const { viewport } = useThree();

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/images/hero-portrait.jpg');
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: texture },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_aspect: { value: 16 / 9 },
    }),
    [texture]
  );

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_mouse.value.x += (mouse.normalizedX - material.uniforms.u_mouse.value.x) * 0.1;
      material.uniforms.u_mouse.value.y += (mouse.normalizedY - material.uniforms.u_mouse.value.y) * 0.1;

      meshRef.current.rotation.x = material.uniforms.u_mouse.value.y * 0.05;
      meshRef.current.rotation.y = material.uniforms.u_mouse.value.x * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 v_uv;
          uniform vec2 u_mouse;
          
          void main() {
            v_uv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + u_mouse.x) * 0.02;
            pos.z += cos(pos.y * 2.0 + u_mouse.y) * 0.02;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D u_texture;
          uniform float u_aspect;
          varying vec2 v_uv;
          
          void main() {
            vec2 uv = v_uv;
            float imageAspect = u_aspect;
            float screenAspect = 16.0 / 9.0;
            
            if (imageAspect > screenAspect) {
              float scale = screenAspect / imageAspect;
              uv.x = (uv.x - 0.5) * scale + 0.5;
            } else {
              float scale = imageAspect / screenAspect;
              uv.y = (uv.y - 0.5) * scale + 0.5;
            }
            
            vec4 color = texture2D(u_texture, uv);
            gl_FragColor = color;
          }
        `}
      />
    </mesh>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!textRef.current) return;

      gsap.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from('.hero-btn', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[95vh] overflow-hidden"
    >
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
        >
          <HeroImage />
        </Canvas>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/40 to-dark/70" />

      {/* Circular Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <CircularBadge />
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="absolute bottom-20 right-0 left-0 z-10 text-center px-6"
      >
        <h1 className="hero-title font-urbanist text-5xl md:text-6xl lg:text-[64px] font-semibold text-ivory tracking-[-1.5px] leading-tight mb-4">
          أحمد جبر
        </h1>
        <p className="hero-subtitle font-urbanist text-xl md:text-2xl lg:text-[30px] text-warm-gray tracking-[0.5px] leading-relaxed mb-8">
          مصمم واجهات المستخدم / تجربة المستخدم ومطور واجهات أمامية
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="hero-btn inline-block bg-white text-dark-card font-urbanist text-lg font-medium rounded-2xl px-8 py-4 hover:bg-gold-light hover:text-white transition-all duration-500"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            اطلب خدمتك
          </a>
          <a
            href="#works"
            className="hero-btn inline-block bg-transparent text-white font-urbanist text-lg font-medium rounded-2xl px-8 py-4 border border-white/80 hover:bg-white/10 transition-all duration-500"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            تصفح أعمالي
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}
