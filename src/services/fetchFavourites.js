import axios from 'axios';

export const fetchFavourites = (setFunction, ids) => {
  const data = ids.map((id) =>
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=a445a5cd`)
  );

  Promise.all(data).then(
    (response) => {
      const moviesData = response.map((res) => {
        return {
          title: res.data.Title,
          imdbId: res.data.imdbID,
          year: res.data.Year,
          posterUrl: res.data.Poster,
          isMovieBookmarked: true,
        };
      });
      setFunction(moviesData);
    },
    (reason) => {
      console.log(reason);
    }
  );
};
