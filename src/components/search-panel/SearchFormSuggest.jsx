import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getResource } from '../../services/movieDBServise';
import { getFilteredMovies } from '../../services/movieDBServise';
import { TypeFilter } from './typeFilter';
import { debounce } from '../../utility';
import './searchPanel.css';

export const SearchFormSuggest = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { selectedType } = useSelector((state) => state.movies);
  let history = useHistory();
  const onFetch = (e) => {
    e.preventDefault();
    history.push(`/search?text=${value}&type=${selectedType}`);
    setValue('');
  };
  const onValueChange = (e) => {
    const value = e.target.value;
    setValue(value);
    debouncedGetSuggestions(value);
  };

  useEffect(() => {
    getSuggestions(value, selectedType);
  }, [value, selectedType]);

  const getSuggestions = async (value, type) => {
    let res;
    if (type === 'all') {
      res = await getResource(
        `http://www.omdbapi.com/?apikey=a445a5cd&s=${value}`
      );
    } else {
      res = await getFilteredMovies(value, type);
    }
    const dataForSuggestions =
      res.Response === 'False' ? [] : res.Search.slice(0, 4);
    setSuggestions(dataForSuggestions);
  };
  const debouncedGetSuggestions = useCallback(
    debounce((value) => getSuggestions(value, selectedType)),
    []
  );
  const suggestionsBlock =
    suggestions.length > 0
      ? suggestions.map((suggestion, i) => (
          <Link
            to={`/movie/${suggestion.imdbID}`}
            key={i}
            className='searchPanel_link'
          >
            {suggestion.Title}
          </Link>
        ))
      : null;

  return (
    <div className='searchPanel'>
      <h1>Поиск фильмов и сериалов...</h1>
      <form className='searchForm' onSubmit={onFetch}>
        <input
          className='searchForm-input'
          value={value}
          type='search'
          placeholder='Название фильма или сериала'
          onChange={(e) => {
            onValueChange(e);
          }}
        />
        <TypeFilter/>
        <button type='submit' className='btn btn-primary btn-bg'>
          Найти
        </button>
      </form>
      <ul>{suggestionsBlock}</ul>
    </div>
  );
};
