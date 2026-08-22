import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import AmbientLiquidGlow from './AmbientLiquidGlow';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface TerminalLineProps {
  field: string;
  value: string;
  isActive: boolean;
  isComplete: boolean;
  onComplete: () => void;
}

const TerminalLine: React.FC<TerminalLineProps> = ({ field, value, isActive, isComplete, onComplete }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!isActive) {
      if (isComplete) {
        setText(value);
      } else {
        setText('');
      }
      return;
    }

    let i = 0;
    const typingInterval = setInterval(() => {
      setText(value.substring(0, i + 1));
      i++;
      if (i >= value.length) {
        clearInterval(typingInterval);
        onComplete();
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [isActive, value, isComplete, onComplete]);

  if (!isActive && !isComplete) return null;

  return (
    <div className="flex items-start text-[13px] sm:text-[14.5px] font-mono leading-relaxed tracking-wide">
      <span className="text-[#D4AF37] mr-3 font-bold select-none drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">❯</span>
      <span className="text-[#A3B8CC] w-[85px] sm:w-[105px] shrink-0 font-medium">{field}</span>
      <span className="text-[#6C7A89] mr-3 select-none">=</span>
      <span 
        className="text-[#F3DBB3] font-medium"
        style={{ textShadow: '0 0 10px rgba(243, 219, 179, 0.2)' }}
      >
        {text}
      </span>
      {isActive && (
        <span className="w-2 h-4 bg-[#D4AF37] inline-block ml-1 animate-pulse align-middle shadow-[0_0_8px_#D4AF37]" />
      )}
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const terminalData = [
    { field: 'role', value: 'Software Developer (~ 2yr exp)' },
    { field: 'last_company', value: 'Marvel Technologies Private Limited' },
    { field: 'education', value: 'MCA @ SIOM (Sinhgad)' },
    { field: 'stack', value: 'PHP · Python' },
    { field: 'database', value: 'PostgreSQL · MySQL' },
    { field: 'auth', value: 'JWT · OAuth2' },
    { field: 'cloud', value: 'AWS S3 · Vercel · cPanel' },
    { field: 'currently', value: 'GEN AI' },
    { field: 'availability', value: 'Open for hire' },
  ];

  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const handleLineComplete = () => {
    setActiveLineIndex((prev) => Math.min(prev + 1, terminalData.length));
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 350px at ${x}px ${y}px, rgba(255,255,255,0.12), rgba(212,175,55,0.06), transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsCardHovered(true);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-[#050505] text-[#E8DFD8] font-sans selection:bg-[#D4AF37] selection:text-black py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center z-0"
    >
      {/* ================= BACKGROUND & SEAMLESS TRANSITIONS ================= */}
      <AmbientLiquidGlow
        className="absolute inset-0 z-0 pointer-events-none"
        speed={0.35}
        opacity={0.4}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-10"
        >
          <span 
            className="text-[11px] font-bold tracking-[0.35em] uppercase text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            01 / ABOUT ME
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#8C6D4F]/50 to-transparent" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
          >
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight uppercase leading-[0.88]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
                  Systems Thinker.
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.3)]">
                  Full-Stack Builder.
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-light text-[#B3A497] leading-[1.85] tracking-wide mb-10 max-w-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              I'm <span className="text-[#F3DBB3] font-medium drop-shadow-[0_0_5px_rgba(243,219,179,0.3)]">Arslan Deshmukh</span>, a passionate Full Stack Web Developer with a specialization in backend development. With over a year of professional experience, I've dedicated myself to mastering the art of creating scalable, efficient, and maintainable web applications.
            </motion.p>

            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 pb-2 border-t border-[#8C6D4F]/25 relative"
            >
              <div className="flex flex-col group">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]">
                  // MASTER'S DEGREE
                </span>
                <span className="text-2xl sm:text-3xl font-light text-[#F4EBE2] tracking-wide mt-1 group-hover:text-[#F3DBB3] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  MCA
                </span>
                <span className="text-[12px] font-medium text-[#D5CBC0] mt-0.5">
                  Sinhgad Institute of Management (SIOM)
                </span>
                <span className="text-[10px] font-mono text-[#8C6D4F] mt-1 tracking-wider uppercase">
                  Master of Computer Applications
                </span>
              </div>

              <div className="flex flex-col group">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]">
                  // BACHELOR'S DEGREE
                </span>
                <span className="text-2xl sm:text-3xl font-light text-[#F4EBE2] tracking-wide mt-1 group-hover:text-[#F3DBB3] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  BCS
                </span>
                <span className="text-[12px] font-medium text-[#D5CBC0] mt-0.5">
                  KVN Naik College, Nashik
                </span>
                <span className="text-[10px] font-mono text-[#8C6D4F] mt-1 tracking-wider uppercase">
                  Bachelor of Computer Science
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Developer Terminal */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center relative perspective-[1400px] mt-10 lg:mt-0">
            
            <motion.div 
              animate={{
                scale: isCardHovered ? 1.05 : 1,
                opacity: isCardHovered ? 0.35 : 0.15,
                rotate: isCardHovered ? 180 : 0
              }}
              transition={{ duration: 5, ease: "easeOut" }}
              className="absolute -inset-8 bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_20%,transparent_50%,#D4AF37_100%)] blur-3xl rounded-[40px] pointer-events-none"
            />

            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-2.5 sm:p-3.5 border border-[#8C6D4F]/30 rounded-xl bg-black/20 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.95)] cursor-pointer group transition-all duration-700 hover:border-[#D4AF37]/60 w-full max-w-[600px]"
            >
              <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ x: isCardHovered ? ['-100%', '200%'] : '-100%' }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent skew-x-12"
                />
              </div>

              <div className="pointer-events-none z-30">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#D4AF37]/80 rounded-tl-xl transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#D4AF37]/80 rounded-tr-xl transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#D4AF37]/80 rounded-bl-xl transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#D4AF37]/80 rounded-br-xl transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
              </div>

              <div className="relative overflow-hidden w-full bg-[#0A0A0A]/80 backdrop-blur-2xl rounded-lg flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.9)] border border-[#2A2A2A]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#121212] border-b border-[#2A2A2A] relative z-10 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-[#27C93F] rounded-full"></div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 text-[#7E8B99] text-[11px] font-mono tracking-wider">
                    arslan@octopulse: ~$
                  </div>
                  <div className="text-[#7E8B99] text-[10px] font-mono tracking-widest opacity-60">
                    bash
                  </div>
                </div>

                <div className="p-5 sm:p-7 flex flex-col gap-2.5 z-10 relative overflow-hidden min-h-[320px]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay"></div>
                  {terminalData.map((item, index) => (
                    <TerminalLine
                      key={item.field}
                      field={item.field}
                      value={item.value}
                      isActive={index === activeLineIndex}
                      isComplete={index < activeLineIndex}
                      onComplete={handleLineComplete}
                    />
                  ))}
                </div>

                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300 z-20"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;