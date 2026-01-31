"use client";

import { motion } from "framer-motion";

export default function WorldMap() {
    return (
        <div className="relative w-full aspect-[2/1] bg-[#050505] rounded-xl border border-white/5 overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Map Container */}
            <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <svg
                    viewBox="0 0 1008 651"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-gray-700"
                >
                    <path
                        d="M86.87,419.86c-3.11-1.56-4.99-6.49-1.92-9.61c8.13-8.24,20-13.43,30.73-3.69c3.08,2.79,9.39,0.73,11.33-2.61c1.23-2.11,5.21-1.89,6.58,0.13c1.7,2.5,4.72,3.31,7.24,1.86c2.24-1.28,6.86-0.62,5.26,3.69c-2.31,6.23-6.57,11.66-10.99,16.59c-2.45,2.73-6.52,4.88-9.98,2.73c-4.48-2.78-7.98-7.86-13.43-5.06C99.27,430.29,91.8,422.32,86.87,419.86z M167.36,134.19c1.94-3.11,0.22-7.58-3.41-8.59c-7.39-2.06-18.06,1.44-12.86,11.41C153.94,142.49,160.75,144.78,167.36,134.19z M222.82,65.65c-6.8-5.34-17.51,2.07-16.79,10.63c0.41,4.91,5.55,8.02,10.22,6.72C222.04,81.39,228.31,69.96,222.82,65.65z M662.48,154.67c-3.92-1.99-2.66-8.98,1.75-9.8c3.2-0.59,8.47,4.04,5.92,7.7C668.61,154.8,665.41,156.16,662.48,154.67z M740.75,108.3c-2.8,0.37-3.9,4.42-1.5,6.56c3.07,2.74,9.3,0.3,7.99-4.26C746.46,108.2,743.07,107.99,740.75,108.3z"
                        fill="currentColor"
                    />
                    <path d="M165.5,135.5 C165.5,135.5 170.5,200.5 170.5,200.5 L200.5,230.5 L250.5,220.5 L280.5,250.5 L300.5,450.5 L350.5,500.5 L400.5,520.5" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-20" />
                    {/* Simplified Continents for aesthetics */}
                    <path fill="currentColor" d="M 230 80 Q 250 50 300 60 T 400 60 Q 450 60 500 80 T 600 80 Q 680 80 720 60 L 750 100 L 720 150 L 650 200 L 600 250 L 550 250 L 520 220 L 500 250 L 520 300 L 550 350 L 550 450 L 580 500 L 550 550 L 450 550 L 400 500 L 350 450 L 300 400 L 250 350 L 220 250 L 200 200 L 150 150 L 180 100 Z" className="opacity-20 hidden md:block" />
                </svg>
            </div>

            {/* Map Image Fallback / Better Representation */}
            <div className="absolute inset-0 opacity-30 select-none pointer-events-none mix-blend-screen">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 500">
                    {/* Rough World Map Paths */}
                    <path fill="#333" d="M185,137c0,0-16-16-11-28s32-9,32-9s16-19,30-14s16,23,0,32s-39,17-39,17L185,137z" />
                    <path fill="#333" d="M308,126c0,0,33-19,53-6s14,24,14,24l-10,13l-45,3L308,126z" />
                    <path fill="#333" d="M473,116c0,0,49-33,49-16s-18,29-18,29l-37,4L473,116z" />
                    <path fill="#333" d="M608,123c0,0,51,0,51,0l-6,21l-36,5L608,123z" />
                    {/* This is a placeholder for a complex SVG. I'll use a grid overlay with the ping to be stylish instead of a bad hand-drawn map. */}
                </svg>
            </div>

            {/* Use a simple image for the world map if possible, or build a robust dot grid.
           Given constraints, a Dot Grid Map is safer and looks premium.
       */}
            <div className="absolute inset-0 p-8 flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl mx-auto opacity-40">
                    {/* Conceptual Dot Map - We will just use the Ping for now on a stylized background as requested */}
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-contain bg-no-repeat bg-center opacity-30 invert"></div>
                </div>
            </div>

            {/* Ping for Islamabad (Approximate position on a standard map projection adjusted for the background image above) */}
            {/* Assuming the image is centered. Islamabad is approx 68% X, 40% Y on a equirectangular map starting from left */}
            <div className="absolute top-[40%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-orange"></span>

                    {/* Tooltip */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none mt-2">
                        ISLAMABAD
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 z-10">
                <p className="text-xs uppercase tracking-widest text-gray-500">Global Operations</p>
                <p className="text-white font-mono text-sm">33.6844° N, 73.0479° E</p>
            </div>

        </div>
    );
}
