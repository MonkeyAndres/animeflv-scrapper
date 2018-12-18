/**
 * Cheerio selectors.
 * */

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

// Anime Details
const getEpisodes = $ => {
  const episodes = getVariableValue($, 'episodes')
  return episodes
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

module.exports = { getAnimes, getEpisodes }
