export interface CaseStudy {
    id: number;
    slug: string;
    title: string;
    category: string;
    year: string;
    client: string;
    tagline: string;
    heroImage: string;
    detailImage1: string;
    detailImage2: string;
    overview: string;
    challenge: string;
    solution: string;
    services: string[];
    results: Array<{ metric: string; label: string }>;
    keyFeatures: string[];
    testimonial: {
        quote: string;
        author: string;
        role: string;
    };
    color: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: 1,
        slug: "lumina-scent",
        title: "Lumina Scent",
        category: "E-Commerce / Branding",
        year: "2024",
        client: "Lumina Organics",
        tagline: "A Sensory Journey Through Organic Scents",
        heroImage: "/case-studies/lumina-hero.png",
        detailImage1: "/case-studies/lumina-detail-1.png",
        detailImage2: "/case-studies/lumina-detail-2.png",
        overview: "We crafted a complete digital experience that evokes the purity and elegance of nature for Lumina Organics, a luxury organic perfume brand. The project encompassed brand identity, e-commerce platform design, and a comprehensive digital marketing strategy.",
        challenge: "Lumina needed a brand identity that stood out in the crowded organic beauty market. The primary challenge was to communicate scent—a purely olfactory experience—through visual and digital mediums without losing the essence of the product. Additionally, they needed to convey luxury while maintaining an authentic connection to nature and sustainability.",
        solution: "We developed a visual language based on fluid, organic shapes and a calming, earth-toned palette. The website features immersive scroll interactions that mimic the diffusion of scent, guiding users through a narrative-driven shopping experience. We created custom botanical illustrations, implemented micro-animations for product interactions, and built a seamless checkout process optimized for conversions.",
        services: ["Brand Identity", "Web Design", "E-Commerce Development", "Digital Strategy", "Content Creation"],
        results: [
            { metric: "215%", label: "Increase in Online Sales" },
            { metric: "4.8x", label: "Return on Investment" },
            { metric: "68%", label: "User Engagement Growth" },
            { metric: "3.2min", label: "Average Session Duration" }
        ],
        keyFeatures: [
            "Custom brand identity with botanical elements",
            "Immersive scroll-based storytelling",
            "Optimized product photography system",
            "Scent profile quiz for personalization",
            "Seamless checkout experience"
        ],
        testimonial: {
            quote: "The team transformed our vision into a digital experience that truly captures the essence of our brand. Our customers frequently comment on how the website makes them feel connected to nature.",
            author: "Sarah Mitchell",
            role: "Founder, Lumina Organics"
        },
        color: "#8B9E7D"
    },
    {
        id: 2,
        slug: "apex-finance",
        title: "Apex Finance",
        category: "Web App / FinTech",
        year: "2023",
        client: "Apex Global",
        tagline: "Redefining the Future of Trading",
        heroImage: "/case-studies/apex-hero.png",
        detailImage1: "/case-studies/apex-detail-1.png",
        detailImage2: "/case-studies/apex-detail-2.png",
        overview: "We designed and built a high-performance trading platform for professional traders and institutions. The platform combines advanced data visualization with an intuitive interface, making complex financial instruments accessible without sacrificing depth or functionality.",
        challenge: "Complex financial data is often overwhelming and intimidating. Apex wanted to democratize access to advanced trading tools while maintaining the depth and speed required by professional traders. The technical challenge included real-time data processing, sub-second response times, and presenting multiple data streams simultaneously without cognitive overload.",
        solution: "We adopted a 'data-first' approach, prioritizing legibility and hierarchy through careful typography and color coding. A modular dashboard system allows users to customize their workspace completely. We implemented WebGL for real-time data visualization, ensuring smooth performance even with high-frequency updates. The design system includes dark mode optimization to reduce eye strain during extended trading sessions.",
        services: ["UX/UI Design", "Frontend Development", "Design System", "Real-time Data Visualization", "Performance Optimization"],
        results: [
            { metric: "3.2M", label: "Active Users" },
            { metric: "99.9%", label: "System Uptime" },
            { metric: "45%", label: "Faster Trade Execution" },
            { metric: "<50ms", label: "Average Response Time" }
        ],
        keyFeatures: [
            "Customizable modular dashboard",
            "Real-time WebGL data visualization",
            "Advanced charting with 50+ indicators",
            "Multi-monitor support",
            "One-click trading execution"
        ],
        testimonial: {
            quote: "This platform has become indispensable for our trading desk. The combination of speed, clarity, and customization gives us a competitive edge in fast-moving markets.",
            author: "Michael Chen",
            role: "Head of Trading, Apex Global"
        },
        color: "#4A90E2"
    },
    {
        id: 3,
        slug: "vogue-editorial",
        title: "Vogue Editorial",
        category: "Digital Experience",
        year: "2023",
        client: "Vogue Magazine",
        tagline: "Fashion Meets Technology",
        heroImage: "/case-studies/vogue-hero.png",
        detailImage1: "/case-studies/vogue-detail-1.png",
        detailImage2: "/case-studies/vogue-detail-2.png",
        overview: "An interactive editorial piece exploring the intersection of fashion and technology through immersive digital storytelling. We created a scrollytelling experience that brings fashion photography to life, allowing readers to explore content at their own pace while maintaining Vogue's prestigious editorial standards.",
        challenge: "Traditional static editorials fail to capture the dynamic nature of modern fashion and the movement inherent in clothing. Vogue wanted an interactive story that readers could explore at their own pace, blurring the line between reading and watching, while maintaining the sophistication and prestige of the Vogue brand.",
        solution: "We created a cinematic scrollytelling experience where user input drives the narrative progression. Parallax effects, video backgrounds, and typographic animations bring fashion shoots to life. The interface adapts seamlessly from desktop to mobile, ensuring the premium experience translates across all devices. We implemented lazy loading and optimized assets to maintain fast load times despite rich media content.",
        services: ["Art Direction", "Motion Design", "Web Development", "Interactive Storytelling", "Mobile Optimization"],
        results: [
            { metric: "2.5M", label: "Story Views" },
            { metric: "8min", label: "Average Time Spent" },
            { metric: "92%", label: "Completion Rate" },
            { metric: "156%", label: "Social Sharing Increase" }
        ],
        keyFeatures: [
            "Parallax scrolling effects",
            "Integrated video backgrounds",
            "Dynamic typography animations",
            "Seamless mobile adaptation",
            "Social sharing optimization"
        ],
        testimonial: {
            quote: "This project redefined what's possible in digital editorial. The engagement metrics speak for themselves—readers are spending more time with our content than ever before.",
            author: "Alexandra Dubois",
            role: "Digital Director, Vogue Magazine"
        },
        color: "#DC143C"
    }
];

// Helper function to get a case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((study) => study.slug === slug);
}

// Helper function to get all slugs for static generation
export function getAllSlugs(): string[] {
    return caseStudies.map((study) => study.slug);
}

// Helper function to get next and previous case studies
export function getAdjacentCaseStudies(currentSlug: string): {
    previous: CaseStudy | null;
    next: CaseStudy | null;
} {
    const currentIndex = caseStudies.findIndex((study) => study.slug === currentSlug);

    if (currentIndex === -1) {
        return { previous: null, next: null };
    }

    const previous = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
    const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

    return { previous, next };
}
