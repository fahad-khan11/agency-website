"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPage() {
    const pt = useTranslations("legal.privacy");
    const ct = useTranslations("cookies");

    return (
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
                {pt('title')}
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {pt('sections.glance.title')}
                    </h2>
                    <p>
                        {pt('sections.glance.text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {pt('sections.cookies.title')}
                    </h2>
                    <p>
                        {pt('sections.cookies.text')}
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                        className="text-[#00B4D9] underline underline-offset-4 font-bold"
                    >
                        {pt('sections.cookies.button')}
                    </button>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {pt('sections.rights.title')}
                    </h2>
                    <p>
                        {pt('sections.rights.text')}
                    </p>
                </section>
            </div>
        </main>
    );
}
