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
        ReactDOM.render(<Player song={song} />, document.getElementById('root'));
    }

    render = () => {
        let itemsElement = this.props.songs.map((song) => (
            <div onClick={() => this.playSong(song)}
                style={{
                    height: '.3in',
                    backgroundColor: 'teal', borderRadius: '5px',
                    alignContent: 'center', textAlign: 'center',
                }}>
                <Song key={song.id} song={song} />
            </div >
        ));


        return (<div style={{ top: '0', height: '200px', overflow: 'auto' }}>
            {itemsElement}
        </div >);
    }
}

SongList.defaultProps = {
    tentative: true
}

//class Select

export default SongList