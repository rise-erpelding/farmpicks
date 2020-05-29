import React, { Component } from 'react'
import FarmContext from '../../contexts/FarmContext'
import { Link } from 'react-router-dom'
// import FarmListItem from '../../components/FarmListItem/FarmListItem'
import Barn from '../../Images/Barn.jpg'
import FarmerAvatar from '../../Images/FarmerAvatar.png'
import './FarmPage.css'

class FarmPage extends Component {
  static contextType = FarmContext

  goBack = () => {
    this.props.history.push('/farms')
  }

  render () {
    const { farmId } = this.props.match.params
    console.log(`value of farmId is ` + farmId)
    const farms = this.context.farms
    const farmInfo = farms.find(farm => 
      farm.id === Number(farmId)) || {}
      console.log(farmInfo)

    const { farm_name, address_1, address_2, city, state, zip_code, contact_name, phone_number, website, farm_description, purchase_details, products, purchase_options, profile_image, cover_image } = farmInfo

    const profile = profile_image ? profile_image : FarmerAvatar
    const cover = cover_image ? cover_image : Barn

    return (
      <section className="farm-page">
        <div className="farm-page__back-button" onClick={this.goBack}>X</div>
        <img 
          className="farm-page__img--cover" 
          src={cover} 
          alt="farm cover" />
        <div className="farm-page__container--info">
          <div className="farm-page__container--img">
            <img 
              className="farm-page__img--profile"
              src={profile} 
              alt="farm avatar" />
          </div>
          <div className="farm-page__container--text">
            <h2 className="farm-page__farm-name">{farm_name}</h2>
            <Link to={`/edit/${farmId}`} className="farm-page__update-farm-link">Edit</Link>
            <div className="farm-page__products">{products.join(', ')}</div>
            <address className="farm-page__address">
              {address_1}, {address_2 ? address_2 + ', ' : ''} 
              {city}, {state} {zip_code}
            </address>
            <div>Call {contact_name} at {phone_number}</div>
            <div className="farm-page__website"><a href={website}>Website</a></div>
            <p className="farm-page__description">
              {farm_description}
            </p>
            <hr />
            <h4 className="farm-page__purchasing-info--heading">Purchasing Information</h4>
            <div className="farm-page__purchasing-info--options">{purchase_options.join(', ')}</div>
            <p className="farm-page__purchasing-info--description">{purchase_details}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default FarmPage