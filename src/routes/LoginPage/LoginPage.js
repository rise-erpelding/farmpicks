import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import * as queryString from 'query-string'
import config from '../../config'


class LoginPage extends Component {
  render () {
    const stringifiedParams = queryString.stringify({
      client_id: config.FACEBOOK_APP_ID,
      redirect_uri: 'https://www.example.com/authenticate/facebook/',
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

    return (
      <div className="login-page">
        <a href={facebookLoginUrl}>Login with Facebook</a>
      </div>
    )
  }
}

export default LoginPage