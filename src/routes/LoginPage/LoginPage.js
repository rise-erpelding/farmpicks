import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
// import { Link } from 'react-router-dom'
// import config from '../../config'


class LoginPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  state = { error: null }

  // handleSubmit = e => {
  //   e.preventDefault()
  //   const { user_name, password } = e.target

  //   TokenService.saveAuthToken(
  //     TokenService.makeBasicAuthToken(user_name.value, password.value)
  //   )

  //   console.log(user_name.value)
  //   console.log(password.value)

  //   user_name.value = ''
  //   password.value = ''



  //   this.handleLoginSuccess()
  // }

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
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    
    this.handleLoginSuccess()
  }

  handleLoginSuccess = () => {
    this.props.history.push('/')
    console.log('login success!')
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