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
    title: 'Электронный учебник',
    link: '/textbook'
  },
  {
    id: 3,
    title: 'Статистика',
    link: '/statistics'
  },
  {
    id: 4,
    title: 'Спринт',
    link: '/sprint-game'
  }
];

export default navigationList;
