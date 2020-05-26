import React from 'react'
import { Link } from 'react-router-dom'
import FarmerAvatar from '../../Images/FarmerAvatar.png'
import './FarmListItem.css'

export default function FarmListItem(props) {
  const farm = props.info
  const truncatedDescription = farm.farm_description.substring(0, 300) + '...'
  const profile = farm.profile_image ? farm.profile_image : FarmerAvatar
  return (
    <div className="farm-list-item">
      <div className="farm-list-item__img--container">
        <img 
          className="farm-list-item__img" 
          src={profile} 
          alt="farm avatar" />
      </div>
      <div className="farm-list-item__info--container">
        <h4 className="farm-list-item__title">
          <Link to={`/farms/${farm.id}`}>
            {farm.farm_name}
          </Link>
        </h4>
        <div className="farm-list-item__products">
          {farm.products.join(', ')}
        </div>
        <div className="farm-list-item__description--truncated">
          {truncatedDescription} 
        </div>
      </div>
    </div>
  )
}

FarmListItem.defaultProps = {
  info: {}
}