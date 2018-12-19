const API = require('./api')

API.getAnimeEpisodes('/anime/5373/naruto')
  .then(data => {
    console.log(data)
    return API.getAllAnimes()
  })
  .then(data => console.log(data))
