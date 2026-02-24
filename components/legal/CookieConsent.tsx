"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, ShieldCheck, BarChart3, Target, MousePointer2 } from "lucide-react";
import Link from "next/link";
import LocaleLink from "../LocaleLink";

interface ConsentSettings {
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
    timestamp?: number;
}

const STORAGE_KEY = "atriona_cookie_consent";
const EXPIRY_TIME = 180 * 24 * 60 * 60 * 1000; // 6 months (180 days) in milliseconds

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
                const parsed = JSON.parse(saved) as ConsentSettings;
                const now = Date.now();

                // Check if consent has expired
                if (parsed.timestamp && (now - parsed.timestamp) > EXPIRY_TIME) {
                    localStorage.removeItem(STORAGE_KEY);
                    setShowBanner(true);
                } else {
                    setSettings(parsed);
                }
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
        const settingsWithTimestamp = {
            ...newSettings,
            timestamp: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsWithTimestamp));
        setSettings(settingsWithTimestamp);
        setShowBanner(false);
        setShowModal(false);

        // Trigger event for other components (e.g. Google Analytics)
        window.dispatchEvent(new CustomEvent("cookieConsentUpdate", { detail: settingsWithTimestamp }));
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
                        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-9999"
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
                                <LocaleLink href="/DataProtectionDeclaration" className="text-[10px] md:text-xs text-gray-500 hover:text-[#00B4D9] transition-colors uppercase tracking-[0.2em]" title="Datenschutzerklärung & Impressum">
                                    {t('banner.privacyPolicy')} & Impressum
                                </LocaleLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
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
                            className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="p-4 md:p-6 flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-bold font-display text-white tracking-tight">{t('modal.title')}</h2>
                                    <p className="text-[10px] text-gray-500 mt-1 max-w-xs leading-relaxed">{t('modal.description')}</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1.5 bg-white/5 hover:bg-white/10 hover:rotate-90 rounded-lg transition-all duration-300"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="flex-1 px-4 md:px-6 pb-3 space-y-2">
                                <CookieCategory
                                    icon={<ShieldCheck className="w-3.5 h-3.5 text-[#00B4D9]" />}
                                    title={t('modal.categories.essential.title')}
                                    description={t('modal.categories.essential.description')}
                                    enabled={true}
                                    disabled={true}
                                    onChange={() => { }}
                                    statusText={t('modal.categories.essential.status')}
                                />
                                <CookieCategory
                                    icon={<MousePointer2 className="w-3.5 h-3.5 text-purple-400" />}
                                    title={t('modal.categories.functional.title')}
                                    description={t('modal.categories.functional.description')}
                                    enabled={settings.functional}
                                    onChange={(val) => setSettings({ ...settings, functional: val })}
                                />
                                <CookieCategory
                                    icon={<BarChart3 className="w-3.5 h-3.5 text-green-400" />}
                                    title={t('modal.categories.analytics.title')}
                                    description={t('modal.categories.analytics.description')}
                                    enabled={settings.analytics}
                                    onChange={(val) => setSettings({ ...settings, analytics: val })}
                                />
                                <CookieCategory
                                    icon={<Target className="w-3.5 h-3.5 text-red-500" />}
                                    title={t('modal.categories.marketing.title')}
                                    description={t('modal.categories.marketing.description')}
                                    enabled={settings.marketing}
                                    onChange={(val) => setSettings({ ...settings, marketing: val })}
                                />

                                <div className="bg-[#00B4D9]/5 border border-[#00B4D9]/10 p-3 rounded-lg mt-2 flex flex-col gap-1.5">
                                    <p className="text-[9px] text-gray-500 leading-relaxed italic">
                                        {t('modal.legalNote')}
                                    </p>
                                    <LocaleLink
                                        href="/DataProtectionDeclaration"
                                        className="text-[9px] text-[#00B4D9] hover:underline font-bold uppercase tracking-wider flex items-center gap-1.5"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <ShieldCheck className="w-2.5 h-2.5" />
                                        {t('banner.privacyPolicy')} & Impressum
                                    </LocaleLink>
                                </div>
                            </div>

                            <div className="p-4 md:p-6 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => saveConsent(settings)}
                                    className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg border border-white/10 transition-all active:scale-[0.98]"
                                >
                                    {t('modal.save')}
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 py-1.5 bg-[#00B4D9] hover:bg-[#0092B0] text-black text-[10px] font-bold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-[#00B4D9]/20"
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
        <div className={`flex gap-2.5 p-3 rounded-xl transition-all duration-300 border ${enabled ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5'}`}>
            <div className={`p-1.5 h-fit rounded-lg ${enabled ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                    <h4 className={`text-sm font-bold font-display ${enabled ? 'text-white' : 'text-gray-500'}`}>{title}</h4>
                    {disabled ? (
                        <span className="text-[8px] uppercase tracking-wider font-black text-[#00B4D9] bg-[#00B4D9]/10 px-2 py-0.5 rounded-full">
                            {statusText}
                        </span>
                    ) : (
                        <button
                            onClick={() => onChange(!enabled)}
                            className="relative inline-flex items-center cursor-pointer group"
                        >
                            <div className={`w-8 h-4.5 rounded-full transition-all duration-300 p-0.5 ${enabled ? 'bg-[#00B4D9]' : 'bg-white/5 border border-white/10'}`}>
                                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-all duration-300 transform ${enabled ? 'translate-x-3.5' : 'translate-x-0'}`} />
                            </div>
                        </button>
                    )}
                </div>
                <p className={`text-[10px] leading-snug ${enabled ? 'text-gray-400' : 'text-gray-600'}`}>
                    {description}
                </p>
            </div>
        </div>
    );
}
