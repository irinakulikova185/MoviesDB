import { useEffect, useState } from 'react';
import { emailCheckParameter } from '../constants';

export const useValidation = (value, validators) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [emailsRegistered, setIsEmailRegistered] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const lengthError = minLengthError ? 'Некорректная длина' : null;
  const isEmptyError = isEmpty ? 'Это поле обязательное для заполнения' : null;
  const isEmailError = isEmail ? 'Неверный формат email' : null;
  const isEmailRegisteredError = emailsRegistered
    ? null
    : 'Пользователь с таким email не зарегистрирован';
  const isPasswordCorrectError = isPasswordCorrect ? '' : 'Неверный пароль';

  const errorMessages = {
    lengthError,
    isEmptyError,
    isEmailError,
    isEmailRegisteredError,
    isPasswordCorrectError,
  };

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case 'isEmpty':
          setIsEmpty(!value);
          break;
        case 'minLengthError':
          setMinLengthError(value.length < validators[validator]);
          break;
        case 'isEmail':
          setIsEmail(!emailCheckParameter.test(String(value).toLowerCase()));
          break;
        case 'emailsRegistered':
          const emailExists = validators[validator].some(
            (element) => value === element.userInfo.email
          );
          setIsEmailRegistered(emailExists);
          break;
        case 'isPasswordCorrect':
          if (validators[validator].dependancy) {
            const isCorrect = validators[validator].usersArray.some(
              (user) => user.userInfo.password === value
            );
            setIsPasswordCorrect(isCorrect);
          }
          break;
        default:
          break;
      }
    }
  }, [value, validators]);

  useEffect(() => {
    setIsInputValid(isEmpty || minLengthError || isEmail || emailsRegistered);
  }, [isEmpty, minLengthError, isEmail, isInputValid, emailsRegistered]);

  return {
    isEmpty,
    minLengthError,
    isEmail,
    isInputValid,
    emailsRegistered,
    isPasswordCorrect,
    errorMessages,
  };
};
