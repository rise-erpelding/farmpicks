import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import config from '../../config'
import './Dropdown.css'

class Dropdown extends Component {
  static defaultProps = {
    onChangePage: () => {}
  }

  static contextType = FarmContext

  state = {
    products: [],
    purchaseOptions: [],
    error: null
  }

  setProducts = products => {
    this.setState({
      products,
      error: null,
    })
  }

  setPurchaseOptions = purchaseOptions => {
    this.setState({
      purchaseOptions,
      error: null,
    })
  }

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



  componentDidMount() {
    const productsEndpoint = config.API_ENDPOINT + '/products'
    const purchaseOptionsEndpoint = config.API_ENDPOINT + '/purchase-options'
    Promise.all([
      fetch(productsEndpoint, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
          //auth here
        }
      }),
      fetch(purchaseOptionsEndpoint, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
          //auth here
        }
      })
    ])
      .then(([productsRes, purchaseOptionsRes]) => {
        if (!productsRes.ok)
          return productsRes.json().then(error => Promise.reject(error))
        if (!purchaseOptionsRes.ok)
          return purchaseOptionsRes.json().then(error => Promise.reject(error))
        return Promise.all([productsRes.json(), purchaseOptionsRes.json()])
      })
      .then(([products, purchaseOptions]) => {
        this.setProducts(products)
        this.setPurchaseOptions(purchaseOptions)
      })
  }

  render() {
    const productsList = this.state.products.map((product, index) =>
      <li key={index} onClick={() => this.handleProductClick(product)}>{product}</li>)
    const purchaseOptionsList = this.state.purchaseOptions.map((purchaseOption, index) => 
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