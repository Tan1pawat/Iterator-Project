"use client";

import React from 'react';
import { CodeReveal } from './CodeReveal';
import {
    Github,
    Linkedin,
    Youtube,
    Twitter,
    Facebook,
    FileText, // Using FileText as a proxy for Medium
    ArrowUpRight,
    Mail
} from 'lucide-react';

const CONTACT_CODE = `
const NETWORK_PROTOCOLS = {
  status: "ONLINE",
  available_ports: [
    "LINKEDIN", "GITHUB", "YOUTUBE",
    "X_CORP", "FACEBOOK", "MEDIUM"
  ],
  initiate_handshake: (platform) => {
    return connect(platform);
  }
};
`;

const socialLinks = [
    {
        name: "LinkedIn",
        handle: "My LinkedIn Profile",
        url: "https://www.linkedin.com/in/pawat-yamwong-23573728b/",
        icon: <Linkedin size={28} />,
        color: "hover:bg-[#0077b5] hover:text-white"
    },
    {
        name: "GitHub",
        handle: "@Tan1pawat",
        url: "https://github.com/Tan1pawat",
        icon: <Github size={28} />,
        color: "hover:bg-[#333] hover:text-white"
    },
    {
        name: "YouTube",
        handle: "My YouTube Channel",
        url: "https://www.youtube.com/@IteratorProject",
        icon: <Youtube size={28} />,
        color: "hover:bg-[#FF0000] hover:text-white"
    },
    {
        name: "X / Twitter",
        handle: "@IteratorProject",
        url: "https://x.com/IteratorProject",
        icon: <Twitter size={28} />,
        color: "hover:bg-black hover:text-white"
    },
    {
        name: "Facebook",
        handle: "My Facebook Page",
        url: "https://www.facebook.com/profile.php?id=61583954205005",
        icon: <Facebook size={28} />,
        color: "hover:bg-[#1877F2] hover:text-white"
    },
    {
        name: "Medium",
        handle: "Tech Blog",
        url: "https://medium.com/@Tan1pawat",
        icon: <FileText size={28} />,
        color: "hover:bg-black hover:text-white"
    }
];

export const Contact = () => {
    return (
        <CodeReveal codeString={CONTACT_CODE} className="w-full bg-white py-20 border-t-2 border-black" title="Network">
            <section className="px-4 md:px-8 max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-5xl md:text-7xl font-black relative inline-block z-10 uppercase">
                        Connect
                        <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#ccff00] -z-10"></span>
                    </h2>
                    <p className="mt-4 font-mono text-gray-500 text-lg">
                        Initialize handshake. Choose your protocol.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                group relative bg-white border-2 border-black p-6 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                hover:-translate-y-1 
                transition-all duration-300
                flex items-center justify-between
                ${social.color}
              `}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 border-2 border-black rounded bg-white text-black group-hover:border-transparent transition-colors">
                                    {social.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl leading-none">{social.name}</h3>
                                    <p className="font-mono text-xs opacity-60 mt-1 group-hover:opacity-100">{social.handle}</p>
                                </div>
                            </div>

                            <ArrowUpRight
                                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                size={24}
                            />
                        </a>
                    ))}
                </div>

                {/* Direct Email Block */}
                <div className="mt-12 p-8 border-2 border-black bg-[#f0f0f0] border-dashed text-center">
                    <h3 className="font-bold text-2xl mb-2">Prefer email?</h3>
                    <a
                        href="mailto:tan.pawat.yamwong@gmail.com"
                        className="inline-flex items-center gap-2 text-xl font-mono hover:bg-[#ccff00] px-4 py-1 border-b-2 border-black transition-colors"
                    >
                        <Mail size={20} />
                        tan.pawat.yamwong@gmail.com
                    </a>
                </div>

            </section>
        </CodeReveal>
    );
};