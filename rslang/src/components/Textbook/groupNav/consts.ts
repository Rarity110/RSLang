export interface IGroup {
  num: number;
  abbr: string;
  name: string;
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
  { num: 1, abbr: 'A1', name: 'Elementary' },
  { num: 2, abbr: 'A2', name: 'Pre-Intermediate' },
  { num: 3, abbr: 'B1', name: 'Intermediate' },
  { num: 4, abbr: 'B2', name: 'Upper-Intermediate' },
  { num: 5, abbr: 'C1', name: 'Advanced' },
  { num: 6, abbr: 'C2', name: 'Proficiency' }
];
