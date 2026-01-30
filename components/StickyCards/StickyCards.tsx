// "use client";


// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import "./StickyCards.css";
// import { Syne, Inter } from "next/font/google";

// const syne = Syne({
//     variable: "--font-syne",
//     subsets: ["latin"],
//     display: "swap",
// });

// const inter = Inter({
//     variable: "--font-inter",
//     subsets: ["latin"],
//     display: "swap",
// });
// gsap.registerPlugin(ScrollTrigger);


// const StickyCards = () => {
//     const stickyCardsData = [
//         {
//             index: "01",
//             title: "Brand Strategy",
//             image: "/card.jpg",
//             description: "Every element is built to snap into place. We design Modular systems where clarity  structure and reuse come first-no clutter, no excess.",
//         },
//         {
//             index: "02   ",
//             title: "Product Design",
//             image: "/card.jpg",
//             description: "Every element is built to snap into place. We design Modular systems where clarity  structure and reuse come first-no clutter, no excess.",
//         },
//         {
//             index: "03",
//             title: "Web Development",
//             image: "/card.jpg",
//             description: "Every element is built to snap into place. We design Modular systems where clarity  structure and reuse come first-no clutter, no excess.",
//         },
//         {
//             index: "04",
//             title: "Motion and Interaction",
//             image: "/card.jpg",
//             description: "Every element is built to snap into place. We design Modular systems where clarity  structure and reuse come first-no clutter, no excess.",
//         },
//     ]


//     const container = useRef(null);
//     useGSAP(() => {
//         const stickyCards = document.querySelectorAll(".sticky-card");
//         stickyCards.forEach((stickyCard, index) => {
//             if (index < stickyCards.length - 1) {
//                 ScrollTrigger.create({
//                     trigger: stickyCard,
//                     start: "top top",
//                     endTrigger: stickyCards[stickyCards.length - 1],
//                     end: "top top",
//                     pin: true,
//                     pinSpacing: false,

//                 })
//             }

//             if (index < stickyCards.length - 1) {
//                 ScrollTrigger.create({
//                     trigger: stickyCards[index + 1],
//                     start: "top bottom",
//                     end: "top top",
//                     onUpdate: (self) => {
//                         const progress = self.progress;
//                         const scale = 1 - progress * 0.25;
//                         const rotation = (index % 2 === 0 ? 5 : -5) * progress;
//                         const afterOpacity = progress;

//                         gsap.set(stickyCard, {
//                             scale: scale,
//                             rotation: rotation,
//                             "--after-opacity": afterOpacity,

//                         })
//                     }
//                 })
//             }
//         })
//     }, { scope: container });
//     return (

//         <div className={`sticky-cards ${syne.variable} ${inter.variable} bg-black text-white font-sans antialiased`}>
//             {stickyCardsData.map((cardData, index) => (
//                 <div key={index} className="sticky-card">
//                     <div className="sticky-card-index">
//                         <h1>{cardData.index}</h1>
//                     </div>
//                     <div className="sticky-card-content">
//                         <div className="sticky-card-content-wrapper">
//                             <h1 className="sticky-card-header">{cardData.title}</h1>
//                             <div className="sticky-card-img">
//                                 <img src={cardData.image} alt="" />
//                             </div>
//                             <div className="sticky-card-copy">
//                                 <div className="sticky-card-copy-title">
//                                     <p>(about the state )</p>
//                                 </div>
//                                 <div className="sticky-card-copy-description">
//                                     <p>{cardData.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };


