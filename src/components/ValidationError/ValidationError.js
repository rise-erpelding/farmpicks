import React from 'react';
import './ValidationError.css'

const ValidationError = (props) => {
  if (props.message) {
    return (
      <div className='validation-error'>
        {props.message}
      </div>
    );
  }
  return <></>
}

// ValidationError.propTypes = {
//   history: PropTypes.string,
// };

export default ValidationError;