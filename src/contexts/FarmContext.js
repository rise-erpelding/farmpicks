import React from 'react'

const FarmContext = React.createContext({
  farms: [],
  products: [],
  purchaseOptions: [],
  getFarms: () => {},
  addFarm: () => {},
  updateFarm: () => {},
})

export default FarmContext