# 🌍 Global Explorer

Aplicação web responsiva para explorar países do mundo, com curiosidades geradas por inteligência artificial via Google Gemini.

---

## Funcionalidades

- **Listagem de países** — navegue pelos ~250 países em um grid responsivo
- **Filtro duplo** — pesquise por nome e filtre por sub-região simultaneamente
- **Detalhe do país** — bandeira, nome oficial, capital, região, sub-região, população, área, idiomas, moedas, fuso horário e domínio de topo
- **Países fronteiriços** — chips clicáveis que navegam diretamente para o país vizinho
- **Curiosidades com IA** — resumo e curiosidades gerados sob demanda pelo Google Gemini
- **Internacionalização** — interface disponível em Português e Inglês
- **Tema escuro** — detecta a preferência do sistema e salva a escolha no `localStorage`
- **Skeleton loading** — placeholders animados enquanto os dados carregam
- **Voltar ao topo** — botão flutuante que aparece após rolar 300px
- **Totalmente responsivo** — 5 breakpoints, de celulares pequenos a monitores largos

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Roteamento | React Router v7 |
| Build | Vite 8 |
| Inteligência Artificial | Google Gemini API (`@google/generative-ai`) |
| Dados dos países | REST Countries API (gratuita, sem autenticação) |
| Estilização | CSS puro com variáveis CSS customizadas |
| Fonte | Outfit (Google Fonts) |

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── AiSection.tsx       # Bloco de IA (botão, loading, resultado)
│   ├── CountryCard.tsx     # Card clicável de país
│   ├── Header.tsx          # Header fixo com logo, busca, filtro e ações
│   └── ScrollToTop.tsx     # Botão flutuante de voltar ao topo
├── constants/
│   └── api.ts              # URL base da API e nome do modelo Gemini
├── contexts/
│   ├── FilterContext.tsx   # Estado global de busca e filtro por sub-região
│   └── LanguageContext.tsx # Estado global de idioma (EN/PT) e função t()
├── hooks/
│   ├── useCountries.ts       # Busca a lista completa de países
│   ├── useCountryDetail.ts   # Busca um país específico + países fronteiriços + Gemini
│   ├── useEqualCardHeight.ts # Iguala a altura dos cards no grid
│   └── useTheme.ts           # Tema claro/escuro com persistência no localStorage
├── pages/
│   └── CountryDetail.tsx   # Página de detalhe do país (/country/:name)
├── services/
│   └── countries.ts        # Funções de acesso à REST Countries API
├── types/
│   └── country.ts          # Interfaces TypeScript (Country, DetailedCountry, BorderCountry, AiContent)
├── translations.ts         # Strings da UI em EN e PT
├── App.tsx                 # Página inicial (grid + filtros)
├── index.css               # Estilos globais e variáveis CSS
└── main.tsx                # Configuração do roteador e layout raiz
```

---

## Como Rodar

### Pré-requisitos

- Node.js 18+
- Chave da API do Google Gemini — obtenha gratuitamente em [aistudio.google.com](https://aistudio.google.com)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd global-explorer

# Instale as dependências
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como base):

```env
VITE_API_KEY=sua_chave_gemini_aqui
```

> O prefixo `VITE_` é obrigatório para o Vite expor a variável ao navegador.  
> A chave só é necessária para o recurso de curiosidades com IA; o restante da aplicação funciona sem ela.

### Comandos

```bash
# Servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Verificação de tipos + build de produção
npm run build

# Pré-visualizar o build de produção
npm run preview
```

---

## Breakpoints Responsivos

| Breakpoint | Largura da tela | Colunas do grid |
|---|---|---|
| Desktop | > 1280px | 5 colunas |
| Laptop | ≤ 1280px | 4 colunas |
| Tablet horizontal | ≤ 1024px | 4 colunas |
| Tablet vertical | ≤ 768px | 3 colunas |
| Celular grande | ≤ 600px | 2 colunas |
| Celular pequeno | ≤ 400px | 2 colunas |

---

## APIs Utilizadas

- **REST Countries** — `https://restcountries.com/v3.1` — sem autenticação necessária
- **Google Gemini** — plano gratuito: 15 req/min, 1.500 req/dia

---

