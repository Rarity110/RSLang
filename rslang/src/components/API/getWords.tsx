// interface IWord {
//   id: 'string';
//   group: 0;
//   page: 0;
//   word: 'string';
//   image: 'string';
//   audio: 'string';
//   audioMeaning: 'string';
//   audioExample: 'string';
//   textMeaning: 'string';
//   textExample: 'string';
//   transcription: 'string';
//   wordTranslate: 'string';
//   textMeaningTranslate: 'string';
//   textExampleTranslate: 'string';
// }

export class ReactLearnWordsAPI {
  // _urlBase = 'https://rarity-rslang.herokuapp.com';
  _urlBase = 'http://localhost:8081';

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
    const url = `${this._urlBase}/words?group=${group}&page=${page}`;
    const res = await this.getResourse(url, 'GET');
    return res;
  }

  async getWord(id: string) {
    const url = `${this._urlBase}/words/${id}`;
    const res = await this.getResourse(url, 'GET');
    return res;
  }
}
