import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css'

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
    const formattedQuery = '?q=' + this.state.searchTerm
    this.context.getFarms(formattedQuery)
    this.props.onChangePage()
  }

  render() {
    return (
      <form 
        id='searchBar'
        className='search-bar'
        onSubmit={this.handleSubmit}
        >
        <input 
          type='text' 
          name='search-bar' 
          area-labelledby='searchBar'
          placeholder='Search for farms or products...'
          onChange={e => this.updateQuery(e.target.value)} />
        <button type='submit'><FontAwesomeIcon icon='search' /></button>
      </form>
    )
  }
}

export default SearchBar