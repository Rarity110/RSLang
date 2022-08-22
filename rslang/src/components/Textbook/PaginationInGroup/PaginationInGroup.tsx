import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { WordCards } from '../wordCards/WordCards';

interface IProp {
  group: number;
}

export class PagionationInGroup extends Component<IProp> {
  state = {
    page: 0,
    group: 1
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
      page: 0
    });
  }

  updatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    this.setState({
      page: value - 1
    });
  };

  render() {
    const { page, group } = this.state;
    return (
      <div>
        <Stack spacing={2}>
          <Pagination count={30} page={page + 1} onChange={this.updatePage} />
        </Stack>
        <WordCards group={group} page={page} />;
      </div>
    );
  }
}
