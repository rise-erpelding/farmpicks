import React, { Component } from 'react'
import './RegistrationPage.css'

import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo'

class RegistrationPage extends Component {
  handleSubmit = e => {
    e.preventDefault() 
    console.log('registration interest form submitted')
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='registration-page'>
        <h3>Registration coming soon!</h3>
        <DemoLoginInfo />
      </div>
    )
  }
}

export default RegistrationPage