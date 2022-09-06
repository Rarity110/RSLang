import { BASEURL_API } from '../../consts/consts';
import { AllStatistics, OptionalStatistics, WordItem } from '../../types/api';
import { getUser } from '../../utility/utility';

export const getPageWords = async (group: number, page: number) => {
  const response = await fetch(`${BASEURL_API}/words?group=${group}&page=${page}`);

  if (response.status === 200) {
    const words: WordItem[] = await response.json();
    return words;
  }

  throw new Error(`Oops! Could not fetch, received ${response.status}!`);
};

export const getStatistics = async () => {
  const { userID, token } = getUser();

  try {
    const response = await fetch(`${BASEURL_API}/users/${userID}/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200) {
      throw new Error(`Oops! Could not fetch, received ${response.status}!`);
    }

    const statistics: AllStatistics = await response.json();
    console.log(statistics);
    return statistics;
  } catch (error: unknown) {
    const er = error as Error;
    console.log(er.message);
  }
};

export const setStatistics = async (optional: OptionalStatistics) => {
  const { userID, token } = getUser();
  try {
    const response = await fetch(`${BASEURL_API}/users/${userID}/statistics`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        learnedWords: 0,
        optional
      })
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
