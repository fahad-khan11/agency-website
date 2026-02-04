export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  categories: string[];
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  content: string; // MDX or HTML string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "strategic-web-design-driving-b2b-growth-2026",
    title: "Strategic Web Design: Driving B2B Growth in 2026",
    excerpt: "Explore the future of B2B web design where aesthetics meet analytics. Discover how strategic design thinking, AI integration, and immersive experiences are redefining digital success.",
    heroImage: "/blog/strategic-web-design.png",
    categories: ["Design Strategy", "UX/UI"],
    tags: ["B2B", "Growth", "Web Design"],
    author: "Agency Team",
    date: "February 4, 2026",
    readTime: "8 min read",
    content: `
      <h2>The New Era of Digital B2B Experiences</h2>
      <p>The landscape of B2B digital interaction is undergoing a seismic shift...</p>
      <!-- (Full content would go here, abbreviated for this file to keep it manageable but fully structured in the real app) -->
      <p>In this new era, <strong>strategic web design</strong> is no longer just about aesthetics...</p>
    `
  },
  {
    slug: "future-of-retail-technology-2026",
    title: "The Future of Retail: Bridging Physical and Digital",
    excerpt: "How unified commerce and smart POS integrations are creating seamless shopping experiences. A look at the technologies shaping the next decade of retail.",
    heroImage: "/blog/retail-future.png",
    categories: ["Retail", "Technology"],
    tags: ["Omnichannel", "POS", "Automation"],
    author: "Sarah Jenkins",
    date: "January 28, 2026",
    readTime: "6 min read",
    content: `
      <h2>The Blurring Lines of Commerce</h2>
      <p>Retail is no longer about 'online' vs 'offline'. It is about 'unified'.</p>
      <p>Customers expect their cart to follow them from Instagram to the flagship store...</p>
    `
  },
  {
    slug: "ai-in-hospitality-concierge",
    title: "AI as the New Concierge: Elevating Guest Experiences",
    excerpt: "From chatbots to predictive room settings, Artificial Intelligence is personalizing hospitality at scale without losing the human touch.",
    heroImage: "/blog/hospitality-ai.png",
    categories: ["Hospitality", "AI"],
    tags: ["Guest Experience", "Automation", "Trends"],
    author: "David Chen",
    date: "January 15, 2026",
    readTime: "5 min read",
    content: `
      <h2>Hyper-Personalization at Scale</h2>
      <p>Imagine walking into a hotel room that is already set to your preferred temperature and playing your favorite jazz playlist.</p>
    `
  },
  {
    slug: "scaling-saas-infrastructure",
    title: "Scaling SaaS: From MVP to Enterprise Grade",
    excerpt: "Technical strategies for growing your software platform. Handling database sharding, microservices architecture, and global CDN distribution.",
    heroImage: "/blog/saas-scaling.png",
    categories: ["SaaS", "Engineering"],
    tags: ["Scaling", "Cloud", "Architecture"],
    author: "Michael Ross",
    date: "January 10, 2026",
    readTime: "10 min read",
    content: `
      <h2>When Monoliths Break</h2>
      <p>Every successful SaaS hits a wall where the initial architecture can no longer support the user load.</p>
    `
  }
];
