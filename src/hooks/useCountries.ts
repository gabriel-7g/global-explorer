import { useState, useEffect } from 'react';
import type { Country } from '../types/country';
import { fetchAllCountries } from '../services/countries';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
