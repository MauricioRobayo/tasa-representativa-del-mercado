import React, { Component } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 1rem;
  padding: 0.5em 0.5em 0.35em;
  width: 100%;
  max-width: 280px;
  border-radius: 4px;
  .text {
    margin-left: 0.5em;
  }
  > span {
    pointer-events: none;
  }
`;

class CopyValueButton extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    // this.state = { copyImg: "⧉", copyText: "Copiar valor" };
    this.preventDefault = this.preventDefault.bind(this);
    this.copyValue = this.copyValue.bind(this);
  }
  preventDefault(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  copyValue(e) {
    var copyText = document.getElementById(e.target.dataset.valueId);
    copyText.select();
    document.execCommand("copy");
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  }
  render() {
    return (
      <ButtonWrapper
        data-value-id={this.props.valueId}
        className="button"
        onClick={this.copyValue}
      >
        <span
          onClick={this.preventDefault}
          className="img"
          role="img"
          aria-label="copy-value"
        >
          {this.state.copied ? "✓" : "⧉"}
        </span>
        <span onClick={this.preventDefault} className="text">
          {this.state.copied ? "Valor copiado" : "Copiar valor"}
        </span>
      </ButtonWrapper>
    );
  }
}

export default CopyValueButton;
