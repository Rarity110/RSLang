import { IGroup } from '../types/props';

export const groupsName: IGroup[] = [
  { num: 1, abbr: 'A1', color: '#21ff6f' },
  { num: 2, abbr: 'A2', color: '#21ff6f' },
  { num: 3, abbr: 'B1', color: '#ffff21' },
  { num: 4, abbr: 'B2', color: '#ffda21' },
  { num: 5, abbr: 'C1', color: '#ff8521' },
  { num: 6, abbr: 'C2', color: '#db4fc4' }
];

const groups7: IGroup[] = [{ num: 7, abbr: 'Сложные слова', color: '#fc0516' }];

export const groupsNameAuthorized: IGroup[] = groupsName.concat(groups7);
