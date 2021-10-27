import { useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (initialValue, validators) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const validation = useValidation(value, validators);

  const onChange = (e) => {
    setValue(e.target.value.trim());
  };

  const onBlur = () => {
    setIsFocused(true);
  };

  return {
    value: value.trim(),
    onChange,
    isFocused,
    onBlur,
    ...validation,
  };
};
