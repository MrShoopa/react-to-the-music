import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SongList from './components/Menu/SongList.jsx';

//  EDIT SONGS HERE
import userList from './components/resources/songlist.json'

class App extends Component {
  state = {
    title: `I'm trying :'''')))))`,
    body: `Hello hello, let's jam!`,

    songs: userList
  }

  render() {
    return (
      <div className="App">
        <SongList songs={this.state.songs} />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p><b>{this.state.body}</b></p>
          <p><i>Made with love by Joe</i></p>
        </header>
      </div>
    );
  }
}

export default App