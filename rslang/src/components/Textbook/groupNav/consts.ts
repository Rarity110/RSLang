export interface IGroup {
  num: number;
  abbr: string;
  // name: string;
  color: string;
}

export type Callback = (num: number) => void;

export interface IPropGroupItem {
  propsGroup: IGroup;
  groupActive: number;
  onChangeGroupFunc: Callback;
}

export interface ICards {
  group: number;
  page: number;
}

export const groupsName: IGroup[] = [
  { num: 1, abbr: 'A1', color: '#b2a7fc' },
  { num: 2, abbr: 'A2', color: '#29c1f0' },
  { num: 3, abbr: 'B1', color: '#a1d450' },
  { num: 4, abbr: 'B2', color: '#fae62f' },
  { num: 5, abbr: 'C1', color: '#fa912f' },
  { num: 6, abbr: 'C2', color: '#db4fc4' }
];

const groups7: IGroup[] = [{ num: 7, abbr: 'Сложные слова', color: '#fc0516' }];

export const groupsNameAuthorized: IGroup[] = groupsName.concat(groups7);
