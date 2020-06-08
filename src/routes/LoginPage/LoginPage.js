import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import FarmContext from '../../contexts/FarmContext'
// import { Link } from 'react-router-dom'
// import config from '../../config'


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
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    
    this.handleLoginSuccess()
  }

  handleLoginSuccess = () => {
    this.props.history.push('/')
    this.context.toggleLogin()
  }

  render () {

    return (
      <div className='login-page'>
        <h2>Login</h2>
        <form 
          className='login-page__form'
          onSubmit={this.handleSubmitJwtAuth}>
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