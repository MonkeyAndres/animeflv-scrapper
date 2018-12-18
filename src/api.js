const axios = require('axios')
const cheerio = require('cheerio')
const { getAnimes, getEpisodes } = require('./selectors')

const baseURL = 'https://animeflv.net'

const getAnimeEpisodes = async (animeLink, params) => {
  const { data } = await axios.get(`${animeLink}`, {
    baseURL,
    transformResponse: [data => cheerio.load(data)],
    params
  })

  return getEpisodes(data)
}

const getRecentAnimes = async params => {
  const { data } = await axios.get(`/browse`, {
    baseURL,
    transformResponse: [data => cheerio.load(data)], // cheerio parse data
    params
  })

  return getAnimes(data)
}

module.exports = { getAnimeEpisodes, getRecentAnimes }
