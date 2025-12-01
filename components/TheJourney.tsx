"use client";

import React, { useRef, useEffect } from 'react';
import { CodeReveal } from './CodeReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_CODE = `
const milestones = [
  {
    year: "2021",
    title: "void main(void)",
    description: "Entered university with zero knowledge. My journey began with C. The moment 'Hello World' printed, I was hooked.",
    tags: ["C", "University"]
  },
  {
    year: "2022",
    title: ":q! (The Vim Trap)",
    description: "Joined the 42 Program. Met Linux and Vim for the first time. I hated it—I couldn't even exit the editor. I failed, retreated to high-level languages (Python/TS), but the seed was planted.",
    tags: ["Linux", "42 Program", "Python"]
  },
  {
    year: "2023",
    title: "The Builder Phase",
    description: "Academic training met real-world shipping. Built full-stack apps with Laravel and Flutter. Felt like a wizard using tools I didn't fully understand yet.",
    tags: ["Laravel", "Flutter", "Full Stack"]
  },
  {
    year: "2024",
    title: "The Peak (False Summit)",
    description: "Final Project: Telemedicine AI with PyTorch & NestJS. I got an 'A'. Everything worked. I thought I had mastered software engineering.",
    tags: ["PyTorch", "NestJS", "Image Processing"]
  },
  {
    year: "2025",
    title: "Mt. Stupid & The Rebirth",
    description: "Landed a job at a top startup. Built systems serving 1k+ daily users in Go. But then, Dunning-Kruger hit. I realized I was just a 'Tool User' standing on giants' shoulders. I quit to learn the hard things from scratch.",
    tags: ["Go", "System Design", "Rust", "Neovim"]
  },
  {
    year: "NOW",
    title: "The Iterator Project",
    description: "I am building this platform to document my learning process. No more hiding failures. No more 'perfect' code. Just pure, raw iteration.",
    tags: ["Next.js", "GSAP", "Open Source"]
  }
];
`;

const milestones = [
    {
        year: "2021",
        title: "void main(void)",
        description: "Entered university with zero knowledge. My journey began with C. The moment 'Hello World' printed, I was hooked.",
        tags: ["C", "University"],
        side: "left"
    },
    {
        year: "2022",
        title: ":q! (The Vim Trap)",
        description: "Joined the 42 Program. Met Linux and Vim for the first time. I hated it—I couldn't even exit the editor. I failed here and pivoted to Python/TS, but the failure stuck with me.",
        tags: ["Linux", "42 Program", "Python"],
        side: "right"
    },
    {
        year: "2023",
        title: "The Builder Phase",
        description: "My first real dev work. I felt productive, building apps with Laravel and Flutter. I was getting good at 'making things work'.",
        tags: ["Laravel", "Flutter", "Full Stack"],
        side: "left"
    },
    {
        year: "2024",
        title: "The Peak (False Summit)",
        description: "Final Project: Telemedicine AI with PyTorch & NestJS. I got an 'A'. Everything worked perfectly. I thought I had reached the finish line.",
        tags: ["PyTorch", "NestJS", "Image Processing"],
        side: "right"
    },
    {
        year: "2025",
        title: "Mt. Stupid & The Rebirth",
        description: "Professional Reality Check. I built systems in Go for 1000+ daily users and automated insurance verification. But I realized I was just a 'Tool User.' I didn't understand the depths. Now, I iterate. I am relearning the hard things: Rust, Neovim, Low-level internals.",
        tags: ["Go", "System Design", "Rust", "Neovim"],
        side: "left"
    },
    {
        year: "NOW",
        title: "The Iterator Project",
        description: "I am building this platform to document my learning process. No more hiding failures. No more 'perfect' code. Just pure, raw iteration.",
        tags: ["Next.js", "GSAP", "Open Source"],
        side: "right"
    }
];

export const TheJourney = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the SVG line drawing down
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 5%", 
                        scrub: 1,
                    }
                });
            }

            // Animate the cards popping in
            const cards = gsap.utils.toArray('.journey-card');
            cards.forEach((card: any) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <CodeReveal codeString={JOURNEY_CODE} className="w-full bg-[#f5f5f5] relative overflow-hidden" title="TheJourney">
            <section ref={containerRef} className="py-24 px-4 max-w-5xl mx-auto relative min-h-screen">

                <h2 className="text-5xl font-black text-center mb-24 relative z-10">
                    THE <span className="doodle-highlight bg-[#ccff00] px-2 transform -skew-x-12 inline-block">PATH</span>
                </h2>

                {/* The Squiggly Line SVG Background */}
                <div className="absolute left-1/2 top-[120px] bottom-0 w-2 -translate-x-1/2 hidden md:block h-full z-0">
                    <svg className="h-full w-full overflow-visible" preserveAspectRatio="none">
                        <path
                            ref={lineRef}
                            d="M 0 0 Q 50 200 -50 400 T 0 800 Q 50 1000 0 1200 T 0 1600" // Extended path
                            fill="none"
                            stroke="black"
                            strokeWidth="3"
                            strokeDasharray="10,5"
                        />
                    </svg>
                </div>

                {/* Timeline Items */}
                <div className="space-y-12 md:space-y-24 relative z-10">
                    {milestones.map((item, index) => (
                        <div key={item.year}
                            className={`flex flex-col md:flex-row items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''
                                } ${item.side === 'center' ? 'md:justify-center' : ''}`}>

                            {/* Year Marker (Mobile Only) */}
                            <div className="md:hidden text-4xl font-black">{item.year}</div>

                            {/* Content Card */}
                            <div className={`journey-card bg-white border-2 border-black p-6 w-full md:w-[45%] relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all
                                ${item.side === 'center' ? 'md:w-[80%] md:text-center border-4 border-black' : ''}
                            `}>
                                {/* Sticky Tape Effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/50 rotate-2"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-mono font-bold text-xl hidden md:block">{item.year}</span>
                                    <div className={`flex gap-2 flex-wrap ${item.side === 'center' ? 'justify-center' : 'justify-end'}`}>
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs border border-black px-2 py-0.5 rounded-full font-mono bg-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                                <p className="text-gray-600 font-mono text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Spacer for the other side of the timeline */}
                            <div className="hidden md:block w-[45%]"></div>
                        </div>
                    ))}
                </div>
            </section>
        </CodeReveal>
    );
};