import config from '../config'
import TokenService from './token-service'

const FarmsApiService = {
  getFarms(query) {
    return fetch(`${config.API_ENDPOINT}/farms/${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
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
        }
      }),
      fetch(`${config.API_ENDPOINT}/purchase-options`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
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
  },
  postUserFavorite(userId, farmId) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}/favorites`, {
      method: 'POST',
      body: JSON.stringify(farmId),
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
  },
  addFavorite(farmId) {
    return fetch(`${config.API_ENDPOINT}/favorites`, {
      method: 'POST',
      body: JSON.stringify({
        'favorite_farm': farmId
      }),
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
  getFavoriteId(farmId) {
    return fetch(`${config.API_ENDPOINT}/favorites/?farm_id=${farmId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok)
        return res.json().then(error => Promise.reject(error))

        return res.json()
      })
  },
  removeFavorite(id) {
    return fetch(`${config.API_ENDPOINT}/favorites/${id}`, {
      method: 'DELETE',
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
  },
  getUserInfo() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok)
      return res.json().then(error => Promise.reject(error))

      return res.json()
    })
  },
  getUserFavorites() {
    return fetch(`${config.API_ENDPOINT}/users/favorites`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok)
      return res.json().then(error => Promise.reject(error))

      return res.json()
    })
  },
}

export default FarmsApiService