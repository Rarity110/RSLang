import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { WordCards } from '../wordCards/WordCards';
import classes from './PaginationInGroup.module.scss';
// import { AuthorizeContext } from '../../auth-form/AuthorizeContext';
// import { AllUsersWordsConsumer } from '../contextUserCard';
import { IWordCard } from '../consts';
import { Context } from '../Context';

interface IProp {
  group: number;
  color: string;
  allUsersWords: IWordCard[];
}

export class PagionationInGroup extends Component<IProp> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
    page: localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0,
    learned: false
  };

  componentDidMount() {
    this.updateGroup();
    this.setState({
      allUserWords: this.props.allUsersWords,
      learned: false
    });
  }

  componentDidUpdate(prevProps: IProp) {
    if (this.props.group !== prevProps.group) {
      this.updateGroup();
    }
    this.updateLearned = this.updateLearned.bind(this);
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

  updateLearned() {
    this.setState({
      learned: true
    });
  }

  render() {
    const { color } = this.props;
    const { page, group } = this.state;
    let className = classes.page;
    if (this.state.learned === true) className += '_learned';
    return (
      <div className={className}>
        {group !== 6 && (
          <Stack spacing={2} className={classes.pagionationInGroup}>
            <Pagination count={30} page={page + 1} onChange={this.updatePage} color={'secondary'} />
          </Stack>
        )}
        <WordCards
          group={group}
          page={page}
          color={color}
          allUserWords={this.context.allUserWords}
          funcLearned={this.updateLearned}
        />
      </div>
    );
  }
}

// style={{ backgroundColor: color }}
