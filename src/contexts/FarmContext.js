import React from 'react'

const FarmContext = React.createContext({
  farms: [],
  filteredFarms: [],
  products: [],
  purchaseOptions: [],
  farmAdded: false,
  getFarms: () => {},
  addFarm: () => {},
  updateFarm: () => {},
  filterOptions: () => {},
  toggleLogin: () => {},
  showBackground: () => {},
  hideBackground: () => {},
})

export default FarmContext