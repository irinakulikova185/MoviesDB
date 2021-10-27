import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from '../../store/userAccountSlice';
import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';

const AddFavouriteBtn = ({ isMovieBookmarked, imdbId }) => {
  const [isBookmarked, setIsBookmarked] = useState(isMovieBookmarked);
  const dispatch = useDispatch();

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    dispatch(
      toggleFavourite({
        isBookmarked: !isBookmarked,
        imdbId,
      })
    );
  };

  return (
    <div onClick={handleToggleBookmark}>
      <div>
        {isMovieBookmarked ? (
          <FaBookmark size={20} />
        ) : (
          <FaRegBookmark size={20} />
        )}
      </div>
    </div>
  );
};

export default AddFavouriteBtn;
