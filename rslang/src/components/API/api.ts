import { BASEURL_API } from '../../consts/consts';
import { WordItem } from '../../types/api';

export const getPageWords = async (group: number, page: number) => {
  const response = await fetch(`${BASEURL_API}/words?group=${group}&page=${page}`);

  if (response.status === 200) {
    const words: WordItem[] = await response.json();
    return words;
  }

  throw new Error(`Oops! Could not fetch, received ${response.status}!`);
};
