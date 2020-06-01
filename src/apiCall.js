const Humanoid = require('humanoid-js')

const humanoid = new Humanoid()

const apiCall = method => (url, config) => {
  const { baseURL, transformResponse = JSON.parse, params = {} } = config

  const formatedParams = Object.keys(params).reduce((acc, key) => {
    const param = `${key}=${params[key]}`
    return [...acc, param]
  }, [])

  const finalURL = `${baseURL}${url}?${formatedParams.join('&')}`

  return new Promise((resolve, reject) => {
    humanoid[method](finalURL)
      .then(res => {
        resolve({ data: transformResponse(res.body) })
      })
      .catch(err => {
        reject({ err })
      })
  })
}

module.exports = {
  get: apiCall('get'),
  post: apiCall('post'),
}
