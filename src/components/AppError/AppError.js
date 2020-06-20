/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <h2 className="AppError">
          Oops! Something went wrong. Please refresh the page or try again later.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default AppError;

AppError.defaultProps = {
  children: '',
};

AppError.propTypes = {
  children: PropTypes.string,
};
