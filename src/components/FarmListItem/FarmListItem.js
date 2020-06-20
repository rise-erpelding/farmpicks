import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FarmerAvatar from '../../Images/FarmerAvatar.png';
import './FarmListItem.css';

export default function FarmListItem(props) {
  const { info } = props;
  const {
    id,
    farm_name: farmName,
    products,
    profile_image: profileImage,
  } = info;
  const profile = profileImage || FarmerAvatar;
  return (
    <div className="farm-list-item">
      <div className="farm-list-item__img--container">
        <Link to={`/farms/${id}`}>
          <img
            className="farm-list-item__img"
            src={profile}
            alt="farm avatar"
          />
        </Link>
      </div>
      <div className="farm-list-item__info--container">
        <h4 className="farm-list-item__title">
          <Link to={`/farms/${id}`}>
            {farmName}
          </Link>
        </h4>
        <div className="farm-list-item__products">
          {products.join(', ')}
        </div>
      </div>
    </div>
  );
}

FarmListItem.defaultProps = {
  info: {
    farm_description: '',
    profile_image: '',
    farm_name: '',
    products: [],
    id: 0,
  },
};

FarmListItem.propTypes = {
  info: PropTypes.shape({
    farm_description: PropTypes.string,
    profile_image: PropTypes.string,
    farm_name: PropTypes.string,
    products: PropTypes.array,
    id: PropTypes.number,
  }),
};
