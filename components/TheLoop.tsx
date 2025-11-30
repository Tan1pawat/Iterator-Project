"use client";

import React, { useRef, useEffect } from 'react';
import { CodeReveal } from './CodeReveal';
import { feedData, FeedItem } from '../data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, FileText, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const THE_LOOP_CODE = `
export const TheLoop = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-5xl font-black mb-12 relative inline-block">
        THE LOOP
        <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#ccff00] -z-10 transform -rotate-1"></span>
      </h2>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {feedData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
`;

const Card = ({ item }: { item: FeedItem }) => {
    const getIcon = () => {
        switch (item.type) {
            case 'youtube': return <Play size={24} className="fill-current" />;
            case 'tiktok': return <Smartphone size={24} />;
            case 'article': return <FileText size={24} />;
        }
    };

    return (
        <div className="break-inside-avoid group relative bg-white border-2 border-black p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className={`w-full aspect-video ${item.type === 'tiktok' ? 'aspect-[9/16]' : ''} ${item.thumbnail} mb-4 rounded border border-black/10 relative flex items-center justify-center`}>
                {/* Placeholder visual */}
                <div className="opacity-20">{getIcon()}</div>
            </div>

            <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-lg leading-tight group-hover:underline decoration-2 underline-offset-2 decoration-[#ccff00]">{item.title}</h3>
                <span className="shrink-0 p-2 bg-black text-white rounded-full">
                    {getIcon()}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase tracking-wider hover:bg-[#ccff00] transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export const TheLoop = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.loop-card');

            gsap.from(cards, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <CodeReveal codeString={THE_LOOP_CODE} className="w-full bg-white py-20 border-t-2 border-black" title="TheLoop">
            <section ref={containerRef} className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-5xl md:text-7xl font-black relative inline-block z-10">
                        THE LOOP
                        <svg className="absolute -bottom-4 left-0 w-full h-6 -z-10 text-[#ccff00]" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path d="M0,10 Q100,20 200,5" stroke="currentColor" strokeWidth="15" fill="none" />
                        </svg>
                    </h2>
                    <p className="mt-4 font-mono text-gray-500">Consuming, Creating, iterating.</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {feedData.map((item) => (
                        <div key={item.id} className="loop-card">
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </section>
        </CodeReveal>
    );
};
