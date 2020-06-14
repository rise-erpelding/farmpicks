import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './RegistrationPage.css'

import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo'

class RegistrationPage extends Component {
  handleClickCancel = () => {
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='registration-page'>
        <h3>Registration coming soon!</h3>
        <button 
          onClick={this.handleClickCancel}
          type='button'
          >
          <FontAwesomeIcon 
            className='farm-page__chevron-left'
            icon='chevron-left'
          />
          {' '}
          Back
        </button>
        <DemoLoginInfo />
      </div>
    )
  }
}

export default RegistrationPage