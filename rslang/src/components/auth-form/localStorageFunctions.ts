import { ISignInForm } from './SignInForm';

const loginKey = 'loginRSLang';
const metaKey = 'userMetaRSLang';

export function saveInLocalStorage(data: ISignInForm) {
  window.localStorage.setItem(loginKey, JSON.stringify(data));
}

export function saveMetaInLocalStorage(data: ISignInForm) {
  window.localStorage.setItem(metaKey, JSON.stringify(data));
}

export function deleteLoginFromLocalStorage() {
  window.localStorage.removeItem(loginKey);
  window.localStorage.removeItem(metaKey);
  document.location.reload();
}

export const getEmail = () => {
  const store = JSON.parse(localStorage.getItem(loginKey) || '{}');
  return store.email;
};
