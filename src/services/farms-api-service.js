import config from '../config'

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
    fetch(`${config.API_ENDPOINT}/farms`, {
      method: 'POST',
      body: JSON.stringify(newFarm),
      headers: {
        'content-type': 'application/json'
        //auth here
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
  },
  updateFarm(newFarmFields) {

  }
  

}

export default FarmsApiService