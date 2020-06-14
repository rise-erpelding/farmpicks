import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationPage from './RegistrationPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faHeart as faHeartSolid, faChevronLeft, faCaretDown, faFilter, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

library.add(
  faSearch,
  faHeartSolid,
  faHeartRegular,
  faChevronLeft,
  faCaretDown,
  faFilter,
  faUser
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegistrationPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
