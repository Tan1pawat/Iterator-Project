"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Keyboard } from 'lucide-react';

const sections = [
    { id: 'hero', label: 'Home', emoji: '🏠', key: 'h' },
    { id: 'story', label: 'The Story', emoji: '📖', key: 's' },
    { id: 'loop', label: 'The Loop', emoji: '🔄', key: 'l' },
    { id: 'inspiration', label: 'Inspiration', emoji: '✨', key: 'i' },
    { id: 'journey', label: 'The Journey', emoji: '🚀', key: 'j' },
    { id: 'contact', label: 'Connect', emoji: '🤝', key: 'c' }
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Toggle menu with Space
            if (e.code === 'Space' && !isOpen) {
                e.preventDefault();
                setIsOpen(true);
                return;
            }

            // Close with Escape
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                return;
            }

            // Navigate with section keys when menu is open
            if (isOpen) {
                const section = sections.find(s => s.key === e.key.toLowerCase());
                if (section) {
                    e.preventDefault();
                    scrollToSection(section.id);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isOpen]);

    return (
        <>
            {/* Navigation Button */}
            <button
                onClick={toggleMenu}
                className="fixed bottom-32 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-black text-white border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none group"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="font-bold uppercase tracking-wider text-sm">
                    {isOpen ? "Close" : "Menu"}
                </span>

                {/* Keyboard hint */}
                {!isOpen && (
                    <span className="ml-2 px-2 py-1 bg-white text-black text-xs font-mono rounded border border-white group-hover:bg-[#ccff00] transition-colors">
                        Space
                    </span>
                )}
            </button>

            {/* Popup Menu */}
            {isOpen && (
                <div className="fixed bottom-48 right-8 z-40 bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 min-w-[280px] animate-[slideIn_0.3s_ease-out]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-2">
                            <Keyboard size={16} className="text-gray-500" />
                            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                                Vim Mode
                            </span>
                        </div>
                        <span className="font-mono text-xs text-gray-400">
                            Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px]">Esc</kbd> to close
                        </span>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="w-full text-left px-4 py-3 border-2 border-black rounded hover:bg-[#ccff00] transition-colors font-bold flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl group-hover:scale-125 transition-transform">
                                        {section.emoji}
                                    </span>
                                    <span className="uppercase tracking-wide text-sm">
                                        {section.label}
                                    </span>
                                </div>

                                {/* Keyboard shortcut badge */}
                                <kbd className="px-2 py-1 bg-black text-white font-mono text-xs rounded border-2 border-black group-hover:bg-white group-hover:text-black transition-colors min-w-[28px] text-center">
                                    {section.key}
                                </kbd>
                            </button>
                        ))}
                    </div>

                    {/* Footer hint */}
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300 text-center">
                        <p className="text-xs font-mono text-gray-500">
                            Press any key to navigate
                        </p>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
                />
            )}
        </>
    );
};
