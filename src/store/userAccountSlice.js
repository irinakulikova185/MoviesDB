import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  users: [],
  currentUser: null,
  startApp: false,
};

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    startApp: (state) => {
      state.startApp = true;
    },

    signup: (state, action) => {
      state.users = [...state.users, action.payload];
    },

    login: (state, action) => {
      state.currentUser = action.payload.currentUser || null;
      state.isLoggedIn = true;
    },

    logout: (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },

    getUsers: (state, action) => {
      state.users = action.payload.users || [];
      state.isLoggedIn = action.payload.isLoggedIn || false;
      state.currentUser = action.payload.currentUser || null;
    },

    toggleFavourite: (state, action) => {
      if (action.payload.isBookmarked) {
        state.currentUser.favouriteMovies = [
          ...state.currentUser.favouriteMovies,
          action.payload.imdbId,
        ];
      }
      if (!action.payload.isBookmarked) {
        state.currentUser.favouriteMovies =
          state.currentUser.favouriteMovies.filter(
            (movieId) => movieId !== action.payload.imdbId
          );
      }
    },
  },
});

export const userAccountReducer = userAccountSlice.reducer;
export const { signup, login, logout, getUsers, startApp, toggleFavourite } =
  userAccountSlice.actions;
