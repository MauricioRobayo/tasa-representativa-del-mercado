import React from "react";
import styled from "styled-components";

const ValueWrapper = styled.span`
  textarea {
    position: absolute;
    left: -9999px;
    height: 0;
    width: 0;
    opacity: 0;
  }
  color: ${({ theme }) => theme.colors.equal};
  &.up {
    color: ${({ theme }) => theme.colors.up};
  }
  &.down {
    color: ${({ theme }) => theme.colors.down};
  }
`;

const Value = props => {
  let {
    value,
    change,
    minimumFractionDigits,
    maximumFractionDigits,
    before,
    after,
    className,
    valueId
  } = props;
  return (
    <ValueWrapper
      className={className.concat(
        change === 0 ? "" : change > 0 ? " up" : " down"
      )}
    >
      {before}
      {value.toLocaleString("es-CO", {
        minimumFractionDigits,
        maximumFractionDigits
      })}
      {after}
      {valueId && (
        <textarea
          id={valueId}
          className="value"
          defaultValue={value}
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
