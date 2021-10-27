const _apiBase = 'http://www.omdbapi.com/?apikey=';
const _apiKey = 'a445a5cd';
const _transformMovies = (movie) => {
  return {
    title: movie.Title,
    year: movie.Year,
    posterUrl: movie.Poster,
    type: movie.Type,
    imdbId: movie.imdbID,
  };
};
const _transformMovie = (movie) => {
  return {
    title: movie.Title,
    genre: movie.Genre,
    country: movie.Country,
    posterUrl: movie.Poster,
    type: movie.Type,
    imdbId: movie.imdbId,
    released: movie.released,
    director: movie.Director,
    plot: movie.Plot,
  };
};

export const getResource = async (url) => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};

export const getMovieByName = async (name) => {
  const res = await getResource(`${_apiBase}${_apiKey}&s=${name}`);
  return res.Search.map(_transformMovies);
};

export const getMovieDetails = async (id) => {
  const res = await getResource(`${_apiBase}${_apiKey}&i=${id}`);
  return _transformMovie(res);
};

export const getFilteredMovies = async (name, type) => {
  const res = await getResource(`${_apiBase}${_apiKey}&s=${name}&type=${type}`);
  return res;
};

export const getFilteredMoviesTransform = async (name, type) => {
  const res = await getResource(`${_apiBase}${_apiKey}&s=${name}&type=${type}`);
  return res.Search.map(_transformMovies);
};
