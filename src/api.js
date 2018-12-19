const axios = require('axios')
const cheerio = require('cheerio')
const { getAnimes, getEpisodes } = require('./selectors')

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

module.exports = { getAllAnimes, getAnimeEpisodes, getRecentAnimes }
