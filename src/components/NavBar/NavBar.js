import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'
import Harvest from '../../Images/Harvest.png'
import FarmContext from '../../contexts/FarmContext'
import './NavBar.css'

class NavBar extends Component {

  static contextType = FarmContext

  handleLogoutClick = () => {
    this.context.toggleLogin()
    TokenService.clearAuthToken()
  }

  renderLogoutAndProfileLinks() {
    return (
      <div className='nav-bar__logout-and-profile'>
        <Link
          to='my-profile'>
          My Profile
        </Link>
        {' '}
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
      <div className='nav-bar__login'>
        <Link to='register'>
          Register
          {' '}
        </Link>
        <Link to='login'>
          Login
        </Link>
      </div>
    )
  }

  render () {


    return (
      <div className='nav-bar'>
        <div>
          <Link to='/'>
            <img 
              className='nav-bar__logo' 
              src={Harvest} 
              alt='FarmPicks Logo' />
            {' '}FarmPicks
          </Link>
        </div> 
        {/* {TokenService.hasAuthToken() */}
        {this.props.login === true
            ? this.renderLogoutAndProfileLinks()
            : this.renderLoginLink()}
      </div>
    )
  }
}

export default NavBar