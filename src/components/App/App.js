import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import FarmContext from '../../contexts/FarmContext'
import NavBar from '../NavBar/NavBar'
import SearchPage from '../../routes/SearchPage/SearchPage'
import ResultsPage from '../../routes/ResultsPage/ResultsPage'
import FarmPage from '../../routes/FarmPage/FarmPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import MyProfilePage from '../../routes/MyProfilePage/MyProfilePage'
import AddFarmPage from '../../routes/AddFarmPage/AddFarmPage'
import UpdateFarmPage from '../../routes/UpdateFarmPage/UpdateFarmPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import FarmsApiService from '../../services/farms-api-service'
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import TokenService from '../../services/token-service'
import FilteredFarmsService from '../../services/filtered-farms-service'
import './App.css'

class App extends Component {
  state = {
    farms: [],
    filteredFarms: [],
    products: [],
    purchaseOptions: [],
    farmAdded: false,
    isLoggedIn: TokenService.hasAuthToken(),
    showBackground: false,
    error: null,
  }
  



  setFarms = farms => {
    this.setState({
      farms: farms,
      filteredFarms: farms,
      error: null,
    })

    if (farms.length > 0) {
      FilteredFarmsService.setFilteredFarms(JSON.stringify(farms))
    } 
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
    FarmsApiService.getFarms(query)
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
    this.setState({
      farmAdded: true
    })
  }

  updateFarm = updatedFarm => {
    this.setState({
      farms: this.state.farms.map(farm =>
        (farm.id !== updatedFarm.id) ? farm : updatedFarm
      )
    })
  }

  filterOptions = (products, purchaseOptions) => {
    // filters according to products and purchase options in ResultsPage
    const filteredFarms = []
    if (products.length === 0 && purchaseOptions.length === 0) {
      this.state.farms.forEach(farm => {
        filteredFarms.push(farm)
      })
    } else if (products.length === 0) {
      this.state.farms.forEach(farm => {
        farm.purchase_options.forEach(hasPO => {
          purchaseOptions.forEach(option => {
            if (hasPO === option) {
              filteredFarms.push(farm)
            }
          })
        })
      })
    } else if (purchaseOptions.length === 0) {
      this.state.farms.forEach(farm => {
        farm.products.forEach(hasProduct => {
          products.forEach(prod => {
            if (hasProduct === prod) {
              filteredFarms.push(farm)
            }
          })
        })
      })
    } else {
      this.state.farms.forEach(farm => {
        farm.products.forEach(hasProduct => {
          products.forEach(prod => {
            farm.purchase_options.forEach(hasPO => {
              purchaseOptions.forEach(option => {
                if (hasProduct === prod && hasPO === option) {
                  filteredFarms.push(farm)
                }
              })
            })
          })
        })
      })
    }

    const filteredUniqueFarms = filteredFarms.filter((item, index) => {
      const firstIndex = filteredFarms.findIndex(({ id }) => item.id === id)
      return firstIndex === index;
    })

    this.setState({
      filteredFarms: filteredUniqueFarms
    })

    if (filteredUniqueFarms.length > 0) {
      FilteredFarmsService.setFilteredFarms(JSON.stringify(filteredUniqueFarms))
    } else {
      FilteredFarmsService.clearFilteredFarms()
    }

  }

  toggleLogin = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }))
  }

  showBackground = () => {
    this.setState({
      showBackground: true
    })
  }

  hideBackground = ()=> {
    this.setState({
      showBackground: false
    })
  }

  componentDidMount() {
    FarmsApiService.getProductsPurchaseOptions()
      .then(([products, purchaseOptions]) => {
        this.setProducts(products)
        this.setPurchaseOptions(purchaseOptions)
      })
  }

  render() {
    const appClass = this.state.showBackground 
      ? 'app show-background' 
      : 'app'
    const headerClass = this.state.showBackground 
      ? 'app__header' 
      : 'app__header--color'

    const contextValue = {
      farms: this.state.farms,
      filteredFarms: this.state.filteredFarms,
      products: this.state.products,
      purchaseOptions: this.state.purchaseOptions,
      farmAdded: this.state.farmAdded,
      getFarms: this.getFarms,
      addFarm: this.addFarm,
      updateFarm: this.updateFarm,
      filterProductsBy: this.filterProductsBy,
      filterPurchaseOptionsBy: this.filterPurchaseOptionsBy,
      filterOptions: this.filterOptions,
      toggleLogin: this.toggleLogin,
      showBackground: this.showBackground,
      hideBackground: this.hideBackground,
    }

    return (
      <div className={appClass}>
        <FarmContext.Provider
          value={contextValue}>
          <header className={headerClass}>
            <NavBar login={this.state.isLoggedIn} />
          </header>
          <main className='app__main'>

            <Switch>
              <Route
                exact path={'/'}
                component={SearchPage}
              />
              <Route
                exact path={'/farms'}
                component={ResultsPage}
              />
              <PrivateRoute
                path={'/farms/:farmId'}
                component={FarmPage}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
              />
              <PrivateRoute
                path={'/my-profile'}
                component={MyProfilePage}
              />
              <PrivateRoute
                path={'/add-farm'}
                component={AddFarmPage}
              />
              <PrivateRoute
                path={'/edit/:farmId'}
                component={UpdateFarmPage}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>

          </main>
        </FarmContext.Provider>
      </div>
    )
  }
}

export default App
