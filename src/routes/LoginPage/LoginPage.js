/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import FarmContext from '../../contexts/FarmContext';
import './LoginPage.css';

import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess();
      })
      .catch(() => {
        user_name.value = '';
        password.value = '';
        this.setState({ error: true });
      });
  }

  handleLoginSuccess = () => {
    const { history } = this.props;
    const { toggleLogin } = this.context;
    history.push('/');
    toggleLogin();
  }

  handleClickCancel = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { error } = this.state;
    const loginFailed = error
      ? <div className="login-page__login-error">Incorrect username or password</div>
      : null;

    return (
      <div className="login-page">
        <h2>Login</h2>
        {loginFailed}
        <form
          className="login-page__form"
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div className="login-page__username">
            <label htmlFor="user_name">User name</label>
            {' '}
            <input
              required
              name="user_name"
              type="text"
              id="user_name"
            />
          </div>
          <div className="login-page__password">
            <label htmlFor="password">Password</label>
            {' '}
            <input
              required
              name="password"
              type="password"
              id="password"
            />
          </div>
          <button type="button" onClick={this.handleClickCancel}>Cancel</button>
          <button type="submit">Login</button>
        </form>
        <DemoLoginInfo />
      </div>
    );
  }
}

export default LoginPage;

LoginPage.contextType = FarmContext;

LoginPage.defaultProps = {
  history: {},
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
};
