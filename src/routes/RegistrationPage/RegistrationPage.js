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
        <p>Sign up to be the first to know when registration opens.</p>
        <form 
          className='registration-page__form'
          onSubmit={this.handleSubmit}>
          <div className='registration-page__email'>
            <label htmlFor='email'>Email</label>
            {' '}
            <input 
              required
              name='email'
              type='email'
              id='email'
              />
          </div>
          <button type='button' onClick={this.handleClickCancel}>Cancel</button>
          <button type='submit'>Register</button>
        </form>
        <DemoLoginInfo />
      </div>
    )
  }
}

export default RegistrationPage