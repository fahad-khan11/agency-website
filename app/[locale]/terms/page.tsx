"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function TermsPage() {
    const t = useTranslations("nav"); // Using nav translations for title if available or default

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
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-8 uppercase tracking-tight">
                Terms & Conditions
            </h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 text-gray-300">
                <div
                    className="itrk-legaltext"
                    data-itrk-legaltext-url="PASTE_AGB_URL_HERE"
                >
                    {/* The IT-Recht Kanzlei script will inject the content here */}
                </div>
            </div>
        </main>
    );
}
