import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { zhCN, type Translations } from './zh-CN';
import { en } from './en';

export type Language = 'zh-CN' | 'en';

const translations: Record<Language, Translations> = {
    'zh-CN': zhCN,
    'en': en,
};

interface I18nContextType {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'insightsnap-language';

// Detect browser language
const detectBrowserLanguage = (): Language => {
    if (typeof navigator === 'undefined') return 'zh-CN';

    const browserLang = navigator.language || (navigator as any).userLanguage;
    // If browser language starts with 'zh', use Chinese, otherwise English
    return browserLang?.startsWith('zh') ? 'zh-CN' : 'en';
};

// Get initial language from storage or browser
const getInitialLanguage = (): Language => {
    if (typeof localStorage === 'undefined') return 'zh-CN';

    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === 'zh-CN' || stored === 'en')) {
        return stored;
    }
    return detectBrowserLanguage();
};

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(STORAGE_KEY, lang);
        // Update HTML lang attribute
        document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN');
    }, [language, setLanguage]);

    // Set initial HTML lang attribute
    useEffect(() => {
        document.documentElement.lang = language === 'zh-CN' ? 'zh-CN' : 'en';
    }, [language]);

    const value: I18nContextType = {
        language,
        t: translations[language],
        setLanguage,
        toggleLanguage,
    };

    return React.createElement(I18nContext.Provider, { value }, children);
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

// Export types
export type { Translations };
