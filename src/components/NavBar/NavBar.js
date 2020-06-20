/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import FarmContext from '../../contexts/FarmContext';
import './NavBar.css';

class NavBar extends Component {
  handleLogoutClick = () => {
    const { toggleLogin } = this.context;
    toggleLogin();
    TokenService.clearAuthToken();
  }

  renderLogoutAndProfileLinks() {
    return (
      <div className="nav-bar">
        <NavLink
          activeClassName="selected"
          to="/add-farm"
        >
          Add a farm
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/my-profile"
        >
          My Profile
        </NavLink>
        <Link
          onClick={this.handleLogoutClick}
          to="/"
        >
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="nav-bar">
        <NavLink activeClassName="selected" to="/register">
          Register
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
      </div>
    );
  }

  render() {
    const { login } = this.props;
    return (
      <>
        {login === true
          ? this.renderLogoutAndProfileLinks()
          : this.renderLoginLink()}
      </>
    );
  }
}

export default NavBar;

NavBar.defaultProps = {
  login: false,
};

NavBar.contextType = FarmContext;

NavBar.propTypes = {
  login: PropTypes.bool,
};
