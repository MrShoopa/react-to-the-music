import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


//import Player from './components/Player/Player.jsx';
import SongList from './components/Menu/SongList.jsx';



class App extends Component {
  state = {
    title: `I'm trying :'''')))))`,
    body: 'Hello welcome, nice to meet you, Joe here!',
    songs: [
      {
        id: 10,
        name: "Move Your Feet",
        artist: "Junior Senior",
        album: "D-D-Don't Don't Stop the Beat",
        year: 2002,
        artwork: "https://upload.wikimedia.org/wikipedia/en/7/75/D-D-Don%27t_Stop_the_Beat.jpg",
        duration: 180,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
      },
      {
        id: 11,
        name: "Halo Theme Song",
        artist: "Martin O'Donnell, Micheal Salvatori",
        album: "Halo Official Soundtrack",
        year: 2002,
        artwork: "https://upload.wikimedia.org/wikipedia/en/7/75/D-D-Don%27t_Stop_the_Beat.jpg",
        duration: 180,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
      },
      {
        id: 12,
        name: "Move Your Feet",
        artist: "Junior Senior",
        album: "D-D-Don't Don't Stop the Beat",
        year: 2002,
        artwork: "https://upload.wikimedia.org/wikipedia/en/7/75/D-D-Don%27t_Stop_the_Beat.jpg",
        duration: 180,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
      }
    ]

  }

  render() {
    return (
      <div className="App">
        <SongList songs={this.state.songs} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App