import Button from '@mui/material/Button';
import './auth-form.css';
import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { RegisterForm } from './RegisterForm';

export const AuthForm = () => {
  const [formRegister, setFormRegister] = useState(true);

  return (
    <div className="form-wrapper">
      {formRegister && <RegisterForm />}

      {!formRegister && <SignInForm />}

      <Button
        variant="outlined"
        className="formChangeBtn"
        onClick={() => (formRegister === false ? setFormRegister(true) : setFormRegister(false))}>
        {formRegister && 'У меня уже есть логин'}
        {!formRegister && 'Мне нужно зарегистрироваться'}
      </Button>
    </div>
  );
};
