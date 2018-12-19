const axios = require('axios')
const {
  parseWithCheerio,
  getAnimes,
  getEpisodes,
  getAnimeDetails
} = require('./selectors')

const baseURL = 'https://animeflv.net'

const getAllAnimes = async () => {
  const { data } = await axios.get('/api/animes/list', {
    baseURL
  })

  const formatedAnimes = data.map(item => ({
    index: item[0],
    label: item[1],
    title: item[2],
    id: item[3],
    type: item[4]
  }))

  return formatedAnimes
}

const getAnimeEpisodes = async (animeId, animeTitle) => {
  const { data } = await axios.get(`/anime/${animeId}/${animeTitle}`, {
    baseURL,
    transformResponse: [parseWithCheerio]
  })

  return getEpisodes(data)
}

const getRecentAnimes = async params => {
  const { data } = await axios.get(`/browse`, {
    baseURL,
    transformResponse: [parseWithCheerio],
    params
  })

  return getAnimes(data)
}

const getAnimeInfo = async (animeId, animeTitle) => {
  const { data } = await axios.get(`/anime/${animeId}/${animeTitle}`, {
    baseURL,
    transformResponse: [parseWithCheerio]
  })

  return getAnimeDetails(data)
}

module.exports = {
  getAllAnimes,
  getAnimeEpisodes,
  getRecentAnimes,
  getAnimeInfo
}
