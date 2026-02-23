"use client";

import { useState, useEffect } from "react";
import { MoveRight, Menu, X, MessageCircle, Layout, Clock, Handshake, TrendingUp, ChevronRight, Hotel, Home, Building2, Utensils, ShoppingBag, Briefcase } from "lucide-react";
import clsx from "clsx";
import { usePanel } from "@/lib/PanelContext";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LocaleLink from "@/components/LocaleLink";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { getServicesTranslations } from "@/lib/servicesTranslations";
import { getIndustriesTranslations } from "@/lib/industriesTranslations";
import { getCaseStudiesTranslations } from "@/lib/caseStudiesTranslations";
import { getBlogTranslations } from "@/lib/blogTranslations";
import { caseStudies as staticCaseStudies } from "@/data/caseStudiesData";
import { blogPosts as staticBlogPosts } from "@/data/blog";
import { useTidioChat } from "@/lib/TidioChatContext";


// New nav structure
const navItems = [
  {
    label: "services",
    href: "/services",
    dropdown: true,
    items: services.map(service => ({
      label: service.title,
      href: `/services/${service.slug}`
    }))
  },
  {
    label: "industries",
    href: "/industries",
    dropdown: true,
    items: industries.filter(i => i.featured).map(industry => ({
      label: industry.title,
      href: `/industries/${industry.slug}`
    }))
  },
  {
    label: "models",
    href: "/project-models",
    dropdown: true,
    items: [
      { label: "Purchase Model", href: "/purchase-model" },
      { label: "Rental Model", href: "/rental-model" },
      { label: "Strategic Participation", href: "/strategic-participation" },
    ]
  },
  {
    label: "caseStudies",
    href: "/case-studies",
    dropdown: true,
    items: staticCaseStudies.slice(0, 6).map(study => ({
      label: study.title,
      href: `/case-studies/${study.slug}`
    }))
  },
  {
    label: "company",
    href: "#",
    dropdown: true,
    items: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ]
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [industriesMenuOpen, setIndustriesMenuOpen] = useState(false);
  const [caseStudiesMenuOpen, setCaseStudiesMenuOpen] = useState(false);
  const [blogsMenuOpen, setBlogsMenuOpen] = useState(false);
  const [projectModelsOpen, setProjectModelsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
  const [mobileModelsOpen, setMobileModelsOpen] = useState(false);
  const { navigateToPanel, activeIndex } = usePanel();
  const { openTidioChat } = useTidioChat();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = useTranslations('nav');
  const pmT = useTranslations('projectModels.megaMenu');
  const csT = useTranslations('caseStudies.page');
  const blogT = useTranslations('blog.page');
  const servicesT = getServicesTranslations(locale);
  const industriesT = getIndustriesTranslations(locale);
  const caseStudiesTranslations = getCaseStudiesTranslations(locale);
  const blogTranslations = getBlogTranslations(locale);
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/de";

  const lightPanels = [1, 3, 6];
  const isLightMode = isHome && lightPanels.includes(activeIndex);

  // Get localized services for mega menu
  const localizedServices = services.map(service => {
    const key = service.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const trans = servicesT.services[key as keyof typeof servicesT.services];
    return {
      ...service,
      title: trans?.title || service.title,
      category: trans?.category || service.category,
      description: trans?.description || service.description
    };
  });

  // Get localized industries for mega menu
  const industryIcons: Record<string, any> = {
    "hotels-resorts": Hotel,
    "vacation-rentals": Home,
    "real-estate-property-management": Building2,
    "gastronomy": Utensils,
    "retail": ShoppingBag,
    "smes-service-businesses": Briefcase
  };

  const localizedIndustries = industries
    .filter(industry => industry.featured)
    .map(industry => {
      const key = industry.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const trans = industriesT.industries[key as keyof typeof industriesT.industries];
      return {
        ...industry,
        title: trans?.title || industry.title,
        summary: trans?.summary || industry.summary,
        icon: industryIcons[industry.slug] || Briefcase
      };
    });

  // Get localized case studies for mega menu
  const localizedCaseStudies = staticCaseStudies
    .slice(0, 6)
    .map(study => {
      const key = study.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const trans = caseStudiesTranslations.studies[key as keyof typeof caseStudiesTranslations.studies];
      return {
        ...study,
        title: trans?.title || study.title,
        overview: trans?.overview || study.overview
      };
    });

  // Get localized blogs for mega menu
  const localizedBlogs = staticBlogPosts
    .slice(0, 6)
    .map(post => {
      const key = post.slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
      const trans = blogTranslations.posts[key as keyof typeof blogTranslations.posts];
      return {
        ...post,
        title: trans?.title || post.title,
        excerpt: trans?.excerpt || post.excerpt
      };
    });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, item: { label: string; href: string; panelIndex?: number }) => {
    if (isHome && item.panelIndex !== undefined) {
      e.preventDefault();
      navigateToPanel(item.panelIndex);
    }
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
    setMobileCaseStudiesOpen(false);
    setMobileBlogsOpen(false);
    setMobileModelsOpen(false);
  };


  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center",
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <LocaleLink href="/" className="flex items-center gap-2 group z-50 relative" onClick={(e) => handleNavClick(e, { label: "Home", href: "/", panelIndex: 0 })}>
        <div className="relative h-10 w-auto flex items-center">
          <img
            src="/logo/atriona-dark.png"
            alt="Atriona"
            className={clsx(
              "h-10 w-auto object-contain transition-opacity duration-500 absolute top-0 left-0",
              isLightMode ? "opacity-100" : "opacity-0"
            )}
          />
          <img
            src="/logo/atriona-white.png"
            alt="Atriona"
            className={clsx(
              "h-10 w-auto object-contain transition-opacity duration-500",
              isLightMode ? "opacity-0" : "opacity-100"
            )}
          />
          <span className="w-2 h-2 rounded-full bg-[#00b4d9] absolute -top-1 -right-2"></span>
        </div>
      </LocaleLink>

      {/* Desktop Nav - Themed Mega Menus for main items, dropdown for Company */}
      <nav className={clsx(
        "hidden md:flex gap-6 items-center px-6 py-2.5 rounded-full border transition-all duration-500 backdrop-blur-sm",
        isLightMode
          ? "bg-black/5 border-black/10"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      )}>
        {/* Services Mega Menu */}
        <div
          className="relative group/menu"
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
        >
          <LocaleLink
            href="/services"
            onClick={(e) => handleNavClick(e, { label: "services", href: "/services" })}
            className={clsx(
              "text-xs font-bold uppercase tracking-wider transition-colors relative group flex items-center gap-1",
              isLightMode ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
            )}
          >
            {t("services")} <span className="text-xs">▾</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00b4d9] transition-all duration-300 group-hover:w-full"></span>
          </LocaleLink>
          <div
            className={clsx(
              "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300",
              megaMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6" />
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 min-w-[600px]">
              <div className="grid grid-cols-2 gap-6">
                {localizedServices.map((service) => (
                  <LocaleLink
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[#00b4d9]/30"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    {service.icon && (
                      <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </LocaleLink>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <LocaleLink
                  href="/services"
                  className="flex items-center justify-center gap-2 text-sm font-bold text-[#00b4d9] hover:text-white transition-colors duration-300 group"
                  onClick={() => setMegaMenuOpen(false)}
                >
                  <span>View All Services</span>
                  <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>

        {/* Industries Mega Menu */}
        <div
          className="relative group/menu"
          onMouseEnter={() => setIndustriesMenuOpen(true)}
          onMouseLeave={() => setIndustriesMenuOpen(false)}
        >
          <LocaleLink
            href="/industries"
            onClick={(e) => handleNavClick(e, { label: "industries", href: "/industries" })}
            className={clsx(
              "text-xs font-bold uppercase tracking-wider transition-colors relative group flex items-center gap-1",
              isLightMode ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
            )}
          >
            {t("industries")} <span className="text-xs">▾</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00b4d9] transition-all duration-300 group-hover:w-full"></span>
          </LocaleLink>
          <div
            className={clsx(
              "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300",
              industriesMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6" />
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 min-w-[700px]">
              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                <div className="col-span-2 mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00b4d9] mb-1">Our Focus</h4>
                  <p className="text-white font-display font-medium text-lg">Specialized Industry Solutions</p>
                </div>
                {localizedIndustries.map((industry) => (
                  <LocaleLink
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group flex items-start gap-4 py-4 border-b border-white/5 hover:border-[#00b4d9]/30 transition-all duration-300"
                    onClick={() => setIndustriesMenuOpen(false)}
                  >
                    <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#00b4d9]/20 transition-colors">
                      <industry.icon className="w-5 h-5 text-gray-400 group-hover:text-[#00b4d9] transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300 mb-0.5">
                        {industry.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1">
                        {industry.summary}
                      </p>
                    </div>
                  </LocaleLink>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <LocaleLink
                  href="/industries"
                  className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00b4d9] transition-all duration-300 group"
                  onClick={() => setIndustriesMenuOpen(false)}
                >
                  <span>Explore all industries & use cases</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00b4d9]/50 group-hover:bg-[#00b4d9]/10">
                    <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>

        {/* Models Mega Menu */}
        <div
          className="relative group/menu"
          onMouseEnter={() => setProjectModelsOpen(true)}
          onMouseLeave={() => setProjectModelsOpen(false)}
        >
          <LocaleLink
            href="/project-models"
            onClick={(e) => handleNavClick(e, { label: "projectModels", href: "/project-models" })}
            className={clsx(
              "text-xs font-bold uppercase tracking-wider transition-colors relative group flex items-center gap-1",
              isLightMode ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
            )}
          >
            Models <span className="text-xs">▾</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#161616] transition-all duration-300 group-hover:w-full"></span>
          </LocaleLink>
          <div
            className={clsx(
              "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-500",
              projectModelsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
            )}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6" />
            <div className="bg-[#161616] backdrop-blur-xl border border-white/10 rounded-2xl p-2 min-w-[900px] overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex bg-[#161616] rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 flex-grow gap-px bg-[#161616]">
                  {[
                    { id: "purchase", icon: Layout, color: "text-white", bg: "bg-white/10", href: "/purchase-model" },
                    { id: "rental", icon: Clock, color: "text-white", bg: "bg-white/10", href: "/rental-model" },
                    { id: "participation", icon: Handshake, color: "text-[#00b4d9]", bg: "bg-[#00b4d9]/10", href: "/strategic-participation" },
                  ].map((model) => (
                    <LocaleLink
                      key={model.id}
                      href={model.href}
                      className="bg-black/40 p-8 group transition-all duration-500 hover:bg-white/5"
                      onClick={() => setProjectModelsOpen(false)}
                    >
                      <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", model.bg)}>
                        <model.icon className={clsx("w-7 h-7", model.color)} />
                      </div>
                      <h4 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2">
                        {pmT(`${model.id}.title`)}
                        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#00b4d9]" />
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                        {pmT(`${model.id}.desc`)}
                      </p>
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00b4d9] transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                        {pmT(`${model.id}.cta`)}
                        <MoveRight className="w-4 h-4" />
                      </span>
                    </LocaleLink>
                  ))}
                </div>
                <div className="w-72 bg-white/[0.02] p-8 flex flex-col justify-between border-l border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider mb-6">
                      <TrendingUp className="w-3 h-3 text-[#00b4d9]" />
                      Optional
                    </div>
                    <h4 className="text-lg font-display font-bold text-white mb-4">{pmT("growth.title")}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {pmT("growth.items")}
                    </p>
                  </div>
                  <LocaleLink
                    href="/project-models"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00b4d9] transition-colors group/all"
                    onClick={() => setProjectModelsOpen(false)}
                  >
                    <span>{pmT("growth.cta")}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/all:translate-x-1" />
                  </LocaleLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Mega Menu */}
        <div
          className="relative group/menu"
          onMouseEnter={() => setCaseStudiesMenuOpen(true)}
          onMouseLeave={() => setCaseStudiesMenuOpen(false)}
        >
          <LocaleLink
            href="/case-studies"
            onClick={(e) => handleNavClick(e, { label: "caseStudies", href: "/case-studies" })}
            className={clsx(
              "text-xs font-bold uppercase tracking-wider transition-colors relative group flex items-center gap-1",
              isLightMode ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
            )}
          >
            {t("caseStudies")} <span className="text-xs">▾</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00b4d9] transition-all duration-300 group-hover:w-full"></span>
          </LocaleLink>
          <div
            className={clsx(
              "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300",
              caseStudiesMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6" />
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 min-w-[700px]">
              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                <div className="col-span-2 mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00b4d9] mb-1">Our Success Stories</h4>
                  <p className="text-white font-display font-medium text-lg">Selected Case Studies</p>
                </div>
                {localizedCaseStudies.map((study) => (
                  <LocaleLink
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="group flex flex-col gap-2 py-4 border-b border-white/5 hover:border-[#00b4d9]/30 transition-all duration-300"
                    onClick={() => setCaseStudiesMenuOpen(false)}
                  >
                    <h3 className="text-sm font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300">
                      {study.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-2 leading-relaxed">
                      {study.overview}
                    </p>
                  </LocaleLink>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <LocaleLink
                  href="/case-studies"
                  className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00b4d9] transition-all duration-300 group"
                  onClick={() => setCaseStudiesMenuOpen(false)}
                >
                  <span>View All Projects</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00b4d9]/50 group-hover:bg-[#00b4d9]/10">
                    <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>

        {/* Company Mega Menu */}
        <div
          className="relative group/menu"
          onMouseEnter={() => setBlogsMenuOpen(true)}
          onMouseLeave={() => setBlogsMenuOpen(false)}
        >
          <button
            className={clsx(
              "flex items-center gap-1 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors",
              isLightMode ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
            )}
            tabIndex={0}
          >
            Company <span className="ml-1 text-xs">▾</span>
          </button>
          <div
            className={clsx(
              "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300",
              blogsMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6" />
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 min-w-[700px] min-h-[220px] flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                <div className="col-span-2 mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00b4d9] mb-1">{t('company')}</h4>
                  <p className="text-white font-display font-medium text-lg">{t('learnMoreAboutUs')}</p>
                </div>
                <LocaleLink href="/about" className="group flex flex-col gap-1 py-4 border-b border-white/5 hover:border-[#00b4d9]/30 transition-all duration-300">
                  <span className="text-base font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300">{t('about')}</span>
                  <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1 italic">{t('aboutDesc')}</span>
                </LocaleLink>
                <LocaleLink href="/blog" className="group flex flex-col gap-1 py-4 border-b border-white/5 hover:border-[#00b4d9]/30 transition-all duration-300">
                  <span className="text-base font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300">{t('blogs')}</span>
                  <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1 italic">{t('blogDesc')}</span>
                </LocaleLink>
                <LocaleLink href="/faq" className="group flex flex-col gap-1 py-4 border-b border-white/5 hover:border-[#00b4d9]/30 transition-all duration-300">
                  <span className="text-base font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300">{t('faq')}</span>
                  <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1 italic">{t('faqDesc')}</span>
                </LocaleLink>
                <LocaleLink href="/contact" className="group flex flex-col gap-1 py-4 border-b border-white/5 hover:border-[#00b4d9]/30 transition-all duration-300">
                  <span className="text-base font-bold text-white group-hover:text-[#00b4d9] transition-colors duration-300">{t('contact')}</span>
                  <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1 italic">{t('contactDesc')}</span>
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
        <LanguageSwitcher isLightMode={isLightMode} />
      </nav>

      {/* Desktop CTA Button */}
      <div className="hidden md:flex items-center gap-2 z-50">
        <LocaleLink
          href="/contact"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide px-5 py-2 rounded-full bg-[#00b4d9] text-white hover:bg-white hover:text-black transition-all duration-300 shadow"
        >
          <span>{t('contact')}</span>
          <MoveRight className="w-4 h-4" />
        </LocaleLink>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={clsx(
          "md:hidden z-[10000] text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-1.5 transition-colors duration-300 relative",
          mobileMenuOpen
            ? "text-white"
            : isLightMode
              ? "text-black"
              : "text-white"
        )}
        style={{ color: !mobileMenuOpen && !isLightMode ? '#FFFFFF' : undefined }}
        aria-label="Toggle menu"
      >
        <span>Menu</span>
        {mobileMenuOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black backdrop-blur-lg md:hidden transition-all duration-500",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-4 sm:gap-6 px-6 py-24 overflow-y-auto" style={{ position: 'relative', zIndex: 10000 }}>
          {navItems.map((item, index) => {
            // Special handling for services in mobile menu
            if (item.label === "services") {
              return (
                <div
                  key={item.label}
                  className={clsx(
                    "flex flex-col items-center transform transition-all duration-300",
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms"
                  }}
                >
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white hover:text-[#00b4d9] transition-all duration-300"
                  >
                    {t(item.label)}
                  </button>

                  {/* Mobile Services Submenu */}
                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300 mt-4",
                      mobileServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-3 text-center">
                      {localizedServices.map((service) => (
                        <LocaleLink
                          key={service.id}
                          href={`/services/${service.slug}`}
                          onClick={(e) => {
                            handleNavClick(e, item);
                            setMobileServicesOpen(false);
                          }}
                          className="text-base sm:text-lg text-gray-300 hover:text-[#00b4d9] transition-colors duration-300"
                        >
                          {service.title}
                        </LocaleLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Special handling for industries in mobile menu
            if (item.label === "industries") {
              return (
                <div
                  key={item.label}
                  className={clsx(
                    "flex flex-col items-center transform transition-all duration-300",
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms"
                  }}
                >
                  <button
                    onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white hover:text-[#00b4d9] transition-all duration-300"
                  >
                    {t(item.label)}
                  </button>

                  {/* Mobile Industries Submenu */}
                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300 mt-4",
                      mobileIndustriesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-3 text-center">
                      {localizedIndustries.map((industry) => (
                        <LocaleLink
                          key={industry.slug}
                          href={`/industries/${industry.slug}`}
                          onClick={(e) => {
                            handleNavClick(e, item);
                            setMobileIndustriesOpen(false);
                          }}
                          className="text-base sm:text-lg text-gray-300 hover:text-[#00b4d9] transition-colors duration-300"
                        >
                          {industry.title}
                        </LocaleLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Special handling for Case Studies in mobile menu (ALIGNED WITH LOGIC)
            if (item.label === "caseStudies") {
              return (
                <div
                  key={item.label}
                  className={clsx(
                    "flex flex-col items-center transform transition-all duration-300",
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms"
                  }}
                >
                  <button
                    onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white hover:text-[#00b4d9] transition-all duration-300"
                  >
                    {t(item.label)}
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300 mt-4",
                      mobileCaseStudiesOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-3 text-center px-4">
                      {localizedCaseStudies.map((study) => (
                        <LocaleLink
                          key={study.slug}
                          href={`/case-studies/${study.slug}`}
                          onClick={(e) => {
                            handleNavClick(e, item);
                            setMobileCaseStudiesOpen(false);
                          }}
                          className="flex flex-col gap-1 py-2 group"
                        >
                          <span className="text-base sm:text-lg text-gray-300 group-hover:text-[#00b4d9] transition-colors duration-300 font-bold">
                            {study.title}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1 italic">
                            {study.overview}
                          </span>
                        </LocaleLink>
                      ))}
                      <LocaleLink
                        href="/case-studies"
                        onClick={(e) => handleNavClick(e, item)}
                        className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00b4d9]"
                      >
                        All Projects
                      </LocaleLink>
                    </div>
                  </div>
                </div>
              );
            }

            // Special handling for Blogs in mobile menu
            if (item.label === "blogs") {
              return (
                <div
                  key={item.label}
                  className={clsx(
                    "flex flex-col items-center transform transition-all duration-300",
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms"
                  }}
                >
                  <button
                    onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white hover:text-[#00b4d9] transition-all duration-300"
                  >
                    {t(item.label)}
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300 mt-4",
                      mobileBlogsOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-3 text-center px-4">
                      {localizedBlogs.map((post) => (
                        <LocaleLink
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          onClick={(e) => {
                            handleNavClick(e, item);
                            setMobileBlogsOpen(false);
                          }}
                          className="flex flex-col gap-1 py-2 group"
                        >
                          <span className="text-base sm:text-lg text-gray-300 group-hover:text-[#00b4d9] transition-colors duration-300 font-bold">
                            {post.title}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1 italic">
                            {post.excerpt}
                          </span>
                        </LocaleLink>
                      ))}
                      <LocaleLink
                        href="/blog"
                        onClick={(e) => handleNavClick(e, item)}
                        className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00b4d9]"
                      >
                        Visit Magazine
                      </LocaleLink>
                    </div>
                  </div>
                </div>
              );
            }

            // Mobile Project Models
            if (item.label === "projectModels") {
              return (
                <div
                  key={item.label}
                  className={clsx(
                    "flex flex-col items-center transform transition-all duration-300",
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms"
                  }}
                >
                  <button
                    onClick={() => setMobileModelsOpen(!mobileModelsOpen)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white hover:text-amber-400 transition-all duration-300"
                  >
                    {t(item.label)}
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300 mt-4",
                      mobileModelsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-4 text-center">
                      {[
                        { id: "purchase", href: "/purchase-model" },
                        { id: "rental", href: "/rental-model" },
                        { id: "participation", href: "/strategic-participation" },
                      ].map((model) => (
                        <LocaleLink
                          key={model.id}
                          href={model.href}
                          onClick={(e) => {
                            handleNavClick(e, item);
                            setMobileModelsOpen(false);
                          }}
                          className="text-base sm:text-lg text-gray-300 hover:text-amber-400 transition-colors duration-300"
                        >
                          {pmT(`${model.id}.title`)}
                        </LocaleLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Regular mobile nav items
            return (
              <LocaleLink
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={clsx(
                  "text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white hover:text-[#00b4d9] transition-all duration-300 transform",
                  mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                )}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms"
                }}
              >
                {t(item.label)}
              </LocaleLink>
            );
          })}


          {/* Mobile Language Switcher */}
          <div
            className={clsx(
              "transform transition-all duration-300",
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            )}
            style={{
              transitionDelay: mobileMenuOpen ? `${navItems.length * 100}ms` : "0ms"
            }}
          >
            <LanguageSwitcher isLightMode={false} />
          </div>

          {/* Mobile CTA Button */}
          <LocaleLink
            href="/contact"
            onClick={(e) => handleNavClick(e, navItems[6])}
            className={clsx(
              "flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-wide px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#00b4d9] text-white hover:bg-white hover:text-black transition-all duration-300 mt-4 sm:mt-6 transform",
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            )}
            style={{
              transitionDelay: mobileMenuOpen ? `${(navItems.length + 1) * 100}ms` : "0ms"
            }}
          >
            <span>{t('letsTalk')}</span>
            <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </LocaleLink>
        </nav>
      </div>
    </header>
  );
}
