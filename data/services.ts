export const services = [
    {
        id: 1,
        title: "Web Development",
        slug: "web-development",
        category: "Development",
        icon: "",
        heroImage: "/services/web-development.jpg",
        heroVideo: "/videos/placeholder.mp4",
        tagline: "Building Digital Experiences That Convert",
        description: "We craft high-performance websites and web applications that combine stunning design with cutting-edge technology.",
        overview: "From responsive corporate websites to complex web applications, we deliver solutions that are fast, scalable, and built to last. Our development process focuses on clean code, optimal performance, and seamless user experiences across all devices.",
        approach: "We follow modern development practices using the latest frameworks and technologies. Every project begins with understanding your goals, then we architect and build a solution tailored to your specific needs. Our agile methodology ensures transparency and flexibility throughout the development process.",
        technologies: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GSAP", "Three.js"],
        features: [
            "Custom Web Applications",
            "E-Commerce Solutions",
            "Progressive Web Apps (PWA)",
            "API Development & Integration",
            "Performance Optimization",
            "Responsive Design"
        ],
        deliverables: [
            "Fully Responsive Website",
            "Source Code & Documentation",
            "Content Management System",
            "Analytics Integration",
            "SEO Foundation",
            "Ongoing Support"
        ],
        images: [
            "/services/web-dev-1.jpg",
            "/services/web-dev-2.jpg",
            "/services/web-dev-3.jpg"
        ],
        process: [
            {
                step: 1,
                title: "Discovery & Planning",
                description: "We start by understanding your business goals, target audience, and technical requirements. We create a detailed project roadmap and wireframes."
            },
            {
                step: 2,
                title: "Design & Prototyping",
                description: "Our designers create high-fidelity mockups and interactive prototypes. We iterate based on your feedback until the design is perfect."
            },
            {
                step: 3,
                title: "Development",
                description: "We build your website using modern technologies, following best practices for performance, security, and scalability."
            },
            {
                step: 4,
                title: "Testing & Launch",
                description: "Rigorous testing across devices and browsers ensures everything works flawlessly. We handle the deployment and post-launch support."
            }
        ],
        pricing: [
            {
                name: "Starter",
                price: "$5,000",
                duration: "3-4 weeks",
                description: "Perfect for small businesses and startups",
                features: [
                    "Up to 5 pages",
                    "Responsive design",
                    "Basic SEO setup",
                    "Contact form",
                    "1 month support"
                ],
                highlighted: false
            },
            {
                name: "Professional",
                price: "$15,000",
                duration: "6-8 weeks",
                description: "Ideal for growing businesses",
                features: [
                    "Up to 15 pages",
                    "Custom design",
                    "CMS integration",
                    "Advanced animations",
                    "SEO optimization",
                    "3 months support"
                ],
                highlighted: true
            },
            {
                name: "Enterprise",
                price: "Custom",
                duration: "8-12 weeks",
                description: "For complex web applications",
                features: [
                    "Unlimited pages",
                    "Custom functionality",
                    "API integrations",
                    "Performance optimization",
                    "Dedicated support",
                    "6 months support"
                ],
                highlighted: false
            }
        ],
        results: [
            {
                metric: "150%",
                label: "Average increase in conversions"
            },
            {
                metric: "90+",
                label: "Page speed score"
            },
            {
                metric: "3x",
                label: "Faster load times"
            }
        ],
        caseStudy: {
            client: "TechStart Inc.",
            challenge: "Outdated website with poor mobile experience and slow load times affecting conversions.",
            solution: "Complete redesign with Next.js, optimized images, and modern UX patterns.",
            results: "200% increase in mobile conversions, 85% faster page loads, 40% increase in user engagement."
        }
    },
    {
        id: 2,
        title: "Brand Identity",
        slug: "brand-identity",
        category: "Branding",
        icon: "",
        heroImage: "/services/branding.jpg",
        heroVideo: "/videos/placeholder2.mp4",
        tagline: "Creating Memorable Brands That Resonate",
        description: "We develop distinctive brand identities that capture your essence and connect with your audience on a deeper level.",
        overview: "Your brand is more than a logo—it's the complete experience your customers have with your business. We create cohesive brand identities that tell your story, differentiate you from competitors, and build lasting emotional connections with your audience.",
        approach: "Our branding process starts with deep discovery—understanding your values, audience, and market position. We then develop a comprehensive visual and verbal identity system that can scale across all touchpoints, from digital to print, ensuring consistency and recognition.",
        technologies: ["Adobe Creative Suite", "Figma", "Illustrator", "After Effects"],
        features: [
            "Logo Design & Visual Identity",
            "Brand Strategy & Positioning",
            "Typography & Color Systems",
            "Brand Guidelines",
            "Packaging Design",
            "Marketing Collateral"
        ],
        deliverables: [
            "Complete Brand Identity System",
            "Logo Variations & Files",
            "Brand Style Guide",
            "Stationery Design",
            "Social Media Templates",
            "Brand Assets Library"
        ],
        images: [
            "/services/brand-1.jpg",
            "/services/brand-2.jpg",
            "/services/brand-3.jpg"
        ],
        process: [
            {
                step: 1,
                title: "Brand Discovery",
                description: "Deep dive into your business values, target audience, and competitive landscape. We uncover what makes your brand unique."
            },
            {
                step: 2,
                title: "Strategy & Positioning",
                description: "We develop your brand strategy, including messaging, voice, and visual direction that resonates with your audience."
            },
            {
                step: 3,
                title: "Design Exploration",
                description: "Multiple logo concepts and visual identity options are created. We refine based on your feedback."
            },
            {
                step: 4,
                title: "Finalization & Guidelines",
                description: "Complete brand guidelines are delivered with all assets, ensuring consistent application across all touchpoints."
            }
        ],
        pricing: [
            {
                name: "Essential",
                price: "$3,500",
                duration: "2-3 weeks",
                description: "Core brand identity",
                features: [
                    "Logo design (3 concepts)",
                    "Color palette",
                    "Typography selection",
                    "Basic brand guidelines",
                    "Digital files"
                ],
                highlighted: false
            },
            {
                name: "Complete",
                price: "$8,000",
                duration: "4-6 weeks",
                description: "Full brand identity system",
                features: [
                    "Logo design (5 concepts)",
                    "Complete visual system",
                    "Brand strategy",
                    "Comprehensive guidelines",
                    "Marketing templates",
                    "Stationery design"
                ],
                highlighted: true
            },
            {
                name: "Premium",
                price: "$15,000+",
                duration: "6-8 weeks",
                description: "Enterprise brand development",
                features: [
                    "Full brand strategy",
                    "Multiple brand variations",
                    "Packaging design",
                    "Brand animation",
                    "Launch campaign",
                    "Ongoing support"
                ],
                highlighted: false
            }
        ],
        results: [
            {
                metric: "300%",
                label: "Brand recognition increase"
            },
            {
                metric: "50+",
                label: "Brands successfully launched"
            },
            {
                metric: "95%",
                label: "Client satisfaction rate"
            }
        ],
        caseStudy: {
            client: "Organic Essence",
            challenge: "New organic skincare brand needed to stand out in a saturated market with generic competitors.",
            solution: "Created a distinctive, nature-inspired identity with earthy tones and elegant typography.",
            results: "Brand sold out initial inventory in 3 weeks, 5x social media engagement, featured in major beauty publications."
        }
    },
    {
        id: 3,
        title: "UI/UX Design",
        slug: "ui-ux-design",
        category: "Design",
        icon: "",
        heroImage: "/services/ui-ux.jpg",
        heroVideo: "/videos/placeholder3.mp4",
        tagline: "Designing Interfaces Users Love",
        description: "We create intuitive, beautiful interfaces that prioritize user needs while achieving your business objectives.",
        overview: "Great design is invisible. It guides users effortlessly through their journey, making complex tasks feel simple. We combine user research, psychology, and aesthetics to create interfaces that not only look beautiful but work beautifully.",
        approach: "We start with understanding your users through research and analysis. Then we prototype, test, and iterate until we achieve the perfect balance of form and function. Our designs are grounded in data, refined through testing, and polished to perfection.",
        technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Maze", "Hotjar"],
        features: [
            "User Research & Testing",
            "Wireframing & Prototyping",
            "Interface Design",
            "Design Systems",
            "Usability Testing",
            "Interaction Design"
        ],
        deliverables: [
            "High-Fidelity Designs",
            "Interactive Prototypes",
            "Design System",
            "User Flow Diagrams",
            "Component Library",
            "Design Documentation"
        ],
        images: [
            "/services/ux-1.jpg",
            "/services/ux-2.jpg",
            "/services/ux-3.jpg"
        ],
        process: [
            {
                step: 1,
                title: "Research & Analysis",
                description: "User research, competitive analysis, and stakeholder interviews to understand the problem space and user needs."
            },
            {
                step: 2,
                title: "Wireframing & Flow",
                description: "Create information architecture, user flows, and low-fidelity wireframes to establish structure."
            },
            {
                step: 3,
                title: "High-Fidelity Design",
                description: "Detailed visual design with brand application, creating pixel-perfect interfaces across all screens."
            },
            {
                step: 4,
                title: "Testing & Handoff",
                description: "User testing, iteration, and developer handoff with comprehensive design system documentation."
            }
        ],
        pricing: [
            {
                name: "UX Audit",
                price: "$2,500",
                duration: "1-2 weeks",
                description: "Analyze existing product",
                features: [
                    "Heuristic evaluation",
                    "User flow analysis",
                    "Recommendations report",
                    "Quick wins list",
                    "30-min consultation"
                ],
                highlighted: false
            },
            {
                name: "Full Design",
                price: "$12,000",
                duration: "6-8 weeks",
                description: "Complete UX/UI design",
                features: [
                    "User research",
                    "Wireframes & prototypes",
                    "High-fidelity designs",
                    "Design system",
                    "Usability testing",
                    "Developer handoff"
                ],
                highlighted: true
            },
            {
                name: "Ongoing Partner",
                price: "$5,000/mo",
                duration: "Monthly retainer",
                description: "Continuous design support",
                features: [
                    "Dedicated designer",
                    "Unlimited requests",
                    "Fast turnaround",
                    "A/B testing",
                    "Monthly reports",
                    "Priority support"
                ],
                highlighted: false
            }
        ],
        results: [
            {
                metric: "68%",
                label: "Increase in user engagement"
            },
            {
                metric: "45%",
                label: "Reduction in support tickets"
            },
            {
                metric: "2.5x",
                label: "Higher conversion rates"
            }
        ],
        caseStudy: {
            client: "FinFlow App",
            challenge: "Complex financial dashboard was confusing users, leading to high drop-off rates and poor adoption.",
            solution: "Simplified information hierarchy, introduced progressive disclosure, and redesigned with user-centered approach.",
            results: "73% increase in daily active users, 58% reduction in onboarding time, 4.8/5 app store rating."
        }
    },
    {
        id: 4,
        title: "Motion Design",
        slug: "motion-design",
        category: "Animation",
        icon: "",
        heroImage: "/services/motion.jpg",
        heroVideo: "/videos/placeholder4.mp4",
        tagline: "Bringing Your Brand to Life",
        description: "We create captivating animations and motion graphics that engage audiences and elevate your brand storytelling.",
        overview: "Motion adds dimension to your brand. From subtle micro-interactions to full-scale animations, we use movement to guide attention, communicate ideas, and create memorable experiences. Our motion work spans from web animations to explainer videos and beyond.",
        approach: "Every animation serves a purpose. We carefully choreograph movement to enhance user experience, not distract from it. Whether it's a smooth page transition or a complex 3D animation, we ensure every frame is intentional and on-brand.",
        technologies: ["After Effects", "Cinema 4D", "GSAP", "Lottie", "Three.js", "Blender"],
        features: [
            "Web Animations",
            "Logo Animation",
            "Explainer Videos",
            "3D Motion Graphics",
            "Micro-Interactions",
            "Video Editing"
        ],
        deliverables: [
            "Animated Assets",
            "Web-Ready Animations",
            "Video Files (All Formats)",
            "Animation Guidelines",
            "Source Files",
            "Implementation Code"
        ],
        images: [
            "/services/motion-1.jpg",
            "/services/motion-2.jpg",
            "/services/motion-3.jpg"
        ],
        process: [
            {
                step: 1,
                title: "Concept & Storyboard",
                description: "Define the narrative, create mood boards, and develop detailed storyboards for the animation."
            },
            {
                step: 2,
                title: "Style Frames",
                description: "Design key frames that establish the visual style, color palette, and overall aesthetic."
            },
            {
                step: 3,
                title: "Animation & Sound",
                description: "Bring the storyboard to life with animation, add sound design and music to enhance the experience."
            },
            {
                step: 4,
                title: "Delivery & Optimization",
                description: "Final rendering, optimization for different platforms, and delivery in all required formats."
            }
        ],
        pricing: [
            {
                name: "Basic Motion",
                price: "$1,500",
                duration: "1-2 weeks",
                description: "Simple animations",
                features: [
                    "Logo animation",
                    "Simple transitions",
                    "Up to 15 seconds",
                    "2 revisions",
                    "Standard delivery"
                ],
                highlighted: false
            },
            {
                name: "Advanced",
                price: "$5,000",
                duration: "3-4 weeks",
                description: "Complex motion graphics",
                features: [
                    "Explainer video",
                    "Custom illustrations",
                    "Up to 60 seconds",
                    "Sound design",
                    "4 revisions",
                    "All formats"
                ],
                highlighted: true
            },
            {
                name: "Premium 3D",
                price: "$12,000+",
                duration: "6-8 weeks",
                description: "3D animations & VFX",
                features: [
                    "3D modeling",
                    "Complex animations",
                    "Custom duration",
                    "VFX & compositing",
                    "Unlimited revisions",
                    "Source files included"
                ],
                highlighted: false
            }
        ],
        results: [
            {
                metric: "400%",
                label: "Increase in video engagement"
            },
            {
                metric: "85%",
                label: "Better information retention"
            },
            {
                metric: "10M+",
                label: "Total views on projects"
            }
        ],
        caseStudy: {
            client: "CloudTech Solutions",
            challenge: "Needed to explain complex SaaS platform to non-technical audience in an engaging way.",
            solution: "Created a 90-second animated explainer video with custom illustrations and smooth transitions.",
            results: "Video used on homepage increased conversions by 127%, shared 2,500+ times, reduced sales cycle by 30%."
        }
    },
    {
        id: 5,
        title: "SEO & Digital Marketing",
        slug: "seo-digital-marketing",
        category: "Marketing",
        icon: "",
        heroImage: "/services/seo.jpg",
        heroVideo: "/videos/placeholder.mp4",
        tagline: "Growing Your Digital Presence",
        description: "We develop data-driven strategies to increase your visibility, drive traffic, and convert visitors into customers.",
        overview: "Beautiful design means nothing if no one sees it. We combine technical SEO, content strategy, and digital marketing to ensure your brand gets found by the right people at the right time. Our approach is holistic, data-driven, and focused on sustainable growth.",
        approach: "We start with a comprehensive audit of your current digital presence, then develop a customized strategy based on your goals and market. Our campaigns are continuously optimized based on performance data, ensuring maximum ROI.",
        technologies: ["Google Analytics", "Search Console", "SEMrush", "Ahrefs", "Google Ads", "Meta Ads"],
        features: [
            "Technical SEO Optimization",
            "Content Strategy",
            "Link Building",
            "Local SEO",
            "Paid Advertising (PPC)",
            "Social Media Marketing"
        ],
        deliverables: [
            "SEO Strategy & Roadmap",
            "Keyword Research Report",
            "On-Page Optimization",
            "Monthly Performance Reports",
            "Content Calendar",
            "Campaign Management"
        ],
        images: [
            "/services/seo-1.jpg",
            "/services/seo-2.jpg",
            "/services/seo-3.jpg"
        ],
        process: [
            {
                step: 1,
                title: "Audit & Strategy",
                description: "Comprehensive SEO audit, competitor analysis, and keyword research to develop a data-driven strategy."
            },
            {
                step: 2,
                title: "On-Page Optimization",
                description: "Optimize content, meta tags, site structure, and technical elements for search engines."
            },
            {
                step: 3,
                title: "Content & Link Building",
                description: "Create high-quality content and build authoritative backlinks to improve domain authority."
            },
            {
                step: 4,
                title: "Monitor & Refine",
                description: "Continuous monitoring, A/B testing, and strategy refinement based on performance data."
            }
        ],
        pricing: [
            {
                name: "SEO Starter",
                price: "$1,500/mo",
                duration: "3 month minimum",
                description: "Essential SEO optimization",
                features: [
                    "Technical SEO audit",
                    "On-page optimization",
                    "Keyword research",
                    "Monthly reporting",
                    "Up to 10 pages"
                ],
                highlighted: false
            },
            {
                name: "Growth",
                price: "$3,500/mo",
                duration: "6 month minimum",
                description: "Comprehensive SEO & content",
                features: [
                    "Everything in Starter",
                    "Content creation",
                    "Link building",
                    "Local SEO",
                    "Competitor tracking",
                    "Bi-weekly calls"
                ],
                highlighted: true
            },
            {
                name: "Enterprise",
                price: "$8,000/mo",
                duration: "12 month minimum",
                description: "Full digital marketing",
                features: [
                    "Everything in Growth",
                    "PPC management",
                    "Social media marketing",
                    "Dedicated account manager",
                    "Custom reporting",
                    "Priority support"
                ],
                highlighted: false
            }
        ],
        results: [
            {
                metric: "285%",
                label: "Average organic traffic increase"
            },
            {
                metric: "#1",
                label: "Rankings achieved for 200+ keywords"
            },
            {
                metric: "450%",
                label: "ROI on marketing spend"
            }
        ],
        caseStudy: {
            client: "Local Fitness Studio",
            challenge: "Zero online visibility, competing against national gym chains in local market.",
            solution: "Implemented local SEO strategy, optimized Google Business Profile, created location-specific content.",
            results: "Ranked #1 for 15 local keywords, 320% increase in organic traffic, 85 new memberships from organic search."
        }
    },
    {
        id: 6,
        title: "E-Commerce Solutions",
        slug: "ecommerce-solutions",
        category: "Development",
        icon: "",
        heroImage: "/services/ecommerce.jpg",
        heroVideo: "/videos/placeholder2.mp4",
        tagline: "Building Online Stores That Sell",
        description: "We create powerful e-commerce platforms that deliver exceptional shopping experiences and drive sales.",
        overview: "Selling online requires more than just a shopping cart. We build complete e-commerce ecosystems that handle everything from product discovery to checkout, inventory management to customer retention. Our solutions are scalable, secure, and optimized for conversions.",
        approach: "We analyze your products, customers, and business model to design the optimal shopping experience. From platform selection to custom integrations, we handle every technical detail while ensuring the store reflects your brand and serves your customers.",
        technologies: ["Shopify", "WooCommerce", "Next.js Commerce", "Stripe", "PayPal", "Klaviyo"],
        features: [
            "Custom Store Design",
            "Product Management System",
            "Payment Gateway Integration",
            "Inventory Management",
            "Order Fulfillment",
            "Customer Analytics"
        ],
        deliverables: [
            "Fully Functional Online Store",
            "Mobile-Optimized Design",
            "Payment Processing",
            "Admin Dashboard",
            "Email Marketing Setup",
            "Training & Support"
        ],
        images: [
            "/services/ecom-1.jpg",
            "/services/ecom-2.jpg",
            "/services/ecom-3.jpg"
        ],
        process: [
            {
                step: 1,
                title: "Platform Selection & Setup",
                description: "Choose the right e-commerce platform based on your needs, products, and scale. Set up hosting and core infrastructure."
            },
            {
                step: 2,
                title: "Store Design & Development",
                description: "Custom design and development of your store, including product pages, checkout flow, and mobile optimization."
            },
            {
                step: 3,
                title: "Integration & Testing",
                description: "Integrate payment gateways, shipping, inventory, and marketing tools. Thorough testing across devices."
            },
            {
                step: 4,
                title: "Launch & Optimization",
                description: "Store launch with ongoing optimization, A/B testing, and conversion rate improvements."
            }
        ],
        pricing: [
            {
                name: "Shopify Store",
                price: "$8,000",
                duration: "4-6 weeks",
                description: "Ready-to-sell online store",
                features: [
                    "Custom Shopify theme",
                    "Up to 100 products",
                    "Payment integration",
                    "Mobile optimized",
                    "Basic SEO",
                    "2 months support"
                ],
                highlighted: false
            },
            {
                name: "Custom Store",
                price: "$20,000",
                duration: "8-10 weeks",
                description: "Fully custom e-commerce",
                features: [
                    "Custom design & dev",
                    "Unlimited products",
                    "Advanced features",
                    "CRM integration",
                    "Email automation",
                    "6 months support"
                ],
                highlighted: true
            },
            {
                name: "Enterprise",
                price: "$50,000+",
                duration: "12-16 weeks",
                description: "Multi-vendor marketplace",
                features: [
                    "Custom platform",
                    "Multi-vendor support",
                    "Advanced analytics",
                    "Custom integrations",
                    "Dedicated team",
                    "Ongoing support"
                ],
                highlighted: false
            }
        ],
        results: [
            {
                metric: "180%",
                label: "Average sales increase"
            },
            {
                metric: "4.2%",
                label: "Average conversion rate"
            },
            {
                metric: "$5M+",
                label: "Revenue generated for clients"
            }
        ],
        caseStudy: {
            client: "Artisan Home Goods",
            challenge: "Brick-and-mortar store wanted to expand online but had zero e-commerce experience.",
            solution: "Built custom Shopify store with product photography, optimized checkout, and email marketing automation.",
            results: "Generated $250K in first 6 months, 3.8% conversion rate, expanded to international shipping, hired 3 new staff."
        }
    }
];
