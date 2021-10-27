import React from 'react';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/userAccountSlice';
import { useInput } from '../../hooks/useInput';
import { minInputLength } from '../../constants.js';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './RegistrationForm.module.css';
import LoginPage from '../login-page/LoginPage';

const RegistrationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const name = useInput('');
  const lastname = useInput('');
  const email = useInput('', {
    isEmpty: true,
    minLengthError: minInputLength,
    isEmail: true,
  });
  const password = useInput('', {
    isEmpty: true,
    minLengthError: minInputLength,
  });

  const onNameChange = (e) => {
    name.onChange(e);
  };

  const onLastnameChange = (e) => {
    lastname.onChange(e);
  };

  const onEmailChange = (e) => {
    email.onChange(e);
  };

  const onPasswordChange = (e) => {
    password.onChange(e);
  };

  const onSignUp = (e) => {
    e.preventDefault();

    localStorage.setItem(
      'sign-up-info',
      JSON.stringify({
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
      })
    );
    dispatch(
      signup({
        userInfo: {
          name: name.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
        },
        favouriteMovies: [],
      })
    );
    history.push('/login');
  };

  return (
    <div>
      <Form onSubmit={onSignUp}>
        <Form.Group className='mb-3'>
          <Row>
            <Col>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                placeholder='Имя'
                value={name.value}
                onChange={onNameChange}
              />
            </Col>
            <Col>
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                placeholder='Фамилия'
                value={lastname.value}
                onChange={onLastnameChange}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>

          <Form.Control
            type='email'
            placeholder='Email'
            value={email.value}
            onBlur={email.onBlur}
            onChange={onEmailChange}
          />
          <div className={styles.errorBox}>
            {email.isFocused && email.isEmpty && (
              <div className={styles.error}>
                {email.errorMessages.isEmptyError}
              </div>
            )}
            {email.isFocused && email.minLengthError && (
              <div className={styles.error}>
                {email.errorMessages.lengthError}
              </div>
            )}
            {email.isFocused && email.isEmail && (
              <div className={styles.error}>
                {email.errorMessages.isEmailError}
              </div>
            )}
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Пароль</Form.Label>

          <Form.Control
            type='password'
            placeholder='Пароль'
            onBlur={password.onBlur}
            onChange={onPasswordChange}
            value={password.value}
          />
          <div className={styles.errorBox}>
            {password.isFocused && password.isEmpty && (
              <div className={styles.error}>
                {password.errorMessages.isEmptyError}
              </div>
            )}
            {password.isFocused && password.minLengthError && (
              <div className={styles.error}>
                {password.errorMessages.lengthError}
              </div>
            )}
          </div>
        </Form.Group>

        <Button
          disabled={email.isInputValid || password.isInputValid}
          variant='primary'
          type='submit'
        >
          Зарегистрироваться
        </Button>

        <div>
          <Form.Text className='text-muted'>
            <div>Уже есть учетная запись?</div>
            <div>
              Перeходи сюда{' '}
              {
                <NavLink
                  to='/login'
                  className={styles.item}
                  activeClassName={styles.selected}
                >
                  Вход
                </NavLink>
              }
            </div>
            <Switch>
              <Route path='/login'>
                <LoginPage />
              </Route>
            </Switch>
          </Form.Text>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
