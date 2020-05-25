import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown/Dropdown'
import './SearchPage.css'

class SearchPage extends Component {

  changePage = () => {
    // console.log("I want to change the page here")
    this.props.history.push('/farms')
  }

  render () {
    return (
      <div className="search-page">
        <SearchBar onChangePage={this.changePage} />
        <Dropdown onChangePage={this.changePage} /> 
        <Link to="/add-farm">Add a farm</Link>
      </div>
    )
  }
}

export default SearchPage