/* eslint-disable prettier/prettier */
import { BASEURL_API } from '../../consts/consts';
import { IUserWordOptional } from '../../types/props';
import { getUser } from '../../utility/utility';

export class ReactLearnWordsAPI {
  async getResourse(url: string, methodName: string) {
    try {
      const res = await fetch(url, {
        method: methodName
      });
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }

  }

  async getWords(group: number, page: number) {
    try {
      const url = `${BASEURL_API}/words?group=${group}&page=${page}`;
      const res = await this.getResourse(url, 'GET');
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getWord(id: string) {
    try {
      const url = `${BASEURL_API}/words/${id}`;
      const res = await this.getResourse(url, 'GET');
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async postUserWord(idword: string, difficulty: string, optional: undefined | IUserWordOptional) {
    try {
      const { userID, token } = getUser();
      const url = `${BASEURL_API}/users/${userID}/words/${idword}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          difficulty: difficulty,
          optional: optional
        })
      });
      const data = {
        result: response.json(),
        status: response.status
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  async getUserWord(idword: string) {
    try {
      const { userID, token } = getUser();
      const url = `${BASEURL_API}/users/${userID}/words/${idword}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const status = res.status;
      const data = status === 200 ? await res.json() : res;
      return { data, status };
    } catch (error) {
      console.log(error);
    }
  }

  async getUserWordsByPage(page: number, wordsPerPage: number) {
    try {
      const { userID, token } = getUser();
      const url = `${BASEURL_API}/users/${userID}/aggregatedWords?page=${page}&wordsPerPage=${wordsPerPage}&filter={"$or":[{"userWord.difficulty":"hard"},{"userWord.difficulty":"learned"},{"userWord.difficulty":"normal"}]}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status !== 200) {
        throw new Error();
      } else {
        const data = await res.json();
        if (data[0].paginatedResults.length) {
          return { countPages: data[0].totalCount[0].count, words: data[0].paginatedResults };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // слово перестало быть изученным либо сложным
  async deleteUserWord(idword: string) {
    try {
      const { userID, token } = getUser();
      const url = `${BASEURL_API}/users/${userID}/words/${idword}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const status = res.status;
      return { status };
    } catch (error) {
      console.log(error);
    }
  }

  // слово было сложным стало изученным и наоборот
  async putUserWord(idword: string, difficulty: string, optional: undefined | IUserWordOptional) {
    try {
      const { userID, token } = getUser();
      const url = `${BASEURL_API}/users/${userID}/words/${idword}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          difficulty: difficulty,
          optional: optional
        })
      });
      const status = res.status;
      return { status };
    } catch (error) {
      console.log(error);
    }
  }
}
