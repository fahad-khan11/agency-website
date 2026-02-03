"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoveRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { usePanel } from "@/lib/PanelContext";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigateToPanel, activeIndex } = usePanel();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const lightPanels = [1, 3, 6];
  const isLightMode = isHome && lightPanels.includes(activeIndex);

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
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 md:px-12 py-6 flex justify-between items-center",
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group z-50 relative" onClick={(e) => handleNavClick(e, { label: "Home", href: "/", panelIndex: 0 })}>
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
              "h-6 sm:h-7 md:h-9 lg:h-10 w-auto object-contain transition-opacity duration-500",
              isLightMode ? "opacity-0" : "opacity-100"
            )}
          />
          <span className="w-2 h-2 rounded-full bg-[#00b4d9] absolute -top-1 -right-2"></span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className={clsx(
        "hidden md:flex gap-8 items-center px-8 py-3 rounded-full border transition-all duration-500 backdrop-blur-sm",
        isLightMode
          ? "bg-black/5 border-black/10"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      )}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item)}
            className={clsx(
              "text-sm font-bold uppercase tracking-wider transition-colors relative group",
              isLightMode
                ? "text-gray-600 hover:text-black"
                : "text-gray-300 hover:text-white"
            )}
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00b4d9] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* Desktop CTA Button */}
      <Link
        href="/contact"
        onClick={(e) => handleNavClick(e, navItems[4])}
        className={clsx(
          "hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide group px-5 py-2.5 rounded-full hover:bg-[#00b4d9] hover:text-white transition-all duration-300 z-50",
          isLightMode
            ? "bg-black text-white"
            : "bg-white text-black"
        )}
      >
        <span>Let's Talk</span>
        <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
      </Link>

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
        <nav className="flex flex-col items-center justify-center h-full gap-4 sm:gap-6 px-6 py-24" style={{ position: 'relative', zIndex: 10000 }}>
          {navItems.map((item, index) => (
            <Link
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
              {item.label}
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <Link
            href="/contact"
            onClick={(e) => handleNavClick(e, navItems[4])}
            className={clsx(
              "flex items-center gap-2 text-base sm:text-lg font-bold uppercase tracking-wide px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#00b4d9] text-white hover:bg-white hover:text-black transition-all duration-300 mt-4 sm:mt-6 transform",
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            )}
            style={{
              transitionDelay: mobileMenuOpen ? `${navItems.length * 100}ms` : "0ms"
            }}
          >
            <span>Let's Talk</span>
            <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
