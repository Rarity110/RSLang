import React from 'react';
import { IWordCard } from '../../types/props';

interface IContext {
  allUserWords: IWordCard[];
  isAuthorized: boolean;
  authorize: () => void;
  logout: () => void;
}

const emptyObj = {} as IContext;

export const Context = React.createContext({
  allUserWords: [] as IWordCard[],
  isAuthorized: false,
  authorize: () => emptyObj,
  logout: () => emptyObj
});
