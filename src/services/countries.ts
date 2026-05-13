import type { Country, DetailedCountry, BorderCountry } from '../types/country';
import { API_BASE } from '../constants/api';

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch(`${API_BASE}/all?fields=name,flags,population,continents,subregion`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchCountryByName(name: string): Promise<DetailedCountry> {
  const res = await fetch(`${API_BASE}/name/${encodeURIComponent(name)}?fullText=true`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error('Not found');
  return data[0];
}

export async function fetchCountriesByCodes(codes: string[]): Promise<BorderCountry[]> {
  if (codes.length === 0) return [];
  const res = await fetch(`${API_BASE}/alpha?codes=${codes.join(',')}&fields=name,cca3`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
