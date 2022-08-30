import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { AuthorizeContext } from '../../../auth-form/AuthorizeContext';
import { ReactLearnWordsAPI } from '../../../API/getWords';
// import { TCallback } from '../../consts'

export type TCallbackAsync = (id: string) => void;
interface IDifficult {
  //   isDifficult: boolean;
  idword: string;
  func: TCallbackAsync;
}

export class Difficult extends Component<IDifficult> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;

  state = {
    isDifficult: true
  };

  //   componentDidMount() {
  //     this.updateDifficult();
  //   }

  //   componentDidUpdate(prevProps: IDifficult) {
  //     if (this.props.isDifficult !== prevProps.isDifficult) {
  //       this.updateDifficult();
  //     }
  //   }

  //   updateDifficult() {
  //     const { isDifficult } = this.props;
  //     this.setState({
  //       isDifficult: isDifficult
  //     });
  //   }

  //   togleDifficult(idword: string) {
  //     this.reactLearnWordsAPI.postUserWord(idword);
  //   }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const { isDifficult } = this.state;
    if (isAuthorized) {
      if (!isDifficult) {
        return <Button variant="outlined">Добавить в сложные</Button>;
      } else {
        return (
          <Button variant="outlined" onClick={() => this.props.func(this.props.idword)}>
            <PriorityHighIcon style={{ color: 'red' }} />;
          </Button>
        );
      }
    }
  }
}
