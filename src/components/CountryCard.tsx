import { FiUsers, FiGlobe, FiMapPin } from 'react-icons/fi';
import type { Country } from '../types/country';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  country: Country;
  onClick: () => void;
}

export function CountryCard({ country, onClick }: Props) {
  const { t } = useLanguage();

  return (
    <button
      className="country-card"
      onClick={onClick}
      aria-label={country.names.common}
    >
      <div className="card-flag">
        <img src={country.flag.url_svg} alt={country.flag.description || country.names.common} />
      </div>
      <div className="country-info">
        <h2>{country.names.common}</h2>
        <div className="country-stats">
          <div className="stat-row">
            <FiUsers size={11} />
            <span><strong>{t('population')}:</strong> {country.population?.toLocaleString() || 'N/A'}</span>
          </div>
          <div className="stat-row">
            <FiGlobe size={11} />
            <span><strong>{t('continent')}:</strong> {country.continents?.[0] || 'N/A'}</span>
          </div>
          <div className="stat-row">
            <FiMapPin size={11} />
            <span><strong>{t('subregion')}:</strong> {country.subregion || 'N/A'}</span>
          </div>
        </div>
      </div>
    </button>
  );
}