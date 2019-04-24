# AnimeFLV Scrapper

Fake AnimeFLV API made with Cheerio and Axios.

![Downloads](https://badgen.net/npm/dt/animeflv-scrapper)
![Version](https://badgen.net/npm/v/animeflv-scrapper)
![License](https://badgen.net/npm/license/animeflv-scrapper)
![Dependencies](https://badgen.net/david/dep/monkeyandres/animeflv-scrapper)
![Size](https://badgen.net/bundlephobia/minzip/animeflv-scrapper)

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

### Installation

```bash
npm i animeflv-scrapper
```

### Usage

```javascript
/**
 * CODE EXAMPLES
 */

const API = require('animeflv-scrapper')

// Get an array with all the animes in AnimeFLV
API.getAllAnimes().then(data => {
  console.log(data)
})

// Search for animes that contains 'one piece' on it's name
API.searchAnime('one piece').then(data => {
  console.log(data)
})

// Parameters for a getAnimes search
const params = {
  genre: 'accion',
  year: 2018,
  type: 'tv',
  status: 2,
  order: 'updated',
  page: 1
}

// Get a list of 20 animes according to the passed parameters
API.getAnimes(params).then(data => {
  console.log(data)
})

// Get info about an specific anime (see docs for more)
API.getAnimeInfo('one-piece-tv', 5495).then(data => {
  console.log(data)
})

// Get maximum 5 video links of each episode
API.getEpisodeVideos(865, 'one-piece-tv', 50900).then(data => {
  console.log(data)
})
```

### API Documentation

### `getAllAnimes()`

Don't receive any parameter and returns an array of object like the following

```json
[
  {
    "index": "1",
    "label": "Bleach",
    "title": "bleach-tv",
    "id": "3602",
    "type": "tv"
  }
]
```

### `getAnimes(params)`

Receives an object of filters/parameters. Returns a list of animes as the following:

```json
[
  {
    "link": "/anime/5495/one-piece-tv",
    "animeId": "5495",
    "title": "one-piece-tv",
    "image": "https://animeflv.net/uploads/animes/covers/7.jpg",
    "label": "One Piece",
    "type": "Anime"
  }
]
```

### `searchAnime(query, params)`

Receive two parameters, a string as the query you are looking for and the second an object of filters/parameters. Returns a list of animes as `getAnimes(params)`

### `getAnimeInfo(animeTitle, animeId)`

Receive the anime title (the one without spaces) and the animeId. Returns an object like the following:

```json
{
  "rate": "4.5",
  "votes": "7771",
  "genres": ["..."],
  "label": "One Piece",
  "description": "...",
  "episodes": [{ "index": 865, "id": 50900 }],
  "title": "one-piece-tv"
}
```

### `getEpisodeVideos(episodeIndex, animeTitle, episodeId)`

Receive the episode number, the anime title (the one without spaces) and the episodeId (see `getAnimeInfo()`). Returns an array of 5 video sources.

```json
[
  "https://s1.animeflv.net/embed.php?s=natsuki&v=...",
  "https://s1.animeflv.net/embed.php?s=natsuki&v=...",
  "https://s1.animeflv.net/embed.php?s=natsuki&v=...",
  "https://s1.animeflv.net/embed.php?s=natsuki&v=...",
  "https://s1.animeflv.net/embed.php?s=natsuki&v=..."
]
```

### Filter / Parameters

- genres: see `src/genres.json`
- year: from 1990 to actual year
- type: `[tv, movie, special, ova]`
- status
  - In Emission: 1
  - Finished: 2
  - Soon: 3
- order
  - default
  - Recently updated: "updated"
  - Recently added: "added"
  - Title A-Z: "title"
  - Rate: "rating"
- page: By default 1
