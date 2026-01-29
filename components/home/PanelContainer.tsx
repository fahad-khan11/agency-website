"use client";

import React, { useRef, useEffect, useLayoutEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePanel } from "@/lib/PanelContext";
import { usePathname } from "next/navigation";


if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer, ScrollTrigger);
}

export default function PanelContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { setActiveIndex, registerGoToPanel } = usePanel();
  const [isMobile, setIsMobile] = useState(false);
  
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const panels = React.Children.toArray(children);


  panelsRef.current = panelsRef.current.slice(0, panels.length);

  useLayoutEffect(() => {
 
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(mobile || reducedMotion);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToPanel = (index: number) => {
    if (isAnimating.current || isMobile) return;
    if (index < 0 || index >= panels.length) return;
    if (index === currentIndex.current) return;

    isAnimating.current = true;
    
    const direction = index > currentIndex.current ? 1 : -1;
    const currentPanel = panelsRef.current[currentIndex.current];
    const nextPanel = panelsRef.current[index];

    if (!currentPanel || !nextPanel) {
        isAnimating.current = false;
        return;
    }

    setActiveIndex(index);

    
    
    if (direction === 1) {
      
        gsap.set(nextPanel, { zIndex: 10 + index, yPercent: 100, autoAlpha: 1 });
        gsap.to(nextPanel, {
            yPercent: 0,
            duration: 1.3,
            ease: "power3.inOut",
            onComplete: () => {
                isAnimating.current = false;
                currentIndex.current = index;
            }
        });
        
        // Optional: Parallax previous panel slightly
        gsap.to(currentPanel, {
            yPercent: -20,
            duration: 1.3,
            ease: "power3.inOut",
            clearProps: "yPercent"
        });

    } else {
      
        // Moving Up (2 -> 1)
        gsap.to(currentPanel, {
            yPercent: 100,
            duration: 1.3,
            ease: "power3.inOut",
            onComplete: () => {
                gsap.set(currentPanel, { zIndex: 0, autoAlpha: 0 });
                isAnimating.current = false;
                currentIndex.current = index;
            }
        });
        
        gsap.fromTo(nextPanel, 
             { yPercent: -20, zIndex: 9 }, 
             { yPercent: 0, duration: 1.3, ease: "power3.inOut", zIndex: 10 + index } 
        );
    }
  };

  useEffect(() => {
    registerGoToPanel(goToPanel);
  }, [registerGoToPanel]);

  useLayoutEffect(() => {
    if (isMobile) return;

    const handleScroll = (direction: number, self: Observer) => {
       if (isAnimating.current) return;

       const currentPanelIndex = currentIndex.current;
       const currentPanelEl = panelsRef.current[currentPanelIndex];
       
       const scrollableVertical = currentPanelEl?.querySelector(".inner-panel-scroll");
       const scrollableHorizontal = currentPanelEl?.querySelector(".inner-panel-scroll-horizontal");

       if (scrollableHorizontal) {
           const { scrollLeft, scrollWidth, clientWidth } = scrollableHorizontal;
           
           if (scrollWidth > clientWidth) {
               const atEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10;
               const atStart = scrollLeft <= 10;
               
               const moveAmount = self.deltaY * 3.0; 

               if (direction === 1) { 
                    if (!atEnd) {
                        gsap.to(scrollableHorizontal, {
                            scrollLeft: scrollableHorizontal.scrollLeft + moveAmount,
                            duration: 0.5,
                            ease: "power2.out",
                            overwrite: true
                        });
                        return; 
                    }
               } else { 
                    if (!atStart) {
                        gsap.to(scrollableHorizontal, {
                            scrollLeft: scrollableHorizontal.scrollLeft + moveAmount,
                            duration: 0.5,
                            ease: "power2.out",
                            overwrite: true
                        });
                        return; 
                    }
               }
           }
       }
       else if (scrollableVertical) {
           const { scrollTop, scrollHeight, clientHeight } = scrollableVertical;
           const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5; 
           const atTop = scrollTop <= 5;
           
           const verticalMove = self.deltaY * 2.0;

           if (direction === 1) {
               if (!atBottom) {
                   gsap.to(scrollableVertical, {
                        scrollTop: scrollableVertical.scrollTop + verticalMove,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                   });
                   return; 
               }
           } else {
               if (!atTop) {
                   gsap.to(scrollableVertical, {
                        scrollTop: scrollableVertical.scrollTop + verticalMove,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                   });
                   return;
               }
           }
       }

       goToPanel(currentPanelIndex + direction);
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: 0.5, 
      onDown: (self) => handleScroll(1, self), 
      onUp: (self) => handleScroll(-1, self),
      tolerance: 50,
      preventDefault: true,
    });

    panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        if (i === 0) {
            gsap.set(panel, { zIndex: 10, yPercent: 0, autoAlpha: 1 });
        } else {
            gsap.set(panel, { zIndex: 0, yPercent: 100, autoAlpha: 0 });
        }
    });

    return () => {
      observer.kill();
    };
  }, [isMobile]); 

  return (
    <div 
        ref={containerRef} 
        className={`relative w-full h-screen overflow-hidden bg-black ${isMobile ? 'overflow-y-auto block h-auto' : ''}`}
    >
      {panels.map((child, index) => (
        <div
          key={index}
          ref={(el) => { panelsRef.current[index] = el; }}
          className={`w-full h-screen absolute top-0 left-0 ${isMobile ? 'relative h-auto min-h-screen' : ''}`}
          style={{ zIndex: index === 0 ? 10 : 0 }} 
        >
          {child}
        </div>
      ))}
      {!isMobile && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {panels.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => goToPanel(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex.current ? 'bg-orange-500 scale-150' : 'bg-white/50 hover:bg-white'}`}
                  aria-label={`Go to panel ${i + 1}`}
                />
            ))}
        </div>
      )}
    </div>
  );
}
