import React from 'react';
import PropTypes from 'prop-types';

// HACK: React-Redux Provider component implementation
export default class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return this.props.children
  }
}
// NOTE: all child components MUST have Component.childContextTypes declaration to use Component.context