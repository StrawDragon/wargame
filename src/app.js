import React, { Component } from 'react';
import { runGame } from './game/run_game';
export class App extends Component {
  constructor () {
    super();

    this.myRefs = React.createRef();
  }

  componentDidMount () {
    runGame(this.myRefs.current);
  }

  render() {
    return (
      <div ref={this.myRefs}>
      </div>
    );
  }
}
