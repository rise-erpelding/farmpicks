import React from 'react';
import ReactDOM from 'react-dom';
import AddFarmPage from './AddFarmPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddFarmPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
