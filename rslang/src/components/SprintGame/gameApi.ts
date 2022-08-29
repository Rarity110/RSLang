export const URL = 'http://localhost:8081';

async function getResourse(url: string, methodName: string) {
  const res = await fetch(url, {
    method: methodName
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
  }
  return await res.json();
}

export async function getWords(group: number, page: number) {
  const url = `${URL}/words?group=${group}&page=${page}`;
  const res = await getResourse(url, 'GET');
  return res;
}
