import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import { Link } from 'react-router-dom'
// import FarmListItem from '../../components/FarmListItem/FarmListItem'
import FarmsApiService from '../../services/farms-api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Barn from '../../Images/Barn.jpg'
import FarmerAvatar from '../../Images/FarmerAvatar.png'
import './FarmPage.css'

class FarmPage extends Component {
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
    profileImage: '',
    coverImage: '',
    favoriteId: '',
    showFavorite: false,
    error: null,
  }

  goBack = () => {
    this.props.history.push('/farms')
  }

  addFavorite = () => {
    const { farmId } = this.props.match.params

    FarmsApiService.addFavorite(11, farmId)
      .then(response => {
        console.log('favorite added')
        console.log(response)
      })
    this.setState({ showFavorite: true })
  }

  removeFavorite = () => {
    const { farmId } = this.props.match.params
    FarmsApiService.getFavoriteId(11, farmId)
      .then(response => {
        this.deleteFavorite(response.id)
      })
      // TODO: HALP WITH THIS
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  deleteFavorite = (favId) => {
    FarmsApiService.removeFavorite(favId)
      .then(response => {
        console.log('favorite removed')
        console.log(response)
      })
    this.setState({ showFavorite: false })
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
          profileImage: responseData.profile_image,
          coverImage: responseData.cover_image
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render () {
    const { farmId } = this.props.match.params
    // console.log(`value of farmId is ` + farmId)
    // const farms = this.context.farms
    // const farmInfo = farms.find(farm => 
    //   farm.id === farmId) || {}

    const { farmName, address1, address2, city, addressState, zipCode, contactName, phoneNumber, website, farmDescription, purchaseDetails, products, purchaseOptions, profileImage, coverImage } = this.state

    const profile = profileImage ? profileImage : FarmerAvatar
    const cover = coverImage ? coverImage : Barn

    const showHideFavorite = this.state.showFavorite ? 
      <FontAwesomeIcon 
        className='farm-page__heart' 
        icon={['fas', 'heart']} 
        onClick={this.removeFavorite} 
      />
      :
      <FontAwesomeIcon 
        className='farm-page__heart' 
        icon={['far', 'heart']} 
        onClick={this.addFavorite} 
      />

    return (
      <section className='farm-page'>
        <div className='farm-page__back-button' onClick={this.goBack}><FontAwesomeIcon icon='chevron-left' /></div>
        <img 
          className='farm-page__img--cover' 
          src={cover} 
          alt='farm cover' />
        <div className='farm-page__container--info'>
          <div className='farm-page__container--img'>
            <img 
              className='farm-page__img--profile'
              src={profile} 
              alt='farm avatar' />
          </div>
          <div className='farm-page__container--text'>
            <h2 className='farm-page__farm-name'>{farmName}</h2>

            {showHideFavorite}

            <Link to={`/edit/${farmId}`} className='farm-page__update-farm-link'>Edit</Link>
            <div className='farm-page__products'>{products.join(', ')}</div>
            <address className='farm-page__address'>
              {address1}, {address2 ? address2 + ', ' : ''} 
              {city}, {addressState} {zipCode}
            </address>
            <div>Call {contactName} at {phoneNumber}</div>
            <div className='farm-page__website'><a href={website}>Website</a></div>
            <p className='farm-page__description'>
              {farmDescription}
            </p>
            <hr />
            <h4 className='farm-page__purchasing-info--heading'>Purchasing Information</h4>
            <div className='farm-page__purchasing-info--options'>{purchaseOptions.join(', ')}</div>
            <p className='farm-page__purchasing-info--description'>{purchaseDetails}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default FarmPage