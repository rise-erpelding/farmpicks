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

export default ValidationError;