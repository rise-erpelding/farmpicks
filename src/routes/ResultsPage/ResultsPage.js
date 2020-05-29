import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import FarmListItem from '../../components/FarmListItem/FarmListItem'
import SearchBar from '../../components/SearchBar/SearchBar'
import './ResultsPage.css'

class ResultsPage extends Component {

  static defaultProps = {
    changePage: () => {}
  }

  static contextType = FarmContext

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
        <ul className="results-page__farms-list">
          {farmsList}
        </ul>
      </div>
    )
  }
}

export default ResultsPage