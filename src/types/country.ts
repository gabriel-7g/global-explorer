export interface Country {
  name: { common: string };
  flags: { svg: string; alt: string };
  population: number;
  continents: string[];
  subregion?: string;
}

export interface DetailedCountry {
  name: { common: string; official: string };
  flags: { svg: string; alt?: string };
  capital?: string[];
  region: string;
  subregion?: string;
  languages?: { [key: string]: string };
  population: number;
  area?: number;
  currencies?: { [key: string]: { name: string; symbol: string } };
  timezones?: string[];
  tld?: string[];
  borders?: string[];
  cca3: string;
}

export interface BorderCountry {
  name: { common: string };
  cca3: string;
}

export interface AiContent {
  info: string;
  curiosities: string[];
}
