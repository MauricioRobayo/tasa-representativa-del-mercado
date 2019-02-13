import React, { Component } from 'react'
import CopyValueButton from '../components/CopyValueButton'

class CopyValueButtonContainer extends Component {
  state = { copied: false }

  copyValue = () => {
    var copyText = document.getElementById(this.props.valueId)
    copyText.select()
    document.execCommand('copy')
    this.setState({ copied: true })
    setTimeout(() => this.setState({ copied: false }), 1500)
  }
  render() {
    return (
      <CopyValueButton
        className={this.props.className}
        onClick={this.copyValue}
        copied={this.state.copied}
      />
    )
  }
}

export default CopyValueButtonContainer
