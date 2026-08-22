import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import opx from "../assets/projects/opx.jpeg";
import xpresscars from "../assets/projects/xpress.jpeg";
import aicacars from "../assets/projects/aica.png";
import adbiryani from "../assets/projects/adbiryani.jpeg";
import octopulse from "../assets/projects/octopuse.png";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
}

const projects: Project[] = [
  {
    number: '01',
    title: 'HOB-OPX',
    category: 'COMPANY PROJECT',
    description:
      'OPX is a cloud kitchen operations platform that streamlines attendance, HRM, leave, roster, and stock management with real-time location tracking. It’s deployed in 20+ stores across India and Dubai, managing 600+ staff efficiently.',
    image: opx,
    tech: [
      'CURL',
      'AJAX',
      'Google Maps API',
      'JavaScript',
      'Bootstrap',
      'MySQL',
      'PHP',
      'CodeIgniter',
      '3rd Party API',
      'JWT',
      'Whatsapp Messaging, Email Services'
    ],
  },

  {
    number: '02',
    title: 'Xpress Cars - Vehicle Record System',
    category: 'COMPANY PROJECT',
    description:
      'A car record management system built to streamline tracking of vehicle ownership, registration, and service history. It allows users to add, update, delete, and view car details efficiently. Developed over 3 months, the system enhances record accessibility and ensures organized data handling for vehicle administrators.',
    image: xpresscars,
    tech: [
      'MySQL',
      'PHP',
      'REST API`s ',
      'POSTMAN',
      'JWT',
      'CodeIgniter',
    ],
  },

  {
    number: '03',
    title: 'AICA - Car Management',
    category: 'COMPANY PROJECT',
    description:
      `A robust vehicle lifecycle management platform engineered to digitize and centralize automotive records.
Core capabilities include full CRUD operations on vehicle profiles, structured ownership chain management
(tracking transfers between individuals or organizations), registration metadata management
(dates, jurisdiction, expiry), and a chronological service history module capturing maintenance events,
repairs, and inspections. Designed with data integrity as a priority, the system ensures every vehicle's
complete history is queryable, auditable, and maintainable by authorized users.`,
    image: aicacars,
    tech: [
      'CURL',
      'Car Price Prediction API',
      'MySQL',
      'PHP',
      'CodeIgniter',
      '3rd Party API',
      'JWT',
    ],
  },

  {
    number: '04',
    title: 'A1 Biryani Shop - Meal Ordering System',
    category: 'Freelancing Project',
    description:
      'A full-featured online meal ordering system developed using core PHP and MySQL, allowing customers to place food orders online while enabling restaurant staff to manage orders, inventory, and customer data through an admin panel.',
    image: adbiryani,
    tech: [
      'MySQL',
      'PHP',
      'HTML-CSS',
      'Javascript',
      'Bootstrap',
      'JQuery',
    ],
  },

  {
    number: '05',
    title: 'Octopulse - Digital Marketing',
    category: 'Freelancing Project',
    description:
      'Engineered an end-to-end digital agency website utilizing v0.dev AI generation paired with custom Next.js and React architecture. The platform combines rapid AI-assisted component prototyping with clean, production-ready boilerplate logic designed for high-conversion lead generation.',
    image: octopulse,
    tech: [
      'Next.js (App Router)',
      'React 18',
      'Tailwind CSS',
      'TypeScript',
      'Vercel',
      'Email Pipeline Boilerplate',
      'Direct WhatsApp Routing',
    ],
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="
        relative
        w-full
        bg-black
        text-[#E8DFD8]
        font-sans
        selection:bg-[#cbb59d]
        selection:text-black
        pt-16
        sm:pt-20
        pb-24
        sm:pb-32
        px-4
        sm:px-12
        lg:px-20
        overflow-visible
      "
    >
      {/* =========================================================
          AMBIENT LIGHT
      ========================================================== */}

      <div
        className="
          absolute
          top-1/4
          left-1/3
          w-[20rem]
          sm:w-[36rem]
          h-[20rem]
          sm:h-[36rem]
          bg-[#D4AF37]/5
          rounded-full
          blur-[120px]
          sm:blur-[180px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-1/4
          right-1/4
          w-[18rem]
          sm:w-[30rem]
          h-[18rem]
          sm:h-[30rem]
          bg-[#8C6D4F]/5
          rounded-full
          blur-[110px]
          sm:blur-[170px]
          pointer-events-none
        "
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* =========================================================
            SECTION EYEBROW
        ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex items-center space-x-4 mb-4 sm:mb-5"
        >
          <span
            className="
              text-[10px]
              sm:text-[11px]
              font-medium
              tracking-[0.35em]
              uppercase
              text-[#D4AF37]
            "
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            02 / FEATURED WORK
          </span>

          <div
            className="
              w-12
              sm:w-20
              h-[1px]
              bg-gradient-to-r
              from-[#D4AF37]/80
              via-[#8C6D4F]/40
              to-transparent
            "
          />
        </motion.div>

        {/* =========================================================
            SECTION HEADER
        ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            mb-10
            sm:mb-16
          "
        >
          <h2
            className="
              text-4xl
              sm:text-6xl
              md:text-7xl
              lg:text-[5.5rem]
              tracking-tight
              uppercase
              leading-[0.9]
              sm:leading-[0.85]
              select-none
            "
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            <span
              className="
                block
                text-transparent
                bg-clip-text
                bg-gradient-to-b
                from-[#FFFFFF]
                via-[#D5CBC0]
                to-[#605448]
                drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]
              "
            >
              SELECTED WORKS.
            </span>

            <span
              className="
                block
                text-transparent
                bg-clip-text
                bg-gradient-to-b
                from-[#F7E7C4]
                via-[#C99E5D]
                to-[#543B1A]
                drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]
              "
            >
              ENGINEERED VALUE.
            </span>
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              font-light
              text-[#A8988B]
              max-w-sm
              mt-4
              md:mt-0
              leading-relaxed
            "
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Scroll down to unfold the system architecture cards. Each
            platform was built to solve complex operational challenges.
          </p>
        </motion.div>

        {/* =========================================================
            PROJECT STACK
        ========================================================== */}

        <ScrollStack
          itemDistance={24}
          itemScale={0.03}
          itemStackDistance={20}
          stackPosition="10%"
          scaleEndPosition="4%"
          baseScale={0.88}
          useWindowScroll={true}
          mobileBreakpoint={0}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div
                className="
                  relative
                  w-full
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-[#8C6D4F]/50
                  bg-[#0E0C0A]
                  p-5
                  sm:p-10
                  lg:p-12
                  shadow-[0_25px_70px_rgba(0,0,0,0.98)]
                  group
                  overflow-hidden
                  transition-all
                  duration-500
                  hover:border-[#D4AF37]
                "
              >
                {/* =================================================
                    TOP LIGHT
                ================================================== */}

                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[1px]
                    bg-gradient-to-r
                    from-transparent
                    via-[#D4AF37]/80
                    to-transparent
                  "
                />

                {/* =================================================
                    SOFT CARD GLOW
                ================================================== */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_75%_20%,rgba(212,175,55,0.055),transparent_35%)]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-700
                    pointer-events-none
                  "
                />

                {/* =================================================
                    CORNER BRACKETS
                ================================================== */}

                <div
                  className="
                    absolute
                    top-0
                    left-0
                    w-3
                    sm:w-4
                    h-3
                    sm:h-4
                    border-t-2
                    border-l-2
                    border-[#D4AF37]/50
                    group-hover:border-[#D4AF37]
                    transition-colors
                    duration-300
                  "
                />

                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-3
                    sm:w-4
                    h-3
                    sm:h-4
                    border-t-2
                    border-r-2
                    border-[#D4AF37]/50
                    group-hover:border-[#D4AF37]
                    transition-colors
                    duration-300
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-3
                    sm:w-4
                    h-3
                    sm:h-4
                    border-b-2
                    border-l-2
                    border-[#D4AF37]/50
                    group-hover:border-[#D4AF37]
                    transition-colors
                    duration-300
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-3
                    sm:w-4
                    h-3
                    sm:h-4
                    border-b-2
                    border-r-2
                    border-[#D4AF37]/50
                    group-hover:border-[#D4AF37]
                    transition-colors
                    duration-300
                  "
                />

                {/* =================================================
                    WATERMARK NUMBER
                ================================================== */}

                <span
                  className="
                    absolute
                    -bottom-4
                    sm:-bottom-6
                    -right-2
                    sm:-right-3
                    text-7xl
                    sm:text-9xl
                    font-bold
                    text-[#EAD8C7]/5
                    select-none
                    pointer-events-none
                    leading-none
                  "
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                  }}
                >
                  {project.number}
                </span>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div
                  className="
                    grid
                    grid-cols-1
                    lg:grid-cols-12
                    gap-7
                    sm:gap-8
                    items-start
                    relative
                    z-10
                  "
                >
                  {/* =================================================
                      LEFT SIDE
                  ================================================== */}

                  <div
                    className="
                      lg:col-span-7
                      flex
                      flex-col
                      justify-between
                    "
                  >
                    {/* PROJECT INFORMATION */}

                    <div>

                      {/* CATEGORY */}

                      <div
                        className="
                          flex
                          items-center
                          space-x-3
                          mb-3
                          sm:mb-4
                        "
                      >
                        <span
                          className="
                            text-xs
                            font-mono
                            font-bold
                            text-[#D4AF37]
                          "
                        >
                          {project.number} //
                        </span>

                        <span
                          className="
                            text-[9.5px]
                            sm:text-[10.5px]
                            font-mono
                            tracking-[0.2em]
                            sm:tracking-[0.25em]
                            uppercase
                            text-[#A8988B]
                          "
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* TITLE */}

                      <h3
                        className="
                          text-3xl
                          sm:text-5xl
                          lg:text-6xl
                          font-normal
                          tracking-tight
                          text-white
                          mb-3
                          sm:mb-4
                          group-hover:text-[#F7E7C4]
                          transition-colors
                          duration-500
                          uppercase
                          leading-[0.95]
                          sm:leading-[0.9]
                        "
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          text-xs
                          sm:text-sm
                          md:text-[14px]
                          font-light
                          text-[#BDB0A4]
                          leading-[1.7]
                          sm:leading-[1.85]
                          tracking-wide
                          mb-6
                          sm:mb-8
                          max-w-2xl
                        "
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* =================================================
                        TECHNOLOGIES
                    ================================================== */}

                    <div
                      className="
                        pt-4
                        sm:pt-6
                        border-t
                        border-[#8C6D4F]/25
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          mb-3
                        "
                      >
                        <span
                          className="
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-[#D4AF37]
                            shadow-[0_0_8px_rgba(212,175,55,0.7)]
                          "
                        />

                        <span
                          className="
                            text-[8px]
                            sm:text-[9px]
                            font-mono
                            tracking-[0.25em]
                            uppercase
                            text-[#8C6D4F]
                          "
                        >
                          TECHNOLOGY USE
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="
                              px-2.5
                              sm:px-3
                              py-1
                              text-[9px]
                              sm:text-[10px]
                              font-medium
                              tracking-[0.14em]
                              sm:tracking-[0.16em]
                              uppercase
                              rounded-sm
                              border
                              border-[#8C6D4F]/40
                              bg-[#16120E]
                              text-[#E8D7C5]
                              group-hover:border-[#D4AF37]/50
                              group-hover:bg-[#1B160F]
                              transition-all
                              duration-300
                            "
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      RIGHT SIDE — IMAGE
                  ================================================== */}

                  <div
                    className="
                      lg:col-span-5
                      flex
                      flex-col
                      justify-between
                      h-full
                      lg:pl-6
                      lg:border-l
                      lg:border-[#8C6D4F]/25
                    "
                  >
                    {/* IMAGE HEADER */}

                    <div>

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          mb-3
                        "
                      >
                        <span
                          className="
                            text-[9px]
                            sm:text-[9.5px]
                            font-mono
                            tracking-[0.2em]
                            sm:tracking-[0.25em]
                            uppercase
                            text-[#8C6D4F]
                          "
                        >
                          // PROJECT PREVIEW
                        </span>

                        <span
                          className="
                            text-[8px]
                            sm:text-[9px]
                            font-mono
                            tracking-[0.2em]
                            text-[#D4AF37]/70
                          "
                        >
                          0{project.number}
                        </span>
                      </div>

                      {/* =================================================
                          IMAGE FRAME
                      ================================================== */}

                      <div
                        className="
                          relative
                          w-full
                          aspect-[16/10]
                          rounded-lg
                          overflow-hidden
                          border
                          border-[#8C6D4F]/40
                          bg-[#050403]
                          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                        "
                      >
                        {/* IMAGE */}

                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          loading="lazy"
                          className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-1000
                            ease-out
                            group-hover:scale-[1.045]
                          "
                        />

                        {/* CINEMATIC OVERLAY */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/80
                            via-black/10
                            to-black/20
                            pointer-events-none
                          "
                        />

                        {/* GOLD TINT */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-transparent
                            via-transparent
                            to-[#D4AF37]/10
                            opacity-60
                            pointer-events-none
                          "
                        />

                        {/* HOVER GLOW */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_70%_25%,rgba(212,175,55,0.22),transparent_42%)]
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                            duration-700
                            pointer-events-none
                          "
                        />

                        {/* =================================================
                            SCAN LINE
                        ================================================== */}

                        <motion.div
                          initial={{
                            y: '-100%',
                          }}
                          animate={{
                            y: '200%',
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: 'linear',
                          }}
                          className="
                            absolute
                            left-0
                            right-0
                            h-[1px]
                            bg-gradient-to-r
                            from-transparent
                            via-[#D4AF37]/60
                            to-transparent
                            pointer-events-none
                          "
                        />

                        {/* =================================================
                            IMAGE FRAME CORNERS
                        ================================================== */}

                        <div
                          className="
                            absolute
                            top-3
                            left-3
                            w-5
                            h-5
                            border-t
                            border-l
                            border-[#D4AF37]/70
                          "
                        />

                        <div
                          className="
                            absolute
                            top-3
                            right-3
                            w-5
                            h-5
                            border-t
                            border-r
                            border-[#D4AF37]/70
                          "
                        />

                        <div
                          className="
                            absolute
                            bottom-3
                            left-3
                            w-5
                            h-5
                            border-b
                            border-l
                            border-[#D4AF37]/70
                          "
                        />

                        <div
                          className="
                            absolute
                            bottom-3
                            right-3
                            w-5
                            h-5
                            border-b
                            border-r
                            border-[#D4AF37]/70
                          "
                        />

                        {/* =================================================
                            IMAGE FOOTER LABEL
                        ================================================== */}

                        <div
                          className="
                            absolute
                            bottom-3
                            left-4
                            right-4
                            flex
                            items-center
                            justify-between
                          "
                        >
                          <span
                            className="
                              text-[8px]
                              sm:text-[9px]
                              font-mono
                              tracking-[0.2em]
                              uppercase
                              text-white/60
                            "
                          >
                            SYSTEM / {project.number}
                          </span>

                          <span
                            className="
                              text-[8px]
                              sm:text-[9px]
                              font-mono
                              tracking-[0.15em]
                              uppercase
                              text-[#D4AF37]/80
                            "
                          >
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        BOTTOM META
                    ================================================== */}

                    <div className="mt-4 sm:mt-6">

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          pt-3
                          border-t
                          border-[#8C6D4F]/20
                        "
                      >
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span
                              className="
                                absolute
                                inline-flex
                                h-full
                                w-full
                                rounded-full
                                bg-[#D4AF37]/50
                                animate-ping
                              "
                            />

                            <span
                              className="
                                relative
                                inline-flex
                                rounded-full
                                h-1.5
                                w-1.5
                                bg-[#D4AF37]
                              "
                            />
                          </span>

                          <span
                            className="
                              text-[8px]
                              sm:text-[9px]
                              font-mono
                              uppercase
                              tracking-[0.2em]
                              text-[#A8988B]
                            "
                          >
                            Production System
                          </span>
                        </div>

                        <span
                          className="
                            text-[8px]
                            sm:text-[9px]
                            font-mono
                            uppercase
                            tracking-[0.2em]
                            text-[#8C6D4F]
                          "
                        >
                          Engineered
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default ProjectsSection;