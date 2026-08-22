// src/components/CertificationsSection.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import  merit  from '../assets/certificates/merit.jpeg'
import  ray  from '../assets/certificates/ray.jpeg'
import  bookw  from '../assets/certificates/technophilia.jpeg'
import  leadership  from '../assets/certificates/leadership.png'
import  intern  from '../assets/certificates/intern.png'
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string; // path to certificate image
}

// Replace image paths with your actual certificate assets
const certificates: Certificate[] = [
  {
    id: 'c01',
    title: '2nd Rank - First Year Merit',
    issuer: 'KVN Naik Arts, Commerce & Science College, Nashik',
    year: '2021-22',
    image: merit,
  },
  {
    id: 'c02',
    title: 'Python Programming 2022',
    issuer: 'Ray Robotics - KVN Naik College',
    year: '2022',
    image: ray,
  },
  {
    id: 'c03',
    title: 'Premium Award - Book Writing',
    issuer: 'KVN Naik College Nashik',
    year: '2023',
    image: bookw,
  },
  {
    id: 'c04',
    title: 'Effective Leadership',
    issuer: 'HP Life - HP Foundation',
    year: '2024',
    image: leadership,
  },
  {
    id: 'c05',
    title: 'InternShip Certificate - Web Development',
    issuer: 'Main flow services and technologies pvt ltd',
    year: '2024',
    image: intern,
  },
];

export const CertificationsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const total = certificates.length;
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Gentle autoplay, pauses while the viewer is open
  useEffect(() => {
    if (viewerOpen) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, 4200);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [viewerOpen, total]);

  // Keyboard navigation for the fullscreen viewer
  useEffect(() => {
    if (!viewerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setViewerOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [viewerOpen, next, prev]);

  // Compute the shortest circular distance of each card from the active index,
  // so the deck wraps smoothly instead of jumping across the screen.
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      id="certifications"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-4 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient glow, consistent with the Experience section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          > 
            04 / CERTIFICATIONS
          </span>
          <div className="w-20 h-px bg-linear-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-linear-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              PROOF &amp;
            </span>
            <span className="block text-transparent bg-clip-text bg-linear-to-b from-[#bfb5a1] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              RECOGNITION.
            </span>
          </h2>
        </motion.div>

        {/* 3D Coverflow Carousel */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center [perspective:1400px]">
          {certificates.map((cert, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            // Cards more than 2 away from center fold out of view entirely
            if (absOffset > 2) return null;

            return (
              <motion.div
                key={cert.id}
                className="absolute cursor-pointer will-change-transform"
                style={{ zIndex: total - absOffset }}
                animate={{
                  x: offset * 190,
                  scale: isActive ? 1 : 1 - absOffset * 0.18,
                  rotateY: offset * -35,
                  opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.32,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                onClick={() => (isActive ? setViewerOpen(true) : goTo(index))}
              >
                <div
                  className={`relative w-190px sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[340px] rounded-xl overflow-hidden border transition-colors duration-300 ${
                    isActive
                      ? 'border-[#D4AF37] shadow-[0_20px_60px_rgba(212,175,55,0.25)]'
                      : 'border-[#8C6D4F]/30'
                  }`}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 flex items-center justify-center"
                    >
                      <Expand size={15} className="text-[#D4AF37]" />
                    </motion.div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span
                      className="block text-[9px] font-mono tracking-[0.2em] text-[#D4AF37] mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {cert.year}
                    </span>
                    <h3
                      className="text-sm sm:text-base leading-tight text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            aria-label="Previous certificate"
            className="w-10 h-10 rounded-full border border-[#8C6D4F]/40 flex items-center justify-center text-[#8C6D4F] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {certificates.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => goTo(index)}
                aria-label={`Go to ${cert.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-[#8C6D4F]/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next certificate"
            className="w-10 h-10 rounded-full border border-[#8C6D4F]/40 flex items-center justify-center text-[#8C6D4F] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center px-6"
            onClick={() => setViewerOpen(false)}
          >
            <button
              onClick={() => setViewerOpen(false)}
              aria-label="Close viewer"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#8C6D4F]/40 flex items-center justify-center text-[#E8DFD8] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              <X size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous certificate"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#8C6D4F]/40 flex items-center justify-center text-[#E8DFD8] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next certificate"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#8C6D4F]/40 flex items-center justify-center text-[#E8DFD8] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={certificates[activeIndex].id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
                <img
                  src={certificates[activeIndex].image}
                  alt={certificates[activeIndex].title}
                  className="w-full h-auto object-contain bg-[#0A0806]"
                />
              </div>

              <div className="text-center mt-6">
                <h3
                  className="text-2xl sm:text-3xl text-white mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {certificates[activeIndex].title}
                </h3>
                <p
                  className="text-xs tracking-[0.15em] uppercase text-[#8C6D4F]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {certificates[activeIndex].issuer} — {certificates[activeIndex].year}
                </p>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-[#8C6D4F]/60 mt-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Use arrow keys to browse certificates. Escape to close.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;