import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";

// import watermarkImg from "../assets/watermark.png";
import heroBackgroundImg from "../assets/hero-background.jpg";

import LiquidGlassBackground from "./LiquidGlassBackground";
import resume from "../assets/webdeveloper_arslan.pdf";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ============================================================
   NAVIGATION
============================================================ */

const navItems = [
  {
    name: "ABOUT",
    href: "#about",
  },
  {
    name: "PROJECTS",
    href: "#work",
  },
  {
    name: "SERVICES",
    href: "#skills",
  },
  {
    name: "ACHIEVEMENTS",
    href: "#certifications",
  },
  {
    name: "BLOG",
    href: "#blog",
  },
  {
    name: "CONTACT",
    href: "#contact",
  },
];

/* ============================================================
   LOGO ANIMATION
============================================================ */

type LogoFrame = {
  a: {
    x: number;
    scale: number;
    opacity: number;
  };

  d: {
    x: number;
    scale: number;
    opacity: number;
  };

  full: {
    scale: number;
    opacity: number;
  };

  duration: number;
  transition: Transition;
};

const EASE_SMOOTH: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
];

const logoFrames: LogoFrame[] = [
  {
    a: { x: -9, scale: 1, opacity: 1 },
    d: { x: 9, scale: 1, opacity: 1 },
    full: { scale: 0.6, opacity: 0 },
    duration: 1600,
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },

  {
    a: { x: -2, scale: 1.05, opacity: 1 },
    d: { x: 2, scale: 1.05, opacity: 1 },
    full: { scale: 0.6, opacity: 0 },
    duration: 280,
    transition: { duration: 0.28, ease: EASE_SMOOTH },
  },

  {
    a: { x: 0, scale: 0.15, opacity: 0 },
    d: { x: 0, scale: 0.15, opacity: 0 },
    full: { scale: 0.35, opacity: 0.25 },
    duration: 220,
    transition: { duration: 0.22, ease: "easeIn" },
  },

  {
    a: { x: 0, scale: 0, opacity: 0 },
    d: { x: 0, scale: 0, opacity: 0 },
    full: { scale: 1.06, opacity: 1 },
    duration: 420,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 14,
      mass: 0.6,
    },
  },

  {
    a: { x: 0, scale: 0, opacity: 0 },
    d: { x: 0, scale: 0, opacity: 0 },
    full: { scale: 1, opacity: 1 },
    duration: 1700,
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },

  {
    a: { x: 0, scale: 0, opacity: 0 },
    d: { x: 0, scale: 0, opacity: 0 },
    full: { scale: 0.3, opacity: 0 },
    duration: 260,
    transition: { duration: 0.26, ease: "easeIn" },
  },

  {
    a: { x: 0, scale: 0.15, opacity: 1 },
    d: { x: 0, scale: 0.15, opacity: 1 },
    full: { scale: 0, opacity: 0 },
    duration: 220,
    transition: { duration: 0.22, ease: EASE_SMOOTH },
  },

  {
    a: { x: -10.5, scale: 1.08, opacity: 1 },
    d: { x: 10.5, scale: 1.08, opacity: 1 },
    full: { scale: 0, opacity: 0 },
    duration: 280,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12,
      mass: 0.5,
    },
  },

  {
    a: { x: -9, scale: 1, opacity: 1 },
    d: { x: 9, scale: 1, opacity: 1 },
    full: { scale: 0.6, opacity: 0 },
    duration: 200,
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },
];

/* ============================================================
   BRAND FONTS
============================================================ */

const brandFonts = [
  {
    id: "syne",
    label: "Syne",
    family: "'Syne', sans-serif",
    weight: 800,
  },
  {
    id: "cormorant",
    label: "Cormorant",
    family: "'Cormorant Garamond', serif",
    weight: 700,
  },
  {
    id: "playfair",
    label: "Playfair",
    family: "'Playfair Display', serif",
    weight: 700,
  },
  {
    id: "cinzel",
    label: "Cinzel",
    family: "'Cinzel', serif",
    weight: 700,
  },
  {
    id: "marcellus",
    label: "Marcellus",
    family: "'Marcellus', serif",
    weight: 400,
  },
  {
    id: "bebas",
    label: "Bebas Neue",
    family: "'Bebas Neue', sans-serif",
    weight: 400,
  },
];

