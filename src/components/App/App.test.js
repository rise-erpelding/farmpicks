/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faHeart as faHeartSolid,
  faChevronLeft,
  faCaretDown,
  faFilter,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import App from './App';
import AppError from '../AppError/AppError';

library.add(
  faSearch,
  faHeartSolid,
  faHeartRegular,
  faChevronLeft,
  faCaretDown,
  faFilter,
  faUser,
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppError>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppError>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
