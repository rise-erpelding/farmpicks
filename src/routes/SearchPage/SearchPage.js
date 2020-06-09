import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown/Dropdown'
import './SearchPage.css'

class SearchPage extends Component {
  static contextType = FarmContext

  changePage = () => {
    this.props.history.push('/farms')
    this.context.hideBackground()
  }

  render () {

    window.sessionStorage.removeItem('filteredFarms')
    console.log('removing filteredFarms from session storage')

    const farmAddStatus = this.context.farmAdded === true ? <div className="search-page__farm-added--success">Farm added successfully</div> : null

    return (
      <div className="search-page">
        {farmAddStatus}
        <SearchBar onChangePage={this.changePage} />
        <Dropdown onChangePage={this.changePage} /> 
      </div>
    )
  }
}

export default SearchPage