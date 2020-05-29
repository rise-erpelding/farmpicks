import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

class NavBar extends Component {
  render () {
    return (
      <div className="nav-bar">
        <div className="nav-bar__sign-in">Sign in</div>
        <div className="nav-bar__home">
          <Link to ='/'>FarmPicks</Link>
          <p>From small farms to you.</p>
        </div>

      </div>
    )
  }
}

export default NavBar