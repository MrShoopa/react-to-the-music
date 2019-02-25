import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


//import Player from './components/Player/Player.jsx';
import SongList from './components/Menu/SongList.jsx';



class App extends Component {
  state = {
    title: `I'm trying :'''')))))`,
    body: `Hello hello, let's jam!`,
    songs: [
      {
        id: 10,
        name: "Move Your Feet",
        artist: "Junior Senior",
        album: "D-D-Don't Don't Stop the Beat",
        year: 2002,
        artwork: "https://upload.wikimedia.org/wikipedia/en/7/75/D-D-Don%27t_Stop_the_Beat.jpg",
        duration: 192,
        source: "https://docs.google.com/uc?id=1ntIeHTP0-7oWlQ7_esFcYYqaUENkO5i7&export=download"
      },
      {
        id: 11,
        name: "Halo Theme Song",
        artist: "Martin O'Donnell, Micheal Salvatori",
        album: "Halo Official Soundtrack",
        year: 2002,
        artwork: "https://images-na.ssl-images-amazon.com/images/I/51xuwVGGt8L.jpg",
        duration: 180,
        source: "https://docs.google.com/uc?id=1e04_RnyiyziVLYhBypKhLrI3r6LNcBLo&export=download"
      },
      {
        id: 12,
        name: "ANGEL VOICES",
        artist: "VIRTUAL SELF",
        album: "",
        year: 2018,
        artwork: "https://m.media-amazon.com/images/I/71VJ6MxpN8L._SS500_.jpg",
        duration: 392,
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
          <p><b>{this.state.body}</b></p>
          <p><i>Made with love by Joe</i></p>
        </header>
      </div>
    );
  }
}

export default App