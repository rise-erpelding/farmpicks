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
import config from '../../config'
import './App.css'

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
    const url = config.API_ENDPOINT + '/farms/' + query
    console.log(url)
    
    fetch(url, {
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
    const productsEndpoint = config.API_ENDPOINT + '/products'
    const purchaseOptionsEndpoint = config.API_ENDPOINT + '/purchase-options'
    Promise.all([
      fetch(productsEndpoint, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
          //auth here
        }
      }),
      fetch(purchaseOptionsEndpoint, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
          //auth here
        }
      })
    ])
      .then(([productsRes, purchaseOptionsRes]) => {
        if (!productsRes.ok)
          return productsRes.json().then(error => Promise.reject(error))
        if (!purchaseOptionsRes.ok)
          return purchaseOptionsRes.json().then(error => Promise.reject(error))
        return Promise.all([productsRes.json(), purchaseOptionsRes.json()])
      })
      .then(([products, purchaseOptions]) => {
        this.setProducts(products)
        this.setPurchaseOptions(purchaseOptions)
      })
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
