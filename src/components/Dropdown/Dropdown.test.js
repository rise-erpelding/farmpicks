/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch, faHeart as faHeartSolid, faChevronLeft, faCaretDown, faFilter, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Dropdown from './Dropdown';

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
  ReactDOM.render(<Dropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});
