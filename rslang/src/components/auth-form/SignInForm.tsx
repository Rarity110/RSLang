import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './auth-form.css';
import { emailValidation, passwordValidation } from './validation';
import { saveInLocalStorage } from './localStorageFunctions';
import React from 'react';
import { loginUser } from './formAPI';
import { deployUrl } from './RegisterForm';
import { Link } from 'react-router-dom';

export interface ISignInForm {
  login: string;
  password: string;
  email: string;
}

const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
  const currentUrl = location.href;
  try {
    await loginUser({ email: data.email, password: data.password });
    saveInLocalStorage(data);
    if (currentUrl == deployUrl) window.location.href = 'https://rarity110.github.io/RSLang/#/';
    if (currentUrl !== deployUrl) window.location.href = '/';
  } catch {
    alert('Просим Вас проверить правильность ввода эл.почты и пароля!');
  }
};

export const SignInForm = () => {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control
  });

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        Вход
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="auth-form__subtitle">
        для получения дополнительного доступа
      </Typography>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <TextField
              label="Пожалуйста, введите адрес электронной почты"
              size="small"
              margin="normal"
              className="auth-form__input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              defaultValue={''}
              value={field.value}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Пожалуйста, введите пароль"
              type="password"
              size="small"
              margin="normal"
              className="auth-form__input"
              fullWidth={true}
              defaultValue={''}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2
          }}>
          Войти
        </Button>
      </form>
      <Link to="/">
        <button className="btn-close-formLogin">X</button>
      </Link>
    </div>
  );
};
