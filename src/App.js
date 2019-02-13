import React, { Component, Fragment } from 'react'
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components/macro'
import CopyValueButtonContainer from './containers/CopyValueButtonContainer'
import HistoricTable from './components/HistoricTable'
import MainTicker from './components/MainTicker'
import Menu from './components/Menu'
import PrettyDate from './components/PrettyDate'
import logo from './logo.svg'
import Footer from './components/Footer'

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
}

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
`

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
`

class App extends Component {
  state = {
    isLoading: true,
    data: [],
  }
  componentDidMount() {
    const trmapiApiEndpoint = 'https://api.trmapi.com/timeseries'

    const date = new Date()
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 30
    )
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    )
    const url = `${trmapiApiEndpoint}?start_date=${startDate
      .toISOString()
      .substring(0, 10)}&end_date=${endDate.toISOString().substring(0, 10)}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          data: data.map((element, index, array) => {
            const nextItem = index + 1
            element.date = `${element.date}T05:00:00.000Z`
            if (nextItem < array.length) {
              array[nextItem].change = array[nextItem].value - element.value
              array[nextItem].percChange =
                array[nextItem].change / element.value
            }
            return element
          }),
        })
      })
  }

  render() {
    let currentValue = {}
    if (!this.state.isLoading) {
      currentValue = this.state.data[this.state.data.length - 1]
    }
    return (
      <ThemeProvider theme={defaultTheme}>
        <AppWrapper>
          <GlobalStyle />
          <nav>
            <img width="60px" height="auto" src={logo} alt="logo" />
            <Menu />
          </nav>
          {this.state.isLoading ? (
            'Cargando...'
          ) : (
            <Fragment>
              <header>
                <h1>Tasa Representativa del Mercado</h1>
                <h2>
                  <PrettyDate date={currentValue.date} />
                </h2>
                <MainTicker currentValue={currentValue} />
                <CopyValueButtonContainer
                  valueId={`value-${currentValue.date}`}
                />
              </header>
              <main>
                <HistoricTable trmapiData={this.state.data} />
              </main>
            </Fragment>
          )}
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    )
  }
}

export default App
