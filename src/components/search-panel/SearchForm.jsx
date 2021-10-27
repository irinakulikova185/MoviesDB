import React from 'react'
import {useState} from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { TypeFilter } from './typeFilter';
import { cleanSelectedType } from '../../store/moviesSlice';
import './searchPanel.css'

export const SearchForm = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    let history = useHistory();
    const { selectedType } = useSelector((state) => state.movies)
    const onFetch = (e) => {
      e.preventDefault();
      history.push(`/search?text=${value}&type=${selectedType}`)
      setValue('')
      dispatch(cleanSelectedType());
    }
    const onValueChange = (e) => {
      const value = e.target.value
      setValue(value)
    }

    return (
       <div className='searchForm'>
            <form className='searchForm' onSubmit={onFetch}>
            <input 
            className='searchForm-input'
            value={value}
            type='search'
            placeholder="Название фильма или сериала"
            onChange={(e) => {onValueChange(e)}}/>
            <TypeFilter/>
            <button type="submit" className="btn btn-primary btn-bg">
              Найти
            </button>
        </form>
       </div>
    )
    
}
