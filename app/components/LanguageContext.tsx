'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'ID' | 'EN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (idKey: string, enKey: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ID');
  const t = (idText: string, enText: string) => {
    return lang === 'ID' ? idText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage harus digunakan di dalam LanguageProvider');
  }
  return context;
}