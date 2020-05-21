import React from 'react'

const FarmContext = React.createContext({
  farms: [],
  getFarms: () => {},
  addFarm: () => {},
  updateFarm: () => {},
})

export default FarmContext