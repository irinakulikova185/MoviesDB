import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/header/Header';
import Main from './components/main/Main';
import { startApp } from './store/userAccountSlice';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  dispatch(startApp());
  return (
    <Router>
      <div className='wrapper'>
        <Header />
        <div className='body'>
          <Main />
        </div>
      </div>
    </Router>
  );
}

export default App;
