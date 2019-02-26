import React from 'react'
import ReactDOM from 'react-dom'


import Song from '../Song.jsx'
import Player from '../Player/Player.jsx'

import './SongList.scss'

class SongList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tentative: props.tentative
        }
    }

    playSong = (song) => {
        let transitioningScreen = (<div style={{ animation: 'screen-lay-in .33s ease-out' }}>
            <Player song={song} />
        </div>)

        ReactDOM.render(transitioningScreen, document.getElementById('root'));
    }

    render = () => {
        let itemsElement = this.props.songs.map((song) => (
            <div onClick={() => this.playSong(song)}
                style={{
                    height: '.40in', width: '90vw',
                    margin: '5vw', display: 'inline-table',
                    backgroundColor: 'teal', borderRadius: '5px',
                    textAlign: 'center',
                }}>
                <Song key={song.id} song={song} />
            </div >
        ));


        return itemsElement
    }
}

SongList.defaultProps = {
    tentative: true
}

//class Select

export default SongList