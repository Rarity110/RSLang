import React, { Component } from 'react';
import { Container, Grid } from '@mui/material';
import { groupsName, IGroup, IPropGroupItem, Callback } from '../groupNav/consts';
import { GroupItem } from '../groupNav/groupItem';
import { PagionationInGroup } from '../PaginationInGroup/PaginationInGroup';
import classes from './App.module.scss';

export class App extends Component {
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0
  };

  updateGroup: Callback = (num: number): void => {
    this.setState({
      group: num - 1
    });
    const groupActive = (num - 1).toString();
    localStorage.setItem('group', groupActive);
    localStorage.setItem('page', '0');
  };

  render() {
    const elements = groupsName.map((prop: IGroup) => {
      const props: IPropGroupItem = {
        propsGroup: prop,
        groupActive: this.state.group + 1,
        onChangeGroupFunc: this.updateGroup
      };
      return <GroupItem key={prop.abbr} {...props} />;
    });
    return (
      <Container>
        <Grid key="groups" className={classes.textbookMainGroups}>
          {elements}
        </Grid>
        <PagionationInGroup group={this.state.group} />
      </Container>
    );
  }
}
