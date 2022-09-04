interface NavigationItem {
  readonly id: number;
  readonly title: string;
  readonly link: string;
  readonly isPublic: boolean;
}

const navigationList: NavigationItem[] = [
  {
    id: 1,
    title: 'Главная',
    link: '/',
    isPublic: true
  },
  {
    id: 2,
    title: 'Электронный учебник',
    link: '/textbook',
    isPublic: true
  },
  {
    id: 3,
    title: 'Аудиовызов',
    link: '/audio-challenge',
    isPublic: true
  },
  {
    id: 4,
    title: 'Спринт',
    link: '/sprint-game',
    isPublic: true
  },
  {
    id: 5,
    title: 'Статистика',
    link: '/statistics',
    isPublic: false
  }
];

export default navigationList;
