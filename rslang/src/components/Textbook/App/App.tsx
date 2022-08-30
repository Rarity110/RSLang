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
import { ReactLearnWordsAPI } from '../../API/getWords';
import { IWordCard } from '../consts';

interface IUsersWords {
  countPages: number;
  words: IWordCard[];
}

export class App extends Component {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;
  state = {
    group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0,
    allUsersWords: []
  };

  componentDidMount() {
    this.setState({
      group: localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0
    });
    this.getCountAllUserWords();
  }

  async getUserWordsByPage(numberPage: number, allUsersWords: IWordCard[], wordsAtPages: number) {
    const result = await this.reactLearnWordsAPI.getUserWordsByPage(numberPage, wordsAtPages);
    if (result) {
      result.words.forEach((el: IWordCard) => allUsersWords.push(el));
    }
  }

  async getCountAllUserWords() {
    const wordsAtPages = 100;
    const allUsersWords: IWordCard[] = [];
    await this.reactLearnWordsAPI.getUserWordsByPage(0, wordsAtPages).then((value) => {
      if (value) {
        const countPages = Math.ceil(value.countPages / wordsAtPages);
        if (countPages === 1) {
          value.words.forEach((el: IWordCard) => allUsersWords.push(el));
        } else {
          for (let i = 0; i < countPages; i++) {
            this.getUserWordsByPage(i, allUsersWords, wordsAtPages);
            console.log(allUsersWords);
          }
        }
      }
      this.setState({
        allUsersWords: allUsersWords
      });
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
    console.log(this.state.allUsersWords);
    const groups: IGroup[] = !this.context.isAuthorized ? groupsName : groupsNameAuthorized;
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
      <Container>
        <div key="groups" className={classes.textbookMainGroups}>
          {elements}
        </div>
        <PagionationInGroup group={this.state.group} color={color} />
      </Container>
    );
  }
}
