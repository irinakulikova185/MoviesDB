import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userAccountSlice';
import { BiCameraMovie } from 'react-icons/bi';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  let currentUser = useSelector((state) => state.users.currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <NavLink
          to='/'
          className={styles.logo}
          activeClassName={styles.selected}
        >
          <BiCameraMovie className={styles.logoImage} size={70} />
        </NavLink>
      </div>
      <div className={styles.tabs}>
        <NavLink
          to='/favourite'
          className={classnames(styles.item, { [styles.hidden]: !isLoggedIn })}
          activeClassName={styles.selected}
        >
          Любимые фильмы
        </NavLink>
        <div className={styles.accountTabs}>
          <NavLink
            to='/sign-up'
            className={classnames(styles.item, { [styles.hidden]: isLoggedIn })}
            activeClassName={styles.selected}
          >
            Регистрация
          </NavLink>
          <NavLink
            to='/login'
            className={classnames(styles.item, { [styles.hidden]: isLoggedIn })}
            activeClassName={styles.selected}
          >
            Вход
          </NavLink>
          <div
            className={classnames(styles.item, {
              [styles.hidden]: !isLoggedIn,
            })}
          >
            {currentUser
              ? `${currentUser.userInfo.name} ${currentUser.userInfo.lastname}`
              : ''}
          </div>
          <NavLink
            to='/login'
            className={classnames(styles.item, {
              [styles.hidden]: !isLoggedIn,
            })}
            activeClassName={styles.selected}
            onClick={handleLogout}
          >
            Выход
          </NavLink>
        </div>
      </div>
    </header>
  );
}
