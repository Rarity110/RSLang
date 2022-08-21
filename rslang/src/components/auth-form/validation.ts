const requiredField = 'Обязательное поле';

export const loginValidation = {
  required: requiredField,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Логин не может содержать русские буквы';
    }

    return true;
  }
};

export const passwordValidation = {
  required: requiredField,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Пароль должен быть длинее 6 символов';
    }

    if (value.match(/[а-яА-Я]/)) {
      return 'Пароль не может содержать русские буквы';
    }

    return true;
  }
};
