import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'

class SearchBar extends Component {
  static defaultProps = {
    onChangePage: () => {}
  }

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
    const query = this.state.searchTerm
    this.context.getFarms(query)
    this.props.onChangePage()
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          name="search-bar" 
          placeholder="Search for berries, farm, beef..."
          onChange={e => this.updateQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchBar