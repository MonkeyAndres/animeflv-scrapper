const API = require('./api')

API.getAnimeEpisodes('/anime/5373/naruto').then(data => {
  console.log(data)
  process.exit(0)
})
