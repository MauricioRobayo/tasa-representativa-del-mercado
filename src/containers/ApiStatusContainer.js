import React, { Component } from 'react'
import ApiStatus from '../components/ApiStatus'

export default class ApiStatusContainer extends Component {
  apiStatuses = {
    up: 2,
    seemsDown: 8,
    down: 9,
  }
  state = {
    isLoading: true,
    status: {
      date: this.apiStatuses.seemsDown,
      latest: this.apiStatuses.seemsDown,
      timeseries: this.apiStatuses.seemsDown,
    },
  }
  componentDidMount() {
    const uptimerobotApiEndpoint = 'https://api.uptimerobot.com/v2/getMonitors'
    const statusApiKeys = {
      date: 'm781797926-631e3f4a2285409184ae1e38',
      latest: 'm781581966-601f617ed8c9c269e9ce15c2',
      timeseries: 'm781801938-be596bd67e56f095cf26186d',
    }

    const statusPromises = Object.values(statusApiKeys).map(apiKey =>
      fetch(uptimerobotApiEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ api_key: apiKey }),
      })
    )

    Promise.all(statusPromises).then(responses =>
      Promise.all(responses.map(response => response.json())).then(
        apiStatuses => {
          this.setState({
            isLoading: false,
            status: apiStatuses.reduce((acc, curr) => {
              acc[curr.monitors[0].friendly_name] = curr.monitors[0].status
              return acc
            }, {}),
          })
        }
      )
    )
  }
  render() {
    return <ApiStatus {...this.state} />
  }
}
