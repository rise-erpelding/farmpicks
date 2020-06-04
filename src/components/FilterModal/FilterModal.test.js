import React from 'react';
import ReactDOM from 'react-dom';
import FilterModal from './FilterModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
