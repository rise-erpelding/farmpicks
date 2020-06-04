import React from 'react';
import ReactDOM from 'react-dom';
import FarmListItem from './FarmListItem';
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <FarmListItem />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
