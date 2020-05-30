import React, { Component } from 'react'
import TokenService from '../../services/token-service'
// import { Link } from 'react-router-dom'
// import config from '../../config'


class LoginPage extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { user_name, password } = e.target

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    )

    user_name.value = ''
    password.value = ''

    this.handleLoginSuccess()
  }

  handleLoginSuccess = () => {
    this.props.history.push('/')
  }

  render () {

    return (
      <div className='login-page'>
        <h2>Login</h2>
        <form 
          className='login-page__form'
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
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginPage