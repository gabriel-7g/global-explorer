import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { DetailedCountry, BorderCountry, AiContent } from '../types/country';
import { fetchCountryByName, fetchCountriesByCodes } from '../services/countries';
import { GEMINI_MODEL } from '../constants/api';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export function useCountryDetail(name: string | undefined) {
  const { lang } = useLanguage();
  const [country, setCountry] = useState<DetailedCountry | null>(null);
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiContent, setAiContent] = useState<AiContent | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(null);
    setCountry(null);
    setBorderCountries([]);

    fetchCountryByName(name)
      .then(data => {
        setCountry(data);
        if (data.borders && data.borders.length > 0) {
          fetchCountriesByCodes(data.borders)
            .then(borders => setBorderCountries(borders))
            .catch(() => {});
        }
      })
      .catch(err => {
        console.error('Error fetching country:', err);
        setError('countryNotFound');
      })
      .finally(() => setLoading(false));
  }, [name]);

  useEffect(() => {
    setAiContent(null);
  }, [lang]);

  const fetchAIInfo = async () => {
    if (!country) return;
    setLoadingAI(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        generationConfig: { responseMimeType: 'application/json' },
      });
      const prompt = translations[lang].aiPrompt(country.name.common);
      const result = await model.generateContent(prompt);
      setAiContent(JSON.parse(result.response.text()));
    } catch {
      setAiContent({
        info: translations[lang].couldNotLoad,
        curiosities: [translations[lang].tryAgain],
      });
    } finally {
      setLoadingAI(false);
    }
  };

  return { country, borderCountries, loading, error, aiContent, loadingAI, fetchAIInfo };
}
