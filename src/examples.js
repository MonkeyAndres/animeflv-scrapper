/**
 * CODE EXAMPLES
 **/

const API = require('./api')

// Get an array with all the animes in AnimeFLV
API.getAllAnimes().then(data => {
  console.log(data)
})

// Search for animes that contains 'one piece' on it's name
API.searchAnime('one piece').then(data => {
  console.log(data)
})

// Parameters for a getAnimes search
const params = {
  genre: 'accion',
  year: 2018,
  type: 'tv',
  status: 2,
  order: 'updated',
  page: 1,
}

// Get a list of 20 animes according to the passed parameters
API.getAnimes(params).then(data => {
  console.log(data)
})

// Get info about an specific anime (see docs for more)
API.getAnimeInfo('one-piece-tv').then(data => {
  console.log(data)
})

// Get maximum 5 video links of each episode
API.getEpisodeVideos(865, 'one-piece-tv').then(data => {
  console.log(data)
})

// Get a list of the latest 20 anime episodes
API.getLatestEpisodes().then(data => console.log(data))
