import { FiSearch } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useFilter } from '../contexts/FilterContext';

interface Props {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function Header({ theme, onToggle }: Props) {
  const { lang, toggle: toggleLang, t } = useLanguage();
  const { searchTerm, setSearchTerm, selectedSubregion, setSelectedSubregion, subregions } = useFilter();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className="app-header">
      <Link className="app-logo" to="/">
        <img src="/favicon.svg" alt="Global Explorer" className="logo-icon" />
        <span className="logo-text">Global Explorer</span>
      </Link>

      {isHome && (
        <div className="header-search-group">
          <div className="search-wrapper">
            <FiSearch className="search-icon" size={15} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            className="region-select"
            value={selectedSubregion}
            onChange={(e) => setSelectedSubregion(e.target.value)}
          >
            <option value="">{t('allSubregions')}</option>
            {subregions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      )}

      <div className="header-actions">
        <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
          {lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}
        </button>
        <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
