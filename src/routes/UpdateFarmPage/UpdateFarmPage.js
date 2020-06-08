import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import ValidationError from '../../components/ValidationError/ValidationError'
import FormFieldExplanation from '../../components/FormFieldExplanation/FormFieldExplanation'
import FarmsApiService from '../../services/farms-api-service'
import './UpdateFarmPage.css'

class UpdateFarmPage extends Component {

  static defaultProps = {
    match: {
      params: {
        farmId: ''
      }
    }
  }

  static contextType = FarmContext

  state = {
    farmName: '',
    farmDescription: '',
    address1: '',
    address2: '',
    city: '',
    addressState: '',
    zipCode: '',
    contactName: '',
    phoneNumber: '',
    website: '',
    purchaseDetails: '',
    products: [],
    purchaseOptions: [],
    error: null,
  }

  componentDidMount() {
    const { farmId } = this.props.match.params
      FarmsApiService.getFarmById(farmId)
      .then(responseData => {
        this.setState({
          farmName: responseData.farm_name,
          products: responseData.products,
          farmDescription: responseData.farm_description,
          address1: responseData.address_1,
          address2: responseData.address_2,
          city: responseData.city,
          addressState: responseData.state,
          zipCode: responseData.zip_code,
          contactName: responseData.contact_name,
          phoneNumber: responseData.phone_number,
          purchaseOptions: responseData.purchase_options,
          purchaseDetails: responseData.purchase_details,
          website: responseData.website,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { farmId } = this.props.match.params
    const updatedFarm = {
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

    FarmsApiService.updateFarm(updatedFarm, farmId)
    .then(() => {
      this.context.updateFarm(updatedFarm)
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  validateFarmName = () => {
    const farmName = this.state.farmName.trim()
    if (farmName.length === 0) {
      return '*Farm name is required'
    }
  }

  validateProducts = () => {
    if (this.state.products.length === 0) {
      return '*Select at least one product representing what the farm sells'
    }
  }

  validatePurchaseOptions = () => {
    if (this.state.purchaseOptions.length === 0) {
      return '*Select at least one way that consumers can get products from the farm'
    }
  }

  updateFarmName = e => {
    this.setState({farmName: e.target.value})
  }

  updateFarmDescription = e => {
    this.setState({farmDescription: e.target.value})
  }

  updateAddress1 = e => {
    this.setState({address1: e.target.value})
  }

  updateAddress2 = e => {
    this.setState({address2: e.target.value})
  }

  updateCity = e => {
    this.setState({city: e.target.value})
  }

  updateAddressState = e => {
    this.setState({addressState: e.target.value})
  }

  updateZipCode = e => {
    this.setState({zipCode: e.target.value})
  }

  updateContactName = e => {
    this.setState({contactName: e.target.value})
  }

  updatePhoneNumber = e => {
    this.setState({phoneNumber: e.target.value})
  }

  updateWebsite = e => {
    this.setState({website: e.target.value})
  }

  updatePurchaseDetails = e => {
    this.setState({purchaseDetails: e.target.value})
  }

  updateProducts(e) {
    const productsArray = this.state.products
    if (e.target.checked) {
        productsArray.push(e.target.value)
      this.setState({ products: productsArray })
    } else if (!e.target.checked) {
      const removedProducts = productsArray.filter(product => product !== e.target.value)
      this.setState({ products: removedProducts })
    }
  }

  updatePurchaseOptions(e) {
    const purchaseOptionsArray = this.state.purchaseOptions
    if (e.target.checked) {
        purchaseOptionsArray.push(e.target.value)
      this.setState({ purchaseOptions: purchaseOptionsArray })
    } else if (!e.target.checked) {
      const removedPurchaseOptions = purchaseOptionsArray.filter(option => option !== e.target.value)
      this.setState({ purchaseOptions: removedPurchaseOptions })
    }
  }

  render() {
    const { products } = this.context
    const { purchaseOptions } = this.context
    const productCheckboxes = products.map((product, index) => 
      <li key={index}>
        <label className="update-farm-page__checkbox--label" htmlFor={'product' + index}>
          <input 
            type="checkbox" 
            id={'product' + index} 
            name={'product' + index}
            value={product}
            checked={this.state.products.includes(product) ? true : false}
            onChange={this.updateProducts.bind(this)} />
          <span className="update-farm-page__checkbox--custom"></span>
          {product}
        </label>
      </li>)
    const purchaseOptionCheckboxes = purchaseOptions.map((purchaseOption, index) => 
      <li key={index}>
        <label className="update-farm-page__checkbox--label" htmlFor={'purchaseOption' + index}>
          <input
            type="checkbox" 
            id={'purchaseOption' + index} 
            name={'purchaseOption' + index} 
            value={purchaseOption}
            checked={this.state.purchaseOptions.includes(purchaseOption) ? true : false}
            onChange={this.updatePurchaseOptions.bind(this)} />
          <span className="update-farm-page__checkbox--custom"></span>
          {purchaseOption}
        </label>
      </li>)
    const farmDescriptionExp = 'What the farm sells and/or any farming practices that are relevant.'
    const purchaseDetailsExp = 'What is the best way to get products from the farm. Accepted forms of payment are also useful for consumers.'

    const { farmName, address1, address2, city, addressState, zipCode, contactName, phoneNumber, website, farmDescription, purchaseDetails } = this.state

    return (
      <div className="update-farm-page">
        <h2 className="update-farm-page__title">Add a farm</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="update-farm-page__farm-details">
            <div className="update-farm-page__farm-details--label">
              Farm Details
            </div>
            <ul className="update-farm-page__farm-details--form">

              <li>
                <label htmlFor="farm-name">
                  Farm Name:
                  <ValidationError message={this.validateFarmName()} />
                </label>
                <input 
                  onChange={this.updateFarmName.bind(this)} 
                  type="text" 
                  name="farm-name" 
                  id="farm-name"
                  value={farmName}
                  required />
              </li>
              <li>
                <div>
                  Products the farm sells:
                  <ValidationError message={this.validateProducts()} />
                </div>
                <ul className="update-farm-page__products">
                  {productCheckboxes}
                </ul>
              </li>
              <li>
                <label htmlFor="farm-description">
                  Farm Description:
                  <FormFieldExplanation message={farmDescriptionExp} />
                </label>
                <textarea 
                  onChange={this.updateFarmDescription.bind(this)} 
                  id="farm-description" 
                  name="farm-description" 
                  rows="12" 
                  cols="60"
                  value={farmDescription} />
              </li>
              <li>
                <label htmlFor="address-line-1">Address Line 1:</label>
                <input 
                  onChange={this.updateAddress1.bind(this)} 
                  type="text" 
                  name="address-line-1" 
                  id="address-line-1"
                  value={address1} />
              </li>
              <li>
                <label htmlFor="address-line-2">Address Line 2:</label>
                <input 
                  onChange={this.updateAddress2.bind(this)} 
                  type="text" 
                  name="address-line-2" 
                  id="address-line-2"
                  value={address2} />
              </li>
              <li>
                <label htmlFor="city">City:</label>
                <input 
                  onChange={this.updateCity.bind(this)} 
                  type="text" 
                  name="city" 
                  id="city"
                  value={city} />
              </li>
              <li>
                <label htmlFor="state">State:</label>
                <input 
                  onChange={this.updateAddressState.bind(this)} 
                  type="text" 
                  name="state" 
                  id="state"
                  value={addressState} />
              </li>
              <li>
                <label htmlFor="zip">Zip Code:</label>
                <input 
                  onChange={this.updateZipCode.bind(this)} 
                  type="text" 
                  name="zip" 
                  id="zip"
                  value={zipCode} />
              </li>
              <li>
                <label htmlFor="contact-name">Contact name:</label>
                <input 
                  onChange={this.updateContactName.bind(this)} 
                  type="text" 
                  name="contact-name" 
                  id="contact-name"
                  value={contactName} />
              </li>
              <li>
                <label htmlFor="phone">Phone number</label>
                <input 
                  onChange={this.updatePhoneNumber.bind(this)} 
                  type="text" 
                  name="phone" 
                  id="phone"
                  value={phoneNumber} />
              </li>
              <li>
                <label htmlFor="website">Website:</label>
                <input 
                  onChange={this.updateWebsite.bind(this)} 
                  type="text" 
                  name="website" 
                  id="website"
                  value={website} />
              </li>
            </ul>
          </div>
          {/* <hr /> */}
          <div className="update-farm-page__purchase-details">
            <div className="update-farm-page__purchase-details--label">
              Purchase Details
            </div>
              <ul className="update-farm-page__purchase-details--form">
                <li>
                  <div>
                    Purchase Options:
                    <ValidationError message={this.validatePurchaseOptions()} />
                  </div>
                  <ul className="update-farm-page__purchase-options">
                    {purchaseOptionCheckboxes}
                  </ul>
                </li>
                <li>
                  <label htmlFor="purchase-details">
                    Purchase details:
                    <FormFieldExplanation message={purchaseDetailsExp} />
                  </label>
                  <textarea 
                    onChange={this.updatePurchaseDetails.bind(this)} 
                    id="purchase-details" 
                    name="purchase-details" 
                    rows="12" 
                    cols="60"
                    value={purchaseDetails} />
                </li>

                {/* These are not currently working features
                <div>Upload Profile photo</div>
                <div>Upload Cover photo</div> */}
            </ul>
          </div>
          <div className="update-farm-page__buttons">
            <button onClick={this.handleClickCancel} type="button">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateFarmPage