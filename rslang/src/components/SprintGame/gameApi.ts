import { BASEURL_API } from '../../consts/consts';

async function getResourse(url: string, methodName: string) {
  const res = await fetch(url, {
    method: methodName
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
  }
  return await res.json();
}

export async function getWords(group?: number, page?: number) {
  const url = `${BASEURL_API}/words?group=${group}&page=${page}`;
  try {
    const res = await getResourse(url, 'GET');
    return res;
  } catch (err) {
    console.log(`${err} textbook level don't be chosen`);
  }
}
