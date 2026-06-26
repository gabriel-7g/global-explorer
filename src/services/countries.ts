import type { Country, DetailedCountry, BorderCountry } from '../types/country';
import { API_BASE } from '../constants/api';

const API_KEY = import.meta.env.VITE_API_KEY;

// Cache local para reduzir o consumo da cota mensal do plano free (500 req/mês).
// A lista completa de países muda raramente, então vale manter em cache por um tempo.
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 horas

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ data, expiresAt: Date.now() + CACHE_TTL_MS })
    );
  } catch {
    // localStorage indisponível ou cheio — segue sem cache, sem quebrar o app
  }
}

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${API_KEY}` };
}

export async function fetchAllCountries(): Promise<Country[]> {
  const CACHE_KEY_ALL = 'global-explorer:all-countries';
  const cached = readCache<Country[]>(CACHE_KEY_ALL);
  if (cached) return cached;

  const PAGE_SIZE = 100; // teto do plano free; planos pagos suportam até 500
  const fields = 'names.common,flag.url_svg,flag.description,population,continents,subregion';
  const all: Country[] = [];
  let offset = 0;

  while (true) {
    const res = await fetch(
      `${API_BASE}?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${fields}`,
      { headers: authHeaders() }
    );
    if (res.status === 429) {
      throw new Error('Cota mensal da API excedida (429) — aguarde o reset do plano ou faça upgrade.');
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const objects = data.data.objects as Country[];
    all.push(...objects);

    if (!data.data.meta?.more) break;
    offset += PAGE_SIZE;
  }

  writeCache(CACHE_KEY_ALL, all);
  return all;
}

export async function fetchCountryByName(name: string): Promise<DetailedCountry> {
  const cacheKey = `global-explorer:country:${name.toLowerCase()}`;
  const cached = readCache<DetailedCountry>(cacheKey);
  if (cached) return cached;

  const res = await fetch(`${API_BASE}/names.common/${encodeURIComponent(name)}`, {
    headers: authHeaders(),
  });
  if (res.status === 429) {
    throw new Error('Cota mensal da API excedida (429) — aguarde o reset do plano ou faça upgrade.');
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const objects = data.data.objects;
  if (!Array.isArray(objects) || objects.length === 0) throw new Error('Not found');
  const country = objects[0] as DetailedCountry;
  writeCache(cacheKey, country);
  return country;
}

export async function fetchCountriesByCodes(codes: string[]): Promise<BorderCountry[]> {
  if (codes.length === 0) return [];

  const results = await Promise.all(
    codes.map(async code => {
      const cacheKey = `global-explorer:country-code:${code.toLowerCase()}`;
      const cached = readCache<BorderCountry>(cacheKey);
      if (cached) return cached;

      const res = await fetch(`${API_BASE}/codes.alpha_3/${encodeURIComponent(code)}`, {
        headers: authHeaders(),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const objects = data.data.objects;
      const country = Array.isArray(objects) && objects.length > 0 ? (objects[0] as BorderCountry) : null;
      if (country) writeCache(cacheKey, country);
      return country;
    })
  );
  return results.filter((c): c is BorderCountry => c !== null);
}