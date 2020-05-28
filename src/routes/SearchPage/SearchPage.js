import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown/Dropdown'
import './SearchPage.css'

class SearchPage extends Component {

  changePage = () => {
    this.props.history.push('/farms')
  }

  render () {
    return (
      <div className="search-page">
        <SearchBar onChangePage={this.changePage} />
        <Dropdown onChangePage={this.changePage} /> 
        <Link className="search-page__add-farm" to="/add-farm">Add a farm</Link>
      </div>
    )
  }
}

export default SearchPage