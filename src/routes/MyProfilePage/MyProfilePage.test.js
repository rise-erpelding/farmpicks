import React from 'react';
import ReactDOM from 'react-dom';
import MyProfilePage from './MyProfilePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyProfilePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});