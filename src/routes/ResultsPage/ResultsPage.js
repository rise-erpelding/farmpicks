import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import FarmListItem from '../../components/FarmListItem/FarmListItem'
import SearchBar from '../../components/SearchBar/SearchBar'

class ResultsPage extends Component {

  static defaultProps = {
    changePage: () => {}
  }

  static contextType = FarmContext

  render () {
    const { farms } = this.context
    const farmsList = farms.map(farm =>
      <li key={farm.id}>
        <FarmListItem info={farm} />
      </li>
      )
    return (
      <div>
        <SearchBar />
        <div>A link to add a farm if you can't find it</div>
        <ul>
          {farmsList}
        </ul>
      </div>
    )
  }
}

export default ResultsPage