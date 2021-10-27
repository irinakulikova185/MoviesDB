import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeSelectedType } from '../../store/moviesSlice';

export const TypeFilter = () => {
  const dispatch = useDispatch();
  const { selectedType } = useSelector((state) => state.movies)
  const onSelectValueGet = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    dispatch(changeSelectedType(e.target.options[selectedIndex].value));
  };
  return (
    <select
      className='searchForm-select'
      value={selectedType}
      // defaultValue={selectedType}
      // defaultValue={'default'}
      onChange={(e) => {
        onSelectValueGet(e);
      }}
    >
      <option disabled value='default'>
        Что искать
      </option>
      <option value='movie'>фильм</option>
      <option value='series'>сериал</option>
      <option value='all'>все</option>
    </select>
  );
};
