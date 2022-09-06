import React, { Component } from 'react';
import { Container } from '@mui/material';
import { IPropGroupItem, IGroup } from '../../../types/props';
import { groupsName, groupsNameAuthorized } from '../../../consts/textbook';
import { GroupItem } from '../groupNav/groupItem';
import { PagionationInGroup } from '../PaginationInGroup/PaginationInGroup';
import classes from './App.module.scss';
import { ReactLearnWordsAPI } from '../../API/getWords';
import { Context } from '../../App/Context';

export class App extends Component {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
    learned: false
  };

  componentDidMount() {
    this.setState({
      group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
      learned: false
    });
    this.updateLearned = this.updateLearned.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
  }

  updateGroup(num: number) {
    this.setState({
      group: num - 1
    });
    const groupActive = (num - 1).toString();
    localStorage.setItem('group', groupActive);
    localStorage.setItem('page', '0');
  }

  updateLearned(learned: boolean) {
    this.setState({
      learned: learned
    });
  }

  render() {
    const groups: IGroup[] = !this.context.isAuthorized ? groupsName : groupsNameAuthorized;
    const allUserWords = this.context.allUserWords;
    let className = classes.textbookMain;
    if (this.state.learned) {
      className = classes.textbookMainLearned;
    }
    let color = '';
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].num === this.state.group + 1) {
        color = groups[i].color;
      }
    }
    const elements = groups.map((prop: IGroup) => {
      const props: IPropGroupItem = {
        propsGroup: prop,
        groupActive: this.state.group + 1,
        onChangeGroupFunc: this.updateGroup
      };
      return <GroupItem key={prop.abbr} {...props} />;
    });
    return (
      <Container className={className}>
        <div>
          <div key="groups" className={classes.textbookMainGroups}>
            {elements}
          </div>
          <PagionationInGroup
            group={this.state.group}
            color={color}
            allUserWords={allUserWords}
            funcLearned={this.updateLearned}
            learnedPage={this.state.learned}
          />
        </div>
      </Container>
    );
  }
}
