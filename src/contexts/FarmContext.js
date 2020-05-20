import React from 'react'

const FarmContext = React.createContext({
  farms: [],
  searchFarms: () => {},
  addFarm: () => {},
  updateFarm: () => {},
})

export default FarmContext