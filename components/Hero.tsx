"use client";

import React, { useRef, useEffect } from 'react';
import { CodeReveal } from './CodeReveal';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const HERO_CODE = `
export const Hero = () => {
  const titleRef = useRef(null);
  const text = "ITERATING";

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <h1 ref={titleRef} className="text-9xl font-black tracking-tighter text-center leading-[0.8]">
        I AM <br />
        <span className="relative inline-block px-4">
            {text.split("").map((char, i) => (
                <span key={i} className="char inline-block opacity-0">{char}</span>
            ))}
            <div className="highlighter absolute bottom-2 left-0 w-full h-6 md:h-8 bg-[#ccff00] -z-10 transform -rotate-2 skew-x-12 mix-blend-multiply rounded-sm scale-x-0 origin-left"></div>
        </span>
      </h1>
      <p className="mt-8 text-xl font-mono text-gray-500">Try -> Fail -> Learn -> Repeat</p>
    </section>
  );
};
`;

export const Hero = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const text = "ITERATING";

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
                ease: "power2.out" // "circ.out" or "back.out" could also be cool
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

    return (
        <CodeReveal codeString={HERO_CODE} className="w-full h-screen" title="Hero">
            <section ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
                <h1 ref={titleRef} className="relative z-10 text-7xl md:text-9xl font-black tracking-tighter text-center leading-[0.9] select-none text-black">
                    I AM <br />
                    <span className="relative inline-block px-4">
                        {text.split("").map((char, i) => (
                            <span key={i} className="char inline-block opacity-0">{char}</span>
                        ))}
                        <div className="highlighter absolute bottom-2 left-0 w-full h-6 md:h-8 bg-[#ccff00] -z-10 transform -rotate-2 skew-x-12 mix-blend-multiply rounded-sm scale-x-0 origin-left"></div>
                    </span>
                </h1>

                <div className="hero-footer mt-12 flex flex-col items-center gap-4 z-10 opacity-0 translate-y-4">
                    <p className="text-lg md:text-xl font-mono text-gray-500 tracking-widest uppercase">Try &rarr; Fail &rarr; Learn &rarr; Repeat</p>
                    <div className="animate-bounce mt-12">
                        <ArrowDown size={32} className="text-gray-400" />
                    </div>
                </div>
            </section>
        </CodeReveal>
    );
};
