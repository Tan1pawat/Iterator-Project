"use client";

import React, { useState, useEffect } from 'react';
import { CodeReveal } from './CodeReveal';
import { feedData, FeedItem } from '../data/mockData';
import { Play, FileText, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';

// Updating the code string to reflect the new Carousel logic for the "CodeReveal" component
const THE_LOOP_CODE = `
export const TheLoop = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % feedData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + feedData.length) % feedData.length);
  };

  // Logic to determine which 3 items to show
  const getVisibleItems = () => {
    const prevIndex = (activeIndex - 1 + feedData.length) % feedData.length;
    const nextIndex = (activeIndex + 1) % feedData.length;
    return [
      { ...feedData[prevIndex], status: 'prev' },
      { ...feedData[activeIndex], status: 'active' },
      { ...feedData[nextIndex], status: 'next' }
    ];
  };
  
  // Render structure...
};
`;

const Card = ({ item, isActive }: { item: FeedItem, isActive: boolean }) => {
    const getIcon = () => {
        switch (item.type) {
            case 'youtube': return <Play size={24} className="fill-current" />;
            case 'tiktok': return <Smartphone size={24} />;
            case 'article': return <FileText size={24} />;
        }
    };

    return (
        <div
            className={`
                relative bg-white border-2 border-black rounded-lg transition-all duration-500 ease-in-out
                ${isActive
                    ? 'w-[400px] md:w-[500px] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-100 opacity-100 z-20'
                    : 'w-[200px] md:w-[250px] p-2 shadow-none scale-90 opacity-75 grayscale-[0.5] z-10'
                }
            `}
        >
            {/* THUMBNAIL AREA */}
            <div className={`
                w-full aspect-video ${item.type === 'tiktok' ? 'aspect-[9/16]' : ''} 
                ${item.thumbnail} rounded border border-black/10 relative flex items-center justify-center
                ${isActive ? 'mb-6' : 'mb-0'} 
            `}>
                <div className="opacity-20">{getIcon()}</div>
            </div>

            {/* TEXT CONTENT - Only visible if Active */}
            <div className={`transition-all duration-300 overflow-hidden ${isActive ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0'}`}>
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-2xl leading-tight decoration-2 underline-offset-2 decoration-[#ccff00] underline">
                        {item.title}
                    </h3>
                    <span className="shrink-0 p-2 bg-black text-white rounded-full">
                        {getIcon()}
                    </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono border border-black px-2 py-1 rounded-full uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Quote placeholder as per design */}
                <div className="mt-6 pt-4 border-t border-dashed border-gray-300 font-mono text-sm text-gray-500 italic">
                    "Consuming, Creating, Iterating..."
                </div>
            </div>
        </div>
    );
};

export const TheInspiration = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % feedData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + feedData.length) % feedData.length);
    };

    // Calculate the indices for the Prev, Active, and Next cards
    const getVisibleIndices = () => {
        const prevIndex = (activeIndex - 1 + feedData.length) % feedData.length;
        const nextIndex = (activeIndex + 1) % feedData.length;
        return [prevIndex, activeIndex, nextIndex];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <CodeReveal codeString={THE_LOOP_CODE} className="w-full bg-white py-20 border-t-2 border-black" title="TheLoop">
            <section className="px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl md:text-7xl font-black relative inline-block z-10">
                        MY INSPIRATION
                        <svg className="absolute -bottom-4 left-0 w-full h-6 -z-10 text-[#ccff00]" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path d="M0,10 Q100,20 200,5" stroke="currentColor" strokeWidth="15" fill="none" />
                        </svg>
                    </h2>
                </div>

                {/* CAROUSEL CONTAINER */}
                <div className="relative flex items-center justify-center gap-4 md:gap-12 min-h-[500px]">

                    {/* PREV BUTTON */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 md:left-4 z-30 p-3 bg-white border-2 border-black rounded-full hover:bg-[#ccff00] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    {/* CARDS LOOP */}
                    {visibleIndices.map((index, i) => {
                        // i=0 is Prev, i=1 is Active, i=2 is Next
                        const isCenter = i === 1;
                        return (
                            <div
                                key={`${feedData[index].id}-${i}`}
                                onClick={() => {
                                    if (i === 0) prevSlide();
                                    if (i === 2) nextSlide();
                                }}
                                className={`cursor-pointer ${isCenter ? 'cursor-default' : ''}`}
                            >
                                <Card item={feedData[index]} isActive={isCenter} />
                            </div>
                        );
                    })}

                    {/* NEXT BUTTON */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 md:right-4 z-30 p-3 bg-white border-2 border-black rounded-full hover:bg-[#ccff00] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {feedData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`w-3 h-3 rounded-full border border-black transition-all ${idx === activeIndex ? 'bg-black w-8' : 'bg-transparent hover:bg-[#ccff00]'
                                }`}
                        />
                    ))}
                </div>

            </section>
        </CodeReveal>
    );
};