import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FarmListItem from '../../components/FarmListItem/FarmListItem';
import FarmsApiService from '../../services/farms-api-service';
import './MyProfilePage.css';

class MyProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      userType: '',
      userId: '',
      favoriteFarms: [],
      // eslint-disable-next-line react/no-unused-state
      error: null,
    };
  }

  componentDidMount() {
    FarmsApiService.getUserInfo()
      .then((response) => {
        this.setState({
          firstName: response[0].first_name,
          lastName: response[0].last_name,
          userName: response[0].user_name,
          userType: response[0].user_type,
          userId: response[0].id,
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
        this.setState({
          favoriteFarms: response,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ error });
      });
  }

  render() {
    const {
      firstName, lastName, userName, userType, favoriteFarms, userId,
    } = this.state;

    /* This logic would potentially change how profile page renders based on whether user is a
    consumer or a farmer. Functionality for farmer page hasn't been fully built out yet on backend
    --ideally a farmer column would be added to the farms table to link user id with farm. For now,
    since seed data happens to be structured so that farms id column and users id column match,
    this is a workaround. */
    let myInfo;
    if (userType === 'Consumer') {
      myInfo = (
        <>
          <h3>My Saved Farms:</h3>
          <ul className="my-profile-page__farms-list">
            {favoriteFarms.map((farm) => (
              <li key={farm.id}>
                <FarmListItem info={farm} />
              </li>
            ))}
          </ul>
        </>
      );
    } else if (userType === 'Farmer') {
      myInfo = (
        <Link to={`/farms/${userId}`}>
          My Farm Page
        </Link>
      );
    }

    return (
      <main className="my-profile-page">
        <Link to="/">
          <FontAwesomeIcon
            icon="chevron-left"
            className="my-profile-page__back"
          />
        </Link>
        <div className="my-profile-page__profile-info">
          <h2>Profile information</h2>
          <div className="my-profile-page__avatar">
            <FontAwesomeIcon
              className="my-profile-page__avatar--graphic"
              icon="user"
            />
          </div>
          <h3>
            {firstName}
            {' '}
            {lastName}
          </h3>
          <h6>
            {userType}
            {' '}
            | username:
            {' '}
            {userName}
          </h6>
        </div>
        <div className="my-profile-page__farms">
          {myInfo}
        </div>
      </main>
    );
  }
}

export default MyProfilePage;
