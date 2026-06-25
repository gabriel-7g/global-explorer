import type { Country, DetailedCountry, BorderCountry } from '../types/country';
import { API_BASE } from '../constants/api';

const API_KEY = import.meta.env.VITE_API_KEY;

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${API_KEY}` };
}

export async function fetchAllCountries(): Promise<Country[]> {
  const PAGE_SIZE = 100; // teto do plano free; planos pagos suportam até 500
  const fields = 'names.common,flag.url_svg,flag.description,population,continents,subregion';
  const all: Country[] = [];
  let offset = 0;

  while (true) {
    const res = await fetch(
      `${API_BASE}?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${fields}`,
      { headers: authHeaders() }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const objects = data.data.objects as Country[];
    all.push(...objects);

    if (!data.data.meta?.more) break;
    offset += PAGE_SIZE;
  }

  return all;
}

export async function fetchCountryByName(name: string): Promise<DetailedCountry> {
  const res = await fetch(`${API_BASE}/names.common/${encodeURIComponent(name)}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const objects = data.data.objects;
  if (!Array.isArray(objects) || objects.length === 0) throw new Error('Not found');
  return objects[0];
}

export async function fetchCountriesByCodes(codes: string[]): Promise<BorderCountry[]> {
  if (codes.length === 0) return [];
  const results = await Promise.all(
    codes.map(async code => {
      const res = await fetch(`${API_BASE}/codes.alpha_3/${encodeURIComponent(code)}`, {
        headers: authHeaders(),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const objects = data.data.objects;
      return Array.isArray(objects) && objects.length > 0 ? objects[0] : null;
    })
  );
  return results.filter((c): c is BorderCountry => c !== null);
}