import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'

class SearchBar extends Component {

  static contextType = FarmContext

  state = {
    searchTerm: '',
    error: null
  }

  updateQuery = query => {
    this.setState({
      searchTerm: query
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const formattedQuery = 'q=' + this.state.searchTerm
    this.context.getFarms(formattedQuery)
    // this.props.history.push('/farms')
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          name="search-bar" 
          placeholder="Search for stuff"
          onChange={e => this.updateQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchBar