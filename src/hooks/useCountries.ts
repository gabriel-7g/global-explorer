import { useState, useEffect, useRef } from 'react';
import type { Country } from '../types/country';
import { fetchAllCountries } from '../services/countries';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Evita disparo duplicado causado pelo double-invoke do StrictMode em dev,
    // que duplicava as chamadas e esgotava a cota da API.
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchAllCountries()
      .then(data => setCountries(data))
      .catch(err => {
        console.error('Error fetching countries:', err);
        setError('errorLoadingList');
      })
      .finally(() => setLoading(false));
  }, []);

  return { countries, loading, error };
}