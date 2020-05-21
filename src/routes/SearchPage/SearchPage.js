import React, { Component } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown/Dropdown'

class SearchPage extends Component {
  render () {
    return (
      <div>
        <SearchBar />
        <Dropdown /> 
      </div>
    )
  }
}

export default SearchPage