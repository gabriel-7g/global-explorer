import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountries } from './hooks/useCountries';
import { useLanguage } from './contexts/LanguageContext';
import { useFilter } from './contexts/FilterContext';
import { useEqualCardHeight } from './hooks/useEqualCardHeight';
import { CountryCard } from './components/CountryCard';

function SkeletonGrid() {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const { countries, loading, error } = useCountries();
  const { t } = useLanguage();
  const { searchTerm, selectedSubregion, setSubregions } = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    if (countries.length > 0) {
      const subs = Array.from(
        new Set(countries.map((c) => c.subregion).filter(Boolean))
      ).sort() as string[];
      setSubregions(subs);
    }
  }, [countries, setSubregions]);

  const filteredCountries = countries.filter((country) => {
    const matchesName = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubregion = selectedSubregion === '' || country.subregion === selectedSubregion;
    return matchesName && matchesSubregion;
  });

  const gridRef = useEqualCardHeight([filteredCountries.length, searchTerm, selectedSubregion, loading]);

  if (error) {
    return (
      <div className="container">
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>{t('errorLoadingList')}</p>
          <button className="error-retry" onClick={() => window.location.reload()}>
            {t('tryReload')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="country-grid" ref={gridRef}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.name.common}
                country={country}
                onClick={() => navigate(`/country/${encodeURIComponent(country.name.common)}`)}
              />
            ))
          ) : (
            <p className="no-results">{t('noResults')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
