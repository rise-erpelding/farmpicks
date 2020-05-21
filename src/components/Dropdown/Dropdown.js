import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'

class Dropdown extends Component {
  render() {
    return (
      <div>
        <ul>
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
        <ul>
          <li>Delivery</li>
          <li>Pick-up</li>
          <li>Shipping</li>
          <li>Farmer's Market</li>
        </ul>
        <div>See all farms</div>
      </div>

    )
  }
}

export default Dropdown