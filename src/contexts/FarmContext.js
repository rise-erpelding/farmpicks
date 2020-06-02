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
})

export default FarmContext