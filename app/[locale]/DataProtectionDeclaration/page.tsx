"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function PrivacyPage() {
    const pt = useTranslations("legal.privacy");
    const locale = useLocale();

    // Mapping IT-Recht Kanzlei URLs based on current locale
    const itrkUrls: Record<string, string> = {
        de: "https://itrk.legal/1wbE.bg.15ga-iframe.html",
        en: "https://itrk.legal/1wbE.bg.15ga-en-iframe.html",
    };

    const legalUrl = itrkUrls[locale] || itrkUrls.de;

    useEffect(() => {
        const scriptId = "itrk-legaltext-script";
        const existingScript = document.getElementById(scriptId);

        if (!existingScript) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://www.it-recht-kanzlei.de/js/itrk-legaltext.js";
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <main className="pt-40 pb-24 px-4 sm:px-6 md:px-12 max-w-5xl w-full mx-auto min-h-screen overflow-x-hidden">
            {/* Inject global styles for the embedded content directly */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .itrk-legaltext-wrapper h1 {
                    font-size: 3.5rem !important;
                    font-weight: 800 !important;
                    margin-bottom: 2.5rem !important;
                    line-height: 1.1 !important;
                    color: #000 !important;
                    border-bottom: 3px solid #00B4D9;
                    padding-bottom: 1.5rem;
                    word-break: break-word !important;
                }
                .itrk-legaltext-wrapper h2 {
                    font-size: 2.25rem !important;
                    font-weight: 700 !important;
                    margin-top: 4.5rem !important;
                    margin-bottom: 1.5rem !important;
                    line-height: 1.2 !important;
                    color: #000 !important;
                    word-break: break-word !important;
                }
                .itrk-legaltext-wrapper h3 {
                    font-size: 1.75rem !important;
                    font-weight: 700 !important;
                    margin-top: 3rem !important;
                    color: #111 !important;
                    word-break: break-word !important;
                }
                .itrk-legaltext-wrapper p, 
                .itrk-legaltext-wrapper li, 
                .itrk-legaltext-wrapper div {
                    font-size: 1.25rem !important;
                    line-height: 1.8 !important;
                    color: #333 !important;
                    margin-bottom: 1.75rem !important;
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                }
                .itrk-legaltext-wrapper ul, 
                .itrk-legaltext-wrapper ol {
                    margin-bottom: 2.5rem !important;
                    padding-left: 2rem !important;
                }
                .itrk-legaltext-wrapper iframe {
                    width: 100% !important;
                    border: none !important;
                    min-height: 1200px !important;
                    background: white !important;
                }
                @media (max-width: 768px) {
                    .itrk-legaltext-wrapper h1 {
                        font-size: 1.75rem !important;
                        margin-bottom: 1.25rem !important;
                        padding-bottom: 1rem;
                    }
                    .itrk-legaltext-wrapper h2 {
                        font-size: 1.35rem !important;
                        margin-top: 2.5rem !important;
                        margin-bottom: 0.75rem !important;
                    }
                    .itrk-legaltext-wrapper h3 {
                        font-size: 1.15rem !important;
                        margin-top: 2rem !important;
                    }
                    .itrk-legaltext-wrapper p,
                    .itrk-legaltext-wrapper li,
                    .itrk-legaltext-wrapper div {
                        font-size: 0.95rem !important;
                        line-height: 1.7 !important;
                        margin-bottom: 1rem !important;
                    }
                    .itrk-legaltext-wrapper ul,
                    .itrk-legaltext-wrapper ol {
                        padding-left: 1.25rem !important;
                        margin-bottom: 1.5rem !important;
                    }
                    .itrk-legaltext-wrapper iframe {
                        min-height: 800px !important;
                    }
                }
            `}} />

            <header className="mb-20 text-center md:text-left">
                <div className="inline-block px-5 py-2 mb-8 rounded-full bg-[#00B4D9]/10 border border-[#00B4D9]/20 text-[#00B4D9] text-sm font-bold uppercase tracking-[0.3em]">
                    Transparency / {locale === 'de' ? 'Datenschutz' : 'Privacy'}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-display mb-8 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter leading-[0.95] md:leading-[0.9]">
                    {pt('title')}
                </h1>
                <div className="h-2 w-40 bg-[#00B4D9] rounded-full mx-auto md:mx-0 shadow-[0_0_30px_rgba(0,180,217,0.5)]" />
            </header>

            <div className="relative">
                {/* Decorative glows */}
                <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-[#00B4D9]/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-2 md:p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="bg-white rounded-[1.6rem] sm:rounded-[2.5rem] md:rounded-[3.2rem] overflow-hidden min-h-[900px]">
                        <div className="itrk-legaltext-wrapper p-5 sm:p-8 md:p-20 lg:p-28">
                            {/* Manual Heading to ensure it looks great regardless of script behavior */}


                            <div
                                className="itrk-legaltext"
                                data-itrk-legaltext-url={legalUrl}
                            >
                                {/* Loading State */}
                                <div className="flex flex-col gap-10 animate-pulse">
                                    <div className="space-y-4">
                                        <div className="h-6 bg-gray-100 rounded-full w-full"></div>
                                        <div className="h-6 bg-gray-100 rounded-full w-full"></div>
                                        <div className="h-6 bg-gray-100 rounded-full w-4/5"></div>
                                    </div>
                                    <div className="h-12 bg-gray-200 rounded-2xl w-1/2 mt-10"></div>
                                    <div className="space-y-4">
                                        <div className="h-6 bg-gray-100 rounded-full w-full"></div>
                                        <div className="h-6 bg-gray-100 rounded-full w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cookie Policy Interaction */}
            <div className="mt-32 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D9]/20 via-transparent to-[#0092B0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative p-6 sm:p-10 md:p-20 bg-white/[0.02] border border-white/5 rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] backdrop-blur-3xl transition-all duration-700 hover:border-[#00B4D9]/30">
                    <div className="flex flex-col items-center text-center gap-10">
                        <div className="max-w-4xl">
                            <div className="flex flex-col items-center gap-8 mb-10">
                                <div className="p-6 bg-[#00B4D9] rounded-[2rem] shadow-2xl shadow-[#00B4D9]/40 transform group-hover:rotate-12 transition-transform duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white font-display tracking-tighter">
                                    {pt('sections.cookies.title')}
                                </h2>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto bg-gradient-to-br from-gray-300 to-gray-600 bg-clip-text text-transparent mb-12">
                                {pt('sections.cookies.text')}
                            </p>
                        </div>

                        <button
                            onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                            className="group/btn relative px-8 sm:px-16 py-5 sm:py-8 bg-[#00B4D9] hover:bg-white text-black font-black uppercase tracking-[0.15em] sm:tracking-[0.3em] text-sm rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-700 shadow-[0_20px_60px_-10px_rgba(0,180,217,0.6)] hover:shadow-white/20 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-5">
                                {pt('sections.cookies.button')}
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-3 transition-transform duration-500"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

