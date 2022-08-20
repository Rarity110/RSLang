import imgGradual from '../assets/images/home-gradual.png';
import imgOnline from '../assets/images/home-online.png';
import imgGame from '../assets/images/home-game.png';
import imgTime from '../assets/images/home-time.png';
import imgMeaning from '../assets/images/home-meaning.png';
import imgStatistics from '../assets/images/home-statistics.png';

interface AboutAppItem {
  readonly id: number;
  readonly img: string;
  readonly title: string;
  readonly description: string;
}

const aboutAppList: AboutAppItem[] = [
  {
    id: 1,
    img: imgGradual,
    title: 'Разные уровни сложности',
    description:
      'В учебнике 6 глав. Каждая глава содержит наборы слов с разным уровнем сложности. От простых к сложным'
  },
  {
    id: 2,
    img: imgOnline,
    title: 'Всегда под рукой',
    description:
      'Все, что нужно для занятия — доступ в интернет. Проходи тренировки на компьютере, планшете или смартфоне'
  },
  {
    id: 3,
    img: imgGame,
    title: 'Обучение в игровой форме',
    description:
      'Для тренировки запоминания новых слов доступны две игры — спринт и аудиовызов. Учи новые слова с удовольствием'
  },
  {
    id: 4,
    img: imgTime,
    title: 'Не требует много времени',
    description:
      'Можно учить слова в удобном для тебя режиме в свободное время. Одна тренировка длится всего несколько минут'
  },
  {
    id: 5,
    img: imgMeaning,
    title: 'Примеры использования слов',
    description:
      'Аудио с произношением, объяснение значения слова и примеры его использования позволят правильно применять выученные слова'
  },
  {
    id: 6,
    img: imgStatistics,
    title: 'Отслеживание статистики',
    description:
      'Благодаря подробной статистике виден прогресс. Это будет дополнительным стимулом к изучению английского языка'
  }
];

export default aboutAppList;
