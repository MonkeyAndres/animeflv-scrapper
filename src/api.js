const apiCall = require('./apiCall')

const {
  parseHTML,
  extractAnimeList,
  extractAnimeDetails,
  extractVideoSources,
  extractLatestEpisodes,
} = require('./selectors')

const baseURL = 'https://animeflv.net'

const getAllAnimes = async () => {
  const { data } = await apiCall.get('/api/animes/list', {
    baseURL,
  })

  const formatedAnimes = data.map(item => ({
    index: item[0],
    label: item[1],
    title: item[2],
    id: item[3],
    type: item[4],
  }))

  return formatedAnimes
}

const searchAnime = async (query, params) => getAnimes({ q: query, ...params })

const getAnimes = async params => {
  const { data } = await apiCall.get(`/browse`, {
    baseURL,
    transformResponse: parseHTML,
    params,
  })

  return extractAnimeList(data)
}

const getAnimeInfo = async animeTitle => {
  const { data } = await apiCall.get(`/anime/${animeTitle}`, {
    baseURL,
    transformResponse: parseHTML,
  })

  return extractAnimeDetails(data)
}

const getEpisodeVideos = async (episodeIndex, animeTitle) => {
  const { data } = await apiCall.get(`/ver/${animeTitle}-${episodeIndex}`, {
    baseURL,
    transformResponse: parseHTML,
  })

  return extractVideoSources(data)
}

const getLatestEpisodes = async () => {
  const { data } = await apiCall.get('', {
    baseURL,
    transformResponse: parseHTML,
  })

  return extractLatestEpisodes(data)
}

module.exports = {
  getAllAnimes,
  searchAnime,
  getAnimes,
  getAnimeInfo,
  getEpisodeVideos,
  getLatestEpisodes,
}
