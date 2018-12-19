/**
 * Cheerio selectors.
 * */
const cheerio = require('cheerio')

// Parse with cherio
const parseWithCheerio = data => cheerio.load(data)

// Search a variable in scripts (for episodes and anime details)
const getVariableValue = ($, variableName) => {
  const variable = `var ${variableName} =`

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

  return JSON.parse(valueString)
}

// Anime Episodes
const getEpisodes = $ => {
  const episodes = getVariableValue($, 'episodes')

  const formatedEpisodes = episodes.map(item => ({
    index: item[0],
    id: item[1]
  }))

  return formatedEpisodes
}

// Anime List
const getAnimes = $ => {
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

const getAnimeGenres = $ => {
  const genres = []

  $('.Nvgnrs a').each((index, element) => genres.push($(element).text()))

  return genres
}

const getAnimeDetails = $ => {
  return {
    rate: $('#votes_prmd').text(),
    votes: $('#votes_nmbr').text(),
    genres: getAnimeGenres($),
    title: $('.Container>.Title').text(),
    description: $('.Description p').text(),
    episodes: getEpisodes($)
  }
}

module.exports = { parseWithCheerio, getAnimes, getEpisodes, getAnimeDetails }
