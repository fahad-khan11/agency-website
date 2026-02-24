"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
    const pt = useTranslations("legal.privacy");

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
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
                {pt('title')}
            </h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 text-gray-300">
                <div
                    className="itrk-legaltext"
                    data-itrk-legaltext-url="https://itrk.legal/1wbE.bg.15ga-iframe.html"
                >
                    {/* The IT-Recht Kanzlei script will inject the content here */}
                </div>
            </div>

            <div className="mt-12 p-8 bg-[#00B4D9]/5 border border-[#00B4D9]/10 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {pt('sections.cookies.title')}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                    {pt('sections.cookies.text')}
                </p>
                <button
                    onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                    className="px-6 py-3 bg-[#00B4D9] hover:bg-[#0092B0] text-black font-bold rounded-xl transition-all active:scale-[0.98]"
                >
                    {pt('sections.cookies.button')}
                </button>
            </div>
        </main>
    );
}