// export default StickyCards;
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Syne, Inter } from "next/font/google";

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
    const stickyCardsData = [
        {
            index: "01",
            title: "Brand Strategy",
            image: "/services/brand-strategy.png",
            description: "We craft compelling brand narratives that resonate with your audience. From visual identity to messaging frameworks, we build cohesive strategies that differentiate your brand in the marketplace and create lasting emotional connections.",
        },
        {
            index: "02",
            title: "Product Design",
            image: "/services/product-design.png",
            description: "User-centered design that solves real problems. We create intuitive interfaces and seamless experiences through research, prototyping, and iterative testing. Every pixel serves a purpose, every interaction feels natural.",
        },
        {
            index: "03",
            title: "Web Development",
            image: "/services/web-development.png",
            description: "Fast, scalable, and maintainable code that brings designs to life. We build modern web applications with cutting-edge technologies, ensuring performance, accessibility, and seamless functionality across all devices and browsers.",
        },
        {
            index: "04",
            title: "Motion & Interaction",
            image: "/services/motion-interaction.png",
            description: "Delightful animations and micro-interactions that elevate user experience. We design motion systems that guide attention, provide feedback, and add personality to digital products—making every interaction feel purposeful and engaging.",
        },
        {
            index: "05",
            title: "Digital Marketing & SEO",
            image: "/services/digital-marketing.png",
            description: "Data-driven marketing strategies that drive growth and visibility. From search engine optimization to social media campaigns, we help your brand reach the right audience at the right time with measurable results and continuous optimization.",
        },
        {
            index: "06",
            title: "Cloud Solutions",
            image: "/services/cloud-solutions.png",
            description: "Scalable cloud infrastructure that grows with your business. We architect and deploy robust cloud solutions using AWS, Azure, and Google Cloud, ensuring high availability, security, and cost-efficiency for your applications and data.",
        },
    ];

    const container = useRef(null);

    useGSAP(() => {
        const stickyCards = document.querySelectorAll(".sticky-card");
        stickyCards.forEach((stickyCard, index) => {
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: stickyCard,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                });
            }

            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                        const afterOpacity = progress;

                        gsap.set(stickyCard, {
                            scale: scale,
                            rotation: rotation,
                            "--after-opacity": afterOpacity,
                        });
                    },
                });
            }
        });

        // Refresh ScrollTrigger to ensure all cards are detected
        ScrollTrigger.refresh();
    }, { scope: container });

    return (
        <div ref={container} className={`relative w-full h-full bg-[#0a0a0a] ${syne.variable} ${inter.variable}`}>
            {stickyCardsData.map((cardData, index) => (
                <div 
                    key={index} 
                    className="sticky-card relative w-full h-screen min-h-[600px] bg-white text-black px-16 py-12"
                    style={{ 
                        willChange: 'transform',
                    }}
                >
                    {/* Overlay for scroll effect */}
                    <div 
                        className="absolute top-0 left-0 w-full h-full bg-white/85 pointer-events-none z-[2] transition-opacity duration-100"
                        style={{ opacity: 'var(--after-opacity, 0)' }}
                    />

                    {/* Main Content - Index + Card Content in one row */}
                    <div className="relative z-10 flex items-start gap-12 h-full max-w-[1600px] mx-auto">
                        {/* Index Number */}
                        <div className="flex-shrink-0 pt-8">
                            <h1 className={`${syne.className} text-[6rem] font-bold leading-none text-gray-200 m-0`}>
                                {cardData.index}
                            </h1>
                        </div>

                        {/* Card Content Wrapper */}
                        <div className={`flex-1 flex items-center gap-16 self-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                            {/* Text Section */}
                            <div className="flex-1 flex flex-col gap-10">
                                <h2 className={`${syne.className} text-[4.5rem] font-bold leading-[1.1] text-black m-0`}>
                                    {cardData.title}
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <div className="mb-2">
                                        <p className={`${inter.className} text-xs uppercase font-semibold tracking-[0.1em] text-gray-500 m-0`}>
                                            (about the service)
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`${inter.className} text-xl leading-[1.8] text-gray-700 m-0`}>
                                            {cardData.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="flex-1 flex items-center justify-center">
                                <img 
                                    src={cardData.image} 
                                    alt={cardData.title}
                                    className="w-full h-auto aspect-[4/3] object-cover rounded-[20px] shadow-[0_25px_70px_rgba(0,0,0,0.2)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StickyCards;