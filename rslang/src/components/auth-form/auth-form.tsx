import { Link, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './auth-form.css';
import { loginValidation, passwordValidation } from './validation';
import { saveInLocalStorage } from './localStorageFunctions';
import React from 'react';
// import { AuthorizeContext } from './AuthorizeContext';

export interface ISignInForm {
  login: string;
  password: string;
}

export const AuthForm = () => {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control
  });

  // const { authorize } = useContext(AuthorizeContext);

  const onSubmit: SubmitHandler<ISignInForm> = (data) => {
    // authorize();
    saveInLocalStorage(data);
    window.location.href = '/';
  };

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
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Пожалуйста, введите логин"
              size="small"
              margin="normal"
              className="auth-form__input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
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
      <Link href="/">
        <button className="btn-close-form">X</button>
      </Link>
    </div>
  );
};
