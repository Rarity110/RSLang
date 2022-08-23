import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { App } from '../components/Textbook/App/App';

export class TextbookPage extends Component {
  render() {
    return (
      <>
        <Header />
        <App />
      </>
    );
  }
}
