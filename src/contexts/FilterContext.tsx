import { createContext, useContext, useState, type ReactNode } from 'react';

interface FilterContextType {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedSubregion: string;
  setSelectedSubregion: (v: string) => void;
  subregions: string[];
  setSubregions: (v: string[]) => void;
}

const FilterContext = createContext<FilterContextType>(null!);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubregion, setSelectedSubregion] = useState('');
  const [subregions, setSubregions] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ searchTerm, setSearchTerm, selectedSubregion, setSelectedSubregion, subregions, setSubregions }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
