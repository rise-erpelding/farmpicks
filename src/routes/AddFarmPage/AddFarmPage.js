import React, { Component } from 'react'
import config from '../../config'
import FarmContext from '../../contexts/FarmContext'
import './AddFarmPage.css'


class AddFarmPage extends Component {
  static contextType = FarmContext

  state = {
    farmName: '',
    products: [],
    farmDescription: '',
    address1: '',
    address2: '',
    city: '',
    addressState: '',
    zipCode: '',
    contactName: '',
    phoneNumber: '',
    purchaseOptions: [],
    purchaseDetails: '',
    website: '',
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault()
    const newFarm = {
      farm_name: this.state.farmName,
      products: this.state.products,
      farm_description: this.state.farmDescription,
      address_1: this.state.address1,
      address_2: this.state.address2,
      city: this.state.city,
      state: this.state.addressState,
      zip_code: this.state.zipCode,
      contact_name: this.state.contactName,
      phone_number: this.state.phoneNumber,
      purchase_options: this.state.purchaseOptions,
      purchase_details: this.state.purchaseDetails,
      website: this.state.website
    }
    console.log(newFarm)
    const url = config.API_ENDPOINT + '/farms'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newFarm),
      headers: {
        'content-type': 'application/json'
        //auth here
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      this.context.addFarm(data)
      this.props.history.push('/')
    })
    .catch(error => {
      console.log(error)
      this.setState({ error })
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  updateFarmName = farmName => {
    this.setState({farmName: farmName})
  }

  updateProducts = product => {
    console.log(product)
    // TODO: start here, how to get the value from the checkbox as it is checked and unchecked, need to build an array from what is checked
  }


  render() {
    const { products } = this.context
    const { purchaseOptions } = this.context
    const productCheckboxes = products.map((product, index) => 
      <li key={index}>
        <label className="add-farm-page__checkbox--label" htmlFor={'product' + index}>
          <input 
            onChange={e => this.updateProducts(e.target.value)}
            type="checkbox" 
            id={'product' + index} 
            name={'product' + index} 
            value={product} />
          <span className="add-farm-page__checkbox--custom"></span>
          {product}
        </label>
      </li>)
    const purchaseOptionCheckboxes = purchaseOptions.map((purchaseOption, index) => 
      <li key={index}>
        <label className="add-farm-page__checkbox--label" htmlFor={'purchaseOption' + index}>
          <input
            type="checkbox" 
            id={'purchaseOption' + index} 
            name={'purchaseOption' + index} 
            value={purchaseOption} />
          <span className="add-farm-page__checkbox--custom"></span>
          {purchaseOption}
        </label>
      </li>)

    return (
      <div className="add-farm-page">
        <h2 className="add-farm-page__title">Add a farm</h2>
        <form>
          <div className="add-farm-page__farm-details">
            <div className="add-farm-page__farm-details--label">
              Farm Details
            </div>
            <ul className="add-farm-page__farm-details--form">
              <li>
                <label htmlFor="farm-name">Farm Name:</label>
                <input 
                  onChange={e => this.updateFarmName(e.target.value)} 
                  type="text" 
                  name="farm-name" 
                  id="farm-name" />
              </li>
              <li>
                <p>Stuff your farm sells:</p>
                <ul className="add-farm-page__products">
                  {productCheckboxes}
                </ul>
              </li>
              <li>
                <label htmlFor="farm-description">Farm Description:</label>
                <textarea id="farm-description" name="farm-description" rows="12" cols="60" />
              </li>
              <li>
                <label htmlFor="address-line-1">Address Line 1:</label>
                <input className="add-farm-field" type="text" name="address-line-1" id="address-line-1" />
              </li>
              <li>
                <label htmlFor="address-line-2">Address Line 2:</label>
                <input className="add-farm-field" type="text" name="address-line-2" id="address-line-2" />
              </li>
              <li>
                <label htmlFor="city">City:</label>
                <input className="add-farm-field" type="text" name="city" id="city" />
              </li>
              <li>
                <label htmlFor="state">State:</label>
                <input className="add-farm-field" type="text" name="state" id="state" />
              </li>
              <li>
                <label htmlFor="zip">Zip Code:</label>
                <input className="add-farm-field" type="text" name="zip" id="zip" />
              </li>
              <li>
                <label htmlFor="contact-name">Contact name:</label>
                <input className="add-farm-field" type="text" name="contact-name" id="contact-name" />
              </li>
              <li>
                <label htmlFor="phone">Phone number</label>
                <input className="add-farm-field" type="text" name="phone" id="phone" />
              </li>
              <li>
                <label htmlFor="website">Website:</label>
                <input className="website-field" type="text" name="website" id="website" />
              </li>
            </ul>
          </div>
          {/* <hr /> */}
          <div className="add-farm-page__purchase-details">
            <div className="add-farm-page__purchase-details--label">
              Purchase Details
            </div>
              <ul className="add-farm-page__purchase-details--form">
                <li>
                  <p>Get methods:</p>
                  <ul className="add-farm-page__purchase-options">
                    {purchaseOptionCheckboxes}
                  </ul>
                </li>
                <li>
                  <label htmlFor="purchase-details">Purchase details:</label>
                  <textarea id="purchase-details" name="purchase-details" rows="12" cols="60" />
                </li>

                {/* These are not currently working features
                <div>Upload Profile photo</div>
                <div>Upload Cover photo</div> */}
            </ul>
          </div>
          <div className="add-farm-page__buttons">
            <button type="button">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddFarmPage