import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'

class SearchBar extends Component {

  static contextType = FarmContext

  render() {
    return (
      <form
        onSubmit={e => this.context.searchFarms(e.target.value)}>
        <input type="text" name="search-bar" placeholder="Search for stuff" />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchBar