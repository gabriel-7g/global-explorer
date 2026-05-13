import { FiSearch } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  subregions: string[];
  selectedSubregion: string;
  onSubregionChange: (value: string) => void;
}

export function FilterBar({ searchTerm, onSearchChange, subregions, selectedSubregion, onSubregionChange }: Props) {
  const { t } = useLanguage();

  return (
    <div className="filter-panel">
      <div className="filter-wrapper">
        <div className="search-wrapper">
          <FiSearch className="search-icon" size={15} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          className="region-select"
          value={selectedSubregion}
          onChange={(e) => onSubregionChange(e.target.value)}
        >
          <option value="">{t('allSubregions')}</option>
          {subregions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
