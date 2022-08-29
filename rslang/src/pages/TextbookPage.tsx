import React, { Component, useContext } from 'react';
import Header from '../components/Header/Header';
import { App } from '../components/Textbook/App/App';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

// const { isAuthorized } = useContext(AuthorizeContext);
export class TextbookPage extends Component {
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;
  render() {
    const isAuthorized = this.context.isAuthorized;
    return (
      <>
        <Header {...{ isAuthorized }} />
        <App />
      </>
    );
  }
}
