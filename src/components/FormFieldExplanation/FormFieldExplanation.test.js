import React from 'react';
import ReactDOM from 'react-dom';
import FormFieldExplanation from './FormFieldExplanation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormFieldExplanation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
