import React from 'react'
import ReactDOM from 'react-dom'


import Song from './Song'
import Player from '../Player/Player.jsx'

import './SongList.scss'

class SongList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            tentative: props.tentative
        }
    }

    playSong = (song) => {
        ReactDOM.render(<Player song={song} />, document.getElementById('root'));
    }

    render = () => {


        return this.props.songs.map((song) => (
            <div onClick={() => this.playSong(song)}>
                <Song key={song.id} song={song} />
            </div >
        ));
    }
}

SongList.defaultProps = {
    tentative: true
}

//class Select

export default SongList