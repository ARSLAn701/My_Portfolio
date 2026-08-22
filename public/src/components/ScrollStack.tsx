import React, { useLayoutEffect, useRef, useCallback, useState, useEffect } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
  style?: React.CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  style,
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  mobileBreakpoint?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 32,
  itemScale = 0.03,
  itemStackDistance = 22,
  stackPosition = '12%',
  scaleEndPosition = '5%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
  mobileBreakpoint = 0, // Enabled for all device screen sizes
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const resizeRafRef = useRef<number | null>(null);

  const [isPinEnabled, setIsPinEnabled] = useState<boolean>(true);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsPinEnabled(window.innerWidth >= mobileBreakpoint);
    };
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    window.addEventListener('orientationchange', checkBreakpoint);
    return () => {
      window.removeEventListener('resize', checkBreakpoint);
      window.removeEventListener('orientationchange', checkBreakpoint);
    };
  }, [mobileBreakpoint]);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (end === start) return 0;
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!isPinEnabled) return;
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    try {
      const { scrollTop, containerHeight } = getScrollData();
      if (!containerHeight) return;

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      // Adjust stack offsets dynamically for smaller screens
      const baseStackPosPx = parsePercentage(stackPosition, containerHeight);
      const responsiveStackPos = isMobile ? Math.min(baseStackPosPx, 70) : isTablet ? Math.min(baseStackPosPx, 100) : baseStackPosPx;
      const responsiveStackDist = isMobile ? 16 : isTablet ? 20 : itemStackDistance;

      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

      const endElement = useWindowScroll
        ? (document.querySelector('.scroll-stack-end') as HTMLElement)
        : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement);

      const endElementTop = endElement
        ? endElement.getBoundingClientRect().top + window.scrollY
        : 0;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const cardTop = initialTopsRef.current[i] || 0;
        const triggerStart = cardTop - responsiveStackPos - responsiveStackDist * i;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = cardTop - responsiveStackPos - responsiveStackDist * i;
        const pinEnd = endElementTop - containerHeight / 2;

        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (let j = 0; j < cardsRef.current.length; j++) {
            const jCardTop = initialTopsRef.current[j] || 0;
            const jTriggerStart = jCardTop - responsiveStackPos - responsiveStackDist * j;
            if (scrollTop >= jTriggerStart) {
              topCardIndex = j;
            }
          }
          if (i < topCardIndex) {
            const depthInStack = topCardIndex - i;
            blur = Math.max(0, depthInStack * blurAmount);
          }
        }

        let translateY = 0;
        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isPinned) {
          translateY = scrollTop - cardTop + responsiveStackPos + responsiveStackDist * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + responsiveStackPos + responsiveStackDist * i;
        }

        const newTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100,
        };

        const lastTransform = lastTransformsRef.current.get(i);
        const hasChanged =
          !lastTransform ||
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
          Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
          Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

        if (hasChanged) {
          card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
          card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
          lastTransformsRef.current.set(i, newTransform);
        }

        if (i === cardsRef.current.length - 1) {
          const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
          if (isInView && !stackCompletedRef.current) {
            stackCompletedRef.current = true;
            onStackComplete?.();
          } else if (!isInView && stackCompletedRef.current) {
            stackCompletedRef.current = false;
          }
        }
      });
    } finally {
      isUpdatingRef.current = false;
    }
  }, [
    isPinEnabled,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  const resetCardStyles = useCallback(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.style.transform = '';
      card.style.filter = '';
    });
    lastTransformsRef.current.clear();
    stackCompletedRef.current = false;
  }, []);

  useLayoutEffect(() => {
    const cards = Array.from(
      document.querySelectorAll('.scroll-stack-card'),
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex = `${i + 1}`;
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';

      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    initialTopsRef.current = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    setupLenis();
    updateCardTransforms();

    // Direct scroll listener for 60fps response on touch momentum scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });

    const remeasure = () => {
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        initialTopsRef.current = cardsRef.current.map((card) => {
          const currentTransform = card.style.transform;
          card.style.transform = 'none';
          const naturalRect = card.getBoundingClientRect();
          card.style.transform = currentTransform;
          return naturalRect.top + window.scrollY;
        });
        updateCardTransforms();
      });
    };

    window.addEventListener('resize', remeasure);
    window.addEventListener('orientationchange', remeasure);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('orientationchange', remeasure);

      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      resetCardStyles();
      cardsRef.current = [];
      initialTopsRef.current = [];
      isUpdatingRef.current = false;
    };
  }, [
    isPinEnabled,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    resetCardStyles,
    handleScroll,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<ScrollStackItemProps>(child)) {
            return React.cloneElement(child, {
              style: {
                '--card-index': index,
                ...(child.props.style || {}),
              } as React.CSSProperties,
            });
          }
          return child;
        })}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;