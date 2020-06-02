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

  changeOptions = (products, purchaseOptions) => {
    this.context.filterOptions(products, purchaseOptions)
  }

  render () {
    const { filteredFarms } = this.context
    let farmsList
    if (filteredFarms.length === 0) {
      farmsList = 
        <li className="results-page__no-farms">
          Whoops! No farms found. Try a different search term.
        </li>
    } else {
      farmsList = filteredFarms.map(farm =>
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
        )
    }

    return (
      <div className="results-page">
        <SearchBar />
        <FilterModal 
          show={this.state.show} 
          handleClose={this.hideModal} 
          onUpdateProducts={this.changeProducts}
          onUpdatePurchaseOptions={this.changePurchaseOptions}
          onUpdateOptions={this.changeOptions}
        />
        <div className="results-page__buttons">
          <button type='button' onClick={this.showModal}>
            Filter Results
          </button>
          <button>
            <Link to="/add-farm">Add a farm</Link>
          </button>
        </div>
        <ul className="results-page__farms-list">
          {farmsList}
        </ul>
      </div>
    )
  }
}

export default ResultsPage