/* ============================================================
   HERO SECTION
============================================================ */

export const HeroSection: React.FC = () => {
  /* ==========================================================
     STATE
  ========================================================== */

  const [cursorPos, setCursorPos] = useState({
    x: -100,
    y: -100,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /*
   * Used to preserve the page's scroll position while
   * the mobile drawer is open.
   */
  const lockedScrollY = useRef(0);

  /*
   * Used by the logo animation.
   */
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  /* ==========================================================
     MOUSE CURSOR
  ========================================================== */

  useEffect(() => {
    /*
     * Do not run cursor tracking on touch devices.
     */
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let rafId: number | null = null;

    let nextX = -100;
    let nextY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;

      if (rafId !== null) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        setCursorPos({
          x: nextX,
          y: nextY,
        });

        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  /* ==========================================================
     LOAD SAVED FONT
  ========================================================== */

  useEffect(() => {
    const saved =
      window.localStorage?.getItem("brand-font-index");

    if (saved !== null && !Number.isNaN(Number(saved))) {
      const parsed = Number(saved);

      if (
        parsed >= 0 &&
        parsed < brandFonts.length
      ) {
        setFontIndex(parsed);
      }
    }
  }, []);

  /* ==========================================================
     FONT SELECTOR
  ========================================================== */

  const selectFont = (index: number) => {
    setFontIndex(index);

    window.localStorage?.setItem(
      "brand-font-index",
      String(index),
    );
  };

  /* ==========================================================
     LOGO ANIMATION LOOP
  ========================================================== */

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    const advance = () => {
      if (cancelled) {
        return;
      }

      setFrameIndex(i);

      const frame = logoFrames[i];

      timeoutRef.current = setTimeout(() => {
        i = (i + 1) % logoFrames.length;
        advance();
      }, frame.duration);
    };

    advance();

    return () => {
      cancelled = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /* ==========================================================
     MOBILE MENU BODY LOCK
  ========================================================== */

  useEffect(() => {
    if (isMobileMenuOpen) {
      lockedScrollY.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(
        0,
        lockedScrollY.current,
      );
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  /* ==========================================================
     ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  /* ==========================================================
     CLOSE MENU WHEN SCREEN BECOMES DESKTOP
  ========================================================== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  /* ==========================================================
     NAVIGATION

     Header is now ONLY part of the Hero section.
     It does not stay fixed while scrolling the website.
  ========================================================== */

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    setIsMobileMenuOpen(false);

    if (!href.startsWith("#")) {
      window.location.href = href;
      return;
    }

    const targetId = href.substring(1);

    const target =
      document.getElementById(targetId);

    if (!target) {
      window.history.pushState(
        null,
        "",
        href,
      );

      return;
    }

    setTimeout(() => {
      /*
       * Header is not fixed anymore, so the offset
       * is smaller and only gives the section some breathing room.
       */
      const headerOffset =
        window.innerWidth >= 1024
          ? 40
          : 24;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: Math.max(targetPosition, 0),
        behavior: "smooth",
      });

      window.history.pushState(
        null,
        "",
        href,
      );
    }, 60);
  };

  /* ==========================================================
     CURRENT ANIMATION DATA
  ========================================================== */

  const currentFrame =
    logoFrames[frameIndex];

  const activeFont =
    brandFonts[fontIndex];

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      className="
        relative
        w-full
        min-h-dvh
        lg:h-screen
        bg-black
        text-[#E8DFD8]
        font-sans
        selection:bg-[#cbb59d]
        selection:text-black
        lg:cursor-none
        overflow-x-hidden
      "
    >
      {/* ======================================================
          CUSTOM CURSOR
      ====================================================== */}

      {cursorPos.x >= 0 && (
        <motion.div
          className="
            hidden
            lg:flex
            fixed
            top-0
            left-0
            pointer-events-none
            z-[100]
            rounded-full
            border
            border-[#D4AF37]/40
            items-center
            justify-center
            backdrop-blur-[1px]
          "
          animate={{
            x:
              cursorPos.x -
              (isHovered ? 24 : 5),

            y:
              cursorPos.y -
              (isHovered ? 24 : 5),

            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,

            backgroundColor: isHovered
              ? "rgba(212, 175, 55, 0.1)"
              : "rgba(235, 215, 195, 0.95)",
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 350,
            mass: 0.5,
          }}
        />
      )}

      {/* ======================================================
          HERO BACKGROUND
      ====================================================== */}

      <div
        className="
          fixed
          inset-0
          z-0
          overflow-hidden
          pointer-events-none
          bg-black
        "
      >
        <LiquidGlassBackground
          imageSrc={heroBackgroundImg}
          intensity={0.55}
          className="absolute inset-0"
        />

        {/* MOBILE + DESKTOP GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/55
            via-black/45
            to-black/95
            lg:bg-gradient-to-r
            lg:from-black
            lg:via-black/85
            lg:to-transparent
          "
        />

        {/* EXTRA MOBILE CONTRAST */}

        <div
          className="
            absolute
            inset-0
            lg:hidden
            bg-gradient-to-t
            from-black
            via-transparent
            to-black/30
          "
        />

        {/* ====================================================
            WATERMARK
        ==================================================== */}

        <div
          className="
            absolute
            bottom-5
            right-4
            sm:bottom-7
            sm:right-7
            lg:bottom-10
            lg:right-12
            pointer-events-none
            flex
            items-center
            justify-center
            z-10
          "
        >
          <div className="relative flex items-center justify-center">
            <div
              className="
                absolute
                w-28
                h-28
                sm:w-32
                sm:h-32
                lg:w-36
                lg:h-36
                bg-black/85
                rounded-full
                blur-xl
              "
            />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                flex
                items-center
                justify-center
              "
            >
              {/* Watermark image intentionally disabled */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT LAYER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-between
          min-h-dvh
          lg:h-full
          w-full
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          pt-5
          sm:pt-6
          pb-6
          lg:pb-8
          pointer-events-none
        "
      >
        {/* ====================================================
            HERO NAVIGATION

            IMPORTANT:
            `absolute` instead of `fixed`.

            This means the navigation belongs ONLY to
            this Hero section and will scroll away with it.
        ==================================================== */}

        <motion.header
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            absolute
            top-4
            sm:top-5
            lg:top-6
            left-1/2
            -translate-x-1/2

            w-[calc(100%-32px)]
            sm:w-[calc(100%-48px)]
            lg:w-[calc(100%-96px)]

            max-w-[1450px]

            h-[62px]
            sm:h-[66px]
            lg:h-[70px]

            px-4
            sm:px-6
            lg:px-7

            rounded-[14px]

            border
            border-[#D4AF37]/20

            bg-[#0B0908]/55

            backdrop-blur-xl
            backdrop-saturate-150

            shadow-[0_12px_40px_rgba(0,0,0,0.28)]

            flex
            items-center
            justify-between

            pointer-events-auto

            z-[70]
          "
        >
          {/* ==================================================
              HEADER GLASS HIGHLIGHT
          ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-px
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-[#D4AF37]/40
              to-transparent
              pointer-events-none
            "
          />

          {/* ==================================================
              LOGO
          ================================================== */}

          <div
            className="
              relative
              flex
              flex-col
              items-start
              shrink-0
            "
            onMouseEnter={() =>
              setShowFontPicker(true)
            }
            onMouseLeave={() =>
              setShowFontPicker(false)
            }
          >
            <a
              href="#"
              onClick={(e) =>
                handleNavigation(e, "#")
              }
              onMouseEnter={() =>
                setIsHovered(true)
              }
              onMouseLeave={() =>
                setIsHovered(false)
              }
              className="
                relative
                flex
                items-center
                h-8
                sm:h-9
                lg:h-10
                w-[120px]
                sm:w-[150px]
                lg:w-[170px]
                cursor-none
                border-none
                outline-none
                focus:outline-none
                focus-visible:outline-none
                ring-0
              "
              style={{
                border: "none",
                boxShadow: "none",
              }}
            >
              <svg
                viewBox="0 0 190 34"
                preserveAspectRatio="xMidYMid meet"
                className="
                  w-full
                  h-full
                  overflow-visible
                "
              >
                <g transform="translate(95,17)">
                  {/* A */}

                  <motion.text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily={activeFont.family}
                    fontWeight={activeFont.weight}
                    fontSize="20"
                    fill="#EAD8C7"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                    animate={{
                      x: currentFrame.a.x,
                      scale: currentFrame.a.scale,
                      opacity:
                        currentFrame.a.opacity,
                    }}
                    transition={
                      currentFrame.transition
                    }
                  >
                    A
                  </motion.text>

                  {/* D */}

                  <motion.text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily={activeFont.family}
                    fontWeight={activeFont.weight}
                    fontSize="20"
                    fill="#EAD8C7"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                    animate={{
                      x: currentFrame.d.x,
                      scale:
                        currentFrame.d.scale,
                      opacity:
                        currentFrame.d.opacity,
                    }}
                    transition={
                      currentFrame.transition
                    }
                  >
                    D
                  </motion.text>

                  {/* FULL NAME */}

                  <motion.text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily={activeFont.family}
                    fontWeight={Math.min(
                      activeFont.weight,
                      700,
                    )}
                    fontSize="14"
                    fill="#EAD8C7"
                    letterSpacing="1.5"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                    animate={{
                      scale:
                        currentFrame.full.scale,
                      opacity:
                        currentFrame.full.opacity,
                    }}
                    transition={
                      currentFrame.transition
                    }
                  >
                    <tspan fill="#D4AF37">
                      A
                    </tspan>

                    <tspan>
                      rslan
                    </tspan>

                    <tspan fill="#D4AF37">
                      D
                    </tspan>

                    <tspan>
                      eshmukh
                    </tspan>
                  </motion.text>
                </g>
              </svg>
            </a>

            {/* ==================================================
                FONT PICKER
            ================================================== */}

            <AnimatePresence>
              {showFontPicker && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="
                    absolute
                    top-11
                    left-0
                    hidden
                    lg:flex
                    flex-wrap
                    gap-1.5
                    bg-[#0B0908]/95
                    border
                    border-[#8C6D4F]/30
                    rounded-md
                    px-2
                    py-1.5
                    z-30
                    backdrop-blur-sm
                    max-w-[350px]
                  "
                >
                  {brandFonts.map(
                    (font, idx) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() =>
                          selectFont(idx)
                        }
                        onMouseEnter={() =>
                          setIsHovered(true)
                        }
                        onMouseLeave={() =>
                          setIsHovered(false)
                        }
                        style={{
                          fontFamily:
                            font.family,
                        }}
                        className={`
                          text-[10px]
                          px-2
                          py-1
                          rounded
                          transition-colors
                          duration-150
                          whitespace-nowrap

                          ${
                            idx === fontIndex
                              ? "bg-[#D4AF37]/20 text-[#F3DBB3] border border-[#D4AF37]/50"
                              : "text-[#A8988B] border border-transparent hover:text-[#EAD8C7] hover:border-[#8C6D4F]/40"
                          }
                        `}
                      >
                        {font.label}
                      </button>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              justify-center
              gap-7
              xl:gap-9
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              text-[10px]
              xl:text-[11px]
              tracking-[0.24em]
              xl:tracking-[0.28em]
              font-light
              uppercase
              text-[#C4B5A5]
              whitespace-nowrap
            "
            style={{
              fontFamily:
                "'Montserrat', sans-serif",
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) =>
                  handleNavigation(
                    e,
                    item.href,
                  )
                }
                onMouseEnter={() =>
                  setIsHovered(true)
                }
                onMouseLeave={() =>
                  setIsHovered(false)
                }
                className="
                  relative
                  group
                  py-1
                  transition-colors
                  duration-200
                  hover:text-[#FFF5EB]
                "
              >
                {item.name}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-0
                    h-px
                    bg-[#D4AF37]/60
                    transition-all
                    duration-200
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </nav>

          {/* ==================================================
              DESKTOP TALK BUTTON
          ================================================== */}

          <a
            href="#contact"
            onClick={(e) =>
              handleNavigation(
                e,
                "#contact",
              )
            }
            onMouseEnter={() =>
              setIsHovered(true)
            }
            onMouseLeave={() =>
              setIsHovered(false)
            }
            className="
              hidden
              lg:flex
              group
              items-center
              space-x-2
              text-[10px]
              xl:text-[11px]
              tracking-[0.22em]
              uppercase
              py-2.5
              px-4
              border
              border-[#8C6D4F]/50
              hover:border-[#D4AF37]
              text-[#EAD8C7]
              transition-all
              duration-200
              backdrop-blur-sm
              rounded-[10px]
              shrink-0
            "
            style={{
              fontFamily:
                "'Montserrat', sans-serif",
            }}
          >
            <span>
              LET&apos;S TALK
            </span>

            <span
              className="
                transform
                transition-transform
                duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                text-xs
              "
            >
              ↗
            </span>
          </a>

          {/* ==================================================
              MOBILE / TABLET HAMBURGER
          ================================================== */}

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={
              isMobileMenuOpen
            }
            onClick={() =>
              setIsMobileMenuOpen(true)
            }
            className="
              lg:hidden
              relative
              flex
              items-center
              justify-center
              w-11
              h-11
              shrink-0
              rounded-[10px]
              border
              border-[#8C6D4F]/50
              bg-[#0B0908]/60
              backdrop-blur-md
              text-[#EAD8C7]
            "
          >
            <span className="sr-only">
              Open menu
            </span>

            <div className="flex flex-col gap-[5px]">
              <span className="block w-5 h-px bg-[#EAD8C7]" />
              <span className="block w-3.5 h-px bg-[#D4AF37] self-end" />
              <span className="block w-5 h-px bg-[#EAD8C7]" />
            </div>
          </button>
        </motion.header>

        {/* ====================================================
            MOBILE / TABLET DRAWER
        ==================================================== */}

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* BACKDROP */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.18,
                }}
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="
                  fixed
                  inset-0
                  z-[80]
                  bg-black/75
                  backdrop-blur-sm
                  lg:hidden
                  pointer-events-auto
                "
              />

              {/* DRAWER */}

              <motion.aside
                initial={{
                  x: "100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: "100%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 32,
                  mass: 0.7,
                }}
                className="
                  fixed
                  top-0
                  right-0
                  bottom-0
                  z-[90]
                  w-[86%]
                  max-w-[380px]
                  bg-[#0B0908]
                  border-l
                  border-[#8C6D4F]/30
                  lg:hidden
                  will-change-transform
                  pointer-events-auto
                  overflow-y-auto
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    h-full
                    min-h-full
                    px-7
                    sm:px-10
                    py-7
                  "
                >
                  {/* DRAWER HEADER */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      pb-7
                      border-b
                      border-[#8C6D4F]/20
                    "
                  >
                    <div
                      className="
                        text-[11px]
                        tracking-[0.28em]
                        uppercase
                        text-[#D4AF37]
                      "
                      style={{
                        fontFamily:
                          "'Montserrat', sans-serif",
                      }}
                    >
                      NAVIGATION
                    </div>

                    <button
                      type="button"
                      aria-label="Close navigation menu"
                      onClick={() =>
                        setIsMobileMenuOpen(
                          false,
                        )
                      }
                      className="
                        w-10
                        h-10
                        flex
                        items-center
                        justify-center
                        border
                        border-[#8C6D4F]/40
                        text-[#EAD8C7]
                        hover:border-[#D4AF37]
                        hover:text-[#D4AF37]
                        transition-colors
                        rounded-[10px]
                      "
                    >
                      <span className="text-2xl leading-none font-light">
                        ×
                      </span>
                    </button>
                  </div>

                  {/* NAVIGATION */}

                  <nav className="flex flex-col mt-8">
                    {navItems.map(
                      (item, index) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          onClick={(e) =>
                            handleNavigation(
                              e,
                              item.href,
                            )
                          }
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              0.04 +
                              index * 0.035,
                            duration: 0.25,
                          }}
                          className="
                            group
                            flex
                            items-center
                            justify-between
                            py-4
                            border-b
                            border-[#8C6D4F]/15
                            text-[#D8CDC2]
                            hover:text-[#D4AF37]
                            transition-colors
                          "
                          style={{
                            fontFamily:
                              "'Montserrat', sans-serif",
                          }}
                        >
                          <span className="text-[12px] tracking-[0.25em]">
                            {item.name}
                          </span>

                          <span
                            className="
                              text-[#8C6D4F]
                              group-hover:text-[#D4AF37]
                              transition-colors
                            "
                          >
                            ↗
                          </span>
                        </motion.a>
                      ),
                    )}
                  </nav>

                  {/* DRAWER FOOTER */}

                  <div className="mt-auto pt-8">
                    <div
                      className="
                        w-full
                        h-px
                        bg-gradient-to-r
                        from-[#D4AF37]
                        via-[#8C6D4F]/40
                        to-transparent
                        mb-6
                      "
                    />

                    <a
                      href="#contact"
                      onClick={(e) =>
                        handleNavigation(
                          e,
                          "#contact",
                        )
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        w-full
                        px-5
                        py-4
                        border
                        border-[#D4AF37]/50
                        bg-[#D4AF37]/5
                        text-[#EAD8C7]
                        hover:bg-[#D4AF37]/10
                        transition-colors
                        rounded-[10px]
                      "
                      style={{
                        fontFamily:
                          "'Montserrat', sans-serif",
                      }}
                    >
                      <span className="text-[11px] tracking-[0.24em]">
                        LET&apos;S TALK
                      </span>

                      <span>
                        ↗
                      </span>
                    </a>

                    <p
                      className="
                        mt-5
                        text-[9px]
                        tracking-[0.22em]
                        uppercase
                        text-[#76695F]
                        leading-relaxed
                      "
                      style={{
                        fontFamily:
                          "'Montserrat', sans-serif",
                      }}
                    >
                      Building digital
                      experiences
                      <br />
                      with purpose &
                      precision.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ====================================================
            MAIN HERO
        ==================================================== */}

        <div
          className="
            relative
            flex
            flex-col
            lg:flex-row
            items-start
            lg:items-center
            justify-center
            lg:justify-between
            w-full
            pt-28
            sm:pt-32
            md:pt-36
            lg:pt-28
            xl:pt-32
            pb-6
            my-auto
          "
        >
          {/* ==================================================
              LEFT HERO CONTENT
          ================================================== */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              max-w-full
              sm:max-w-xl
              md:max-w-2xl
              lg:max-w-[37rem]
              xl:max-w-[40rem]
              pointer-events-auto
              z-20
            "
          >
            {/* HEADLINE */}

            <motion.div
              variants={fadeUpVariants}
              className="
                relative
                mb-4
                sm:mb-5
                select-none
              "
            >
              <h1
                className="
                  text-[3.4rem]
                  xs:text-[3.9rem]
                  sm:text-[5rem]
                  md:text-[5.6rem]
                  lg:text-[7.2rem]
                  xl:text-[7.8rem]
                  tracking-[-0.03em]
                  uppercase
                  leading-[0.85]
                "
                style={{
                  fontFamily:
                    "'Bebas Neue', sans-serif",
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
                    drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]
                  "
                >
                  I BUILD
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
                  DIGITAL
                </span>

                <span
                  className="
                    block
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-b
                    from-[#DFBE8A]
                    via-[#9B7640]
                    to-[#342410]
                    drop-shadow-[0_10px_30px_rgba(155,118,64,0.4)]
                  "
                >
                  EXPERIENCES
                </span>
              </h1>
            </motion.div>

            {/* ==================================================
                TECHNOLOGIES
            ================================================== */}

            <motion.div
              variants={fadeUpVariants}
              className="mb-4"
            >
              <p
                className="
                  text-[9px]
                  sm:text-[10px]
                  md:text-[11px]
                  lg:text-xs
                  font-normal
                  tracking-[0.18em]
                  sm:tracking-[0.24em]
                  lg:tracking-[0.28em]
                  uppercase
                  text-[#C4B29E]
                "
                style={{
                  fontFamily:
                    "'Montserrat', sans-serif",
                }}
              >
                BACKEND DEVELOPER
                <span className="text-[#8C6D4F] mx-1">
                  •
                </span>
                PYTHON DEVELOPER
              </p>
            </motion.div>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <motion.div
              variants={fadeUpVariants}
              className="
                text-[11px]
                sm:text-xs
                md:text-sm
                lg:text-[13.5px]
                font-light
                text-[#A8988B]
                leading-[1.75]
                sm:leading-[1.8]
                tracking-wide
                max-w-lg
                mb-6
              "
              style={{
                fontFamily:
                  "'Montserrat', sans-serif",
              }}
            >
              <p>
                Transforming ideas into powerful
                digital realities.
              </p>

              <p className="mt-1">
                Crafting exceptional web
                experiences with clean code,
                innovative solutions, and
                cutting-edge technologies.
              </p>
            </motion.div>

            {/* ==================================================
                CTA BUTTONS
            ================================================== */}

            <motion.div
              variants={fadeUpVariants}
              className="
                flex
                flex-col
                sm:flex-row
                items-stretch
                sm:items-center
                gap-3
                sm:gap-4
                md:gap-5
              "
              style={{
                fontFamily:
                  "'Montserrat', sans-serif",
              }}
            >
              {/* WORK */}

              <motion.a
                href="#work"
                onClick={(e) =>
                  handleNavigation(
                    e,
                    "#work",
                  )
                }
                onMouseEnter={() =>
                  setIsHovered(true)
                }
                onMouseLeave={() =>
                  setIsHovered(false)
                }
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  relative
                  inline-flex
                  items-center
                  justify-center
                  space-x-3
                  px-5
                  sm:px-6
                  md:px-7
                  py-3.5
                  border
                  border-[#8C6D4F]
                  bg-[#120F0C]/80
                  hover:border-[#D4AF37]
                  text-[#EAD8C7]
                  hover:text-[#FFF5EB]
                  text-[10px]
                  sm:text-[11px]
                  font-medium
                  tracking-[0.2em]
                  sm:tracking-[0.24em]
                  uppercase
                  transition-all
                  duration-200
                  shadow-[0_0_25px_rgba(212,175,55,0.18)]
                "
              >
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    w-full
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#E8D7C5]/40
                    to-transparent
                    pointer-events-none
                  "
                />

                <span>
                  EXPLORE MY WORK
                </span>

                <span>
                  ↗
                </span>
              </motion.a>

              {/* RESUME */}

              <motion.a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() =>
                  setIsHovered(true)
                }
                onMouseLeave={() =>
                  setIsHovered(false)
                }
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  relative
                  inline-flex
                  items-center
                  justify-center
                  space-x-2
                  px-5
                  sm:px-6
                  md:px-7
                  py-3.5
                  border
                  border-[#8C6D4F]/40
                  hover:border-[#8C6D4F]
                  text-[#BFA895]
                  hover:text-[#EAD8C7]
                  text-[10px]
                  sm:text-[11px]
                  font-medium
                  tracking-[0.2em]
                  sm:tracking-[0.24em]
                  uppercase
                  transition-all
                  duration-200
                "
              >
                <span>
                  DOWNLOAD RESUME
                </span>

                <span>
                  ↓
                </span>
              </motion.a>
            </motion.div>

            {/* ==================================================
                MOBILE / TABLET QUOTE + SIGNATURE
            ================================================== */}

            <motion.div
              variants={fadeUpVariants}
              className="
                lg:hidden
                flex
                flex-col
                items-center
                text-center
                mt-10
                sm:mt-12
                pt-8
                border-t
                border-[#8C6D4F]/20
                select-none
              "
            >
              <span className="text-xl text-[#C99E5D] leading-none font-serif mb-2">
                &ldquo;
              </span>

              <div
                className="
                  text-[9.5px]
                  sm:text-[10.5px]
                  font-medium
                  tracking-[0.24em]
                  uppercase
                  text-[#E0D3C5]
                  space-y-1
                  mb-3
                "
                style={{
                  fontFamily:
                    "'Montserrat', sans-serif",
                }}
              >
                <p>
                  CODE IS MY WEAPON.
                </p>

                <p>
                  RESULTS ARE MY PROOF.
                </p>
              </div>

              <div
                className="
                  w-20
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]
                  to-transparent
                  shadow-[0_0_8px_rgba(212,175,55,0.4)]
                  mb-2
                "
              />

              <div
                className="
                  text-[1.9rem]
                  sm:text-[2.1rem]
                  text-[#D8AB64]
                  font-normal
                  leading-none
                "
                style={{
                  fontFamily:
                    "'Herr Von Muellerhoff', 'Allura', cursive",
                  letterSpacing:
                    "0.04em",
                }}
              >
                Arslan
              </div>
            </motion.div>
          </motion.div>

          {/* ==================================================
              DESKTOP QUOTE / SIGNATURE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              hidden
              lg:flex
              flex-col
              items-start
              pointer-events-auto
              pr-24
              xl:pr-36
              mr-4
              z-20
              select-none
            "
          >
            {/* QUOTE */}

            <span className="text-xl text-[#C99E5D] leading-none font-serif mb-2">
              &ldquo;
            </span>

            {/* STATEMENT */}

            <div
              className="
                text-[9.5px]
                font-medium
                tracking-[0.24em]
                uppercase
                text-[#E0D3C5]
                space-y-1
                mb-3
              "
              style={{
                fontFamily:
                  "'Montserrat', sans-serif",
              }}
            >
              <p>
                CODE IS MY WEAPON.
              </p>

              <p>
                RESULTS ARE MY PROOF.
              </p>
            </div>

            {/* ACCENT */}

            <div
              className="
                w-28
                h-px
                bg-gradient-to-r
                from-[#D4AF37]
                via-[#E8D7C5]/70
                to-transparent
                shadow-[0_0_8px_rgba(212,175,55,0.4)]
                mb-2
              "
            />

            {/* SIGNATURE */}

            <div
              className="
                text-[2.2rem]
                text-[#D8AB64]
                font-normal
                leading-none
                -ml-0.5
              "
              style={{
                fontFamily:
                  "'Herr Von Muellerhoff', 'Allura', cursive",
                letterSpacing:
                  "0.04em",
              }}
            >
              Arslan
            </div>
          </motion.div>
        </div>

        {/* ====================================================
            BOTTOM SPACER
        ==================================================== */}

        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;