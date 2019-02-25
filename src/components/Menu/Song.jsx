import React from 'react';

class Song extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            id: props.song.name,
            name: props.song.name,
            artist: props.song.artist,
            album: props.song.album,
            year: props.song.year,
            artwork: props.song.artwork,
            duration: props.song.duration,
            source: props.song.source
        }
    };


    render = () => {
        return (<p>{this.state.name} - {this.state.artist}</p>)
    }
}

Song.defaultProps = {
    track: {
        id: "0",
        name: "Angel Voices",
        artist: "VIRTUAL SELF",
        album: "",
        year: 2018,
        artwork: "https://m.media-amazon.com/images/I/71VJ6MxpN8L._SS500_.jpg",
        duration: 392,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
    }
};

export default Song