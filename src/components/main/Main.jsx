import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Favourite from '../favourite/Favourite';
import LoginPage from '../login-page/LoginPage';
import RegistrationForm from '../registration-form/RegistrationForm';
import { MoviesList } from '../movies-list/moviesList';
import { SearchForm } from '../search-panel/SearchForm';
import { SearchFormSuggest } from '../search-panel/SearchFormSuggest';
import { MovieDetails } from '../movie-details/MovieDetails';
import './Main.css';

const Main = () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  return (
    <div className='mainWindow'>
      <Switch>
        <Route exact path='/'>
          <SearchFormSuggest />
        </Route>
        <Route path='/favourite'>
          {isLoggedIn ? <Favourite /> : <Redirect to='/login' />}
        </Route>
        <Route path='/sign-up'>
          <RegistrationForm />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/logout'>
          <div>Logout</div>
        </Route>
        <Route path='/search'>
          <div>
            <SearchForm />
            <MoviesList />
          </div>
        </Route>
        <Route path='/movie/:id' component={MovieDetails} />
      </Switch>
    </div>
  );
};

export default Main;
