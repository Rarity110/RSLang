import { ISignInForm } from './SignInForm';

export const loginKey = 'loginRSLang';
const metaKey = 'userMetaRSLang';
export const metaKeyWords = 'userWords';

export function saveInLocalStorage(data: ISignInForm) {
  window.localStorage.setItem(loginKey, JSON.stringify(data));
}

export function saveMetaInLocalStorage(data: ISignInForm) {
  window.localStorage.setItem(metaKey, JSON.stringify(data));
}

export function deleteLoginFromLocalStorage() {
  window.localStorage.removeItem(loginKey);
  window.localStorage.removeItem(metaKey);
  window.localStorage.removeItem(metaKeyWords);
  document.location.reload();
}

export const getLogin = () => {
  const store = JSON.parse(localStorage.getItem(loginKey) || '{}');
  return store.email;
};
