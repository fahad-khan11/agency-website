"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPage() {
    const t = useTranslations("cookies");

    return (
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
                {t('banner.privacyPolicy')} / Datenschutzerklärung
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>
                    <p>
                        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Cookies & Einwilligung</h2>
                    <p>
                        Diese Website verwendet Cookies. Einige sind essenziell, andere helfen uns, das Nutzererlebnis zu verbessern.
                        Sie können Ihre Einstellungen jederzeit über den Link "Cookie-Einstellungen" im Footer anpassen.
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                        className="text-[#00B4D9] underline underline-offset-4 font-bold"
                    >
                        Cookie-Einstellungen jetzt anpassen
                    </button>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Ihre Rechte</h2>
                    <p>
                        Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten (Art. 15-18 DSGVO).
                    </p>
                </section>

                <p className="text-sm text-gray-500 mt-12">
                    Dies ist eine Platzhalter-Seite. Bitte stellen Sie sicher, dass eine vollständige und rechtlich geprüfte Datenschutzerklärung implementiert wird.
                </p>
            </div>
        </main>
    );
}
