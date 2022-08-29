import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { AuthorizeContext } from '../../../auth-form/AuthorizeContext';

interface IDifficult {
  isDifficult: boolean;
}

export class Difficult extends Component {
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

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const { isDifficult } = this.state;
    if (isAuthorized) {
      if (!isDifficult) {
        return <Button variant="outlined">Добавить в сложные</Button>;
      } else {
        return (
          <Button variant="outlined">
            <PriorityHighIcon style={{ color: 'red' }} />;
          </Button>
        );
      }
    }
  }
}
