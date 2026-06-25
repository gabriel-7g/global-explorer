export interface Country {
  names: { common: string };
  flag: { url_svg: string; description?: string };
  population: number;
  continents: string[];
  subregion?: string;
}

export interface DetailedCountry {
  names: { common: string; official: string };
  flag: { url_svg: string; description?: string };
  capitals?: { name: string }[];
  region: string;
  subregion?: string;
  languages?: { name: string; bcp47?: string }[];
  population: number;
  area?: { kilometers: number; miles: number };
  currencies?: { [code: string]: { name: string; symbol: string } };
  timezones?: string[];
  tlds?: string[];
  borders?: string[];
  codes: { alpha_3: string };
}

export interface BorderCountry {
  names: { common: string };
  codes: { alpha_3: string };
}

export interface AiContent {
  info: string;
  curiosities: string[];
}