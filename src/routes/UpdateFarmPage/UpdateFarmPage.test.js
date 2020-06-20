/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import UpdateFarmPage from './UpdateFarmPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdateFarmPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
