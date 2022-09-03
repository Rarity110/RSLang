/* eslint-disable prettier/prettier */
// const URLBASE = 'https://rarity-rslang.herokuapp.com';
export const URLBASE = 'http://localhost:8081';
const userID = '630c74f3ff834f4fe0142bb7';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGM3NGYzZmY4MzRmNGZlMDE0MmJiNyIsImlhdCI6MTY2MjE2OTA1NiwiZXhwIjoxNjYyMTgzNDU2fQ.tNEWvLS8fBAwml_ck0XdOrUnxRdienahRIJlfEIwyY4';

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

  async postUserWord(idword: string, difficulty: string) {
    try {
      const url = `${URLBASE}/users/${userID}/words/${idword}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          difficulty: difficulty,
          optional: {total: 0, wrong: 0}
        })
      });
      const data = {
        result: response.json(),
        status: response.status
      };
    } catch {
      // return 'error';
    }
  };

  async getUserWord(idword: string) {
    const url = `${URLBASE}/users/${userID}/words/${idword}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const status = res.status;
    const data = status === 200 ? await res.json() : res;
    return { data, status };
  }

  async getUserWordsByPage(page: number, wordsPerPage: number) {
    const url = `${URLBASE}/users/${userID}/aggregatedWords?page=${page}&wordsPerPage=${wordsPerPage}&filter={"$and":[{"userWord.difficulty":"hard"}]}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      console.log('no');
    } else {
      const data = await res.json();
      return {countPages: data[0].totalCount[0].count, words: data[0].paginatedResults};
    }
  }

  // слово перестало быть изученным либо сложным
  async deleteUserWord(idword: string) {
    const url = `${URLBASE}/users/${userID}/words/${idword}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const status = res.status;
    return { status };
  }

  // слово было сложным стало изученным и наоборот
  async putUserWord(idword: string, difficulty: string) {
    const url = `${URLBASE}/users/${userID}/words/${idword}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        difficulty: difficulty,
        optional: {total: 0, wrong: 0}
      })
    });
    const status = res.status;
    return { status };
  }


}