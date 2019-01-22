import React from "react";
import styled from "styled-components/macro";

const ValueWrapper = styled.span`
  textarea {
    position: absolute;
    left: -9999px;
    height: 0;
    width: 0;
    opacity: 0;
  }
  color: ${props => props.theme.colors[props.change]};
`;

const Value = props => {
  let {
    value,
    change,
    minimumFractionDigits,
    maximumFractionDigits,
    before,
    after,
    valueId
  } = props;
  return (
    <ValueWrapper
      className={change === 0 ? "equal" : change > 0 ? "up" : "down"}
      change={change === 0 ? "equal" : change > 0 ? "up" : "down"}
    >
      {before}
      {value.toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits
      })}
      {after}
      {valueId && (
        <textarea
          id={valueId}
          defaultValue={value.toLocaleString(undefined, { useGrouping: false })}
          readOnly
        />
      )}
    </ValueWrapper>
  );
};

Value.defaultProps = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  before: "",
  after: "",
  className: ""
};
export default Value;
