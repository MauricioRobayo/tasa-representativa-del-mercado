import React from "react";
import styled from "styled-components/macro";
import Value from "./Value";

const TickerWrapper = styled.div`
  margin: 1rem 0 0.5rem;
  font-weight: bold;
  font-size: 1.5em;
  @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
    font-size: 2em;
  }
  span::before {
    content: "$";
    font-size: 0.5em;
    margin-right: 0.5rem;
  }
  span::after {
    font-size: 0.5em;
    margin-left: 0.5rem;
  }
  span.up::after {
    content: "▲";
  }
  span.down::after {
    content: "▼";
  }
`;

const MainTicker = props => {
  if (!props.currentValue) {
    return null;
  }
  const { change, value, date } = props.currentValue;
  return (
    <TickerWrapper>
      <Value value={value} change={change} valueId={`value-${date}`} />
    </TickerWrapper>
  );
};

export default MainTicker;
