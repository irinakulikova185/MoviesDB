import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './moviesSlice';
import { userAccountReducer } from './userAccountSlice';
import { userAccoutMiddleware } from './middleware/userAccoutMiddleware';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    users: userAccountReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userAccoutMiddleware);
  },
});

export default store;
