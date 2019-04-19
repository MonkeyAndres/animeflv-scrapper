/**
 * DOM selectors.
 * */
const libxmljs = require('libxmljs-dom')

// Parse with cheerio
const parseHTML = data => libxmljs.parseHtml(data)

const toArray = data => [...data]

// Search a variable in scripts (for episodes and anime details)
const extractVariableValue = (dom, variableName) => {
  const variable = `${variableName} =`

  const scripts = dom.getElementsByTagName('script')

  const episodesScript = toArray(scripts).find(item =>
    item.innerHTML.includes(variable)
  )

  if (!episodesScript) return

  const scriptInnerHTML = episodesScript.innerHTML

  const startIndex = scriptInnerHTML.indexOf(variable) + variable.length
  const endIndex = scriptInnerHTML.indexOf(';', startIndex)
  const valueString = scriptInnerHTML.substring(startIndex, endIndex)

  return valueString
}

const extractEpisodes = dom => {
  const episodes = extractVariableValue(dom, 'var episodes') || '[]'
  const episodesJSON = JSON.parse(episodes)

  const formatedEpisodes = episodesJSON.map(item => ({
    index: item[0],
    id: item[1]
  }))

  return formatedEpisodes
}

const formatAnimeList = dom => (element, i) => {
  const link = element.querySelector('a').href
  const animeId = link.split('/')[2]
  const title = link.split('/')[3]

  const image = dom.querySelectorAll('.Image img')[i].src
  const label = element.querySelector('.Title').innerHTML
  const type = element.querySelector('.Image span.Type').innerHTML

  return {
    link,
    animeId,
    title,
    image,
    label,
    type
  }
}

const extractAnimeList = dom => {
  const animeElements = dom.querySelectorAll('.Anime')
  return toArray(animeElements).map(formatAnimeList(dom))
}

const extractAnimeGenres = dom => {
  const genresElements = dom.querySelectorAll('.Nvgnrs a')
  return toArray(genresElements).map(element => element.innerHTML)
}

const extractAnimeBasicInfo = dom => {
  const animeBasicInfo = extractVariableValue(dom, 'var anime_info') || '[]'
  const [index, label, title] = JSON.parse(animeBasicInfo)

  return {
    index,
    label,
    title
  }
}

const extractAnimeDetails = dom => {
  const animeBasicInfo = extractAnimeBasicInfo(dom)

  return {
    ...animeBasicInfo,
    // rate: dom.querySelector('#votes_prmd').innerHTML,
    // votes: dom.querySelector('#votes_nmbr').innerHTML,
    genres: extractAnimeGenres(dom),
    description: dom.querySelector('.Description p').innerHTML.trim(),
    episodes: extractEpisodes(dom)
  }
}

const extractVideoSources = dom => {
  const videosRAW = extractVariableValue(dom, 'var videos') || '{}'
  const { SUB: videos } = JSON.parse(videosRAW)
  const videoSources = videos.map(item => item.code)
  const downloadLink = extractDownloadLink(videos)

  return {
    videos: videoSources,
    downloads: downloadLink
  }
}

const extractDownloadLink = videos => {
  const downloadLink = videos.find(item => item.server === 'mega')
  return downloadLink !== undefined ? downloadLink.url : ''
}

module.exports = {
  parseHTML,
  extractAnimeDetails,
  extractAnimeList,
  extractVideoSources
}
