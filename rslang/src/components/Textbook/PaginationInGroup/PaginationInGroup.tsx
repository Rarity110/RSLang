import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { WordCards } from '../wordCards/WordCards';
import classes from './PaginationInGroup.module.scss';
import { AuthorizeContext } from '../../auth-form/AuthorizeContext';

interface IProp {
  group: number;
  color: string;
}

export class PagionationInGroup extends Component<IProp> {
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
    page: localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0
  };

  componentDidMount() {
    this.updateGroup();
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
    return (
      <div>
        <Stack spacing={2} className={classes.pagionationInGroup}>
          <Pagination count={30} page={page + 1} onChange={this.updatePage} />
        </Stack>
        <WordCards group={group} page={page} color={color} />
      </div>
    );
  }
}

// style={{ backgroundColor: color }}
