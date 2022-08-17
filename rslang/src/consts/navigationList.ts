interface NavigationItem {
  readonly id: number;
  readonly title: string;
  readonly link: string;
}

const navigationList: NavigationItem[] = [
  {
    id: 1,
    title: 'Главная',
    link: '/'
  },
  {
    id: 2,
    title: 'Статистика',
    link: '/statistics'
  }
];

export default navigationList;
