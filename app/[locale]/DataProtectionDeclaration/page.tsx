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

                <section className="bg-white/5 border border-white/10 rounded-2xl p-8 !mt-12">
                    <h2 className="text-3xl font-display font-bold text-white mb-6">Impressum / Anbieterkennzeichnung</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-lg font-bold text-[#00B4D9] mb-4 uppercase tracking-wider">Unternehmensangaben</h3>
                            <div className="space-y-2 text-gray-200">
                                <p><strong className="text-white">Firma:</strong> ATRIONA Digital GmbH</p>
                                <p><strong className="text-white">Adresse:</strong> Ohiostraße 15, 76149 Karlsruhe</p>
                                <p><strong className="text-white">Registergericht:</strong> Amtsgericht Mannheim</p>
                                <p><strong className="text-white">Handelsregister:</strong> Neu</p>
                                <p><strong className="text-white">Vertreten durch:</strong> Stefano Ala</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[#00B4D9] mb-4 uppercase tracking-wider">Kontakt</h3>
                            <div className="space-y-2 text-gray-200">
                                <p><strong className="text-white">Telefon:</strong> +49 (0) 721 98618928</p>
                                <p><strong className="text-white">E-Mail:</strong> info@atriona-digital.com</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[#00B4D9] mb-4 uppercase tracking-wider">Redaktionell verantwortlich</h3>
                            <div className="space-y-2 text-gray-200">
                                <p>Stefano Ala</p>
                                <p>Ohiostraße 15</p>
                                <p>76149 Karlsruhe</p>
                                <p><strong className="text-white">Telefon:</strong> +49 721 98618928</p>
                                <p><strong className="text-white">E-Mail:</strong> stefano.ala@atriona-digital.com</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[#00B4D9] mb-4 uppercase tracking-wider">Verbraucherstreitbeilegung</h3>
                            <p className="text-gray-200 leading-relaxed">
                                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
