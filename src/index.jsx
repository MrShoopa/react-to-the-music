/*
  Inspired by Jack Oliver's blogpost on CreativeBloq.
  (https://www.creativebloq.com/how-to/build-a-simple-music-player-with-react)

Created by Joe Villegas in pursuit of learning
  ReactJS.

  Future functionality would include the playback of folder of music files 
  (like the ones from my discord bot) as well as from external sources such as YouTube)

    @author (joevillegasisawesome@gmail.com)
    @date   2/23/2019
*/

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App'

ReactDOM.render(
  <App key={"initial"} />, document.getElementById('root'));

document.addEventListener("DOMContentLoaded", function (event) {
  document.body.style.animation = 'initial-screen-slide-up-empty-full 1s';

});




//ReactDOM.render(<Player />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();