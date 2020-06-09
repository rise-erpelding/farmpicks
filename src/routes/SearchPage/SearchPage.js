import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown/Dropdown'
import './SearchPage.css'

class SearchPage extends Component {
  static contextType = FarmContext

  changePage = () => {
    this.props.history.push('/farms')
  }

  componentDidMount() {
    window.sessionStorage.removeItem('filteredFarms')
  }

  render () {
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