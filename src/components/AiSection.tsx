import type { AiContent } from '../types/country';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  aiContent: AiContent | null;
  loadingAI: boolean;
  onFetch: () => void;
}

export function AiSection({ aiContent, loadingAI, onFetch }: Props) {
  const { t } = useLanguage();

  return (
    <div className="ai-block">
      <h3>{t('exploreWithAI')}</h3>
      {!aiContent && !loadingAI ? (
        <div className="ai-placeholder">
          <p>{t('wantToKnowMore')}</p>
          <button className="ai-button" onClick={onFetch}>
            {t('generateFacts')}
          </button>
        </div>
      ) : loadingAI ? (
        <p className="loading-text">{t('geminiSearching')}</p>
      ) : (
        <div className="ai-result">
          <p className="ai-info">{aiContent?.info}</p>
          <h4>{t('didYouKnow')}</h4>
          <ul className="ai-list">
            {aiContent?.curiosities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button className="ai-retry" onClick={onFetch}>{t('refreshFacts')}</button>
        </div>
      )}
    </div>
  );
}
