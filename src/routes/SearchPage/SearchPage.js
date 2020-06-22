import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import FarmContext from '../../contexts/FarmContext';
import Hero from '../../components/Hero/Hero';
import SearchBar from '../../components/SearchBar/SearchBar';
import Dropdown from '../../components/Dropdown/Dropdown';
import OnboardingModal from '../../components/OnboardingModal/OnboardingModal';
import FilteredFarmsService from '../../services/filtered-farms-service';
import './SearchPage.css';

import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    const { showBackground } = this.context;
    showBackground();
  }

  componentWillUnmount() {
    const { hideBackground } = this.context;
    hideBackground();
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  changePage = () => {
    const { history } = this.props;
    history.push('/farms');
  }

  render() {
    FilteredFarmsService.clearFilteredFarms();
    const { show } = this.state;

    const { farmAdded } = this.context;
    const farmAddStatus = farmAdded === true
      ? <div className="search-page__farm-added--success">Farm added successfully</div>
      : null;

    return (
      <div className="search-page">
        <Hero />
        {farmAddStatus}
        <SearchBar onChangePage={this.changePage} />
        <div className="search-page__under-search-bar">
          <Dropdown onChangePage={this.changePage} />
          <button
            type="button"
            onClick={this.showModal}
            className="search-page__button--onboarding"
          >
            About
            {' '}
            <FontAwesomeIcon icon="question-circle" />
          </button>
        </div>
        <OnboardingModal
          show={show}
          handleClose={this.hideModal}
        />
        <DemoLoginInfo />
      </div>
    );
  }
}

export default SearchPage;

SearchPage.contextType = FarmContext;

SearchPage.defaultProps = {
  history: {},
};

SearchPage.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
};
