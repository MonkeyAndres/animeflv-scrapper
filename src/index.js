const API = require('./api')

API.getAnimeInfo(5373, 'naruto').then(data => {
  console.log(data)
})
