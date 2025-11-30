"use client";

import React, { useRef, useEffect } from 'react';
import { CodeReveal } from './CodeReveal';
import { timelineData, TimelineItem } from '../data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { XCircle, CheckCircle2, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_CODE = `
export const TheJourney = () => {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2 doodle-line"></div>
      
      {timelineData.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </section>
  );
};
`;

const StatusIcon = ({ status }: { status: TimelineItem['status'] }) => {
    switch (status) {
        case 'fail': return <XCircle className="text-red-500 bg-white rounded-full" size={32} />;
        case 'success': return <CheckCircle2 className="text-green-500 bg-white rounded-full" size={32} />;
        case 'learning': return <BookOpen className="text-blue-500 bg-white rounded-full" size={32} />;
    }
};

export const TheJourney = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the central line drawing down
            gsap.from(lineRef.current, {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 2,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });

            // Animate items popping in
            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item: any) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <CodeReveal codeString={JOURNEY_CODE} className="w-full bg-[#f5f5f5] py-20 relative overflow-hidden" title="TheJourney">
            {/* Background Doodle Elements */}
            <div className="absolute top-20 left-10 opacity-10 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <path d="M10,10 Q50,100 10,190" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                </svg>
            </div>

            <section ref={containerRef} className="px-4 max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black mb-4">THE JOURNEY</h2>
                    <p className="font-mono text-gray-500">A history of trial and error.</p>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-black md:-translate-x-1/2 origin-top"></div>

                    <div className="space-y-12">
                        {timelineData.map((item, index) => (
                            <div key={item.id} className={`timeline-item flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Card */}
                                <div className="flex-1 w-full pl-20 md:pl-0">
                                    <div className={`bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <span className="absolute -top-3 right-4 bg-[#ccff00] px-2 py-1 text-xs font-bold border border-black transform rotate-2">
                                            {item.date}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 font-mono text-sm">{item.description}</p>
                                    </div>
                                </div>

                                {/* Icon Marker */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 bg-[#f5f5f5] p-2">
                                    <StatusIcon status={item.status} />
                                </div>

                                {/* Spacer for the other side */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </CodeReveal>
    );
};
