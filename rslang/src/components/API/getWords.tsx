// const URLBASE = 'https://rarity-rslang.herokuapp.com';
export const URLBASE = 'http://localhost:8081';

export class ReactLearnWordsAPI {
  async getResourse(url: string, methodName: string) {
    const res = await fetch(url, {
      method: methodName
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async getWords(group: number, page: number) {
    const url = `${URLBASE}/words?group=${group}&page=${page}`;
    const res = await this.getResourse(url, 'GET');
    return res;
  }

  async getWord(id: string) {
    const url = `${URLBASE}/words/${id}`;
    const res = await this.getResourse(url, 'GET');
    return res;
  }
}
