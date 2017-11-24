import React from 'react';


export default class Todo extends React.Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={this.props.completed
        ? {
          textDecoration: 'line-through'
        }
        : null}>
        {this.props.text}
      </li>
    )
  }
}