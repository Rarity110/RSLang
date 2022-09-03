import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { WordCards } from '../wordCards/WordCards';
import classes from './PaginationInGroup.module.scss';
import { IWordCard } from '../../../types/props';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

interface IProp {
  group: number;
  color: string;
  allUserWords: IWordCard[];
  funcLearned: () => void;
}

export class PagionationInGroup extends Component<IProp> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
    page: localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0
  };

  componentDidMount() {
    this.updateGroup();
    this.setState({
      allUserWords: this.props.allUserWords
    });
  }

  componentDidUpdate(prevProps: IProp) {
    if (this.props.group !== prevProps.group) {
      this.updateGroup();
    }
  }

  updateGroup() {
    const { group } = this.props;
    this.setState({
      group: group,
      // page: 0
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
    const LinkGame = ({ to, value }: { to: string; value: string }) => {
      return (
        <Button variant="outlined">
          <Link
            to={to}
            state={{ group: group, page: page }}
            className={classes.paginationInGroup_link}>
            {value}
          </Link>
        </Button>
      );
    };
    return (
      <>
        <div className={className}>
          <div className={classes.pagination}>
            <LinkGame to={'/audio-challenge'} value={'Тренировать слова в игре Аудиовызов'} />
            {group !== 6 && (
              <Stack spacing={2} className={classes.pagionationInGroup}>
                <Pagination
                  count={30}
                  page={page + 1}
                  onChange={this.updatePage}
                  color={'secondary'}
                />
              </Stack>
            )}
            <LinkGame to={'/sprint-game'} value={'Тренировать слова в игре Спринт'} />
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
