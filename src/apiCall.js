const cloudscraper = require('cloudscraper')

const apiCall = method => (url, config) => {
  const { baseURL, transformResponse = JSON.parse, params = {} } = config

  const formatedParams = Object.keys(params).reduce((acc, key) => {
    const param = `${key}=${params[key]}`
    return [...acc, param]
  }, [])

  const finalURL = `${baseURL}${url}?${formatedParams.join('&')}`

  return new Promise((resolve, reject) => {
    cloudscraper[method](finalURL, (err, response, body) => {
      if (err) return reject({ err })
      if (body) return resolve({ data: transformResponse(body) })
    })
  })
}

module.exports = {
  get: apiCall('get'),
  post: apiCall('post')
}
