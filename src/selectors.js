/**
 * Cheerio selectors.
 * */
const cheerio = require('cheerio')

// Parse with cherio
const parseWithCheerio = data => cheerio.load(data)

// Search a variable in scripts (for episodes and anime details)
const extractVariableValue = ($, variableName) => {
  const variable = `${variableName} =`

  const episodesScript = $('script').filter(function() {
    return (
      $(this)
        .html()
        .indexOf(variable) > -1
    )
  })
  const scriptInnerHTML = $(episodesScript).html()

  const startIndex = scriptInnerHTML.indexOf(variable) + variable.length
  const endIndex = scriptInnerHTML.indexOf(';', startIndex)
  const valueString = scriptInnerHTML.substring(startIndex, endIndex)

  return valueString
}

// Anime Episodes
const extractEpisodes = $ => {
  const episodes = extractVariableValue($, 'var episodes')
  const episodesJSON = JSON.parse(episodes)

  const formatedEpisodes = episodesJSON.map(item => ({
    index: item[0],
    id: item[1]
  }))

  return formatedEpisodes
}

// Anime List
const extractAnimeList = $ => {
  const animes = $('.Anime')
    .map((i, element) => {
      return {
        link: $('a', element).attr('href'),
        image: $('.Image img', element).attr('src'),
        title: $('h3.Title', element).text(),
        type: $('.Image span.Type', element).text()
      }
    })
    .get() // Format the return data

  return animes
}

const extractAnimeGenres = $ => {
  const genres = []

  $('.Nvgnrs a').each((index, element) => genres.push($(element).text()))

  return genres
}

const extractAnimeBasicInfo = $ => {
  const animeBasicInfo = extractVariableValue($, 'var anime_info')
  const basicInfoJSON = JSON.parse(animeBasicInfo)

  return {
    index: basicInfoJSON[0],
    label: basicInfoJSON[1],
    title: basicInfoJSON[2]
  }
}

const extractAnimeDetails = $ => {
  const animeBasicInfo = extractAnimeBasicInfo($)

  return {
    rate: $('#votes_prmd').text(),
    votes: $('#votes_nmbr').text(),
    genres: extractAnimeGenres($),
    label: animeBasicInfo.label,
    description: $('.Description p').text(),
    episodes: extractEpisodes($),
    title: animeBasicInfo.title
  }
}

const extractVideoSources = $ => {
  const videoSources = []

  for (let i = 0; i < 5; i++) {
    const iframe = extractVariableValue($, `video[${i}]`)

    if (iframe !== undefined) {
      const videoSource = $('iframe', iframe).attr('src')
      videoSources.push(videoSource)
    } else {
      break
    }
  }

  return videoSources
}

module.exports = {
  parseWithCheerio,
  extractAnimeDetails,
  extractAnimeList,
  extractVideoSources
}
