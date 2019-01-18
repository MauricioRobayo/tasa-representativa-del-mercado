import React from "react";
import CopyValueButton from "../CopyValueButton";
import Value from "../Value";
import TableDate from "./TableDate";
import styled from "styled-components";

const Tr = styled.tr`
  .change {
    margin-right: 0.5em;
  }
`;

const Row = ({ data }) => {
  return (
    <Tr>
      <td align="left">
        <TableDate date={data.date} />
      </td>
      <td align="right">
        <Value
          value={data.value}
          change={data.change}
          valueId={`value-${data.date}`}
        />
      </td>
      <td align="right">
        <Value
          className="change"
          value={data.change}
          change={data.change}
          before={data.change > 0 ? "+" : ""}
        />
        <Value
          className="percChange"
          value={data.percChange * 100}
          change={data.percChange}
          before="("
          after="%)"
        />
      </td>
      <td align="left">
        <CopyValueButton valueId={`value-${data.date}`} />
      </td>
    </Tr>
  );
};

export default Row;
