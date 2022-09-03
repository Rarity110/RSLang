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

export const emailValidation = {
  required: requiredField,
  validate: (value: string) => {
    const validAdress =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (value.match(/[а-яА-Я]/)) {
      return 'Адрес электронной почты не может содержать русские буквы';
    }
    if (!value.match(validAdress)) {
      return 'Адрес электронной почты должен быть в формате example@house.com';
    }

    return true;
  }
};

export const passwordValidation = {
  required: requiredField,
  validate: (value: string) => {
    if (value.length < 8) {
      return 'Пароль должен быть длинее 8 символов';
    }

    if (value.match(/[а-яА-Я]/)) {
      return 'Пароль не может содержать русские буквы';
    }

    return true;
  }
};
