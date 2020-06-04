import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FarmListItem from '../../components/FarmListItem/FarmListItem'
import FarmsApiService from '../../services/farms-api-service'
import './MyProfilePage.css'


class MyProfilePage extends Component {

  state = {
    firstName: '',
    lastName: '',
    userName: '',
    userType: '',
    userId: '',
    favoriteFarms: [],
    error: null,
  }

  componentDidMount() {
    FarmsApiService.getUserInfo()
      .then(response => {
        this.setState({
          firstName: response[0].first_name,
          lastName: response[0].last_name,
          userName: response[0].user_name,
          userType: response[0].user_type,
          userId: response[0].id,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
    FarmsApiService.getUserFavorites()
      .then(response => {
        this.setState({
          favoriteFarms: response
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render () {

    const { firstName, lastName, userName, userType } = this.state

    let myInfo

    if (this.state.userType === 'Consumer') {
      myInfo = 
        <ul className='my-profile-page__farms-list'>
          <h3>My Saved Farms:</h3>
          {this.state.favoriteFarms.map(farm => 
            <li key={farm.id}>
              <FarmListItem info={farm} />
            </li>)}
        </ul>
    } else if (this.state.userType === 'Farmer') {
      myInfo =
        <Link to={`/farms/${this.state.userId}`}>
          My Farm Page
        </Link>
    }


    return (
      <main className='my-profile-page'>
        <div>
          <h2>Profile information</h2>
          <p>First name: {firstName}</p>
          <p>Last name: {lastName}</p>
          <p>Username: {userName}</p>
          <p>User Type: {userType}</p>
        </div>
        <div>
          {myInfo}
        </div>
      </main>
    )
  }
}

export default MyProfilePage