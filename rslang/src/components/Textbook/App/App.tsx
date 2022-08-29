import React, { Component } from 'react';
import { Container, Grid } from '@mui/material';
import {
  groupsName,
  groupsNameAuthorized,
  IGroup,
  IPropGroupItem,
  Callback
} from '../groupNav/consts';
import { GroupItem } from '../groupNav/groupItem';
import { PagionationInGroup } from '../PaginationInGroup/PaginationInGroup';
import classes from './App.module.scss';
import { AuthorizeContext } from '../../auth-form/AuthorizeContext';

export class App extends Component {
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0
  };

  componentDidMount() {
    this.setState({
      group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0
    });
  }

  updateGroup: Callback = (num: number): void => {
    this.setState({
      group: num - 1
    });
    const groupActive = (num - 1).toString();
    localStorage.setItem('group', groupActive);
    localStorage.setItem('page', '0');
  };

  render() {
    const groups: IGroup[] = !this.context.isAuthorized ? groupsName : groupsNameAuthorized;
    let color = '';
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].num === this.state.group + 1) {
        color = groups[i].color;
      }
    }
    console.log(color);
    const elements = groups.map((prop: IGroup) => {
      const props: IPropGroupItem = {
        propsGroup: prop,
        groupActive: this.state.group + 1,
        onChangeGroupFunc: this.updateGroup
      };
      return <GroupItem key={prop.abbr} {...props} />;
    });
    return (
      <Container>
        <div key="groups" className={classes.textbookMainGroups}>
          {elements}
        </div>
        <PagionationInGroup group={this.state.group} color={color} />
      </Container>
    );
  }
}
// className={classes.textbookMainGroups}
