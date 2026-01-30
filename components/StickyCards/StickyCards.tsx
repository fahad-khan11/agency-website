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
import "./StickyCards.css";
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
            image: "data:image/svg+xml,%3Csvg width='800' height='480' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='480' fill='url(%23grad1)'/%3E%3Cg opacity='0.3'%3E%3Ccircle cx='200' cy='150' r='120' fill='white'/%3E%3Ccircle cx='600' cy='330' r='90' fill='white'/%3E%3C/g%3E%3Cg transform='translate(250, 180)'%3E%3Cpath d='M 0 0 L 80 -60 L 160 0 L 120 80 L 40 80 Z' fill='white' opacity='0.9'/%3E%3Cpath d='M 60 20 L 100 20 L 100 40 L 60 40 Z' fill='%23667eea'/%3E%3Cpath d='M 70 0 L 90 0 L 90 15 L 70 15 Z' fill='%23764ba2'/%3E%3C/g%3E%3C/svg%3E",
            description: "We craft compelling brand narratives that resonate with your audience. From visual identity to messaging frameworks, we build cohesive strategies that differentiate your brand in the marketplace and create lasting emotional connections.",
        },
        {
            index: "02",
            title: "Product Design",
            image: "data:image/svg+xml,%3Csvg width='800' height='480' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234facfe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='480' fill='url(%23grad2)'/%3E%3Cg opacity='0.2'%3E%3Crect x='100' y='80' width='200' height='140' rx='10' fill='white'/%3E%3Crect x='500' y='260' width='200' height='140' rx='10' fill='white'/%3E%3C/g%3E%3Cg transform='translate(200, 140)'%3E%3Crect x='0' y='0' width='400' height='280' rx='20' fill='white' opacity='0.95'/%3E%3Crect x='30' y='30' width='150' height='100' rx='8' fill='%234facfe'/%3E%3Crect x='220' y='30' width='150' height='100' rx='8' fill='%23f093fb'/%3E%3Crect x='30' y='160' width='340' height='15' rx='7.5' fill='%234facfe' opacity='0.5'/%3E%3Crect x='30' y='190' width='280' height='15' rx='7.5' fill='%23f093fb' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E",
            description: "User-centered design that solves real problems. We create intuitive interfaces and seamless experiences through research, prototyping, and iterative testing. Every pixel serves a purpose, every interaction feels natural.",
        },
        {
            index: "03",
            title: "Web Development",
            image: "data:image/svg+xml,%3Csvg width='800' height='480' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2311998e;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2338ef7d;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='480' fill='url(%23grad3)'/%3E%3Cg opacity='0.15'%3E%3Cpath d='M 0 240 Q 200 180 400 240 T 800 240 L 800 480 L 0 480 Z' fill='white'/%3E%3C/g%3E%3Cg transform='translate(180, 100)'%3E%3Crect x='0' y='0' width='440' height='280' rx='12' fill='%231a1a1a' opacity='0.95'/%3E%3Crect x='15' y='15' width='410' height='35' rx='6' fill='%232d2d2d'/%3E%3Ccircle cx='35' cy='32.5' r='6' fill='%23ff5f56'/%3E%3Ccircle cx='55' cy='32.5' r='6' fill='%23ffbd2e'/%3E%3Ccircle cx='75' cy='32.5' r='6' fill='%2327c93f'/%3E%3Ctext x='30' y='90' font-family='monospace' font-size='14' fill='%2338ef7d'%3E%26lt;div%26gt;%3C/text%3E%3Ctext x='50' y='115' font-family='monospace' font-size='14' fill='%2311998e'%3Efunction()%3C/text%3E%3Ctext x='30' y='140' font-family='monospace' font-size='14' fill='%2338ef7d'%3E%26lt;/div%26gt;%3C/text%3E%3Crect x='30' y='170' width='120' height='8' rx='4' fill='%2338ef7d' opacity='0.3'/%3E%3Crect x='30' y='190' width='180' height='8' rx='4' fill='%2311998e' opacity='0.3'/%3E%3Crect x='30' y='210' width='90' height='8' rx='4' fill='%2338ef7d' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E",
            description: "Fast, scalable, and maintainable code that brings designs to life. We build modern web applications with cutting-edge technologies, ensuring performance, accessibility, and seamless functionality across all devices and browsers.",
        },
        {
            index: "04",
            title: "Motion & Interaction",
            image: "data:image/svg+xml,%3Csvg width='800' height='480' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fa709a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fee140;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='480' fill='url(%23grad4)'/%3E%3Cg opacity='0.3'%3E%3Cpath d='M 300 100 Q 350 150 400 100' stroke='white' stroke-width='3' fill='none'/%3E%3Cpath d='M 350 300 Q 400 250 450 300' stroke='white' stroke-width='3' fill='none'/%3E%3C/g%3E%3Cg transform='translate(280, 140)'%3E%3Ccircle cx='120' cy='100' r='80' fill='white' opacity='0.9'/%3E%3Cpath d='M 120 100 L 150 70 L 180 100 L 150 130 Z' fill='%23fa709a'/%3E%3Cpath d='M 120 100 L 90 70 L 60 100 L 90 130 Z' fill='%23fee140'/%3E%3Cpath d='M 80 180 Q 120 220 160 180 Q 200 220 240 180' stroke='white' stroke-width='4' fill='none' opacity='0.8'/%3E%3Ccircle cx='80' cy='180' r='8' fill='%23fa709a'/%3E%3Ccircle cx='160' cy='180' r='8' fill='white'/%3E%3Ccircle cx='240' cy='180' r='8' fill='%23fee140'/%3E%3C/g%3E%3C/svg%3E",
            description: "Delightful animations and micro-interactions that elevate user experience. We design motion systems that guide attention, provide feedback, and add personality to digital products—making every interaction feel purposeful and engaging.",
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
    }, { scope: container });

    return (
        <div ref={container} className={`sticky-cards ${syne.variable} ${inter.variable}`}>
            {stickyCardsData.map((cardData, index) => (
                <div key={index} className="sticky-card">
                    <div className="sticky-card-index">
                        <h1>{cardData.index}</h1>
                    </div>
                    <div className="sticky-card-content">
                        <div className={`sticky-card-content-wrapper ${index % 2 === 0 ? 'layout-left' : 'layout-right'}`}>
                            <div className="sticky-card-text">
                                <h2 className="sticky-card-header">{cardData.title}</h2>
                                <div className="sticky-card-copy">
                                    <div className="sticky-card-copy-title">
                                        <p>(about the service)</p>
                                    </div>
                                    <div className="sticky-card-copy-description">
                                        <p>{cardData.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sticky-card-img">
                                <img src={cardData.image} alt={cardData.title} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StickyCards;