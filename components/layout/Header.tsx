"use client";

import { useState, useEffect } from "react";
import { MoveRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { usePanel } from "@/lib/PanelContext";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LocaleLink from "@/components/LocaleLink";
import { services } from "@/data/services";
import { getServicesTranslations } from "@/lib/servicesTranslations";

const navItems = [
  { label: "about", href: "/about" },
  { label: "services", href: "/services" },
  { label: "industries", href: "/industries" },
  { label: "caseStudies", href: "/case-studies" },
  { label: "blogs", href: "/blog" },
  { label: "contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { navigateToPanel, activeIndex } = usePanel();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = useTranslations('nav');
  const servicesT = getServicesTranslations(locale);
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
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 md:px-12 py-6 flex justify-between items-center",
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <LocaleLink href="/" className="flex items-center gap-2 group z-50 relative" onClick={(e) => handleNavClick(e, { label: "Home", href: "/", panelIndex: 0 })}>
        <div className="relative h-6 sm:h-7 md:h-9 lg:h-10 w-auto">
          {/* Dark logo for light backgrounds */}
          <img
            src="/logo/atriona-dark.png"
            alt="Atriona"
            className={clsx(
              "h-6 sm:h-7 md:h-9 lg:h-10 w-auto object-contain transition-opacity duration-500 absolute top-0 left-0",
              isLightMode ? "opacity-100" : "opacity-0"
            )}
          />
          {/* White logo for dark backgrounds */}
          <img
            src="/logo/atriona-white.png"
            alt="Atriona"
            className={clsx(
              "h-10 sm:h-12 md:h-16 lg:h-16 w-auto object-contain transition-opacity duration-500",
              isLightMode ? "opacity-0" : "opacity-100"
            )}
          />
          <span className="w-2 h-2 rounded-full bg-[#00b4d9] absolute -top-1 -right-2"></span>
        </div>
      </LocaleLink>

      {/* Desktop Nav */}
      <nav className={clsx(
        "hidden md:flex gap-6 items-center px-6 py-2.5 rounded-full border transition-all duration-500 backdrop-blur-sm",
        isLightMode
          ? "bg-black/5 border-black/10"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      )}>
        {navItems.map((item) => {
          // Special handling for services with mega menu
          if (item.label === "services") {
            return (
              <div
                key={item.label}
                className="relative group/menu"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <LocaleLink
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={clsx(
                    "text-xs font-bold uppercase tracking-wider transition-colors relative group",
                    isLightMode
                      ? "text-gray-600 hover:text-black"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {t(item.label)}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00b4d9] transition-all duration-300 group-hover:w-full"></span>
                </LocaleLink>

                {/* Mega Menu - with invisible bridge */}
                <div
                  className={clsx(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300",
                    megaMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                  )}
                >
                  {/* Invisible bridge to prevent gap */}
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

                    {/* View All Services Link */}
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
            );
          }

          // Regular nav items
          return (
            <LocaleLink
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={clsx(
                "text-xs font-bold uppercase tracking-wider transition-colors relative group",
                isLightMode
                  ? "text-gray-600 hover:text-black"
                  : "text-gray-300 hover:text-white"
              )}
            >
              {t(item.label)}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00b4d9] transition-all duration-300 group-hover:w-full"></span>
            </LocaleLink>
          );
        })}
        <LanguageSwitcher isLightMode={isLightMode} />
      </nav>

      {/* Desktop CTA Button */}
      <LocaleLink
        href="/contact"
        onClick={(e) => handleNavClick(e, navItems[6])}
        className={clsx(
          "hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wide group px-4 py-2 rounded-full hover:bg-[#00b4d9] hover:text-white transition-all duration-300 z-50",
          isLightMode
            ? "bg-black text-white"
            : "bg-white text-black"
        )}
      >
        <span>{t('letsTalk')}</span>
        <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
      </LocaleLink>

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
                    <div className="flex flex-col gap-3">
                      {localizedServices.map((service) => (
                        <LocaleLink
                          key={service.id}
                          href={`/services/${service.slug}`}
                          onClick={(e) => {
                            handleNavClick(e, item);
                            setMobileServicesOpen(false);
                          }}
                          className="text-base sm:text-lg text-gray-300 hover:text-[#00b4d9] transition-colors duration-300 text-center"
                        >
                          {service.title}
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
};
