"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface XRayContextType {
    isXRayMode: boolean;
    toggleXRayMode: () => void;
}

const XRayContext = createContext<XRayContextType | undefined>(undefined);

export const XRayProvider = ({ children }: { children: ReactNode }) => {
    const [isXRayMode, setIsXRayMode] = useState(false);

    const toggleXRayMode = () => {
        setIsXRayMode((prev) => !prev);
    };

    return (
        <XRayContext.Provider value={{ isXRayMode, toggleXRayMode }}>
            {children}
        </XRayContext.Provider>
    );
};

export const useXRay = () => {
    const context = useContext(XRayContext);
    if (context === undefined) {
        throw new Error('useXRay must be used within an XRayProvider');
    }
    return context;
};
