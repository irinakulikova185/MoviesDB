import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchFavourites } from '../../services/fetchFavourites';
import { MovieItem } from '../movie-item/MovieItem';
import { Spinner } from '../spinner/spinner';

const Favourite = () => {
  const moviesIds = useSelector(
    (state) => state.users.currentUser.favouriteMovies
  );
  const [movies, setMovies] = useState(null);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  useEffect(() => {
    fetchFavourites(setMovies, moviesIds);
  }, [moviesIds]);

  let content;
  if (movies && movies.length > 0) {
    content = (
      <div className='moviesList'>
        {movies.map((movie) => {
          return (
            <MovieItem
              key={movie.imdbId}
              movie={movie}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </div>
    );
  } else if (movies && movies.length === 0) {
    content = (
      <div>
        <div>Здесь пока пусто. Но это поправимо.</div>
        <div>Начать {<NavLink to='/'>поиск</NavLink>}.</div>
      </div>
    );
  } else {
    content = (
      <div>
        <Spinner />
      </div>
    );
  }
  return <>{content}</>;
};

export default Favourite;
