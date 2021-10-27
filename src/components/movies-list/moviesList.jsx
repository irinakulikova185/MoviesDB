import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MovieItem } from '../movie-item/MovieItem';
import { useLocation} from 'react-router-dom'

import {
  fetchMovies,
  cleanMovies,
  fetchFilteredMovies,
} from '../../store/moviesSlice';
import imageNotFound from '../../assets/images/nothing-icon.jpg';
import { Spinner } from '../spinner/spinner';
import './moviesList.css';

export const MoviesList = () => {
  const { movies, status} = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  let location= useLocation()
  let query = new URLSearchParams(location.search)
  let text = query.get('text');
  let type = query.get('type');

  useEffect(() => {
    if (type === 'movie' || type === 'series') {
      dispatch(fetchFilteredMovies({ text, type }));
    } else {
      dispatch(fetchMovies(text));
    }
    return function cleanup() {
      console.log('clean')
      dispatch(cleanMovies());
    };
  }, [text, type]);

  const MoviesBlock = () => {
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
    const users = useSelector((state) => state.users);

    const moviesUpdated = !isLoggedIn
      ? [...movies]
      : movies.map((movie) => ({
          ...movie,
          isMovieBookmarked: users.currentUser.favouriteMovies.includes(
            movie.imdbId
          ),
        }));

    return (
      <div className='moviesList'>
        {moviesUpdated.map((item) => {
          return (
            <MovieItem key={item.imdbId} movie={item} isLoggedIn={isLoggedIn} />
          );
        })}
      </div>
    );
  };

  const MovieNotFound = () => {
    return (
      <div className='blockNotFound'>
        <p className='blockNotFound-text'>Movie not found</p>
        <img src={imageNotFound} alt='not found' className='blockNotFound-img'></img>
      </div>
    );
  };
  let content;

  if (status === 'loading') {
    content = <Spinner />;
  } else {
    content = movies.length > 0 ? <MoviesBlock /> : <MovieNotFound />;
  }

  return <>{content}</>;
};
