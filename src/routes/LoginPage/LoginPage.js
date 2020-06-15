import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import FarmContext from '../../contexts/FarmContext'
import './LoginPage.css'

import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo'


class LoginPage extends Component {

  static contextType = FarmContext

  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  state = { error: null }

  handleSubmitJwtAuth = e => {
    e.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = e.target
  
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.handleLoginSuccess()
      })
      .catch(res => {
        user_name.value = ''
        password.value = ''
        this.setState({ error: true })
      })
  }

  handleLoginSuccess = () => {
    this.props.history.push('/')
    this.context.toggleLogin()
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  render () {
    const loginFailed = this.state.error
      ? <div className='login-page__login-error'>Incorrect username or password</div>
      : null

    return (
      <div className='login-page'>
        <h2>Login</h2>
        {loginFailed}
        <form 
          className='login-page__form'
          onSubmit={this.handleSubmitJwtAuth}>
          <div className='login-page__username'>
            <label htmlFor='user_name'>User name</label>
            {' '}
            <input 
              required
              name='user_name'
              type='text'
              id='user_name'
              />
          </div>
          <div className='login-page__password'>
            <label htmlFor='password'>Password</label>
            {' '}
            <input 
              required
              name='password'
              type='password'
              id='password'
              />
          </div>
          <button type='button' onClick={this.handleClickCancel}>Cancel</button>
          <button type='submit'>Login</button>
        </form>
        <DemoLoginInfo />
      </div>
    )
  }
}

export default LoginPage