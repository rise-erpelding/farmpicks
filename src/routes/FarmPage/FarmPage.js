import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import { Link } from 'react-router-dom'
import FarmsApiService from '../../services/farms-api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Barn from '../../Images/Barn.jpg'
import FarmerAvatar from '../../Images/FarmerAvatar.png'
import './FarmPage.css'

class FarmPage extends Component {
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
    profileImage: '',
    coverImage: '',
    numberOfFavorites: '',
    favoriteId: '',
    showFavorite: false,
    error: null,
  }

  goBack = () => {
    this.props.history.push('/farms')
  }

  addFavorite = () => {
    const { farmId } = this.props.match.params

    FarmsApiService.addFavorite(farmId)
      .then(response => {
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
    let numFavorites = Number(this.state.numberOfFavorites)
    numFavorites = numFavorites + 1
    this.setState({ numberOfFavorites: numFavorites.toString() })
    this.setState({ showFavorite: true })
  }

  removeFavorite = () => {
    const { farmId } = this.props.match.params
    FarmsApiService.getFavoriteId(farmId)
      .then(response => {
        this.deleteFavorite(response.id)
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  deleteFavorite = (favId) => {
    FarmsApiService.removeFavorite(favId)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
    let numFavorites = Number(this.state.numberOfFavorites)
    numFavorites = numFavorites - 1
    this.setState({ numberOfFavorites: numFavorites.toString() })
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
          coverImage: responseData.cover_image,
          numberOfFavorites: responseData.number_of_favorites,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
    FarmsApiService.getUserFavorites()
      .then(response => {
        const isFavorite = response.find(farm => farm.id === Number(farmId))
        if (isFavorite) {
          this.setState({
            showFavorite: true
          })
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render () {
    const { farmId } = this.props.match.params

    const { farmName, address1, address2, city, addressState, zipCode, contactName, phoneNumber, website, farmDescription, purchaseDetails, products, purchaseOptions, profileImage, coverImage, numberOfFavorites } = this.state

    const timeOrTimes = Number(this.state.numberOfFavorites) === 1 ? 'time' : 'times'
    const profile = profileImage ? profileImage : FarmerAvatar
    const cover = coverImage ? coverImage : Barn

    const showHideFavorite = this.state.showFavorite ? 
      <span onClick={this.removeFavorite} >
        Remove Favorite
      </span>
      :
      <span onClick={this.addFavorite}>
        Add Favorite
      </span>

    const showHideHeart = this.state.showFavorite ?
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
        <div className='farm-page__back-button' onClick={this.goBack}>
          <FontAwesomeIcon 
            className='farm-page__chevron-left'
            icon='chevron-left'
          />
        </div>
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
              <h2 className='farm-page__farm-name'>
                {farmName}{' '}{showHideHeart}
              </h2>
              <div className='farm-page__products'>{products.join(', ')}</div>
              <p className='farm-page__farm--number-of-favorites'>
                Favorited
                  {' '}
                {numberOfFavorites}
                {' '}
                {timeOrTimes}
              </p>
            <div className='farm-page__buttons'>
              <button type='button' className='farm-page__button'>
                {showHideFavorite}
              </button>
              <button type='button' className='farm-page__button'>
                <Link to={`/edit/${farmId}`}>Edit Farm</Link>
              </button>
            </div>
              


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