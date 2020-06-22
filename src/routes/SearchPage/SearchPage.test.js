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
  faQuestionCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import SearchPage from './SearchPage';

library.add(
  faSearch,
  faHeartSolid,
  faHeartRegular,
  faChevronLeft,
  faCaretDown,
  faFilter,
  faUser,
  faQuestionCircle,
  faTimes,
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
