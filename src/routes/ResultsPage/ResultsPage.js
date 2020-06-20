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
    const { filteredFarms } = this.context;
    const sessionStoredFarms = JSON.parse(FilteredFarmsService.getFilteredFarms());
    const { show } = this.state;

    let farmsList;
    if (filteredFarms && filteredFarms.length > 0) {
      farmsList = filteredFarms.map((farm) => (
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
      ));
    } else if (sessionStoredFarms) {
      farmsList = sessionStoredFarms.map((farm) => (
        <li key={farm.id}>
          <FarmListItem info={farm} />
        </li>
      ));
    } else {
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

ResultsPage.defaultProps = {
  changePage: () => {},
};

ResultsPage.contextType = FarmContext;
