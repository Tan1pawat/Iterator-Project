"use client";

import React, { useState } from 'react';
import { CodeReveal } from './CodeReveal';
import { inspirationData, InspirationItem } from '../data/mockData';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const INSPIRATION_CODE = `
export const TheInspiration = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % inspirationData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + inspirationData.length) % inspirationData.length);
  };

  return (
    <section>
      <h2>MY INSPIRATION</h2>
      {/* YouTube Video Carousel with Quotes */}
      {inspirationData.map((item, index) => (
        <div key={item.id}>
          <img src={\`https://img.youtube.com/vi/\${item.videoId}/maxresdefault.jpg\`} />
          <blockquote>{item.quote}</blockquote>
          <cite>{item.author}</cite>
        </div>
      ))}
    </section>
  );
};
`;

const VideoCard = ({ item, isActive }: { item: InspirationItem, isActive: boolean }) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
    const videoUrl = `https://www.youtube.com/watch?v=${item.videoId}`;

    return (
        <div
            className={`
                relative bg-white border-2 border-black rounded-lg transition-all duration-500 ease-in-out overflow-hidden
                ${isActive
                    ? 'w-[400px] md:w-[500px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-100 opacity-100 z-20'
                    : 'w-[200px] md:w-[250px] shadow-none scale-90 opacity-75 grayscale-[0.5] z-10'
                }
            `}
        >
            {/* YouTube Thumbnail */}
            <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
            >
                <img
                    src={thumbnailUrl}
                    alt={`Video thumbnail`}
                    className="w-full aspect-video object-cover"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </a>

            {/* Quote Section - Only visible if Active */}
            <div className={`transition-all duration-300 overflow-hidden ${isActive ? 'opacity-100 max-h-[300px] p-6' : 'opacity-0 max-h-0 p-0'}`}>
                <div className="relative">
                    <Quote className="absolute -top-2 -left-2 text-[#ccff00] opacity-50" size={32} />
                    <blockquote className="font-serif italic text-lg text-gray-800 leading-relaxed pl-6">
                        "{item.quote}"
                    </blockquote>
                    <cite className="block mt-4 text-right font-mono text-sm text-gray-600 not-italic">
                        — {item.author}
                    </cite>
                </div>
            </div>
        </div>
    );
};

export const TheInspiration = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % inspirationData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + inspirationData.length) % inspirationData.length);
    };

    // Calculate the indices for the Prev, Active, and Next cards
    const getVisibleIndices = () => {
        const prevIndex = (activeIndex - 1 + inspirationData.length) % inspirationData.length;
        const nextIndex = (activeIndex + 1) % inspirationData.length;
        return [prevIndex, activeIndex, nextIndex];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <CodeReveal codeString={INSPIRATION_CODE} className="w-full bg-white py-20 border-t-2 border-black" title="TheInspiration">
            <section className="px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl md:text-7xl font-black relative inline-block z-10">
                        MY INSPIRATION
                        <svg className="absolute -bottom-4 left-0 w-full h-6 -z-10 text-[#ccff00]" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path d="M0,10 Q100,20 200,5" stroke="currentColor" strokeWidth="15" fill="none" />
                        </svg>
                    </h2>
                    <p className="mt-4 font-mono text-gray-600">Videos and quotes that fuel my journey</p>
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
                        const isCenter = i === 1;
                        return (
                            <div
                                key={`${inspirationData[index].id}-${i}`}
                                onClick={() => {
                                    if (i === 0) prevSlide();
                                    if (i === 2) nextSlide();
                                }}
                                className={`cursor-pointer ${isCenter ? 'cursor-default' : ''}`}
                            >
                                <VideoCard item={inspirationData[index]} isActive={isCenter} />
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
                    {inspirationData.map((_, idx) => (
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
