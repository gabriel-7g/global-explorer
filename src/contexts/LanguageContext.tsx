import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../translations';
import type { Lang, TranslationKey } from '../translations';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() =>
    (localStorage.getItem('ge-lang') as Lang) ?? 'en'
  );

  useEffect(() => {
    localStorage.setItem('ge-lang', lang);
  }, [lang]);

  const toggle = () => setLang(l => (l === 'en' ? 'pt' : 'en'));

  const t = (key: TranslationKey): string => {
    const value = translations[lang][key];
    return typeof value === 'function' ? '' : value;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
