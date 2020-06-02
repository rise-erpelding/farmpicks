import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Filter.css'

class Filter extends Component {

  render () {
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
            onChange={this.updateProducts.bind(this)} />
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
            onChange={this.updatePurchaseOptions.bind(this)} />
          <span className='filter-modal__checkbox--custom'></span>
          {purchaseOption}
        </label>
      </li>)

    return (
      <div className='filter-modal'>
        <h2 className='filter-modal__title'>Filter</h2>
        <form>
          <div>
            <div>
              Products the farm sells:
                    <ValidationError message={this.validateProducts()} />
            </div>
            <ul className='filter-modal__products'>
              {productCheckboxes}
            </ul>
          </div>
          <div>
            <div>
              Purchase Options:
                    <ValidationError message={this.validatePurchaseOptions()} />
            </div>
            <ul className='filter-modal__purchase-options'>
              {purchaseOptionCheckboxes}
            </ul>
          </div>
        </form>
      </div>
    )
  }
}

export default Filter