import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import Hero from '../../components/Hero/Hero'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown/Dropdown'
import FilteredFarmsService from '../../services/filtered-farms-service'
import './SearchPage.css'

import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo'

class SearchPage extends Component {
  static contextType = FarmContext

  changePage = () => {
    this.props.history.push('/farms')
  }

  componentDidMount() {
    this.context.showBackground()
  }

  componentWillUnmount() {
    this.context.hideBackground()
  }

  render () {
    FilteredFarmsService.clearFilteredFarms()

    const farmAddStatus = this.context.farmAdded === true ? <div className="search-page__farm-added--success">Farm added successfully</div> : null

    return (
      <div className="search-page">
        <Hero />
        {farmAddStatus}
        <SearchBar onChangePage={this.changePage} />
        <Dropdown onChangePage={this.changePage} /> 
        <DemoLoginInfo />
      </div>
    )
  }
}

export default SearchPage