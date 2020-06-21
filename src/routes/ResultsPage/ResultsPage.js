import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterModal from '../../components/FilterModal/FilterModal';
import FilteredFarmsService from '../../services/filtered-farms-service';
import FarmContext from '../../contexts/FarmContext';
import FarmListItem from '../../components/FarmListItem/FarmListItem';
import './ResultsPage.css';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  changeOptions = (products, purchaseOptions) => {
    const { filterOptions } = this.context;
    filterOptions(products, purchaseOptions);
  }

  showBackground = () => {
    const { showBackground } = this.context;
    showBackground();
  }

  render() {
  /* filteredFarms are the same as the farms returned from getFarms() but will be updated if
  FilterModal is used */
    const { filteredFarms } = this.context;
    const sessionStoredFarms = JSON.parse(FilteredFarmsService.getFilteredFarms());
    const { show } = this.state;

    // determines what search results are rendered
    let farmsList;
    if (filteredFarms && filteredFarms.length > 0) {
      // if there are filteredFarms in context, render these
      farmsList = filteredFarms.map((farm) => (
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
      ));
    } else if (sessionStoredFarms) {
      // otherwise if there are farms stored in session storage, render those
      farmsList = sessionStoredFarms.map((farm) => (
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
      ));
    } else {
      // if no farms in either context or session storage, render not found message
      farmsList = (
        <li className="results-page__no-farms">
          <h4>Whoops! No farms found. Try a new search.</h4>
          <p>
            Are you searching for specific products (for example, &quot;carrots&quot; or
            &quot;spinach&quot;)? Try making your search more broad (for example,
            &quot;produce&quot;).
          </p>
        </li>
      );
    }

    return (
      <div className="results-page">

        <FilterModal
          show={show}
          handleClose={this.hideModal}
          onUpdateOptions={this.changeOptions}
        />
        <div className="results-page__buttons">
          <button
            type="button"
            className="results-page__button"
          >
            <Link
              onClick={this.showBackground}
              to="/"
            >
              New search
              <FontAwesomeIcon icon="search" />
            </Link>
          </button>

          <button
            type="button"
            className="results-page__button"
          >
            <Link to="/add-farm">
              Add a farm
            </Link>
          </button>
          <button
            type="button"
            onClick={this.showModal}
          >
            Filter Results
          </button>
        </div>
        <ul className="results-page__farms-list">
          {farmsList}
        </ul>
      </div>
    );
  }
}

export default ResultsPage;

ResultsPage.contextType = FarmContext;
