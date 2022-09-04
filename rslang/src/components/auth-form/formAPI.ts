import { URLBASE } from '../API/getWords';
import { saveMetaInLocalStorage } from './localStorageFunctions';

type JSONValue = string | number | boolean | JSONObject;

interface JSONObject {
  [x: string]: JSONValue;
}

export const createUser = async (user: JSONObject) => {
  const rawResponse = await fetch(URLBASE + '/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  console.log(content);
};

export const loginUser = async (user: JSONObject) => {
  const rawResponse = await fetch(URLBASE + '/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  saveMetaInLocalStorage(content);

  console.log(content);
};
