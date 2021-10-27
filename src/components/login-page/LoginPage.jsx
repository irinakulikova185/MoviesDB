import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/userAccountSlice';
import { useInput } from '../../hooks/useInput';
import { minInputLength } from '../../constants.js';
import styles from './Login.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const emailInput = useInput('', {
    isEmpty: true,
    minLengthError: minInputLength,
    isEmail: true,
    emailsRegistered: users,
  });

  const passwordInput = useInput('', {
    isEmpty: true,
    isPasswordCorrect: {
      dependancy: emailInput.emailsRegistered,
      usersArray: users,
    },
  });

  const onLoginChange = (e) => {
    emailInput.onChange(e);
  };

  const onPasswordChange = (e) => {
    passwordInput.onChange(e);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const currentUser = users.find((user) => {
      return (
        user.userInfo.email === emailInput.value &&
        user.userInfo.password === passwordInput.value
      );
    });

    dispatch(login({ currentUser, isLoggedIn: true }));
    history.push('/');
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ width: '400px' }}
            type='email'
            placeholder='Email'
            onChange={onLoginChange}
            onBlur={emailInput.onBlur}
            value={emailInput.value}
          />
          <div className={styles.errorBox}>
            {emailInput.isFocused && emailInput.isEmpty && (
              <div className={styles.error}>
                {emailInput.errorMessages.isEmptyError}
              </div>
            )}
            {emailInput.isFocused && !emailInput.emailsRegistered && (
              <div className={styles.error}>
                {emailInput.errorMessages.isEmailRegisteredError}
              </div>
            )}
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Пароль</Form.Label>

          <Form.Control
            type='password'
            placeholder='Пароль'
            onChange={onPasswordChange}
            onBlur={passwordInput.onBlur}
            value={passwordInput.value}
          />
          <div className={styles.errorBox}>
            {passwordInput.isFocused && passwordInput.isEmpty && (
              <div className={styles.error}>
                {passwordInput.errorMessages.isEmptyError}
              </div>
            )}
            {passwordInput.isFocused && !passwordInput.isPasswordCorrect && (
              <div className={styles.error}>Неверный пароль</div>
            )}
          </div>
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          disabled={!passwordInput.isPasswordCorrect}
        >
          Вход
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
