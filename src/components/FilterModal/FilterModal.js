import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import './FilterModal.css'


class FilterModal extends Component {
  static defaultProps = {
    onUpdateProducts: () => {},
    onUpdatePurchaseOptions: () => {},
  }

  static contextType = FarmContext

  state = {
    products: [],
    purchaseOptions: []
  }

  onUpdateProducts = e => {
    const productsArray = this.state.products
    if (e.target.checked) {
        productsArray.push(e.target.value)
      this.setState({ products: productsArray })
    } else if (!e.target.checked) {
      const removedProducts = productsArray.filter(product => product !== e.target.value)
      this.setState({ products: removedProducts })
    }

  }

  onUpdatePurchaseOptions = e => {
    const purchaseOptionsArray = this.state.purchaseOptions
    if (e.target.checked) {
        purchaseOptionsArray.push(e.target.value)
      this.setState({ purchaseOptions: purchaseOptionsArray })
    } else if (!e.target.checked) {
      const removedPurchaseOptions = purchaseOptionsArray.filter(option => option !== e.target.value)
      this.setState({ purchaseOptions: removedPurchaseOptions })
    }

  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onUpdateOptions(this.state.products, this.state.purchaseOptions)
    this.props.handleClose()
  }

  render () {
    const showHideClassName = this.props.show ? 'filter-modal display-block' : 'filter-modal display-none'

    const { products } = this.context
    const { purchaseOptions } = this.context

    const productCheckboxes = products.map((product, index) => 
      <li key={index}>
        <label className='filter-modal__checkbox--label' htmlFor={'product' + index}>
          <input 
            type='checkbox' 
            id={'product' + index} 
            name={'product' + index}
            value={product}
            onChange={this.onUpdateProducts.bind(this)} />
          <span className='filter-modal__checkbox--custom'></span>
          {product}
        </label>
      </li>)

      const purchaseOptionCheckboxes = purchaseOptions.map((purchaseOption, index) => 
      <li key={index}>
        <label className='filter-modal__checkbox--label' htmlFor={'purchaseOption' + index}>
          <input
            type='checkbox' 
            id={'purchaseOption' + index} 
            name={'purchaseOption' + index} 
            value={purchaseOption}
            onChange={this.onUpdatePurchaseOptions.bind(this)} />
          <span className='filter-modal__checkbox--custom'></span>
          {purchaseOption}
        </label>
      </li>)

    return (
      <div className={showHideClassName}>
        <div className='filter-modal__main'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div>
                Filter by product type:
              </div>
              <ul className='filter-modal__products'>
                {productCheckboxes}
              </ul>
            </div>
            <div>
              <div>
                Filter by purchase option:
              </div>
              <ul className='filter-modal__purchase-options'>
                {purchaseOptionCheckboxes}
              </ul>
            </div>
            <button type='button' onClick={this.props.handleClose}>
              Close
            </button>
            <button type='submit'>
              Filter
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default FilterModal