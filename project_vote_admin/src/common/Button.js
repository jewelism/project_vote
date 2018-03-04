import React, { Component } from 'react';
import { buttonStyle } from '../constants/CommonStyles'

class Button extends Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()} style={buttonStyle}>{this.props.children}</button>
    )
  }
}

export default Button;



