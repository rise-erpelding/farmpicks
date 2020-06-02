import React, { Component } from 'react'
// import TokenService from '../../services/token-service'
// import { Link } from 'react-router-dom'
// import config from '../../config'


class RegistrationPage extends Component {
  handleSubmit = e => {
    e.preventDefault() 
    console.log('registration form submitted')
  }


  render () {

    return (
      <div className='registration-page'>
        <h2>Register</h2>
        <h3>I will work on this more later...</h3>
        <form 
          className='registration-page__form'
          onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='user_name'>User name</label>
            <input 
              required
              name='user_name'
              type='text'
              id='user_name'
              />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input 
              required
              name='password'
              type='password'
              id='password'
              />
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default RegistrationPage