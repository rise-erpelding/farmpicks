import React from 'react'

const FarmContext = React.createContext({
  farms: [],
  products: [],
  purchaseOptions: [],
  farmAdded: false,
  getFarms: () => {},
  addFarm: () => {},
  updateFarm: () => {},
})

export default FarmContext