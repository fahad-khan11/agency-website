"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin, Twitter, Dribbble, Facebook } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Footer({ asPanel, className }: { asPanel?: boolean; className?: string }) {
   const pathname = usePathname();
   const t = useTranslations('footer');

   if (pathname === "/" && !asPanel) return null;

   return (
      <footer className={`bg-black text-white py-24 px-6 md:px-12 flex flex-col justify-between ${className || ""}`} id="global-footer">
         <div className="flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 mt-12 md:mt-0 content-center">

            {/* Brand Column */}
            <div className="md:col-span-4 flex flex-col gap-6">
               <Link href="/" className="inline-block">
                  <img
                     src="/logo/atriona-white.png"
                     alt="Atriona"
                     className=
                     "h-10 sm:h-11 md:h-12 lg:h-13 w-auto object-contain transition-opacity duration-500"
                  />
               </Link>
               <p className="text-gray-400 max-w-sm leading-relaxed text-sm md:text-base">
                  {t('description')}
               </p>
            </div>

            <div className="md:col-span-2 md:col-start-6 flex flex-col gap-4">
               <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">{t('sitemap')}</h4>
               <Link href="/" className="hover:text-[#00B4D9] transition-colors text-gray-300">{t('home')}</Link>
               <Link href="/about" className="hover:text-[#00B4D9] transition-colors text-gray-300">{t('about')}</Link>
               <Link href="/projects" className="hover:text-[#00B4D9] transition-colors text-gray-300">{t('work')}</Link>
               <Link href="/services" className="hover:text-[#00B4D9] transition-colors text-gray-300">{t('services')}</Link>
               <Link href="/contact" className="hover:text-[#00B4D9] transition-colors text-gray-300">{t('contact')}</Link>
            </div>

            {/* Socials Column */}
            <div className="md:col-span-2 flex flex-col gap-4">
               <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">{t('socials')}</h4>
               <Link target="_blank" href="https://www.facebook.com/atrionadigital" className="hover:text-[#00B4D9] transition-colors text-gray-300 flex items-center gap-2 group">
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
               </Link>
               <Link target="_blank" href="#" className="hover:text-[#00B4D9] transition-colors text-gray-300 flex items-center gap-2 group">
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
               </Link>
               <Link target="_blank" href="#" className="hover:text-[#00B4D9] transition-colors text-gray-300 flex items-center gap-2 group">
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
               </Link>
               <Link target="_blank" href="#" className="hover:text-[#00B4D9] transition-colors text-gray-300 flex items-center gap-2 group">
                  <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Twitter</span>
               </Link>

            </div>

            {/* Contact Column */}
            <div className="md:col-span-4 flex flex-col gap-6">
               <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">{t('getInTouch')}</h4>
               <a href="mailto:info@atriona-digital.com" className="text-2xl md:text-2xl font-display font-bold hover:text-[#00b8db] transition-colors whitespace-nowrap">
                  info@atriona-digital.com
               </a>
               <div className="text-gray-400 text-sm leading-relaxed">
                  <p>Ohiostraße 15</p>
                  <p>76149 Karlsruhe</p>
               </div>
            </div>
         </div>

         <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 text-sm text-gray-500">
            <p>{t('rights')}</p>

            <div className="flex gap-6 mt-4 md:mt-0">
               <Link href="https://www.facebook.com/atrionadigital" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" aria-label="Facebook" target="_blank">
                  <Facebook className="w-5 h-5" />
               </Link>
               <Link href="#" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" aria-label="Instagram" target="_blank">
                  <Instagram className="w-5 h-5" />
               </Link>

               <Link href="#" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" aria-label="LinkedIn" target="_blank">
                  <Linkedin className="w-5 h-5" />
               </Link>
               <Link href="#" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" aria-label="Twitter" target="_blank">
                  <Twitter className="w-5 h-5" />
               </Link>
            </div>
         </div>
      </footer >
   );
}
