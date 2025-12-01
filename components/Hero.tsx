"use client";

import React, { useRef, useEffect, useState } from 'react';
import { CodeReveal } from './CodeReveal';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const HERO_CODE = `
export const Hero = () => {
  const titleRef = useRef(null);
  const [isProjectTitle, setIsProjectTitle] = useState(false);
  const text = "ITERATING";
  const projectText1 = "THE ITERATOR";
  const projectText2 = "PROJECT";

  const handleToggle = () => {
    gsap.to(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => setIsProjectTitle(!isProjectTitle)
    });
  };

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      if (isProjectTitle) {
        // Animate in "THE ITERATOR PROJECT"
        const tl = gsap.timeline();
        
        tl.set(titleRef.current, { opacity: 1, y: 0 });
        
        tl.to(".project-char", {
          opacity: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: "none"
        });

        tl.to(".project-highlighter", {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.5");
      } else {
        // Animate in "I AM ITERATING"
        const tl = gsap.timeline();
        
        tl.set(titleRef.current, { opacity: 1, y: 0 });
        
        tl.to(".char", {
          opacity: 1,
          duration: 0.1,
          stagger: 0.1,
          ease: "none"
        });
        
        tl.to(".highlighter", {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }, titleRef); // Scope to titleRef or container

    return () => ctx.revert();
  }, [isProjectTitle]);

  return (
    <section className="...">
      <h1 ref={titleRef} onClick={handleToggle} className="...">
        {isProjectTitle ? (
          <span>
            <span className="inline-block">
              {projectText1.split("").map((char, i) => (
                <span key={i} className="project-char opacity-0">{char}</span>
              ))}
            </span>
            <br />
            <span className="relative inline-block px-4">
              {projectText2.split("").map((char, i) => (
                <span key={i} className="project-char opacity-0">{char}</span>
              ))}
              <div className="project-highlighter ..."></div>
            </span>
          </span>
        ) : (
          // ... "I AM ITERATING" code
        )}
      </h1>
    </section>
  );
};
`;

export const Hero = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isProjectTitle, setIsProjectTitle] = useState(false);
    const isFirstRender = useRef(true);
    const text = "ITERATING";
    const projectText1 = "THE ITERATOR";
    const projectText2 = "PROJECT";

    const handleToggle = () => {
        gsap.to(titleRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => setIsProjectTitle(!isProjectTitle)
        });
    };

    // Initial Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            // Initial fade in of "I AM"
            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            });

            // Typewriter effect for "ITERATING"
            tl.to(".char", {
                opacity: 1,
                duration: 0.1,
                stagger: 0.1,
                ease: "none"
            }, "-=0.5");

            // Highlighter swipe
            tl.to(".highlighter", {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.out"
            });

            // Fade in the subtitle and arrow
            tl.to(".hero-footer", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.2");

            // Simple mouse move effect
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 30;
                const y = (clientY / window.innerHeight - 0.5) * 30;

                gsap.to(titleRef.current, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Toggle Animation
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const ctx = gsap.context(() => {
            if (isProjectTitle) {
                // Animate in "THE ITERATOR PROJECT"
                const tl = gsap.timeline();

                // Reset H1
                tl.set(titleRef.current, { opacity: 1, y: 0 });

                // Typewriter effect
                tl.to(".project-char", {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.05,
                    ease: "none"
                });

                // Highlighter
                tl.to(".project-highlighter", {
                    scaleX: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.5");
            } else {
                // Animate in "I AM ITERATING"
                const tl = gsap.timeline();

                // Ensure H1 is visible (it was faded out in handleToggle)
                // We don't want to animate y from 50 again, just fade in or set.
                // "I AM" is part of the text content, so it appears immediately when opacity is 1.
                // Let's fade it in slightly.
                tl.fromTo(titleRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );

                // Typewriter effect
                tl.to(".char", {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                }, "-=0.3");

                // Highlighter
                tl.to(".highlighter", {
                    scaleX: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [isProjectTitle]);

    return (
        <CodeReveal codeString={HERO_CODE} className="w-full h-screen" title="Hero">
            <section ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
                <h1
                    ref={titleRef}
                    onClick={handleToggle}
                    className="relative z-10 text-7xl md:text-9xl font-black tracking-tighter text-center leading-[0.9] select-none text-black cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                    {isProjectTitle ? (
                        <span>
                            <span className="inline-block">
                                {projectText1.split("").map((char, i) => (
                                    <span key={`l1-${i}`} className="project-char inline-block opacity-0">{char === " " ? "\u00A0" : char}</span>
                                ))}
                            </span>
                            <br />
                            <span className="relative inline-block px-4">
                                {projectText2.split("").map((char, i) => (
                                    <span key={`l2-${i}`} className="project-char inline-block opacity-0">{char}</span>
                                ))}
                                <div className="project-highlighter absolute bottom-2 left-0 w-full h-6 md:h-8 bg-[#ccff00] -z-10 transform -rotate-2 skew-x-12 mix-blend-multiply rounded-sm scale-x-0 origin-left"></div>
                            </span>
                        </span>
                    ) : (
                        <>
                            I AM <br />
                            <span className="relative inline-block px-4">
                                {text.split("").map((char, i) => (
                                    <span key={i} className="char inline-block opacity-0">{char}</span>
                                ))}
                                <div className="highlighter absolute bottom-2 left-0 w-full h-6 md:h-8 bg-[#ccff00] -z-10 transform -rotate-2 skew-x-12 mix-blend-multiply rounded-sm scale-x-0 origin-left"></div>
                            </span>
                        </>
                    )}
                </h1>

                <div className="hero-footer mt-12 flex flex-col items-center gap-4 z-10 opacity-0 translate-y-4">
                    <p className="text-lg md:text-xl font-mono text-gray-500 tracking-widest uppercase">Try &rarr; Fail &rarr; Learn &rarr; Repeat</p>
                    {/* <div className="animate-bounce mt-12">
                        <ArrowDown size={32} className="text-gray-400" />
                    </div> */}
                </div>
            </section>
        </CodeReveal>
    );
};
