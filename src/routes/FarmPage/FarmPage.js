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
    const farmId = Number(this.props.match.params.farmId)
    // console.log(`value of farmId is ` + farmId)
    const farms = this.context.farms
    const farmInfo = farms.find(farm => 
      farm.id === farmId) || {}

    const profile = farmInfo.profile_image ? farmInfo.profile_image : FarmerAvatar
    const cover = farmInfo.cover_image ? farmInfo.cover_image : Barn

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
            <h2 className="farm-page__farm-name">{farmInfo.farm_name}</h2>
            <Link to={`/edit/${farmId}`} className="farm-page__update-farm-link">Edit</Link>
            <div className="farm-page__products">{farmInfo.products.join(', ')}</div>
            <address className="farm-page__address">
              {farmInfo.address_1}, {farmInfo.address_2 ? farmInfo.address_2 + ', ' : ''} 
              {farmInfo.city}, {farmInfo.state} {farmInfo.zip_code}
            </address>
            <div className="farm-page__website"><a href={farmInfo.website}>Website</a></div>
            <p className="farm-page__description">
              {farmInfo.farm_description}
            </p>
            <hr />
            <h4 className="farm-page__purchasing-info--heading">Purchasing Information</h4>
            <div className="farm-page__purchasing-info--options">{farmInfo.purchase_options.join(', ')}</div>
            <p className="farm-page__purchasing-info--description">{farmInfo.purchase_details}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default FarmPage