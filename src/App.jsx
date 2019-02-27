import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SongList from './components/Menu/SongList.jsx';

//  EDIT SONGS HERE
import userList from './resources/songlist.json'

class App extends Component {
  state = {
    title: `Music App`,
    body: `Hello hello, let's jam!`,

    songs: userList
  }

  render() {
    return (
      <div className="App">
        <header className="Main-Header">
          <p><b>{this.state.title}</b></p>
        </header>

        <body style={{ top: '0px', overflow: 'auto' }}>
          <SongList songs={this.state.songs} />
        </body>

        <footer className="Main-Footer">
          <img src={logo} className="App-logo" alt="logo" />
          <p><b>{this.state.body}</b></p>
          <p><i>Made with love by Joe</i></p>
        </footer>
      </div>
    );
  }
}

export default App