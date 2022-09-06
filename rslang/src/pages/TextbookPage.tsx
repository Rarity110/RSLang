import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { App } from '../components/Textbook/App/App';
import { Context } from '../components/App/Context';
import Footer from '../components/Footer/Footer';

export class TextbookPage extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  render() {
    const isAuthorized = this.context.isAuthorized;
    return (
      <>
        <Header {...{ isAuthorized }} />
        <App />
        <Footer />
      </>
    );
  }
}
