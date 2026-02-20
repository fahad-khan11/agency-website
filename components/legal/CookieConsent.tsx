"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, ShieldCheck, BarChart3, Target, MousePointer2 } from "lucide-react";
import Link from "next/link";

interface ConsentSettings {
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
}

const STORAGE_KEY = "atriona_cookie_consent";

export default function CookieConsent() {
    const t = useTranslations("cookies");
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [settings, setSettings] = useState<ConsentSettings>({
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            setShowBanner(true);
        } else {
            try {
                const parsed = JSON.parse(saved);
                setSettings(parsed);
            } catch (e) {
                setShowBanner(true);
            }
        }

        // Listen for manual open request (e.g. from footer)
        const handleOpen = () => setShowModal(true);
        window.addEventListener("openCookieSettings", handleOpen);
        return () => window.removeEventListener("openCookieSettings", handleOpen);
    }, []);

    const saveConsent = (newSettings: ConsentSettings) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
        setSettings(newSettings);
        setShowBanner(false);
        setShowModal(false);

        // Trigger event for other components (e.g. Google Analytics)
        window.dispatchEvent(new CustomEvent("cookieConsentUpdate", { detail: newSettings }));
    };

    const handleAcceptAll = () => {
        saveConsent({
            essential: true,
            functional: true,
            analytics: true,
            marketing: true,
        });
    };

    const handleRejectNonEssential = () => {
        saveConsent({
            essential: true,
            functional: false,
            analytics: false,
            marketing: false,
        });
    };

    if (typeof window === 'undefined') return null;

    return (
        <>
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[9999]"
                    >
                        <div className="bg-[#111]/80 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl text-white">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2.5 bg-[#00B4D9]/20 rounded-xl">
                                    <Cookie className="w-6 h-6 text-[#00B4D9]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold font-display leading-tight">{t('banner.title')}</h3>
                                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                                        {t('banner.description')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-6">
                                <button
                                    onClick={handleAcceptAll}
                                    className="w-full py-3.5 px-4 bg-[#00B4D9] hover:bg-[#0092B0] text-black font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-[#00B4D9]/20"
                                >
                                    {t('banner.acceptAll')}
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleRejectNonEssential}
                                        className="py-3 px-4 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all uppercase tracking-wider"
                                    >
                                        {t('banner.rejectAll')}
                                    </button>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="py-3 px-4 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                                    >
                                        <Settings className="w-3.5 h-3.5" />
                                        {t('banner.customize')}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-white/5 flex justify-center">
                                <Link href="/privacy" className="text-[10px] md:text-xs text-gray-500 hover:text-[#00B4D9] transition-colors uppercase tracking-[0.2em]">
                                    {t('banner.privacyPolicy')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-6 md:p-10 flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold font-display text-white tracking-tight">{t('modal.title')}</h2>
                                    <p className="text-sm text-gray-500 mt-2 max-w-md leading-relaxed">{t('modal.description')}</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-3 bg-white/5 hover:bg-white/10 hover:rotate-90 rounded-2xl transition-all duration-300"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-6 space-y-4">
                                <CookieCategory
                                    icon={<ShieldCheck className="w-5 h-5 text-[#00B4D9]" />}
                                    title={t('modal.categories.essential.title')}
                                    description={t('modal.categories.essential.description')}
                                    enabled={true}
                                    disabled={true}
                                    onChange={() => { }}
                                    statusText={t('modal.categories.essential.status')}
                                />
                                <CookieCategory
                                    icon={<MousePointer2 className="w-5 h-5 text-purple-400" />}
                                    title={t('modal.categories.functional.title')}
                                    description={t('modal.categories.functional.description')}
                                    enabled={settings.functional}
                                    onChange={(val) => setSettings({ ...settings, functional: val })}
                                />
                                <CookieCategory
                                    icon={<BarChart3 className="w-5 h-5 text-green-400" />}
                                    title={t('modal.categories.analytics.title')}
                                    description={t('modal.categories.analytics.description')}
                                    enabled={settings.analytics}
                                    onChange={(val) => setSettings({ ...settings, analytics: val })}
                                />
                                <CookieCategory
                                    icon={<Target className="w-5 h-5 text-red-500" />}
                                    title={t('modal.categories.marketing.title')}
                                    description={t('modal.categories.marketing.description')}
                                    enabled={settings.marketing}
                                    onChange={(val) => setSettings({ ...settings, marketing: val })}
                                />

                                <div className="bg-[#00B4D9]/5 border border-[#00B4D9]/10 p-5 rounded-2xl mt-8">
                                    <p className="text-xs text-gray-400 leading-relaxed italic">
                                        {t('modal.legalNote')}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 md:p-10 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => saveConsent(settings)}
                                    className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/10 transition-all active:scale-[0.98]"
                                >
                                    {t('modal.save')}
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 py-4 bg-[#00B4D9] hover:bg-[#0092B0] text-black font-bold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-[#00B4D9]/20"
                                >
                                    {t('banner.acceptAll')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

function CookieCategory({
    icon,
    title,
    description,
    enabled,
    disabled = false,
    onChange,
    statusText
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    enabled: boolean;
    disabled?: boolean;
    onChange: (val: boolean) => void;
    statusText?: string;
}) {
    return (
        <div className={`flex gap-5 p-5 rounded-3xl transition-all duration-300 border ${enabled ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5'}`}>
            <div className={`p-3 h-fit rounded-2xl ${enabled ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                    <h4 className={`text-lg font-bold font-display ${enabled ? 'text-white' : 'text-gray-500'}`}>{title}</h4>
                    {disabled ? (
                        <span className="text-[10px] uppercase tracking-wider font-black text-[#00B4D9] bg-[#00B4D9]/10 px-3 py-1.5 rounded-full">
                            {statusText}
                        </span>
                    ) : (
                        <button
                            onClick={() => onChange(!enabled)}
                            className="relative inline-flex items-center cursor-pointer group"
                        >
                            <div className={`w-14 h-8 rounded-full transition-all duration-300 p-1 ${enabled ? 'bg-[#00B4D9]' : 'bg-white/5 border border-white/10'}`}>
                                <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </button>
                    )}
                </div>
                <p className={`text-sm leading-relaxed ${enabled ? 'text-gray-400' : 'text-gray-600'}`}>
                    {description}
                </p>
            </div>
        </div>
    );
}
