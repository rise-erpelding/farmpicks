import React from 'react';
import PropTypes from 'prop-types';
import './FormFieldExplanation.css';

const FormFieldExplanation = (props) => {
  const { message } = props;
  return (
    <div className="form-field-explanation">
      {message}
    </div>
  );
};

export default FormFieldExplanation;

FormFieldExplanation.defaultProps = {
  message: '',
};

FormFieldExplanation.propTypes = {
  message: PropTypes.string,
};
