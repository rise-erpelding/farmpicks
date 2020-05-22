import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Harvest from '../Logo/Harvest.png'
import './NavBar.css'

class NavBar extends Component {
  render () {
    return (
      <div className="nav-bar"> 
        <Link to ='/'>
          <img 
            className="nav-bar__logo" 
            src={Harvest} 
            alt="FarmPicks Logo" />
          {' '}FarmPicks
        </Link>
      </div>
    )
  }
}

export default NavBar