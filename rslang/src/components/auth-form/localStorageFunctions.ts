import { ISignInForm } from './auth-form';

const loginKey = 'loginRSLang';

export function saveInLocalStorage(data: ISignInForm) {
  window.localStorage.setItem(loginKey, JSON.stringify(data));
}

export function deleteLoginFromLocalStorage() {
  window.localStorage.removeItem(loginKey);
  document.location.reload();
}

export const getLogin = () => {
  const store = JSON.parse(localStorage.getItem(loginKey) || '{}');
  return store.login;
};
