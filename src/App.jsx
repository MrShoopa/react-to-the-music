import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SongList from './components/Menu/SongList.jsx';

//  EDIT SONGS HERE
import playlist from './resources/personal_list.json'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: `Music App`,
      body: `Hello hello, let's jam!`,

      songs: playlist.songs,
      listID: Math.random()
    }
  }

  render = () => {
    return (
      <div className="App">
        <header className="Main-Header">
          <p><b>{this.state.title}</b></p>
        </header>

        <div style={{ top: '0px', overflow: 'auto' }}>
          <SongList key={playlist.id} songs={this.state.songs} />
        </div>

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