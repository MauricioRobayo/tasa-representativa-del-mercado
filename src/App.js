import React, { Component, Fragment } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider
} from "styled-components/macro";
import CopyValueButton from "./components/CopyValueButton";
import HistoricTable from "./components/HistoricTable";
import MainTicker from "./components/MainTicker";
import Menu from "./components/Menu";
import PrettyDate from "./components/PrettyDate";
import logo from "./logo.svg";
import Footer from "./components/Footer";

const defaultTheme = {
  colors: {
    up: "#00C853",
    down: "#F44336",
    equal: "#FFE42D",
    dark: "#282c34",
    white: "#fff",
    grey: "#9E9E9E",
    greyDarker: "#444444",
    primary: "#0CA0E8"
  },
  maxWidth: "640px",
  width: "95%"
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
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.apiStatuses = {
      up: 2,
      seemsDown: 8,
      down: 9
    };
    this.state = {
      apiStatus: {
        isLoading: true,
        status: {
          date: this.apiStatuses.seemsDown,
          latest: this.apiStatuses.seemsDown,
          timeseries: this.apiStatuses.seemsDown
        }
      },
      trmapiData: {
        isLoading: true,
        data: []
      }
    };
  }
  async componentDidMount() {
    const uptimerobotApiEndpoint = "https://api.uptimerobot.com/v2/getMonitors";
    const trmapiApiEndpoint = "https://api.trmapi.com/timeseries";

    const statusApiKeys = {
      date: "m781797926-631e3f4a2285409184ae1e38",
      latest: "m781581966-601f617ed8c9c269e9ce15c2",
      timeseries: "m781801938-be596bd67e56f095cf26186d"
    };

    const statusPromises = Object.values(statusApiKeys).map(apiKey =>
      fetch(uptimerobotApiEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ api_key: apiKey })
      })
    );

    Promise.all(statusPromises).then(responses =>
      Promise.all(responses.map(response => response.json())).then(
        apiStatuses => {
          this.setState({
            apiStatus: {
              isLoading: false,
              status: apiStatuses.reduce((acc, curr) => {
                acc[curr.monitors[0].friendly_name] = curr.monitors[0].status;
                return acc;
              }, {})
            }
          });
        }
      )
    );

    const date = new Date();
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 30
    );
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    const url = `${trmapiApiEndpoint}?start_date=${startDate
      .toISOString()
      .substring(0, 10)}&end_date=${endDate.toISOString().substring(0, 10)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          trmapiData: {
            isLoading: false,
            data: data.map((element, index, array) => {
              const nextItem = index + 1;
              element.date = `${element.date}T05:00:00.000Z`;
              if (nextItem < array.length) {
                array[nextItem].change = array[nextItem].value - element.value;
                array[nextItem].percChange =
                  array[nextItem].change / element.value;
              }
              return element;
            })
          }
        });
      });

    // const fakeServerData = [
    //   {
    //     value: 3189.51,
    //     date: "2018-11-21"
    //   },
    //   {
    //     value: 3196.26,
    //     date: "2018-11-22"
    //   },
    //   {
    //     value: 3196.26,
    //     date: "2018-11-23"
    //   },
    //   {
    //     value: 3223.95,
    //     date: "2018-11-24"
    //   }
    // ].map((element, index, array) => {
    //   const nextIndex = index + 1;
    //   element.date = `${element.date}T05:00:00.000Z`;
    //   if (nextIndex < array.length) {
    //     const change = array[nextIndex].value - element.value;
    //     array[nextIndex].change = change;
    //     array[nextIndex].percChange = change / element.value;
    //   }
    //   return element;
    // });

    // setTimeout(() => {
    // this.setState({
    //   trmapiData: {
    //     isLoading: false,
    //     data: fakeServerData
    //   }
    // });
    // }, 0);
  }

  render() {
    let currentValue = {};
    if (!this.state.trmapiData.isLoading) {
      currentValue = this.state.trmapiData.data[
        this.state.trmapiData.data.length - 1
      ];
    }
    return (
      <ThemeProvider theme={defaultTheme}>
        <AppWrapper>
          <GlobalStyle />
          <nav>
            <img width="60px" height="auto" src={logo} alt="logo" />
            <Menu apiStatus={this.state.apiStatus} />
          </nav>
          {this.state.trmapiData.isLoading ? (
            "Cargando..."
          ) : (
            <Fragment>
              <header>
                <h1>Tasa Representativa del Mercado</h1>
                <h2>
                  <PrettyDate date={currentValue.date} />
                </h2>
                <MainTicker currentValue={currentValue} />
                <CopyValueButton valueId={`value-${currentValue.date}`} />
              </header>
              <main>
                <HistoricTable trmapiData={this.state.trmapiData.data} />
              </main>
            </Fragment>
          )}
          <Footer apiStatus={this.state.apiStatus} />
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
