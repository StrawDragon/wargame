import React, { Component } from 'react';
import { Game } from './game/game';

export class App extends Component {
  constructor() {
    super();

    this.myRefs = React.createRef();
  }

  componentDidMount() {
    const game = new Game(this.myRefs.current);

    // noinspection JSIgnoredPromiseFromCall
    game.run();
  }

  render() {
    return (
      <div ref={this.myRefs} style={{ width: '100%', height: '100%' }} />
    );
  }
}
