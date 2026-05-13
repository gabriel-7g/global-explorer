import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import CountryDetail from './pages/CountryDetail.tsx';
import { Header } from './components/Header.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { useTheme } from './hooks/useTheme.ts';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { FilterProvider } from './contexts/FilterContext.tsx';

function Root() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <Header theme={theme} onToggle={toggle} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <FilterProvider>
          <Root />
        </FilterProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
