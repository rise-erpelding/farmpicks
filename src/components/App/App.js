/* eslint-disable no-console */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FarmContext from '../../contexts/FarmContext';
import NavBar from '../NavBar/NavBar';
import SearchPage from '../../routes/SearchPage/SearchPage';
import ResultsPage from '../../routes/ResultsPage/ResultsPage';
import FarmPage from '../../routes/FarmPage/FarmPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import MyProfilePage from '../../routes/MyProfilePage/MyProfilePage';
import AddFarmPage from '../../routes/AddFarmPage/AddFarmPage';
import UpdateFarmPage from '../../routes/UpdateFarmPage/UpdateFarmPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import FarmsApiService from '../../services/farms-api-service';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import TokenService from '../../services/token-service';
import FilteredFarmsService from '../../services/filtered-farms-service';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      filteredFarms: [],
      products: [],
      purchaseOptions: [],
      farmAdded: false,
      isLoggedIn: TokenService.hasAuthToken(),
      showBackground: false,
    };
  }

  componentDidMount() {
    // fills dropdown menu with products and purchase options
    FarmsApiService.getProductsPurchaseOptions()
      .then(([products, purchaseOptions]) => {
        this.setProducts(products);
        this.setPurchaseOptions(purchaseOptions);
      });
  }

  setFarms = (farms) => {
    this.setState({
      farms,
      filteredFarms: farms,
    });

    if (farms.length > 0) {
      FilteredFarmsService.setFilteredFarms(JSON.stringify(farms));
    }
  }

  setProducts = (products) => {
    this.setState({
      products,
    });
  }

  setPurchaseOptions = (purchaseOptions) => {
    this.setState({
      purchaseOptions,
    });
  }

  // gets farms based on user inputted search query in SearchBar or Dropdown
  getFarms = (query) => {
    FarmsApiService.getFarms(query)
      .then(this.setFarms)
      .catch((error) => {
        console.error(error);
      });
  }

  // adds farm from form in AddFarmPage
  addFarm = (newFarm) => {
    const { farms } = this.state;
    this.setState({
      farms: [...farms, newFarm],
    });
    this.setState({
      farmAdded: true,
    });
  }

  // updates farm from form in UpdateFarmPage
  updateFarm = (updatedFarm) => {
    const { farms } = this.state;
    this.setState({
      farms: farms.map((farm) => ((farm.id !== updatedFarm.id) ? farm : updatedFarm)),
    });
  }

  // filters according to products and purchase options selected in FilterModal
  filterOptions = (products, purchaseOptions) => {
    const filteredFarms = [];
    if (products.length === 0 && purchaseOptions.length === 0) {
      /* if no product or purchase options are selected from filter modal,
      filteredFarms will be the same as farms */
      const { farms } = this.state;
      farms.forEach((farm) => {
        filteredFarms.push(farm);
      });
    } else if (products.length === 0) {
      /* if there are purchase options selected but not products, push all the farms
      in results that have the purchase options selected into filteredFarms */
      const { farms } = this.state;
      farms.forEach((farm) => {
        farm.purchase_options.forEach((hasPO) => {
          purchaseOptions.forEach((option) => {
            if (hasPO === option) {
              filteredFarms.push(farm);
            }
          });
        });
      });
    } else if (purchaseOptions.length === 0) {
      /* if there are products selected but not purchase options, push all the farms
      in results that have the products selected into filteredFarms */
      const { farms } = this.state;
      farms.forEach((farm) => {
        farm.products.forEach((hasProduct) => {
          products.forEach((prod) => {
            if (hasProduct === prod) {
              filteredFarms.push(farm);
            }
          });
        });
      });
    } else {
      /* otherwise if there are both products and purchase options selected, push all the farms
      in results that have products and purchase options selected into filteredFarms */
      const { farms } = this.state;
      farms.forEach((farm) => {
        farm.products.forEach((hasProduct) => {
          products.forEach((prod) => {
            farm.purchase_options.forEach((hasPO) => {
              purchaseOptions.forEach((option) => {
                if (hasProduct === prod && hasPO === option) {
                  filteredFarms.push(farm);
                }
              });
            });
          });
        });
      });
    }

    // also ensure that there are no duplicate farms added to filteredFarms
    const filteredUniqueFarms = filteredFarms.filter((item, index) => {
      const firstIndex = filteredFarms.findIndex(({ id }) => item.id === id);
      return firstIndex === index;
    });

    this.setState({
      filteredFarms: filteredUniqueFarms,
    });

    if (filteredUniqueFarms.length > 0) {
      FilteredFarmsService.setFilteredFarms(JSON.stringify(filteredUniqueFarms));
    } else {
      FilteredFarmsService.clearFilteredFarms();
    }
  }

  toggleLogin = () => {
    this.setState((prevState) => ({
      isLoggedIn: !prevState.isLoggedIn,
    }));
  }

  showBackground = () => {
    this.setState({
      showBackground: true,
    });
  }

  hideBackground = () => {
    this.setState({
      showBackground: false,
    });
  }

  render() {
    // determines whether to show background or show white screen with colored navbar
    const { showBackground } = this.state;
    const appClass = showBackground
      ? 'app show-background'
      : 'app';
    const headerClass = showBackground
      ? 'app__header'
      : 'app__header--color';

    const {
      farms,
      filteredFarms,
      products,
      purchaseOptions,
      farmAdded,
      isLoggedIn,
    } = this.state;

    const contextValue = {
      farms,
      filteredFarms,
      products,
      purchaseOptions,
      farmAdded,
      getFarms: this.getFarms,
      addFarm: this.addFarm,
      updateFarm: this.updateFarm,
      filterProductsBy: this.filterProductsBy,
      filterPurchaseOptionsBy: this.filterPurchaseOptionsBy,
      filterOptions: this.filterOptions,
      toggleLogin: this.toggleLogin,
      showBackground: this.showBackground,
      hideBackground: this.hideBackground,
    };

    return (
      <div className={appClass}>
        <FarmContext.Provider
          value={contextValue}
        >
          <header className={headerClass}>
            <NavBar login={isLoggedIn} />
          </header>
          <main className="app__main">

            <Switch>
              <Route
                exact
                path="/"
                component={SearchPage}
              />
              <Route
                exact
                path="/farms"
                component={ResultsPage}
              />
              <PrivateRoute
                path="/farms/:farmId"
                component={FarmPage}
              />
              <PublicOnlyRoute
                path="/register"
                component={RegistrationPage}
              />
              <PublicOnlyRoute
                path="/login"
                component={LoginPage}
              />
              <PrivateRoute
                path="/my-profile"
                component={MyProfilePage}
              />
              <PrivateRoute
                path="/add-farm"
                component={AddFarmPage}
              />
              <PrivateRoute
                path="/edit/:farmId"
                component={UpdateFarmPage}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>

          </main>
        </FarmContext.Provider>
      </div>
    );
  }
}

export default App;
