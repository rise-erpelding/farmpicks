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
    // const farmAddStatus = this.props.farmAdded === 'yes' ? <div className="search-page__farm-added--success">Farm added successfully</div> : null

    return (
      <div className="search-page">
        <div>From small farms to you.</div>
        {/* {farmAddStatus} */}
        <SearchBar onChangePage={this.changePage} />
        <Dropdown onChangePage={this.changePage} /> 
        <Link className="search-page__add-farm" to="/add-farm">Add a farm</Link>
      </div>
    )
  }
}

export default SearchPage