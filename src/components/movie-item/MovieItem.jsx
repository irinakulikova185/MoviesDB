import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import AddFavouriteBtn from '../add-favourite-btn/AddFavouriteBtn';
import './movieItem.css';

export const MovieItem = (props) => {
  const { title, year, posterUrl, imdbId, isMovieBookmarked } = props.movie;

  return (
    <div className='card movieCard'>
      <img
        src={posterUrl}
        className='card-img-top movieCard_img'
        alt='постер'
      />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text yearInfo'>{year}</p>
        <div className='card-bottom'>
          <div className='detailsLink'>
            <Link to={`/movie/${imdbId}`}>Подробнее</Link>
          </div>
          <div
            className={classnames('bookmark toggledOff', {
              hidden: !props.isLoggedIn,
            })}
          >
            <AddFavouriteBtn
              imdbId={imdbId}
              isMovieBookmarked={isMovieBookmarked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
