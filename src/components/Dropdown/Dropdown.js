import React, { Component } from 'react'
// import FarmContext from '../../contexts/FarmContext'
import './Dropdown.css'

class Dropdown extends Component {
  render() {
    return (
      <div className="dropdown">
        <button className="dropdown__button">Categories</button>
        <div className="dropdown__content">
          <h5>Products</h5>
          <ul className="dropdown__products">
            <li>Produce</li>
            <li>Meat/Poultry</li>
            <li>Eggs</li>
            <li>Dairy</li>
            <li>Seafood</li>
            <li>Bee Products</li>
            <li>Prepared Foods</li>
            <li>Bath & Body Products</li>
            <li>Nuts/Dried Fruits</li>
            <li>Preserves/Syrup</li>
            <li>Coffee & Tea</li>
            <li>Plants</li>
          </ul>
          <h5>Purchase Options</h5>
          <ul className="dropdown__purchase-options">
            <li>Delivery</li>
            <li>Pick-up</li>
            <li>Shipping</li>
            <li>Farmer's Market</li>
          </ul>
          <h5 className="dropdown__all-farms">See all farms</h5>
        </div>
      </div>

    )
  }
}

export default Dropdown