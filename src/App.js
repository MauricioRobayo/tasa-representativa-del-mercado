import React from 'react';
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components/macro';
import CopyValueButtonContainer from './components/CopyValueButtonContainer';
import HistoricTable from './components/HistoricTable';
import MainTicker from './components/MainTicker';
import Menu from './components/Menu';
import PrettyDate from './components/PrettyDate';
import logo from './logo.svg';
import Footer from './components/Footer';
import useApi from './useApi';

const defaultTheme = {
  colors: {
    up: '#00C853',
    down: '#F44336',
    equal: '#FFE42D',
    dark: '#282c34',
    white: '#fff',
    grey: '#9E9E9E',
    greyDarker: '#444444',
    primary: '#0CA0E8',
  },
  maxWidth: '640px',
  width: '95%',
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font: 16px Arial, Helvetica, sans-serif;
    color: ${defaultTheme.colors.white};
    @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
      font-size: 18px;
    }
  }
  body {
    margin: 0;
    padding: 0;
    text-align: center;
    width: 100%;
    background-color: ${defaultTheme.colors.dark};
    color: ${defaultTheme.colors.white};
  }
`;

const AppWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
  nav,
  header,
  main {
    padding: 0.5em 1em;
  }
  nav {
    font-size: 1rem;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
  header {
    font-size: 2rem;
    margin: 0 0 2rem 0;
    h1,
    h2 {
      font-weight: normal;
      font-size: 0.5em;
    }
  }
  main {
    table {
      margin: auto;
    }
  }
  .until {
    font-size: 0.85rem;
    color: ${defaultTheme.colors.grey};
  }
`;

const App = () => {
  const { isLoading, state } = useApi();
  const currentValue = isLoading ? {} : state[0];
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppWrapper>
        <GlobalStyle />
        <nav>
          <img width="60px" height="auto" src={logo} alt="logo" />
          <Menu />
        </nav>
        {isLoading ? (
          'Cargando...'
        ) : (
          <>
            <header>
              <h1>Tasa Representativa del Mercado</h1>
              <h2>
                <PrettyDate date={currentValue.date} />
              </h2>
              {currentValue.endDate > currentValue.date ? (
                <div className="until">
                  <span>hasta: </span>
                  <PrettyDate date={currentValue.endDate} />
                </div>
              ) : null}
              <MainTicker currentValue={currentValue} />
              <CopyValueButtonContainer value={currentValue.value} />
            </header>
            <main>
              <HistoricTable trmapiData={state} />
            </main>
          </>
        )}
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
