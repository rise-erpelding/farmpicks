import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'
import Harvest from '../Logo/Harvest.png'
import './NavBar.css'

class NavBar extends Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='nav-bar__logout'>
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
        {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
      </div>
    )
  }
}

export default NavBar