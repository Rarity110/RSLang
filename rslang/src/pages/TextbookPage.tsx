import React, { Component } from 'react';
import { Container, Grid } from '@mui/material';
import Header from '../components/Header/Header';
import {
  groupsName,
  IGroup,
  IPropGroupItem,
  Callback
} from '../components/Textbook/groupNav/consts';
import { GroupItem } from '../components/Textbook/groupNav/groupItem';
// import { WordCard } from '../components/Textbook/WordCard/WordCard';
import { PagionationInGroup } from '../components/Textbook/PaginationInGroup/PaginationInGroup';

export class TextbookPage extends Component {
  state = {
    group: 0
  };

  updateGroup: Callback = (num: number): void => {
    this.setState({
      group: num - 1
    });
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
      <>
        <Header />
        <Container>
          <Grid key="groups">{elements}</Grid>
          <PagionationInGroup group={this.state.group} />
          {/* <WordCard /> */}
        </Container>
      </>
    );
  }
}
