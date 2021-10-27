import {
  signup,
  login,
  logout,
  getUsers,
  startApp,
  toggleFavourite,
} from '../userAccountSlice';

import { localSet, localGet } from '../../services/local';

export const userAccoutMiddleware = (store) => (next) => (action) => {
  next(action);

  if (startApp.match(action)) {
    const storedUsers = localGet('sign-up-info');
    const currentUser = localGet('current-user');
    const isLoggedIn = localGet('isLoggedIn');

    store.dispatch(
      getUsers({
        users: storedUsers,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
      })
    );
  }

  if (signup.match(action)) {
    const users = store.getState().users.users;
    localSet('sign-up-info', users);
  }

  if (login.match(action)) {
    const currentUser = store.getState().users.currentUser;
    localSet('current-user', currentUser);
    localSet('isLoggedIn', true);
  }

  if (logout.match(action)) {
    localSet('isLoggedIn', false);

    localStorage.removeItem('current-user');
  }

  if (toggleFavourite.match(action)) {
    const users = localGet('sign-up-info');
    const { currentUser } = store.getState().users;
    const userIndex = users.findIndex((user) => {
      return (
        user.userInfo.email === currentUser.userInfo.email &&
        user.userInfo.password === currentUser.userInfo.password
      );
    });

    if (action.payload.isBookmarked) {
      users[userIndex].favouriteMovies = [
        ...users[userIndex].favouriteMovies,
        action.payload.imdbId,
      ];

      localSet('sign-up-info', users);
      localSet('current-user', users[userIndex]);
    }

    if (!action.payload.isBookmarked) {
      const filteredMovies = currentUser.favouriteMovies.filter(
        (movieId) => movieId !== action.payload.imdbId
      );

      users[userIndex].favouriteMovies = filteredMovies;

      localSet('sign-up-info', users);
      localSet('current-user', users[userIndex]);
    }
  }
};
