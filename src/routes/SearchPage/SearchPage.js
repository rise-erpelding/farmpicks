import React, { Component } from 'react'
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
        <Dropdown /> 
      </div>
    )
  }
}

export default SearchPage