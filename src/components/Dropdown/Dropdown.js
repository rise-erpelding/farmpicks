/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import FarmContext from '../../contexts/FarmContext';
import './Dropdown.css';

class Dropdown extends Component {
  handleProductClick = (clickedThing) => {
    const formattedQuery = `?products=${clickedThing}`;
    const { getFarms } = this.context;
    const { onChangePage } = this.props;
    getFarms(formattedQuery);
    onChangePage();
  }

  handlePurchaseOptionClick = (clickedThing) => {
    const formattedQuery = `?purchaseOptions=${clickedThing}`;
    const { getFarms } = this.context;
    const { onChangePage } = this.props;
    getFarms(formattedQuery);
    onChangePage();
  }

  handleSeeAllClick = () => {
    const { getFarms } = this.context;
    const { onChangePage } = this.props;
    getFarms('');
    onChangePage();
  }

  render() {
    const { products } = this.context;
    const { purchaseOptions } = this.context;
    const productsList = products.map(
      (product, index) => (
        <li
          key={index}
          onClick={() => this.handleProductClick(product)}
        >
          {product}
        </li>
      ),
    );
    const purchaseOptionsList = purchaseOptions.map(
      (purchaseOption, index) => (
        <li
          key={index}
          onClick={() => this.handlePurchaseOptionClick(purchaseOption)}
        >
          {purchaseOption}
        </li>
      ),
    );

    return (
      <div className="dropdown">
        <button type="button" className="dropdown__button">
          See Categories
          <FontAwesomeIcon icon="caret-down" />
        </button>
        <div className="dropdown__content">
          <h5>Products</h5>
          <ul className="dropdown__products">
            {productsList}
          </ul>
          <h5>Purchase Options</h5>
          <ul className="dropdown__purchase-options">
            {purchaseOptionsList}
          </ul>
          <h5 className="dropdown__all-farms" onClick={() => this.handleSeeAllClick()}>See all farms</h5>
        </div>
      </div>

    );
  }
}

export default Dropdown;

Dropdown.defaultProps = {
  onChangePage: () => {},
};

Dropdown.propTypes = {
  onChangePage: PropTypes.func,
};

Dropdown.contextType = FarmContext;
