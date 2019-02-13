import React from 'react'
import styled from 'styled-components/macro'

const Status = styled.span`
  border-radius: 50%;
  display: inline-block;
  height: 0.75em;
  margin-right: 0.5em;
  width: 0.75em;
  background-color: ${props => props.theme.colors[props.apiStatus]};
`

const ApiStatus = props => {
  const status = Object.values(props.status).reduce(
    (acc, curr) => (acc += curr),
    0
  )
  const apiStatus = status === 6 ? 'up' : status === 27 ? 'down' : 'equal'
  return (
    <a href="https://status.trmapi.com">
      <Status
        apiStatus={apiStatus}
        role="img"
        aria-label="Status: funcionando"
      />
      Status
    </a>
  )
}

export default ApiStatus
