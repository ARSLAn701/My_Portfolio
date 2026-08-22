import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const skillCategories = [
  {
    title: 'FULL-STACK WEB DEVELOPMENT',
    badge: 'CORE PILLAR',
    stat: 'CLEAN ARCHITECTURE',
    bullets: [
      'Responsive, pixel-perfect UI built on clean, scalable code architecture.',
      'End-to-end ownership across frontend and backend on live production systems.',
      'Legacy project upgrades — old codebases modernized with proper version control.',
      'Custom Chrome extension development for internal and client tooling.',
      'Well-documented codebases built for easy handoff and long-term scaling.',
    ],
  },
  {
    title: 'BACKEND DEVELOPMENT & ARCHITECTURE',
    badge: 'SYSTEM DESIGN',
    stat: 'SECURE BY DEFAULT',
    bullets: [
      'Authorization, session handling, and input validation built in from day one.',
      'Clean, normalized database structures for reliable, scalable data.',
      'Cron-based scheduling for recurring backend workflows and jobs.',
      'Unit-tested endpoints for stable releases and dependable user experience.',
      'Fast diagnosis and resolution of critical production issues.',
    ],
  },
  {
    title: 'API INTEGRATION & TESTING',
    badge: 'THIRD-PARTY READY',
    stat: 'POSTMAN VERIFIED',
    bullets: [
      'RESTful API design and full-cycle third-party API integration.',
      'Every endpoint documented and tested in Postman before shipping.',
      'Automated data fetching via Playwright, including scraping where no API exists.',
      'Webhook and polling implementations for real-time data sync.',
      'Integrated multiple external APIs using cURL.',
      'Handled through webhooks and polling.'
    ],
  },
  {
    title: 'AUTOMATION & MESSAGING SYSTEMS',
    badge: 'WORKFLOW AUTOMATION',
    stat: 'MULTI-CHANNEL',
    bullets: [
      'WhatsApp automation via Periskope for real-time customer engagement.',
      'Transactional email automation with Mailgun and dynamic HTML templates.',
      'OTP and SMS verification via 2Factor',
      'Push notifications at scale with Firebase Cloud Messaging.',
    ],
  },
  {
    title: 'AI, LLM & DATA INTELLIGENCE',
    badge: 'AI-POWERED',
    stat: 'OCR + GENAI',
    bullets: [
      'LLM/AI integration inside web apps for smarter, adaptive features.',
      'OCR-based document analysis using Tesseract.js.',
      'AI-driven PDF and Excel report generation from raw data.',
      'AI-assisted image and video generation for content pipelines.',
    ],
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const SkillsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleRow = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="skills"
      className="relative z-0 w-screen bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
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
            03 / SERVICES
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              WHAT I BUILD.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              WHAT I DELIVER.
            </span>
          </h2>
        </motion.div>

        {/* Editorial Index */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="border-t border-[#8C6D4F]/25"
        >
          {skillCategories.map((block, idx) => {
            const isOpen = openIndex === idx;
            const num = String(idx + 1).padStart(2, '0');

            return (
              <motion.div
                key={block.title}
                variants={rowVariants}
                className="group relative border-b border-[#8C6D4F]/25"
              >
                {/* Per-row ambient glow, fades in on interaction */}
                <div
                  className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-[#D4AF37]/[0.04] via-transparent to-transparent transition-opacity duration-700 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  } lg:group-hover:opacity-100`}
                />

                {/* Clickable / hoverable row head */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggleRow(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleRow(idx);
                    }
                  }}
                  className="relative z-10 flex items-center gap-4 sm:gap-8 py-6 sm:py-8 cursor-pointer select-none"
                >
                  {/* Number */}
                  <span
                    className="text-sm sm:text-base font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors duration-300 shrink-0 w-8"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {num}
                  </span>

                  {/* Title */}
                  <h3
                    className="flex-1 min-w-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide uppercase text-white group-hover:text-[#F7E7C4] transition-colors duration-300 truncate"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {block.title}
                  </h3>

                  {/* Badge - desktop only, sits before the stat */}
                  <span
                    className="hidden md:inline text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] group-hover:text-[#F3DBB3] transition-colors shrink-0"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {block.badge}
                  </span>

                  {/* Stat pill */}
                  <span className="text-[10px] font-mono px-2.5 py-1 border border-[#8C6D4F]/40 text-[#C4B5A5] bg-[#17130F] group-hover:border-[#D4AF37]/50 group-hover:text-white transition-all shrink-0 whitespace-nowrap">
                    {block.stat}
                  </span>

                  {/* Expand indicator */}
                  <span
                    className={`shrink-0 text-[#8C6D4F] group-hover:text-[#D4AF37] transition-transform duration-500 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    } lg:group-hover:rotate-45`}
                  >
                    +
                  </span>
                </div>

                {/* Expandable content - grid-rows trick, no fixed height needed */}
                <div
                  className={`relative z-10 grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  } lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]`}
                >
                  <div className="overflow-hidden">
                    <ul className="pb-8 sm:pb-10 pl-12 sm:pl-16 pr-2 flex flex-col gap-3 max-w-2xl">
                      {block.bullets.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[#A8988B] font-light leading-relaxed"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          <span className="mt-[2px] text-[#D4AF37] text-sm shrink-0">
                            ✦
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;