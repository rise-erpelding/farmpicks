import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import FarmListItem from '../../components/FarmListItem/FarmListItem'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterModal from '../../components/FilterModal/FilterModal'
import './ResultsPage.css'

class ResultsPage extends Component {

  static defaultProps = {
    changePage: () => {}
  }
  
  static contextType = FarmContext

  state = {
    show: false
  }

  showModal = () => {
    this.setState({ show: true })
  }

  hideModal = () => {
    this.setState({ show: false })
  }

  changeProducts = (products) => {
    this.context.filterProductsBy(products)
  }

  changePurchaseOptions = (purchaseOptions) => {
    this.context.filterPurchaseOptionsBy(purchaseOptions)
  }

  changeOptions = (products, purchaseOptions) => {
    this.context.filterOptions(products, purchaseOptions)
  }

  render () {
    const { farms } = this.context
    let farmsList
    if (farms.length === 0) {
      farmsList = 
        <li className="results-page__no-farms">
          Whoops! No farms found. Try a different search term.
        </li>
    } else {
      farmsList = farms.map(farm =>
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
        )
    }

    return (
      <div className="results-page">
        <SearchBar />
        <Link className="results-page__add-farm" to="/add-farm">Add a farm</Link>
        <FilterModal 
          show={this.state.show} 
          handleClose={this.hideModal} 
          onUpdateProducts={this.changeProducts}
          onUpdatePurchaseOptions={this.changePurchaseOptions}
          onUpdateOptions={this.changeOptions}
        />
        <button type='button' onClick={this.showModal}>open</button>
        <ul className="results-page__farms-list">
          {farmsList}
        </ul>
      </div>
    )
  }
}

export default ResultsPage