"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useXRay } from '../context/XRayContext';
import { Highlight, themes } from 'prism-react-renderer';
import gsap from 'gsap';
import { Code, X } from 'lucide-react';

interface CodeRevealProps {
    codeString: string;
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const CodeReveal: React.FC<CodeRevealProps> = ({ codeString, children, className = "", title = "Component" }) => {
    const { isXRayMode } = useXRay();
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const codeCardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Reset expanded state when global mode changes
    useEffect(() => {
        if (!isXRayMode) {
            setIsExpanded(false);
        }
    }, [isXRayMode]);

    // Handle animations based on isExpanded state
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isExpanded) {
                // Fade out content
                gsap.to(contentRef.current, {
                    opacity: 0.1,
                    filter: "blur(8px)",
                    duration: 0.5,
                    ease: "power2.out"
                });
                // Show code card
                gsap.fromTo(codeCardRef.current,
                    { opacity: 0, y: 50, scale: 0.9, display: 'none' },
                    { opacity: 1, y: 0, scale: 1, display: 'flex', duration: 0.6, ease: "back.out(1.2)" }
                );
            } else {
                // Restore content
                gsap.to(contentRef.current, {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.5,
                    ease: "power2.out"
                });
                // Hide code card
                gsap.to(codeCardRef.current, {
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                    duration: 0.3,
                    display: 'none',
                    ease: "power2.in"
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [isExpanded]);

    // Handle button appearance based on global XRay mode
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isXRayMode && !isExpanded) {
                gsap.fromTo(buttonRef.current,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
                );
            } else {
                gsap.to(buttonRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, [isXRayMode, isExpanded]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div ref={contentRef} className="transition-all duration-300 h-full">
                {children}
            </div>

            {/* Floating Trigger Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsExpanded(true)}
                className="absolute top-4 right-4 z-30 bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform opacity-0 scale-0"
                title="View Source"
            >
                <Code size={20} />
            </button>

            {/* Code Card Overlay */}
            <div
                ref={codeCardRef}
                className="absolute inset-0 z-40 hidden p-4 md:p-12 items-center justify-center"
            >
                <div className="bg-[#1a1a1a] border-2 border-white rounded-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] w-full h-full max-w-5xl flex flex-col overflow-hidden relative">

                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#1a1a1a]">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-gray-400 font-mono text-sm ml-2">{title}.tsx</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 overflow-auto p-6 font-mono text-sm">
                        <Highlight
                            theme={themes.vsDark}
                            code={codeString.trim()}
                            language="tsx"
                        >
                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre style={{ ...style, backgroundColor: 'transparent' }} className="float-left min-w-full">
                                    {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })} className="table-row">
                                            <span className="table-cell text-right pr-4 text-gray-600 select-none w-8">{i + 1}</span>
                                            <span className="table-cell">
                                                {line.map((token, key) => (
                                                    <span key={key} {...getTokenProps({ token })} />
                                                ))}
                                            </span>
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    </div>
                </div>
            </div>
        </div>
    );
};
