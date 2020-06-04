import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './SearchPage';
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faHeart as faHeartSolid, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

library.add(
  faSearch,
  faHeartSolid,
  faHeartRegular,
  faChevronLeft
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
