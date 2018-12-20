const axios = require('axios')
const {
  parseWithCheerio,
  extractAnimeList,
  extractAnimeDetails,
  extractVideoSources
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

const searchAnime = async query => {
  const { data } = await axios.get(`/browse`, {
    baseURL,
    transformResponse: [parseWithCheerio],
    params: { q: query }
  })

  return extractAnimeList(data)
}

const getAnimes = async params => {
  const { data } = await axios.get(`/browse`, {
    baseURL,
    transformResponse: [parseWithCheerio],
    params
  })

  return extractAnimeList(data)
}

const getAnimeInfo = async (animeId, animeTitle) => {
  const { data } = await axios.get(`/anime/${animeId}/${animeTitle}`, {
    baseURL,
    transformResponse: [parseWithCheerio]
  })

  return extractAnimeDetails(data)
}

const getEpisodeVideos = async (episodeId, animeTitle, episodeIndex) => {
  const { data } = await axios.get(
    `/ver/${episodeId}/${animeTitle}-${episodeIndex}`,
    {
      baseURL,
      transformResponse: [parseWithCheerio]
    }
  )

  return extractVideoSources(data)
}

module.exports = {
  getAllAnimes,
  searchAnime,
  getAnimes,
  getAnimeInfo,
  getEpisodeVideos
}
