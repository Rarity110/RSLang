import { Link, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './auth-form.css';
import { emailValidation, loginValidation, passwordValidation } from './validation';
import { saveInLocalStorage } from './localStorageFunctions';
import React from 'react';
import { createUser, loginUser } from './formAPI';
// import { AuthorizeContext } from './AuthorizeContext';

export interface IRegisterInForm {
  login: string;
  password: string;
  email: string;
}

const onRegister: SubmitHandler<IRegisterInForm> = async (data) => {
  try {
    await createUser({ login: data.login, email: data.email, password: data.password });
    await loginUser({ email: data.email, password: data.password });
    saveInLocalStorage(data);
    window.location.href = '/RSLang';
  } catch {
    alert('Извините, такой пользователь уже зарегистрирован');
  }
};

export const RegisterForm = () => {
  const { handleSubmit, control } = useForm<IRegisterInForm>();
  const { errors } = useFormState({
    control
  });

  // const { authorize } = useContext(AuthorizeContext);

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        Зарегистрируйтесь
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="auth-form__subtitle">
        для получения дополнительного доступа
      </Typography>
      <form className="auth-form__form" onSubmit={handleSubmit(onRegister)}>
        <Controller
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <TextField
              label="Пожалуйста, введите адресс электронной почты"
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
          Зарегистрироваться
        </Button>
      </form>

      <Link href="/">
        <button className="btn-close-formRegister">X</button>
      </Link>
    </div>
  );
};
