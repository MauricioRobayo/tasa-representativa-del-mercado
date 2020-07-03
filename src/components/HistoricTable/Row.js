import React from 'react';
import Value from '../Value';
import TableDate from './TableDate';
import styled from 'styled-components';
import CopyValueButtonContainer from '../../containers/CopyValueButtonContainer';

const Tr = styled.tr`
  .change {
    margin-right: 0.5em;
  }
  .right {
    text-align: right;
  }
  .left {
    text-align: left;
  }
  .center {
    text-align: center;
  }
`;

const Row = ({ data }) => {
  return (
    <Tr>
      <td className="left">
        <TableDate date={data.date} />
      </td>
      <td className="right">
        <Value value={data.value} change={data.change} />
      </td>
      <td className="right">
        <Value
          className="change"
          value={data.change}
          change={data.change}
          before={data.change > 0 ? '+' : ''}
        />
        <Value
          className="percChange"
          value={data.percChange * 100}
          change={data.percChange}
          before="("
          after="%)"
        />
      </td>
      <td className="center">
        <CopyValueButtonContainer className="table" value={data.value} />
      </td>
    </Tr>
  );
};

export default Row;
