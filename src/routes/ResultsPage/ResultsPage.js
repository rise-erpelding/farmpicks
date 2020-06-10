import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import FarmListItem from '../../components/FarmListItem/FarmListItem'
import FilterModal from '../../components/FilterModal/FilterModal'
import FilteredFarmsService from '../../services/filtered-farms-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  showBackground = () => {
    this.context.showBackground()
  }

  render () {
    const { filteredFarms } = this.context
    const sessionStoredFarms = JSON.parse(FilteredFarmsService.getFilteredFarms())

    let farmsList
    if (filteredFarms && filteredFarms.length) {
      farmsList = filteredFarms.map(farm =>
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
        )
    } else if (sessionStoredFarms) {
      farmsList = sessionStoredFarms.map(farm =>
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
        )
    } else {
      farmsList = 
        <li className="results-page__no-farms">
          Whoops! No farms found. Try a different search term.
        </li>
    }


    return (
      <div className="results-page">

        <FilterModal 
          show={this.state.show} 
          handleClose={this.hideModal} 
          onUpdateProducts={this.changeProducts}
          onUpdatePurchaseOptions={this.changePurchaseOptions}
          onUpdateOptions={this.changeOptions}
        />
        <div className="results-page__buttons">
          <button
            type='button'
            className='results-page__button'
          >
            <Link 
              onClick={this.showBackground}
              to='/'
            >
              New search <FontAwesomeIcon icon='search' />
            </Link>
          </button>

          <button
            type='button'
            className='results-page__button'
          >
            <Link to="/add-farm">
              Add a farm
            </Link>
          </button>
          <button
            type='button' 
            onClick={this.showModal}
          >
            Filter Results
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