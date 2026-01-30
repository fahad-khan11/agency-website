"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import clsx from "clsx";
import { usePanel } from "@/lib/PanelContext";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
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

  const handleNavClick = (e: React.MouseEvent, item: { label: string; href: string; panelIndex?: number }) => {
     if (isHome && item.panelIndex !== undefined) {
         e.preventDefault();
         navigateToPanel(item.panelIndex);
     }
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 md:px-12 py-6 flex justify-between items-center",
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group z-50" onClick={(e) => handleNavClick(e, { label: "Home", href: "/", panelIndex: 0 })}>
         <div className="relative flex items-baseline">
           <span className={clsx(
              "font-extrabold font-sans tracking-[0.1em] text-2xl transition-colors duration-500",
              isLightMode ? "text-black" : "text-white"
           )}>AT</span>
           <span className={clsx(
              "font-extrabold font-sans italic tracking-[0.1em] text-3xl transition-colors duration-500",
              isLightMode ? "text-black" : "text-white"
           )}>RIO</span>
           <span className={clsx(
              "font-extrabold font-sans tracking-[0.1em] text-2xl transition-colors duration-500",
              isLightMode ? "text-black" : "text-white"
           )}>NA</span>
           <span className="w-2 h-2 rounded-full bg-brand-orange absolute -top-1 -right-2"></span>
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
                "text-sm font-medium uppercase tracking-wider transition-colors relative group",
                isLightMode 
                    ? "text-gray-600 hover:text-black" 
                    : "text-gray-300 hover:text-white"
            )}
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* CTA Button */}
      <Link 
        href="/contact" 
        onClick={(e) => handleNavClick(e, navItems[3])}
        className={clsx(
            "hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide group px-5 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 z-50",
            isLightMode 
                ? "bg-black text-white" 
                : "bg-white text-black"
        )}
      >
        <span>Let's Talk</span>
        <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
      </Link>

      {/* Mobile Menu Toggle (Simplified) */}
      <button className={clsx(
          "md:hidden mix-blend-difference transition-colors duration-300",
          isLightMode ? "text-black" : "text-white"
      )}>
        Menu
      </button>
    </header>
  );
}
