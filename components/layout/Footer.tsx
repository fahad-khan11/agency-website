"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useTranslations } from 'next-intl';
import LocaleLink from '../LocaleLink';

const XingIcon = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.188 0c-.517 0-.741.325-.927.66L9.559 14.317c-.003.006-.003.011 0 .017l4.919 9.023c.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-13.657c-.003-.006-.003-.011 0-.017L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.144-.096.339 0 .533l2.34 4.114c.003.006.003.011 0 .017L1.812 16.3c-.09.163-.092.361 0 .514.088.152.247.228.455.228h3.483c.517 0 .74-.324.926-.658 0 0 3.75-6.505 3.882-6.736-.01-.02-2.454-4.218-2.454-4.218-.17-.308-.444-.648-.974-.648H3.648z" />
   </svg>
);

export default function Footer({ asPanel, className }: { asPanel?: boolean; className?: string }) {
   const pathname = usePathname();
   const t = useTranslations('footer');
   const tc = useTranslations('cookies');

   if (pathname === "/" && !asPanel) return null;

   return (
      <footer className={`bg-black text-white py-6 md:py-10 px-6 md:px-12 flex flex-col justify-between overflow-y-auto no-scrollbar inner-panel-scroll ${className || ""}`} id="global-footer">
         <div className="flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 lg:gap-x-12 mb-8 mt-2 md:mt-0 content-center">

            {/* Brand Column */}
            <div className="md:col-span-3 flex flex-col gap-4">
               <Link href="/" className="inline-block">
                  <img
                     src="/logo/atriona-white.png"
                     alt="Atriona"
                     className="h-7 md:h-9 w-auto object-contain transition-opacity duration-500"
                  />
               </Link>
               <p className="text-gray-400 max-w-xs leading-relaxed text-xs">
                  {t('description')}
               </p>
            </div>

            {/* Sitemap Column */}
            <div className="md:col-span-4 md:col-start-5 flex flex-col gap-3">
               <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('sitemap')}</h4>
               <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex flex-col gap-2">
                     <LocaleLink href="/" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('home')}</LocaleLink>
                     <LocaleLink href="/about" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('about')}</LocaleLink>
                     <LocaleLink href="/projects" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('work')}</LocaleLink>
                     <LocaleLink href="/services" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('services')}</LocaleLink>
                  </div>
                  <div className="flex flex-col gap-2">
                     <LocaleLink href="/case-studies" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('caseStudies')}</LocaleLink>
                     <LocaleLink href="/blog" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('blogs')}</LocaleLink>
                     <LocaleLink href="/faq" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('faq')}</LocaleLink>
                     <LocaleLink href="/contact" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs">{t('contact')}</LocaleLink>
                  </div>
               </div>
            </div>

            {/* Socials Column - 2 Column on Mobile */}
            <div className="md:col-span-2 flex flex-col gap-3">
               <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('socials')}</h4>
               <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  <Link target="_blank" href="https://www.facebook.com/atriona.digital" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs flex items-center gap-2 group">
                     <Facebook className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                     <span>Facebook</span>
                  </Link>
                  <Link target="_blank" href="https://www.instagram.com/atriona.digital" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs flex items-center gap-2 group">
                     <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                     <span>Instagram</span>
                  </Link>
                  <Link target="_blank" href="https://www.xing.com/pages/atriona-digital-gmbh" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs flex items-center gap-2 group">
                     <XingIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                     <span>Xing DE</span>
                  </Link>
                  <Link target="_blank" href="https://x.com/atriona_digital" className="hover:text-[#00B4D9] transition-colors text-gray-400 text-xs flex items-center gap-2 group">
                     <Twitter className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                     <span>Twitter</span>
                  </Link>
               </div>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-3 flex flex-col gap-4">
               <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('getInTouch')}</h4>
               <a href="mailto:info@atriona-digital.com" className="text-base md:text-lg font-display font-bold hover:text-[#00b8db] transition-colors break-all">
                  info@atriona-digital.com
               </a>
               <div className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                  <p>Ohiostraße 15, 76149 Karlsruhe</p>
                  <p className="mt-1 text-[#00b8db] hover:text-white transition-colors">
                     <a href="tel:+4972198618928">+49 (0) 721 98618928</a>
                  </p>
               </div>
            </div>
         </div>

         <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-4 text-[10px] text-gray-500">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
               <p>{t('rights')}</p>
               <div className="flex gap-4 md:gap-6">
                  <LocaleLink href="/imprint" className="hover:text-white transition-colors">{tc('imprint')}</LocaleLink>
                  <LocaleLink href="/DataProtectionDeclaration" className="hover:text-white transition-colors">{tc('banner.privacyPolicy')}</LocaleLink>
                  <button
                     onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                     className="hover:text-white transition-colors cursor-pointer"
                  >
                     {tc('footerLink')}
                  </button>
               </div>
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
               <Link href="https://www.facebook.com/atriona.digital" className="hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full" aria-label="Facebook" target="_blank">
                  <Facebook className="w-4 h-4" />
               </Link>
               <Link href="https://www.instagram.com/atriona.digital" className="hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full" aria-label="Instagram" target="_blank">
                  <Instagram className="w-4 h-4" />
               </Link>
               <Link href="https://www.xing.com/pages/atriona-digital-gmbh" className="hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full" aria-label="Xing" target="_blank">
                  <XingIcon className="w-4 h-4" />
               </Link>
               <Link href="https://x.com/atriona_digital" className="hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full" aria-label="Twitter" target="_blank">
                  <Twitter className="w-4 h-4" />
               </Link>
            </div>
         </div>
      </footer >

   );
}
