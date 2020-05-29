import React, { Component } from 'react'
import {  Route, Switch } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import NavBar from '../NavBar/NavBar'
import SearchPage from '../../routes/SearchPage/SearchPage'
import ResultsPage from '../../routes/ResultsPage/ResultsPage'
import FarmPage from '../../routes/FarmPage/FarmPage'
import AddFarmPage from '../../routes/AddFarmPage/AddFarmPage'
import UpdateFarmPage from '../../routes/UpdateFarmPage/UpdateFarmPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

import dummyStore from '../../dummy-store'

class App extends Component {

  state = {
    farms: [],
    products: [],
    purchaseOptions: [],
    error: null,
  }

  setFarms = farms => {
    this.setState({
      farms,
      error: null,
    })
  }

  setProducts = products => {
    this.setState({
      products,
      error: null,
    })
  }

  setPurchaseOptions = purchaseOptions => {
    this.setState({
      purchaseOptions,
      error: null,
    })
  }

  getFarms = query => {
    console.log(query)
    const includesQuery = this.state.farms.filter(farm => farm.farm_description.includes(query))
    console.log(includesQuery)
    this.setState({
      farms: includesQuery
    })
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
    setTimeout(() => this.setState(dummyStore), 600)
  }

  render() {

    const contextValue = {
      farms: this.state.farms,
      products: this.state.products,
      purchaseOptions: this.state.purchaseOptions,
      getFarms: this.getFarms,
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
                exact path={'/'}
                component={SearchPage}
              />
              <Route 
                exact path={'/farms'}
                component={ResultsPage}
              />
              <Route 
                path={'/farms/:farmId'}
                component={FarmPage}
              />
              <Route 
                path={'/add-farm'}
                component={AddFarmPage}
              />
              <Route
                path={'/edit/:farmId'}
                component={UpdateFarmPage}
              />
              <Route 
                component={NotFoundPage}
              />                                    
            </Switch>
          </FarmContext.Provider>
        </main>
      </div>
    )
  }
}

export default App
