import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FarmContext from '../../contexts/FarmContext';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  updateQuery = (query) => {
    this.setState({
      searchTerm: query,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    const { getFarms } = this.context;
    const { onChangePage } = this.props;
    const formattedQuery = `?q=${searchTerm}`;
    getFarms(formattedQuery);
    onChangePage();
  }

  render() {
    return (
      <form
        id="searchBar"
        className="search-bar"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="search-bar"
          aria-labelledby="searchBar"
          placeholder="Search for farms or products..."
          onChange={(e) => this.updateQuery(e.target.value)}
        />
        <button
          type="submit"
          aria-labelledby="searchBar"
        >
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
    );
  }
}

export default SearchBar;

SearchBar.defaultProps = {
  onChangePage: () => {},
};

SearchBar.contextType = FarmContext;

SearchBar.propTypes = {
  onChangePage: PropTypes.func,
};
