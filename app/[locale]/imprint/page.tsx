"use client";

import { useTranslations } from "next-intl";

export default function ImprintPage() {
    const t = useTranslations("legal.imprint");

    return (
        <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
                {t('title')}
            </h1>

            <div className="prose prose-invert max-w-none space-y-12 text-gray-300">
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-3xl font-display font-bold text-white mb-6 underline underline-offset-8 decoration-[#00B4D9]">
                        {t('sections.company.title')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#00B4D9] mb-2 uppercase tracking-wider">
                                    {t('sections.company.labels.name')}
                                </h3>
                                <p className="text-white text-xl">
                                    {t('sections.company.values.name')}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#00B4D9] mb-2 uppercase tracking-wider">
                                    {t('sections.company.labels.address')}
                                </h3>
                                <p className="text-white whitespace-pre-line">
                                    {t('sections.company.values.address')}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#00B4D9] mb-2 uppercase tracking-wider">
                                    {t('sections.company.labels.register')}
                                </h3>
                                <p className="text-white whitespace-pre-line">
                                    {t('sections.company.values.register')}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#00B4D9] mb-2 uppercase tracking-wider">
                                    {t('sections.company.labels.representation')}
                                </h3>
                                <p className="text-white">
                                    {t('sections.company.values.representation')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">
                            {t('sections.contact.title')}
                        </h2>
                        <div className="space-y-4 text-gray-200">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                    {t('sections.contact.labels.phone')}
                                </span>
                                <a href="tel:+4972198618928" className="text-white hover:text-[#00B4D9] transition-colors">+49 (0) 721 98618928</a>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                    {t('sections.contact.labels.email')}
                                </span>
                                <a href="mailto:info@atriona-digital.com" className="text-white hover:text-[#00B4D9] transition-colors">info@atriona-digital.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">
                            {t('sections.editorial.title')}
                        </h2>
                        <div className="space-y-1 text-gray-200">
                            <p className="text-white font-bold mb-2">Stefano Ala</p>
                            <p>Ohiostraße 15</p>
                            <p>76149 Karlsruhe</p>
                            <p className="mt-4">
                                <span className="text-gray-500 text-xs font-bold uppercase mr-2">
                                    {t('sections.editorial.labels.email')}:
                                </span>
                                stefano.ala@atriona-digital.com
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-display font-bold text-white mb-6">
                        {t('sections.dispute.title')}
                    </h2>
                    <p className="text-gray-300 leading-relaxed italic">
                        "{t('sections.dispute.text')}"
                    </p>
                    <p className="mt-6 text-sm text-gray-500">
                        {t('sections.dispute.note')}
                    </p>
                </section>
            </div>
        </main>
    );
}
