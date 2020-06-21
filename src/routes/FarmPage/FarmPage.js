// FIXME:
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import FarmContext from '../../contexts/FarmContext';
import FarmsApiService from '../../services/farms-api-service';
import Barn from '../../Images/Barn.jpg';
import FarmerAvatar from '../../Images/FarmerAvatar.png';
import './FarmPage.css';

class FarmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      showFavorite: false,
      // eslint-disable-next-line react/no-unused-state
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { farmId } = match.params;
    FarmsApiService.getFarmById(farmId)
      .then((responseData) => {
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
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error });
      });
    FarmsApiService.getUserFavorites()
      .then((response) => {
        const isFavorite = response.find((farm) => farm.id === Number(farmId));
        if (isFavorite) {
          this.setState({
            showFavorite: true,
          });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error });
      });
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/farms');
  }

  // adds the favorite to the db
  addFavorite = () => {
    const { match } = this.props;
    const { farmId } = match.params;

    FarmsApiService.addFavorite(farmId)
      .then(() => {
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error });
      });
    const { numberOfFavorites } = this.state;
    let numFavorites = Number(numberOfFavorites);
    numFavorites += 1;
    this.setState({ numberOfFavorites: numFavorites.toString() });
    this.setState({ showFavorite: true });
  }

  // looks up the id of the favorite in the db then calls deleteFavorite(id)
  removeFavorite = () => {
    const { match } = this.props;
    const { farmId } = match.params;
    FarmsApiService.getFavoriteId(farmId)
      .then((response) => {
        this.deleteFavorite(response.id);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error });
      });
  }

  // removes the favorite from the db
  deleteFavorite = (favId) => {
    FarmsApiService.removeFavorite(favId)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error });
      });
    const { numberOfFavorites } = this.state;
    let numFavorites = Number(numberOfFavorites);
    numFavorites -= 1;
    this.setState({ numberOfFavorites: numFavorites.toString() });
    this.setState({ showFavorite: false });
  }

  render() {
    const { match } = this.props;
    const { farmId } = match.params;

    const {
      farmName,
      address1,
      address2,
      city,
      addressState,
      zipCode,
      contactName,
      phoneNumber,
      website,
      farmDescription,
      purchaseDetails,
      products,
      purchaseOptions,
      profileImage,
      coverImage,
      numberOfFavorites,
    } = this.state;

    /* determines whether 'time' or 'times' appears next to the number of favorites
    ex: "Favorited 2 times or Favorited 1 time" */
    const timeOrTimes = Number(numberOfFavorites) === 1 ? 'time' : 'times';
    const profile = profileImage || FarmerAvatar;
    const cover = coverImage || Barn;

    // FIXME: a11y keyboard listener
    const { showFavorite } = this.state;
    const showHideFavorite = showFavorite
      ? (
        <span onClick={this.removeFavorite}>
          Remove Favorite
        </span>
      )
      : (
        <span onClick={this.addFavorite}>
          Add Favorite
        </span>
      );

    const showHideHeart = showFavorite
      ? (
        <FontAwesomeIcon
          className="farm-page__heart"
          icon={['fas', 'heart']}
          onClick={this.removeFavorite}
        />
      )
      : (
        <FontAwesomeIcon
          className="farm-page__heart"
          icon={['far', 'heart']}
          onClick={this.addFavorite}
        />
      );

    return (
      <section className="farm-page">
        <div className="farm-page__back-button" onClick={this.goBack}>
          <FontAwesomeIcon
            className="farm-page__chevron-left"
            icon="chevron-left"
          />
        </div>
        <img
          className="farm-page__img--cover"
          src={cover}
          alt="farm cover"
        />
        <div className="farm-page__container--info">
          <div className="farm-page__container--img">
            <img
              className="farm-page__img--profile"
              src={profile}
              alt="farm avatar"
            />
          </div>
          <div className="farm-page__container--text">
            <h2 className="farm-page__farm-name">
              {farmName}
              {' '}
              {showHideHeart}
            </h2>
            <div className="farm-page__products">{products.join(', ')}</div>
            <p className="farm-page__farm--number-of-favorites">
              Favorited
              {' '}
              {numberOfFavorites}
              {' '}
              {timeOrTimes}
            </p>
            <div className="farm-page__buttons">
              <button type="button" className="farm-page__button">
                {showHideFavorite}
              </button>
              <button type="button" className="farm-page__button">
                <Link to={`/edit/${farmId}`}>Edit Farm</Link>
              </button>
            </div>

            <address className="farm-page__address">
              {address1}
              ,
              {address2 ? `${address2}, ` : ''}
              {city}
              ,
              {addressState}
              {' '}
              {zipCode}
            </address>
            <div>
              Call
              {contactName}
              {' '}
              at
              {phoneNumber}
            </div>
            <div className="farm-page__website"><a href={website}>Website</a></div>
            <p className="farm-page__description">
              {farmDescription}
            </p>
            <hr />
            <h4 className="farm-page__purchasing-info--heading">Purchasing Information</h4>
            <div className="farm-page__purchasing-info--options">{purchaseOptions.join(', ')}</div>
            <p className="farm-page__purchasing-info--description">{purchaseDetails}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default FarmPage;

FarmPage.defaultProps = {
  match: {
    params: {
      farmId: '',
    },
  },
  history: {},
};

FarmPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
};

FarmPage.contextType = FarmContext;
