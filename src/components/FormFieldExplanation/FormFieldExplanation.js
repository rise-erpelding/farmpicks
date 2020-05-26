import React from 'react';
import './FormFieldExplanation.css'

const FormFieldExplanation = (props) => {
  return (      
    <div className='form-field-explanation'>
      {props.message}
    </div>
  )
}

export default FormFieldExplanation;