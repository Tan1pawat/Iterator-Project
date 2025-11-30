"use client";

import React from 'react';
import { useXRay } from '../context/XRayContext';
import { Code, Eye } from 'lucide-react';

export const XRayToggle = () => {
    const { isXRayMode, toggleXRayMode } = useXRay();

    return (
        <button
            onClick={toggleXRayMode}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-white text-black border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
        >
            {isXRayMode ? <Eye size={20} /> : <Code size={20} />}
            <span className="font-bold uppercase tracking-wider text-sm">
                {isXRayMode ? "View Design" : "View Code"}
            </span>
        </button>
    );
};
