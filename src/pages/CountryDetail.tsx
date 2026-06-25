import { useParams, useNavigate } from 'react-router-dom';
import { useCountryDetail } from '../hooks/useCountryDetail';
import { useLanguage } from '../contexts/LanguageContext';
import { AiSection } from '../components/AiSection';

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { country, borderCountries, loading, error, aiContent, loadingAI, fetchAIInfo } = useCountryDetail(name);

  if (loading) {
    return <div className="container"><p className="loading-text">{t('loadingDetails')}</p></div>;
  }

  if (error || !country) {
    return (
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>{t('back')}</button>
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>{t('countryNotFound')}</p>
        </div>
      </div>
    );
  }

  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A';

  const languages = country.languages?.map(l => l.name).join(', ') || 'N/A';
  const tld = country.tlds?.join(', ') || 'N/A';
  const timezone = country.timezones?.[0] || 'N/A';

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>{t('back')}</button>

      <div className="detail-content">
        <div className="main-info">
          <img src={country.flag.url_svg} alt={country.flag.description || country.names.common} />
          <h1>{country.names.common}</h1>
          {country.names.official !== country.names.common && (
            <p className="official-name">{country.names.official}</p>
          )}
        </div>

        <div className="grid-details">
          <div className="info-block">
            <h3>{t('generalData')}</h3>

            <div className="info-item">
              <span className="info-label">{t('capital')}</span>
              <span>{country.capitals?.map(c => c.name).join(', ') || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('region')}</span>
              <span>{country.region || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('subregion')}</span>
              <span>{country.subregion || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('population')}</span>
              <span>{country.population.toLocaleString()}</span>
            </div>
            {country.area != null && (
              <div className="info-item">
                <span className="info-label">{t('area')}</span>
                <span>{country.area.kilometers.toLocaleString()} km²</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">{t('languages')}</span>
              <span>{languages}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('currencies')}</span>
              <span>{currencies}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('timezone')}</span>
              <span>{timezone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('tld')}</span>
              <span>{tld}</span>
            </div>

            <div className="info-item">
              <span className="info-label">{t('borderCountries')}</span>
              {borderCountries.length > 0 ? (
                <div className="border-chips">
                  {borderCountries.map(bc => (
                    <button
                      key={bc.codes.alpha_3}
                      className="border-chip"
                      onClick={() => navigate(`/country/${encodeURIComponent(bc.names.common)}`)}
                    >
                      {bc.names.common}
                    </button>
                  ))}
                </div>
              ) : (
                <span>{t('noBorders')}</span>
              )}
            </div>
          </div>

          <AiSection aiContent={aiContent} loadingAI={loadingAI} onFetch={fetchAIInfo} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;