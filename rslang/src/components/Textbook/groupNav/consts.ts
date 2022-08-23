export interface IGroup {
  num: number;
  abbr: string;
  name: string;
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
  { num: 1, abbr: 'A1', name: 'Elementary', color: '#a8f081' },
  { num: 2, abbr: 'A2', name: 'Pre-Intermediate', color: '#faf55a' },
  { num: 3, abbr: 'B1', name: 'Intermediate', color: '#d0f0f7' },
  { num: 4, abbr: 'B2', name: 'Upper-Intermediate', color: 'fcc9a2' },
  { num: 5, abbr: 'C1', name: 'Advanced', color: '#d0f5de' },
  { num: 6, abbr: 'C2', name: 'Proficiency', color: '#d1aeae' }
];
