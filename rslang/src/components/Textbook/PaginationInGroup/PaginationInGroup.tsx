import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { WordCards } from '../wordCards/WordCards';
import classes from './PaginationInGroup.module.scss';
import { IWordCard } from '../../../types/props';
import { Context } from '../../App/Context';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

interface IProp {
  group: number;
  color: string;
  allUserWords: IWordCard[];
  funcLearned: (learned: boolean) => void;
  learnedPage: boolean;
}

export class PagionationInGroup extends Component<IProp> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
    page: localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0,
    learnedPage: this.props.learnedPage
  };

  componentDidMount() {
    this.updateGroup();
    this.setState({
      allUserWords: this.props.allUserWords,
      learnedPage: this.props.learnedPage
    });
  }

  componentDidUpdate(prevProps: IProp) {
    if (this.props.group !== prevProps.group) {
      this.updateGroup();
    }
    if (this.props.learnedPage !== prevProps.learnedPage) {
      this.setState({
        learnedPage: this.props.learnedPage
      });
    }
  }

  updateGroup() {
    const { group } = this.props;
    this.setState({
      group: group,
      page: localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0
    });
  }

  updatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    this.setState({
      page: value - 1
    });
    const pageActive = (value - 1).toString();
    localStorage.setItem('page', pageActive);
  };

  render() {
    const { color } = this.props;
    const { page, group } = this.state;
    const className = classes.page;
    let classNameLink = classes.paginationInGroup_link;
    let nameLinkSprint = 'Тренировать слова в игре Спринт';
    let nameLinkAudio = 'Тренировать слова в игре Аудиовызов';
    if (this.props.learnedPage) {
      classNameLink = classes.paginationInGroup_link_disabled;
      nameLinkSprint = 'Все слова на странице знакомы';
      nameLinkAudio = 'Игры доступны по ссылкам в меню';
    }
    const LinkGame = ({ to, value }: { to: string; value: string }) => {
      return (
        <Button variant="outlined">
          <Link to={to} state={{ group: group, page: page }} className={classNameLink}>
            {value}
          </Link>
        </Button>
      );
    };
    return (
      <>
        <div className={className}>
          <div className={classes.pagination}>
            <LinkGame to={'/audio-challenge'} value={nameLinkAudio} />
            {group !== 6 && (
              <Stack spacing={2} className={classes.pagionationInGroup}>
                <Pagination
                  count={30}
                  page={page + 1}
                  onChange={this.updatePage}
                  // eslint-disable-next-line prettier/prettier, quotes
                  color={this.props.learnedPage ? "secondary" : "standard"}
                />
              </Stack>
            )}
            <LinkGame to={'/sprint-game'} value={nameLinkSprint} />
          </div>
        </div>
        <WordCards
          group={group}
          page={page}
          color={color}
          allUserWords={this.context.allUserWords}
          funcLearned={this.props.funcLearned}
        />
      </>
    );
  }
}
