const api = require('../api')

// schemas
const allAnimeSchema = {
  index: expect.any(String),
  label: expect.any(String),
  id: expect.any(String),
  title: expect.any(String),
  type: expect.any(String),
}

const animeSchema = {
  link: expect.any(String),
  title: expect.any(String),
  image: expect.any(String),
  label: expect.any(String),
  type: expect.any(String),
}

const animeInfoSchema = {
  rate: expect.any(String),
  votes: expect.any(String),
  label: expect.any(String),
  description: expect.any(String),
  title: expect.any(String),
}

const latestEpisodesSchema = {
  title: expect.any(String),
  label: expect.any(String),
  episode: expect.any(String),
  image: expect.any(String),
}

// tests
describe('API Test', () => {
  test('getAllAnimes()', async () => {
    const response = await api.getAllAnimes()

    expect(response[0]).toMatchObject(allAnimeSchema)
  })

  test('searchAnime()', async () => {
    const query = 'one piece'
    const response = await api.searchAnime(query)

    expect(response[0].label.toLowerCase()).toContain(query)
  })

  test('getAnimes()', async () => {
    const response = await api.getAnimes()

    expect(response[0]).toMatchObject(animeSchema)
  })

  test('getAnimeInfo()', async () => {
    const response = await api.getAnimeInfo('one-piece-tv')

    expect(response).toMatchObject(animeInfoSchema)
    expect(response.genres).toContainEqual(expect.any(String))
    expect(response.episodes).toContainEqual({
      index: expect.any(Number),
      id: expect.any(Number),
    })
  })

  test('getEpisodeVideos()', async () => {
    const response = await api.getEpisodeVideos(865, 'one-piece-tv')

    expect(response.videos).toContainEqual(expect.any(String))
    expect(response.downloads).toEqual(expect.any(String))
  })

  test('getLatestEpisodes()', async () => {
    const response = await api.getLatestEpisodes()

    expect(response).toContainEqual(latestEpisodesSchema)
  })
})
