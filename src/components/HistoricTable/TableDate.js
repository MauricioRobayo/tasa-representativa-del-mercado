import React from 'react'
import styled from 'styled-components'

const Time = styled.time`
  .date {
    margin-right: 0.5em;
  }
  .day {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 75%;
    display: none;
    text-transform: uppercase;
    @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
      display: inline;
    }
  }
`

const TableDate = ({ date }) => {
  const dateObject = new Date(date)
  const weekdays = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ]
  return (
    <Time dateTime={date}>
      <span className="date">{date.substring(0, 10)}</span>
      <span className="day">{weekdays[dateObject.getDay()]}</span>
    </Time>
  )
}

export default TableDate
