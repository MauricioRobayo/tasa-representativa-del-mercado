import React, { Component } from "react";
import CopyValueButton from "../components/CopyValueButton";

class CopyValueButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.copyValue = this.copyValue.bind(this);
  }

  copyValue() {
    var copyText = document.getElementById(this.props.valueId);
    copyText.select();
    document.execCommand("copy");
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1500);
  }
  render() {
    return (
      <CopyValueButton
        className={this.props.className}
        onClick={this.copyValue}
        copied={this.state.copied}
      />
    );
  }
}

export default CopyValueButtonContainer;
