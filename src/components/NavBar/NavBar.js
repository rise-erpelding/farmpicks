import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import { Link, NavLink } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import './NavBar.css'

class NavBar extends Component {

  static contextType = FarmContext

  // showBackground = () => {
  //   this.context.showBackground()
  // }

  handleLogoutClick = () => {
    this.context.toggleLogin()
    TokenService.clearAuthToken()
  }

  renderLogoutAndProfileLinks() {
    return (
      <div className='nav-bar'>
        <NavLink
          activeClassName='selected'
          to='/add-farm'>
          Add a farm
        </NavLink>
        <NavLink
          activeClassName='selected'
          to='/my-profile'>
          My Profile
        </NavLink>
        <Link 
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='nav-bar'>
        <NavLink activeClassName='selected' to='/register'>
          Register
        </NavLink>
        <NavLink to='/login'>
          Login
        </NavLink>
      </div>
    )
  }

  render () {


    return (
      <>

        {this.props.login === true
          ? this.renderLogoutAndProfileLinks()
          : this.renderLoginLink()}

      </>
    )
  }
}

export default NavBar