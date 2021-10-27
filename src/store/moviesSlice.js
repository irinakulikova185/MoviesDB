import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getMovieByName, getFilteredMoviesTransform} from '../services/movieDBServise'

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async function (text, {rejectWithValue}) {
    try {
      const response = await getMovieByName(text);
      return response;
    }
    catch(error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchFilteredMovies = createAsyncThunk(
  'movies/fetchFilteredMovies',
  async function(data, {rejectWithValue}) {
   try {
    const {text, type} = data;
    const response = await getFilteredMoviesTransform(text, type)
    return response
   }
   catch(error) {
    return rejectWithValue(error.message)
   }
  }
)

const initialState = {
        movies: [],
        selectedType: 'default',
        status: '',
        error: null
      };

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      cleanMovies(state) {
        state.movies = []
      },
      changeSelectedType(state, action) {
        state.selectedType = action.payload
      },
      cleanSelectedType(state) {
        state.selectedType = 'default'
      },
      setInputValue(state, action) {
        state.inputValue = action.payload
      },
    },
    extraReducers: {
      [fetchMovies.pending] : (state) => {
        state.status = 'loading';
        state.error = null
      },
      [fetchMovies.fulfilled] : (state, action) => {
        state.movies = action.payload
        state.status = 'fulfilled'
      },
      [fetchMovies.rejected] : (state, action) => {
        state.error = action.payload
        state.status = 'rejected'
      },
      [fetchFilteredMovies.fulfilled]: (state, action) => {
        state.movies = action.payload
        state.status = 'fulfilled'
      },
      [fetchFilteredMovies.pending] : (state) => {
        state.status = 'loading';
        state.error = null
      },
      [fetchFilteredMovies.rejected] : (state, action) => {
        state.error = action.payload
        state.status = 'rejected'
      },
    }
}) 

export const { cleanMovies, changeSelectedType, cleanSelectedType, addToSearchHistory} = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer

