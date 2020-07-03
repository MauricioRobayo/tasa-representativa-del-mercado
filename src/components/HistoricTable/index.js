import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  padding: 1em;
  font-size: 0.85rem;
  @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
    font-size: 1rem;
  }
  thead {
    th {
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }
  }
  tr {
    padding: 0 0.25em;
  }
  td,
  th {
    padding: 0.5em 1em 0.5em 0;
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.greyDarker};
    @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
      padding: 0.5em 1em 0.5em 0;
    }
  }
  td:last-child,
  th:last-child {
    padding: 0.5em 0 0.25em;
  }
  .percChange,
  .text {
    display: none;
    @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
      display: inline;
    }
  }
`;

const HistoricTable = ({ trmapiData }) => {
  let rows = [];
  for (let i = 0; i < trmapiData.length - 1; i += 1) {
    rows.push(<Row key={trmapiData[i].date} data={trmapiData[i]} />);
  }
  return (
    <Table>
      <thead>
        <tr>
          <th align="left">Fecha</th>
          <th align="right">TRM</th>
          <th align="right">Cambio</th>
          <th align="right">Copiar</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default HistoricTable;
