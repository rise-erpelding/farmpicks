import config from '../config'
import TokenService from './token-service'

const FarmsApiService = {
  getFarms(query) {
    return fetch(`${config.API_ENDPOINT}/farms/${query}`, {
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
  },
  getFarmById(farmId) {
    return fetch(`${config.API_ENDPOINT}/farms/${farmId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
        //auth here
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
  },
  getProductsPurchaseOptions() {
    return Promise.all([
      fetch(`${config.API_ENDPOINT}/products`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
          //auth here
        }
      }),
      fetch(`${config.API_ENDPOINT}/purchase-options`, {
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
  },
  postFarm(newFarm) {
    return fetch(`${config.API_ENDPOINT}/farms`, {
      method: 'POST',
      body: JSON.stringify(newFarm),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
  },
  updateFarm(newFarmFields, farmId) {
    return fetch(`${config.API_ENDPOINT}/farms/${farmId}`, {
      method: 'PATCH',
      body: JSON.stringify(newFarmFields),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
    })
  }
}

export default FarmsApiService