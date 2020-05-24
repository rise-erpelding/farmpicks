import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import './Dropdown.css'

class Dropdown extends Component {
  static defaultProps = {
    products: [],
    purchaseOptions: [],
    onChangePage: () => {}
  }

  static contextType = FarmContext

  //potentially these two methods could be shortened and the common part put into another method but also does it really make the code any shorter or neater?
  handleProductClick = clickedThing => {
    const formattedQuery = '?products=' + clickedThing
    this.context.getFarms(formattedQuery)
    this.props.onChangePage()
  }

  handlePurchaseOptionClick = clickedThing => {
    const formattedQuery = '?purchaseOptions=' + clickedThing
    this.context.getFarms(formattedQuery)
    this.props.onChangePage()
  }

  handleSeeAllClick = () => {
    console.log('handleSeeAllClick')
    this.context.getFarms('')
    this.props.onChangePage()
  }

  render() {
    const productsList = this.context.products.map((product, index) =>
      <li key={index} onClick={() => this.handleProductClick(product)}>{product}</li>)
    const purchaseOptionsList = this.context.purchaseOptions.map((purchaseOption, index) => 
      <li key={index} onClick={() => this.handlePurchaseOptionClick(purchaseOption)}>{purchaseOption}</li>)

    return (
      <div className="dropdown">
        <button className="dropdown__button">Categories</button>
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

    )
  }
}

export default Dropdown