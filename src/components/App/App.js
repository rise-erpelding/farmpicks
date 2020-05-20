import React, { Component } from 'react'
import {  Route, Switch } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import NavBar from '../NavBar/NavBar'
import SearchPage from '../../routes/SearchPage/SearchPage'
import ResultsPage from '../../routes/ResultsPage/ResultsPage'
// import FarmPage from '../../routes/FarmPage/FarmPage'
// import AddFarmPage from '../../routes/AddFarmPage/AddFarmPage'
// import UpdateFarmPage from '../../routes/UpdateFarmPage/UpdateFarmPage'
// import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import config from '../../config'
import './App.css'

class App extends Component {

  state = {
    farms: [],
    error: null,
  }

  setFarms = farms => {
    this.setState({
      farms,
      error: null,
    })
  }

  searchFarms = query => {
    //do stuff
  }

  addFarm = newFarm => {
    this.setState({
      farms: [...this.state.farms, newFarm]
    })
  }

  updateFarm = updatedFarm => {
    this.setState({
      farms: this.state.farms.map(farm =>
        (farm.id !== updatedFarm.id) ? farm : updatedFarm
        )
    })
  }

  componentDidMount() {
    let url
    
    fetch(config.API_ENDPOINT + '/farms', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
        //auth will go here
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setFarms)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }


  render() {

    const contextValue = {
      farms: this.state.farms,
      searchFarms: this.searchFarms,
      addFarm: this.addFarm,
      updateFarm: this.updateFarm,
    }

    return (
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main>
          <FarmContext.Provider
            value={contextValue}>
            <Switch>
              <Route 
                path={'/'}
                component={SearchPage}
              />
              <Route 
                path={'/farms'}
                component={ResultsPage}
              />
              {/* <Route 
                path={'/farms/:farmId'}
                component={FarmPage}
              /> */}
              {/* <Route 
                path={'/add-farm'}
                component={AddFarmPage}
              /> */}
              {/* <Route
                path={'/edit/:farmId'}
                component={UpdateFarmPage}
              /> */}
              {/* <Route 
                component={NotFoundPage}
              />                                     */}
            </Switch>
          </FarmContext.Provider>
        </main>
      </div>
    )
  }
}

export default App
