const apiCall = require('./apiCall')

const {
  parseHTML,
  extractAnimeList,
  extractAnimeDetails,
  extractVideoSources,
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

const getAnimeInfo = async (animeTitle, animeId) => {
  const { data } = await apiCall.get(`/anime/${animeId}/${animeTitle}`, {
    baseURL,
    transformResponse: parseHTML,
  })

  return extractAnimeDetails(data)
}

const getEpisodeVideos = async (episodeIndex, animeTitle, episodeId) => {
  const { data } = await apiCall.get(
    `/ver/${episodeId}/${animeTitle}-${episodeIndex}`,
    {
      baseURL,
      transformResponse: parseHTML,
    },
  )

  return extractVideoSources(data)
}

module.exports = {
  getAllAnimes,
  searchAnime,
  getAnimes,
  getAnimeInfo,
  getEpisodeVideos,
}
